/* One navigation tree: native disclosure fallback, progressively enhanced modal on mobile. */
(() => {
  const header = document.querySelector('.site-header');
  const shell = header?.querySelector('[data-site-menu]');
  const panel = header?.querySelector('#site-navigation');
  const dialog = header?.querySelector('#mobile-navigation');
  const toggle = header?.querySelector('[data-menu-toggle]');
  const research = header?.querySelector('[data-research-navigation]');
  if (!shell || !panel || !toggle || !research || typeof dialog?.showModal !== 'function') return;
  const mobile = window.matchMedia('(max-width: 1024px)');
  const summary = research.querySelector('summary');
  let previousOverflow = '';
  const syncResearch = () => summary.setAttribute('aria-expanded', String(research.open));
  research.addEventListener('toggle', syncResearch);
  syncResearch();
  const finishClose = (restore = true) => {
    shell.append(panel);
    shell.open = !mobile.matches;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    document.body.style.overflow = previousOverflow;
    research.open = false;
    syncResearch();
    if (restore && mobile.matches) toggle.focus();
  };
  const close = (restore = true) => {
    if (!dialog.open) return;
    dialog.close();
    finishClose(restore);
  };
  toggle.addEventListener('click', () => {
    if (!mobile.matches || dialog.open) return;
    previousOverflow = document.body.style.overflow;
    dialog.append(panel);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Navigation open');
    panel.querySelector('[data-menu-close]').focus();
  });
  panel.querySelector('[data-menu-close]').addEventListener('click', () => close());
  panel.querySelector('[data-menu-system]').addEventListener('click', () => header.querySelector('[data-theme-system]')?.click());
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('close', () => {
    // Also handle an external/native close without disturbing a subsequent reopening.
    if (!dialog.open && panel.parentElement === dialog) finishClose();
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll('a[href],button,summary')].filter(element => {
      const closed = element.closest('details:not([open])');
      return element.getClientRects().length && !element.disabled && (!closed || closed.querySelector('summary') === element);
    });
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  panel.addEventListener('click', event => { if (event.target.closest('a[href]') && dialog.open) close(false); });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (dialog.open) { event.preventDefault(); close(); }
    else if (research.open) { event.preventDefault(); research.open = false; syncResearch(); summary.focus(); }
  });
  document.addEventListener('click', event => { if (!research.contains(event.target)) { research.open = false; syncResearch(); } });
  document.addEventListener('focusin', event => { if (!research.contains(event.target)) { research.open = false; syncResearch(); } });
  const resize = () => {
    if (dialog.open) { close(false); header.querySelector('.wordmark').focus(); }
    shell.open = !mobile.matches;
    toggle.hidden = !mobile.matches;
    if (mobile.matches && panel.contains(document.activeElement)) toggle.focus();
  };
  header.classList.add('navigation-ready');
  mobile.addEventListener('change', resize);
  resize();
})();
