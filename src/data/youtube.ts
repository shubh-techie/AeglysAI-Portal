/** Accept only explicit public YouTube video URLs or an eleven-character ID. */
export function youtubeId(value: string): string {
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.port) throw Error('Invalid YouTube URL');
  let id: string | null = null;
  if (url.hostname === 'youtu.be' && /^\/[A-Za-z0-9_-]{11}$/.test(url.pathname)) id = url.pathname.slice(1);
  if (['www.youtube.com','youtube.com','m.youtube.com'].includes(url.hostname)) {
    if (url.pathname === '/watch' && url.searchParams.getAll('v').length === 1) id = url.searchParams.get('v');
    else if (/^\/(shorts|embed)\/[A-Za-z0-9_-]{11}$/.test(url.pathname)) id = url.pathname.split('/')[2];
  }
  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) throw Error('Invalid YouTube video ID');
  return id;
}
export function youtubeUrl(value: string): string { return `https://www.youtube.com/watch?v=${youtubeId(value)}`; }
export function youtubeThumbnail(value: string): string { return `https://i.ytimg.com/vi/${youtubeId(value)}/hqdefault.jpg`; }
export function youtubeEmbed(value: string): string { return `https://www.youtube-nocookie.com/embed/${youtubeId(value)}`; }
