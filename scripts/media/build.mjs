// Build the site's game media from the gaming.tools cache (.cache/gt):
//   public/img/icons/<key>.webp       item, skill, node and monster icons (64 px)
//   public/img/maps/<slug>.webp        whole-map images
//   public/img/maps/o/<id>.webp        cropped overlay maps
//   content/media/icons.json           name → icon key (items, skills per class, nodes, monsters, classes)
//   content/media/items.json           item cards: grade, how to get it, drops, shops, recipes
//   content/media/maps.json            map images + subzone labels
//   content/media/overlays.json        overlay maps: points, spot circles and a suggested route
// Usage: node scripts/media/build.mjs        (run fetch first; see scripts/media/README.md)
import sharp from 'sharp';
import { mkdir, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fetchPaths } from './fetch.mjs';
import { CDN, SITE, cachePath, exists, iconKey, loadData, slug, writeJson } from './gt.mjs';

const MEDIA = 'content/media';
const IMG = 'public/img';
const CLASSES = ['gladiator', 'assassin'];
// Every map a guide page points at: the four open-world regions, Reshanta and the instanced dungeons.
const MAPS = ['1000', '1010', '1100', '1110', '20', '600001', '600011', '600021', '600031', '600041', '600071', '600091', '600121', '600131', '600141', '600144'];
// Item categories whose details are fetched for cards (materials and consumables).
const DETAIL_CATS = [
  'items/materials',
  'items/consumables/food-and-drink',
  'items/consumables/potions',
  'items/consumables/scrolls',
  'items/consumables/enhancement',
  'items/consumables/designs-and-upgrades',
  'items/growth-materials',
];

const entities = await loadData('data/en/entities.d.json');
const byCat = (c) => entities.filter((e) => e.mainCategoryId === c);
const items = byCat('items');

// ---- what the guides mention -------------------------------------------------------------
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true, recursive: true }))
    if (e.isFile() && e.name.endsWith('.md')) out.push(join(e.parentPath, e.name));
  return out;
}
const text = (await Promise.all((await walk('content/patches')).map((f) => readFile(f, 'utf8')))).join('\n');
const mentioned = (name) => name.length >= 4 && text.includes(name);

// ---- fetch what is missing -------------------------------------------------------------
// Cards for materials and consumables, plus gear and accessories the guides name (crafting paths, expedition drops).
const detailItems = items.filter(
  (i) => i.categories?.[0] && (DETAIL_CATS.some((c) => i.categories[0].startsWith(c)) || (i.categories[0].startsWith('items/gear/') && mentioned(i.name))),
);
const gatherables = byCat('gatherables');
await fetchPaths([
  ...detailItems.map((i) => `data/en/items/${i.id}.d.json`),
  ...gatherables.map((g) => `data/en/gatherables/${g.id}.d.json`),
  ...MAPS.map((m) => `data/en/maps/${m}.d.json`),
]);
const maps = {};
for (const id of MAPS) maps[id] = await loadData(`data/en/maps/${id}.d.json`);
await fetchPaths(Object.values(maps).map((m) => m.interactiveMap.tilePackPath.replace(/^\//, '')));

// ---- icons ---------------------------------------------------------------------------------
const icons = { items: {}, skills: Object.fromEntries(CLASSES.map((c) => [c, {}])), nodes: {}, npcs: {}, classes: {} };
const wanted = new Map(); // key → { path, size }
const want = (iconPath, size = 64) => {
  if (!iconPath) return undefined;
  const key = iconKey(iconPath);
  wanted.set(key, { path: iconPath, size: Math.max(size, wanted.get(key)?.size ?? 0) });
  return key;
};
for (const i of items) if (detailItems.includes(i) || mentioned(i.name)) icons.items[i.name] ??= want(i.iconPath);
for (const s of byCat('skills'))
  for (const c of s.classes ?? []) if (CLASSES.includes(c.code)) icons.skills[c.code][s.name] ??= want(s.iconPath);
for (const g of gatherables) icons.nodes[g.name] ??= want(g.iconPath, 48);
for (const c of byCat('classes')) icons.classes[c.name] = want(c.iconPath, 64);

// ---- item cards --------------------------------------------------------------------------
const spawns = {}; // npc id → { mapId: count }
for (const [mid, m] of Object.entries(maps))
  for (const mk of m.markers ?? []) {
    if (mk.entity?.mainCategoryId !== 'npcs') continue;
    const s = (spawns[mk.entity.id] ??= {});
    s[mid] = (s[mid] ?? 0) + 1;
  }
const RARITY = { common: 'Common', rare: 'Rare', legend: 'Legendary', unique: 'Unique', epic: 'Epic', special: 'Special' };
const cards = {};
for (const it of detailItems) {
  const d = await loadData(`data/en/items/${it.id}.d.json`);
  const drops = new Map();
  const gathers = new Map();
  const dungeons = new Set();
  for (const a of d.acquisition ?? []) {
    if (a.method === 'drop' && a.source?.mainCategoryId === 'npcs') {
      const n = a.source;
      const chance = Math.max(0, ...(a.loot ?? []).flatMap((l) => l.windows.map((w) => w.chancePercent)));
      const row = drops.get(n.id) ?? { npc: n.name, id: n.id, min: n.minimumLevel, max: n.maximumLevel, chance: 0, places: [], spawns: spawns[n.id] ?? {} };
      row.chance = Math.max(row.chance, chance);
      if (a.location) row.places.push(`${a.location.subzoneName}, ${a.location.map.name}`);
      drops.set(n.id, row);
      icons.npcs[n.name] ??= want(n.iconPath, 64);
    } else if (a.method === 'gather') {
      const g = gathers.get(a.source.id) ?? { node: a.source.name, id: a.source.id, places: [] };
      if (a.location) g.places.push(`${a.location.subzoneName}, ${a.location.map.name}`);
      gathers.set(a.source.id, g);
    } else if (a.method === 'activity') dungeons.add(a.source.name);
  }
  const shops = (d.shopOffers ?? []).map((o) => ({
    shop: o.shopName,
    faction: o.faction?.name,
    vendor: o.vendors?.[0]?.name,
    vendorId: o.vendors?.[0]?.id,
    price: o.prices?.map((p) => `${p.amount.toLocaleString('en-US')} ${p.currency.name}`).join(' + '),
  }));
  const recipes = (d.recipes ?? []).map((r) => ({
    profession: r.professionName,
    mastery: r.masteryLevel,
    faction: r.factionName,
    makes: r.product?.quantity ?? 1,
    inputs: (r.ingredients ?? []).map((g) => ({ name: g.item.name, qty: g.quantity })),
  }));
  for (const r of recipes) for (const g of r.inputs) icons.items[g.name] ??= want(items.find((i) => i.name === g.name)?.iconPath);
  cards[it.name] = {
    id: it.id,
    url: `${SITE}/items/${it.id}`,
    icon: icons.items[it.name],
    grade: RARITY[it.rarity] ?? it.rarityName,
    category: it.categories[0].split('/').slice(1).join(' / '),
    tradable: d.trade?.exchange?.code === 'exchangeable',
    drops: [...drops.values()]
      .map((r) => ({ ...r, places: [...new Set(r.places)], score: r.chance * Object.values(r.spawns).reduce((a, b) => a + b, 0) }))
      // Best farm targets first: drop chance × how many of them spawn on the guide's maps.
      .sort((a, b) => b.score - a.score || b.chance - a.chance)
      .slice(0, 25),
    gathers: [...gathers.values()].map((g) => ({ ...g, places: [...new Set(g.places)] })),
    dungeons: [...dungeons],
    shops: dedupe(shops, (s) => `${s.shop}|${s.faction}|${s.price}`),
    recipes,
    usedIn: (d.ingredientFor ?? []).map((r) => r.product?.item?.name).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i),
  };
}
function dedupe(list, key) {
  const seen = new Set();
  return list.filter((x) => !seen.has(key(x)) && seen.add(key(x)));
}

// ---- maps ----------------------------------------------------------------------------------
await mkdir(`${IMG}/maps/o`, { recursive: true });
const mapsOut = {};
const full = {}; // map id → { file, W, H, tx }
for (const [id, m] of Object.entries(maps)) {
  const im = m.interactiveMap;
  const s = slug(m.name);
  const fullFile = cachePath(`full-${s}.webp`);
  const pack = await readFile(cachePath(im.tilePackPath.replace(/^\//, '')));
  const { W, H } = await stitch(pack, fullFile);
  const b = im.bounds;
  const tx = (x, y) => [((x - b.minX) / (b.maxX - b.minX)) * W, ((y - b.minY) / (b.maxY - b.minY)) * H];
  full[id] = { file: fullFile, W, H, tx, name: m.name };
  // Crop the whole-map image to where things are (area centres and markers), not the parchment around it.
  const xs = [], ys = [];
  for (const z of m.subzones ?? []) if (z.center) { const [x, y] = tx(z.center.x, z.center.y); xs.push(x), ys.push(y); }
  for (const mk of m.markers ?? []) { const [x, y] = tx(mk.x, mk.y); xs.push(x), ys.push(y); }
  const padX = W * 0.04, padY = H * 0.04;
  let [cx0, cy0, cx1, cy1] = xs.length
    ? [Math.min(...xs) - padX, Math.min(...ys) - padY, Math.max(...xs) + padX, Math.max(...ys) + padY]
    : [0, 0, W, H];
  [cx0, cy0] = [Math.max(0, Math.round(cx0)), Math.max(0, Math.round(cy0))];
  [cx1, cy1] = [Math.min(W, Math.round(cx1)), Math.min(H, Math.round(cy1))];
  const cw = cx1 - cx0, ch = cy1 - cy0;
  const ow = Math.min(1600, cw);
  const out = `${IMG}/maps/${s}.webp`;
  await sharp(fullFile, { limitInputPixels: false }).extract({ left: cx0, top: cy0, width: cw, height: ch }).resize(ow).webp({ quality: 72 }).toFile(out);
  const k = ow / cw;
  // One label per area name, at the mean of its centres.
  const named = new Map();
  for (const z of m.subzones ?? []) {
    if (!z.center) continue;
    const [x, y] = tx(z.center.x, z.center.y);
    const e = named.get(z.name) ?? { name: z.name, kind: z.kind?.code, xs: [], ys: [] };
    e.xs.push((x - cx0) * k), e.ys.push((y - cy0) * k);
    named.set(z.name, e);
  }
  mapsOut[id] = {
    name: m.name,
    slug: s,
    img: `img/maps/${s}.webp`,
    width: ow,
    height: Math.round(ch * k),
    url: `${SITE}/maps/${id}`,
    subzones: [...named.values()].map((e) => ({
      name: e.name,
      kind: e.kind,
      x: Math.round(e.xs.reduce((a, b) => a + b, 0) / e.xs.length),
      y: Math.round(e.ys.reduce((a, b) => a + b, 0) / e.ys.length),
    })),
  };
}

/** Stitch a .gtpk tile pack (header + index of webp tiles) at the largest zoom ≤ 8192 px. */
async function stitch(d, outFile) {
  const n = d.readUInt32LE(8), tile = d.readUInt32LE(12), maxz = d.readUInt32LE(20);
  const es = d.readUInt32LE(32), hs = d.readUInt32LE(36);
  const W0 = d.readUInt32LE(24), H0 = d.readUInt32LE(28);
  let z = maxz;
  while ((W0 >> (maxz - z)) > 8192) z--;
  const W = W0 >> (maxz - z), H = H0 >> (maxz - z);
  if (await exists(outFile)) return { W, H };
  const tiles = [];
  for (let i = 0; i < n; i++) {
    const o = hs + i * es;
    if (d.readUInt32LE(o) !== z) continue;
    const x = d.readUInt32LE(o + 4), y = d.readUInt32LE(o + 8);
    const off = Number(d.readBigUInt64LE(o + 12)), len = d.readUInt32LE(o + 20);
    tiles.push({ input: d.subarray(off, off + len), left: x * tile, top: y * tile });
  }
  const png = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }, limitInputPixels: false })
    .composite(tiles)
    .png()
    .toBuffer();
  await sharp(png, { limitInputPixels: false }).webp({ quality: 90 }).toFile(outFile);
  return { W, H };
}

// ---- overlays ------------------------------------------------------------------------------
const specFile = `${MEDIA}/overlay-specs.json`;
const specs = (await exists(specFile)) ? JSON.parse(await readFile(specFile, 'utf8')) : [];
const gatherPos = {};
for (const g of gatherables) {
  const d = await loadData(`data/en/gatherables/${g.id}.d.json`);
  for (const pl of d.placements ?? [])
    for (const mp of pl.maps ?? []) for (const p of pl.positions ?? []) ((gatherPos[g.id] ??= {})[mp.id] ??= []).push(p);
}
const overlays = {};
for (const spec of specs) {
  const f = full[spec.map];
  if (!f) throw new Error(`overlay ${spec.id}: map ${spec.map} is not in MAPS`);
  const world = [];
  for (const gid of spec.gatherables ?? []) world.push(...(gatherPos[gid]?.[spec.map] ?? []));
  const npcSet = new Set(spec.npcs ?? []);
  if (npcSet.size) for (const mk of maps[spec.map].markers ?? []) if (npcSet.has(mk.entity?.id)) world.push(mk);
  if (spec.markers) {
    overlays[spec.id] = await drawMarkers(spec, f, world);
    continue;
  }
  for (const p of spec.places ?? []) world.push(p);
  if (!world.length) {
    console.warn(`overlay ${spec.id}: no points on map ${spec.map}`);
    continue;
  }
  overlays[spec.id] = await renderOverlay(spec, f, world.map((p) => f.tx(p.x, p.y)), maps[spec.map]);
}

async function renderOverlay(spec, f, pts, map) {
  // Group points into areas: a grid of cells, joined when cells touch (one empty cell allowed).
  for (const div of [64, 96, 128, 192]) {
    const res = clusterAreas(pts, Math.max(f.W, f.H) / div);
    const top = res.areas[0];
    const spread = Math.max(...top.cells.map((c) => c[0])) - Math.min(...top.cells.map((c) => c[0]));
    // Prefer a grid where the best area is a spot, not most of the map.
    if (div === 192 || (top.n < pts.length * 0.6 && spread < f.W / 4)) return drawOverlay(spec, f, pts, map, res);
  }
}

function clusterAreas(pts, cell) {
  const cells = new Map();
  for (const [x, y] of pts) {
    const k = `${Math.floor(x / cell)},${Math.floor(y / cell)}`;
    const c = cells.get(k) ?? { n: 0, sx: 0, sy: 0 };
    c.n++, (c.sx += x), (c.sy += y);
    cells.set(k, c);
  }
  const seen = new Set();
  const areas = [];
  for (const k of cells.keys()) {
    if (seen.has(k)) continue;
    const stack = [k];
    const members = [];
    seen.add(k);
    while (stack.length) {
      const cur = stack.pop();
      members.push(cur);
      const [cx, cy] = cur.split(',').map(Number);
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++) {
          const nk = `${cx + dx},${cy + dy}`;
          if (cells.has(nk) && !seen.has(nk)) seen.add(nk), stack.push(nk);
        }
    }
    const cs = members.map((m) => cells.get(m));
    const n = cs.reduce((a, c) => a + c.n, 0);
    const cx = cs.reduce((a, c) => a + c.sx, 0) / n, cy = cs.reduce((a, c) => a + c.sy, 0) / n;
    // Route stops: the area's points regrouped on a coarser grid, so a loop has about ten stops.
    const pointsHere = cs.flatMap((c) => [[c.sx / c.n, c.sy / c.n, c.n]]);
    const span = Math.max(...pointsHere.map((p) => p[0])) - Math.min(...pointsHere.map((p) => p[0])) + Math.max(...pointsHere.map((p) => p[1])) - Math.min(...pointsHere.map((p) => p[1]));
    const coarse = Math.max(cell, span / 6);
    const g = new Map();
    for (const [x, y, w] of pointsHere) {
      const k = `${Math.floor(x / coarse)},${Math.floor(y / coarse)}`;
      const s = g.get(k) ?? [0, 0, 0];
      (s[0] += x * w), (s[1] += y * w), (s[2] += w);
      g.set(k, s);
    }
    const stops = [...g.values()].map(([x, y, w]) => [x / w, y / w, w]);
    areas.push({ n, cx, cy, stops, cells: pointsHere });
  }
  areas.sort((a, b) => b.n - a.n);
  return { areas, cell };
}

async function drawOverlay(spec, f, pts, map, { areas, cell }) {
  const shown = areas.slice(0, spec.areas ?? 3).filter((a, i) => i === 0 || a.n >= Math.max(3, areas[0].n * 0.15));
  // Crop to the shown areas, padded, at least a sixth of the map wide.
  const inShown = (x, y) => shown.some((a) => a.cells.some(([sx, sy]) => Math.hypot(sx - x, sy - y) < cell * 1.5));
  const sel = pts.filter(([x, y]) => inShown(x, y));
  let [x0, y0, x1, y1] = [Math.min(...sel.map((p) => p[0])), Math.min(...sel.map((p) => p[1])), Math.max(...sel.map((p) => p[0])), Math.max(...sel.map((p) => p[1]))];
  const minSide = Math.max(f.W, f.H) / 6;
  const pad = Math.max(x1 - x0, y1 - y0) * 0.12 + cell;
  [x0, y0, x1, y1] = [x0 - pad, y0 - pad, x1 + pad, y1 + pad];
  for (const [a, b] of [[0, 2], [1, 3]]) {
    const box = [x0, y0, x1, y1];
    const side = box[b] - box[a];
    if (side < minSide) (box[a] -= (minSide - side) / 2), (box[b] += (minSide - side) / 2);
    [x0, y0, x1, y1] = box;
  }
  x0 = Math.max(0, Math.round(x0)), y0 = Math.max(0, Math.round(y0));
  x1 = Math.min(f.W, Math.round(x1)), y1 = Math.min(f.H, Math.round(y1));
  const cw = x1 - x0, ch = y1 - y0;
  const outW = Math.min(960, cw);
  const k = outW / cw;
  const P = ([x, y]) => [Math.round((x - x0) * k), Math.round((y - y0) * k)];
  const file = `${IMG}/maps/o/${spec.id}.webp`;
  await sharp(f.file, { limitInputPixels: false }).extract({ left: x0, top: y0, width: cw, height: ch }).resize(outW).webp({ quality: 74 }).toFile(file);
  const zones = (map.subzones ?? []).filter((z) => z.center && z.kind?.code !== 'village').map((z) => ({ name: z.name, p: f.tx(z.center.x, z.center.y) }));
  const used = new Set();
  const zoneOf = (x, y) => {
    const near = (list) => list.map((z) => ({ ...z, d: Math.hypot(z.p[0] - x, z.p[1] - y) })).sort((a, b) => a.d - b.d)[0];
    const any = near(zones.filter((z) => !used.has(z.name))) ?? near(zones);
    // Prefer an area the game data lists for these spawns, unless it is clearly farther away.
    const listed = spec.zones?.length ? near(zones.filter((z) => spec.zones.includes(z.name) && !used.has(z.name))) : undefined;
    const pick = listed && any && listed.d <= Math.max(2 * any.d, cell * 4) ? listed : any;
    if (pick) used.add(pick.name);
    return pick?.name;
  };
  return {
    map: spec.map,
    mapName: f.name,
    title: spec.title,
    img: `img/maps/o/${spec.id}.webp`,
    width: outW,
    height: Math.round(ch * k),
    points: pts.filter(([x, y]) => x >= x0 && x <= x1 && y >= y0 && y <= y1).map(P),
    areas: shown.map((a, i) => {
      const r = Math.max(cell * 0.8, ...a.cells.map(([sx, sy]) => Math.hypot(sx - a.cx, sy - a.cy))) + cell * 0.5;
      const [x, y] = P([a.cx, a.cy]);
      return { label: i === 0 ? 'Best spot' : `Alternative ${i}`, x, y, r: Math.round(r * k), count: a.n, zone: zoneOf(a.cx, a.cy) };
    }),
    route: tour(shown[0].stops).map(P),
  };
}

/** Named markers (field bosses, merchants): one labelled dot per entity, no areas or route. */
async function drawMarkers(spec, f, world) {
  const byName = new Map();
  for (const p of world) {
    const name = p.entity?.name ?? p.name ?? '';
    if (!byName.has(name)) byName.set(name, f.tx(p.x, p.y));
  }
  const pts = [...byName.values()];
  const pad = Math.max(f.W, f.H) / 20;
  let x0 = Math.max(0, Math.min(...pts.map((p) => p[0])) - pad), y0 = Math.max(0, Math.min(...pts.map((p) => p[1])) - pad);
  let x1 = Math.min(f.W, Math.max(...pts.map((p) => p[0])) + pad), y1 = Math.min(f.H, Math.max(...pts.map((p) => p[1])) + pad);
  [x0, y0, x1, y1] = [x0, y0, x1, y1].map(Math.round);
  const cw = x1 - x0, ch = y1 - y0, outW = Math.min(1100, cw), k = outW / cw;
  const P = ([x, y]) => [Math.round((x - x0) * k), Math.round((y - y0) * k)];
  await sharp(f.file, { limitInputPixels: false }).extract({ left: x0, top: y0, width: cw, height: ch }).resize(outW).webp({ quality: 74 }).toFile(`${IMG}/maps/o/${spec.id}.webp`);
  return {
    map: spec.map, mapName: f.name, title: spec.title, img: `img/maps/o/${spec.id}.webp`, width: outW, height: Math.round(ch * k),
    points: [], areas: [], route: [],
    labels: [...byName.entries()].map(([text, p]) => { const [x, y] = P(p); return { x, y, text }; }),
  };
}

/** Nearest-neighbour loop through an area's cell centres, starting from the densest cell. */
function tour(stops) {
  const left = [...stops].sort((a, b) => b[2] - a[2]);
  const path = [left.shift()];
  while (left.length) {
    const [x, y] = path.at(-1);
    let bi = 0;
    left.forEach((s, i) => {
      if (Math.hypot(s[0] - x, s[1] - y) < Math.hypot(left[bi][0] - x, left[bi][1] - y)) bi = i;
    });
    path.push(left.splice(bi, 1)[0]);
  }
  if (path.length > 2) path.push(path[0]);
  return path.map(([x, y]) => [x, y]);
}

// ---- download icons -----------------------------------------------------------------------
await mkdir(`${IMG}/icons`, { recursive: true });
let fetched = 0;
for (const [key, { path, size }] of wanted) {
  const out = `${IMG}/icons/${key}.webp`;
  if (await exists(out)) continue;
  const r = await fetch(`${CDN}${path}`);
  if (!r.ok) {
    console.warn(`icon ${key}: HTTP ${r.status}`);
    continue;
  }
  await sharp(Buffer.from(await r.arrayBuffer())).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 82 }).toFile(out);
  fetched++;
}
// Drop entries whose icon could not be downloaded.
const have = new Set((await readdir(`${IMG}/icons`)).map((f) => f.replace(/\.webp$/, '')));
const prune = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v && have.has(v)).sort(([a], [b]) => a.localeCompare(b)));
icons.items = prune(icons.items);
icons.nodes = prune(icons.nodes);
icons.npcs = prune(icons.npcs);
icons.classes = prune(icons.classes);
for (const c of CLASSES) icons.skills[c] = prune(icons.skills[c]);

await writeJson(`${MEDIA}/icons.json`, icons);
await writeJson(`${MEDIA}/items.json`, Object.fromEntries(Object.entries(cards).sort(([a], [b]) => a.localeCompare(b))));
await writeJson(`${MEDIA}/maps.json`, mapsOut);
await writeJson(`${MEDIA}/overlays.json`, overlays);
console.log(`icons: ${wanted.size} wanted, ${fetched} downloaded; items: ${Object.keys(cards).length}; maps: ${Object.keys(mapsOut).length}; overlays: ${Object.keys(overlays).length}`);
