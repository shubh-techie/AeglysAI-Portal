/* Exclusive /hackathons/ progressive presentation. No event/intake state is mutated. */
(() => {
  window.__aeglysEventMotionDispose?.();
  const lifecycle = new AbortController();
  let stop = () => {};
  const entered = new WeakSet();
  const heroEntered = new WeakSet();

  function start() {
    stop();
    const root = document.querySelector('.hx-global-event');
    if (!root) return;
    const listeners = new AbortController();
    const observers = [];
    const frames = new Set();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const hero = root.querySelector('.hx-hero');
    const cards = [...root.querySelectorAll('.challenge-tile')];
    const sections = [...root.querySelectorAll('section[id]')];
    const steps = [...root.querySelectorAll('.hx-journey > li, .hx-competition-timeline > li')];
    const nav = root.querySelector('.hx-event-nav');
    const navLinks = [...root.querySelectorAll('[data-event-section]')];
    let pointerListeners;
    let entranceObserver;
    let heroObserver;
    const requestFrame = callback => {
      const id = requestAnimationFrame(() => { frames.delete(id); callback(); });
      frames.add(id);
      return id;
    };
    const cancelFrame = id => { cancelAnimationFrame(id); frames.delete(id); };

    // Attribute changes are presentation only, never a qualification/event completion flag.
    steps.forEach(step => step.setAttribute('tabindex', '0'));
    root.querySelectorAll('.hx-round li').forEach(row => {
      const points = Number(row.textContent.match(/— (\d+) points\s*$/)?.[1]);
      if (Number.isFinite(points) && points >= 0 && points <= 100) row.style.setProperty('--score', points / 100);
    });

    if ('IntersectionObserver' in window) {
      const navObserver = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        navLinks.forEach(link => {
          if (link.dataset.eventSection === visible.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }, { rootMargin: '-15% 0px -55% 0px' });
      navLinks.forEach(link => { const section = document.getElementById(link.dataset.eventSection); if (section) navObserver.observe(section); });
      observers.push(navObserver);
      if (nav) {
        const navObserver = new IntersectionObserver(entries => {
          nav.classList.toggle('hx-nav-pinned', !entries[0].isIntersecting);
        });
        // Observe the existing facts strip; do not insert a visible activity display.
        const facts = root.querySelector('.hx-facts');
        if (facts) navObserver.observe(facts);
        observers.push(navObserver);
      }
    }

    const resetPointer = target => {
      ['--cursor-x', '--cursor-y', '--tilt-x', '--tilt-y', '--grid-x', '--grid-y'].forEach(key => target.style.removeProperty(key));
      target.removeAttribute('data-pointer');
    };
    function attachPointer(target, tilt) {
      let bounds;
      let frame;
      let point;
      const reset = () => {
        if (frame) cancelFrame(frame);
        frame = undefined; bounds = undefined; point = undefined;
        resetPointer(target);
      };
      target.addEventListener('pointermove', event => {
        if (root.dataset.paused === 'true') return;
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        point = { x: event.clientX, y: event.clientY };
        if (frame) return;
        frame = requestFrame(() => {
          frame = undefined;
          bounds ??= target.getBoundingClientRect();
          const x = Math.max(0, Math.min(1, (point.x - bounds.left) / bounds.width));
          const y = Math.max(0, Math.min(1, (point.y - bounds.top) / bounds.height));
          target.style.setProperty('--cursor-x', `${(x * 100).toFixed(2)}%`);
          target.style.setProperty('--cursor-y', `${(y * 100).toFixed(2)}%`);
          target.setAttribute('data-pointer', 'active');
          if (tilt) {
            target.style.setProperty('--tilt-x', `${((.5 - y) * 3).toFixed(2)}deg`);
            target.style.setProperty('--tilt-y', `${((x - .5) * 3).toFixed(2)}deg`);
          } else {
            target.style.setProperty('--grid-x', `${((x - .5) * 8).toFixed(2)}px`);
            target.style.setProperty('--grid-y', `${((y - .5) * 8).toFixed(2)}px`);
          }
        });
      }, { passive: true, signal: pointerListeners.signal });
      target.addEventListener('pointerleave', reset, { passive: true, signal: pointerListeners.signal });
      // Cached bounds must not survive viewport or document movement.
      window.addEventListener('resize', reset, { passive: true, signal: pointerListeners.signal });
      window.addEventListener('scroll', reset, { passive: true, signal: pointerListeners.signal });
    }

    function updatePreferences() {
      pointerListeners?.abort();
      frames.forEach(id => cancelAnimationFrame(id)); frames.clear();
      if (hero) resetPointer(hero);
      cards.forEach(resetPointer);
      root.dataset.motion = reduced.matches ? 'off' : 'on';
      entranceObserver?.disconnect();
      heroObserver?.disconnect();
      if (reduced.matches) {
        root.classList.remove('hx-hero-entrance');
        root.removeAttribute('data-hero-in-view');
        root.querySelectorAll('.hx-entered, [data-step-attention]').forEach(element => {
          element.classList.remove('hx-entered'); element.removeAttribute('data-step-attention');
        });
      } else if ('IntersectionObserver' in window) {
        if (!heroEntered.has(root)) {
          root.classList.add('hx-hero-entrance');
          heroEntered.add(root);
        }
        entranceObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting || entered.has(entry.target)) return;
            entered.add(entry.target);
            entry.target.classList.add('hx-entered');
            entranceObserver.unobserve(entry.target);
          });
        }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
        sections.forEach(section => { if (!entered.has(section)) entranceObserver.observe(section); });
        heroObserver = new IntersectionObserver(entries => {
          root.toggleAttribute('data-hero-in-view', entries[0].isIntersecting);
        }, { threshold: .2 });
        if (hero) heroObserver.observe(hero);
      }
      if (!reduced.matches && fine.matches && !document.hidden) {
        pointerListeners = new AbortController();
        if (hero) attachPointer(hero, false);
        cards.forEach(card => attachPointer(card, true));
      }
    }
    if ('IntersectionObserver' in window) {
      const attentionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.toggleAttribute('data-step-attention', entry.isIntersecting && !reduced.matches));
      }, { rootMargin: '-25% 0px -50% 0px' });
      steps.forEach(step => attentionObserver.observe(step));
      observers.push(attentionObserver);
    }
    reduced.addEventListener('change', updatePreferences, { signal: listeners.signal });
    fine.addEventListener('change', updatePreferences, { signal: listeners.signal });
    document.addEventListener('visibilitychange', updatePreferences, { signal: listeners.signal });
    updatePreferences();

    stop = () => {
      listeners.abort(); pointerListeners?.abort();
      observers.forEach(observer => observer.disconnect());
      entranceObserver?.disconnect(); heroObserver?.disconnect();
      frames.forEach(id => cancelAnimationFrame(id)); frames.clear();
      if (hero) resetPointer(hero);
      cards.forEach(resetPointer);
      steps.forEach(step => { step.removeAttribute('tabindex'); step.removeAttribute('data-step-attention'); });
      root.querySelectorAll('.hx-round li').forEach(row => row.style.removeProperty('--score'));
      root.querySelectorAll('.hx-entered').forEach(section => section.classList.remove('hx-entered'));
      root.classList.remove('hx-hero-entrance');
      root.removeAttribute('data-motion'); root.removeAttribute('data-hero-in-view');
      nav?.classList.remove('hx-nav-pinned');
      navLinks.forEach(link => link.removeAttribute('aria-current'));
    };
  }

  const dispose = () => { stop(); lifecycle.abort(); delete window.__aeglysEventMotionDispose; };
  window.__aeglysEventMotionDispose = dispose;
  document.addEventListener('astro:before-swap', dispose, { signal: lifecycle.signal });
  window.addEventListener('pagehide', () => stop(), { signal: lifecycle.signal });
  window.addEventListener('pageshow', event => { if (event.persisted) start(); }, { signal: lifecycle.signal });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true, signal: lifecycle.signal });
  else start();
})();
