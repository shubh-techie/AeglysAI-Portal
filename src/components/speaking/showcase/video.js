(() => {
  const root = document.querySelector('[data-speaking-showcase]');
  if (!root) return;
  for (const image of root.querySelectorAll('[data-video-thumbnail]')) {
    const failed = () => { image.hidden = true; image.closest('[data-video-play]').classList.add('sp-thumbnail-failed'); };
    image.addEventListener('error', failed);
    if (image.complete && !image.naturalWidth) failed();
  }
  for (const link of root.querySelectorAll('[data-video-play]')) {
    link.setAttribute('role', 'button');
    link.setAttribute('aria-label', `Play ${link.dataset.videoTitle} inline; loads YouTube`);
    link.addEventListener('keydown', event => { if (event.key === ' ') { event.preventDefault(); link.click(); } });
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const source = link.dataset.videoEmbed;
      if (!/^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}$/.test(source || '')) return;
      event.preventDefault();
      const frame = document.createElement('iframe');
      frame.src = source;
      frame.title = `YouTube video: ${link.dataset.videoTitle}`;
      frame.allow = 'fullscreen; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.tabIndex = 0;
      frame.addEventListener('error', () => { frame.replaceWith(link); link.focus(); });
      link.replaceWith(frame);
      frame.focus();
    });
  }
})();
