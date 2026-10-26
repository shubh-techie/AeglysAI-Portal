/** Native scrolling also provides touch swipe without intercepting page gestures. */
function initializeShowcases() {
    document.querySelectorAll('[data-showcase]').forEach(root => {
        if (root.dataset.initialized)
            return;
        root.dataset.initialized = 'true';
        const track = root.querySelector('.showcase-track');
        const cards = [...track.querySelectorAll('.showcase-card')];
        const select = root.querySelector('select');
        const status = root.querySelector('[data-status]');
        const previous = root.querySelector('[data-previous]');
        const next = root.querySelector('[data-next]');
        const visible = () => cards.filter(card => !card.hidden);
        const update = () => {
            if (previous)
                previous.disabled = track.scrollLeft <= 1;
            if (next)
                next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        };
        select?.addEventListener('change', () => {
            cards.forEach(card => { card.hidden = select.value !== 'all' && card.dataset.category !== select.value; });
            track.scrollTo({ left: 0, behavior: 'instant' });
            status.textContent = `${visible().length} approved items shown for ${select.selectedOptions[0].textContent}`;
            update();
        });
        const go = (direction) => {
            const shown = visible();
            const current = shown.reduce((best, card, index) => Math.abs(card.offsetLeft - shown[0].offsetLeft - track.scrollLeft) < Math.abs(shown[best].offsetLeft - shown[0].offsetLeft - track.scrollLeft) ? index : best, 0);
            const target = shown[Math.max(0, Math.min(shown.length - 1, current + direction))];
            if (target)
                track.scrollTo({ left: target.offsetLeft - shown[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        };
        previous?.addEventListener('click', () => go(-1));
        next?.addEventListener('click', () => go(1));
        track.addEventListener('keydown', event => {
            if (root.dataset.layout !== 'carousel' || event.target !== track)
                return;
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
                return;
            event.preventDefault();
            go(event.key === 'Home' ? -cards.length : event.key === 'End' ? cards.length : event.key === 'ArrowRight' ? 1 : -1);
        });
        track.addEventListener('scroll', update, { passive: true });
        if (previous && next && typeof ResizeObserver !== 'undefined')
            new ResizeObserver(update).observe(track);
        root.querySelector('[data-filter-label]')?.removeAttribute('hidden');
        root.querySelector('[data-navigation]')?.removeAttribute('hidden');
        update();
    });
}

initializeShowcases();
