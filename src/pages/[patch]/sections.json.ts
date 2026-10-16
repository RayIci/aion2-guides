import type { APIRoute, GetStaticPaths } from 'astro';
import type { PatchView } from '../../content-core';
import { getContent } from '../../lib/content';

// Resolved section bodies of one patch, for the in-browser compare page.
export const getStaticPaths = (async () => {
  const content = await getContent();
  return content.patches.map((patch) => ({ params: { patch: patch.meta.id }, props: { patch } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { patch } = props as { patch: PatchView };
  const sections = patch.sections.map((s) => ({ id: s.id, title: s.title, body: s.body }));
  return new Response(JSON.stringify({ id: patch.meta.id, sections }), { headers: { 'Content-Type': 'application/json' } });
};
