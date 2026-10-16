/** Prefix an in-site path with the configured base path (GitHub Pages serves from /<repo>/). */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  const b = base.endsWith('/') ? base : `${base}/`;
  return b + path.replace(/^\/+/, '');
}
