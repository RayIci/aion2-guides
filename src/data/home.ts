// Content for the home page. Facts come from the research (ticket 10) and cite registry ids;
// the page derives every grade from those sources, so nothing here states a confidence by hand.

export interface ClassEntry {
  name: string;
  /** Weapon type, from the official skins notice (nc-global-skins-2026-10). */
  weapon: string;
  status: 'writing' | 'later';
  image: string;
  /** What the museum picture shows, for alt text and the caption. */
  picture: string;
}

export const WEAPON_SOURCE = 'nc-global-skins-2026-10';

export const CLASSES: ClassEntry[] = [
  { name: 'Gladiator', weapon: 'Greatsword', status: 'writing', image: 'two-handed-sword.jpg', picture: 'Two-handed sword, German, 1580–1600' },
  { name: 'Assassin', weapon: 'Dagger', status: 'writing', image: 'dagger.jpg', picture: 'Dagger, Turkish, 16th century' },
  { name: 'Templar', weapon: 'Longsword', status: 'later', image: 'hand-and-a-half-sword.jpg', picture: 'Hand-and-a-half sword, German (Passau), c. 1520' },
  { name: 'Ranger', weapon: 'Bow', status: 'later', image: 'bow.jpg', picture: 'Bow, Italian or Indo-Persian, c. 1500' },
  { name: 'Sorcerer', weapon: 'Spellbook', status: 'later', image: 'book-of-hours.jpg', picture: 'Book of Hours, Gilles Hardouyn, 1518–21' },
  { name: 'Spiritmaster', weapon: 'Orb', status: 'later', image: 'celestial-globe.jpg', picture: 'Mechanical celestial globe, French goldsmith, after 1565' },
  { name: 'Cleric', weapon: 'Mace', status: 'later', image: 'mace.jpg', picture: 'Mace, Italian, 1575–1600' },
  { name: 'Chanter', weapon: 'Staff', status: 'later', image: 'crozier.jpg', picture: 'Crozier, Italian, 14th century' },
];

export interface ClaimSlip {
  claim: string;
  sources: string[];
  /** A second statement from sources that disagree; turns the slip into a conflict. */
  against?: { claim: string; sources: string[] };
}

export const CLAIMS: ClaimSlip[] = [
  { claim: 'You can store at most 7 hours of Abyss entry time.', sources: ['nc-global-notes-2026-10-14'] },
  { claim: 'Stigma slot 1 opens at level 22, slot 2 at level 27.', sources: ['gamingtools-character-levels-2026-10'] },
  {
    claim: 'Krao Cave opens at level 22.',
    sources: ['gamingtools-navigator-2026-10'],
    against: { claim: 'Krao Cave opens at level 20.', sources: ['playnews-level-cap-2026-09'] },
  },
  { claim: 'Max level on Global is 45.', sources: ['playnews-level-cap-2026-09', 'fextralife-regions-2026-10'] },
  { claim: 'The Ludra raid was pulled from the launch build.', sources: ['nc-global-sanctuary-ludra-2026-10'] },
  { claim: 'There is no Heroic gear in Global Season 1.', sources: ['playnews-level-cap-2026-09'] },
];

export interface SheetGroup {
  name: string;
  items: { what: string; note?: string }[];
}

/** The guide-relevant lines of each patch's official notes, keyed by patch id. */
export const PATCH_SHEETS: Record<string, { source: string; groups: SheetGroup[]; until?: string }> = {
  '2026-10-14-halloween': {
    source: 'nc-global-notes-2026-10-14',
    until: 'The Halloween event runs until the Nov. 3 (PST) / Nov. 4 (CET) maintenance.',
    groups: [
      {
        name: 'Abyss',
        items: [
          { what: 'Stored entry time is now capped at 7 hours' },
          { what: 'Two Season Missions now give Abyss Entry Stones', note: '“Spend 1 Hour in the Abyss” and “Defeat Guardian Lord Nahma Once”' },
          { what: 'Less stutter in large Abyss battles' },
        ],
      },
      {
        name: 'Battlefield',
        items: [{ what: 'Standard stats adjusted so fights last longer' }],
      },
      {
        name: 'Economy',
        items: [
          { what: 'Gathering materials: market listing limited by play history' },
          { what: 'Odyle Energy (Bound): weekly limit 4 → 20 per character', note: 'The 16-per-server limit is gone' },
          { what: 'Daily Dungeon clear tickets and Soul Crystals move to Substance Morph' },
        ],
      },
      {
        name: 'Classes',
        items: [
          { what: 'Spiritmaster: Summon: Ancient Spirit fixed' },
          { what: 'Sorcerer: Fire Wall, Cold Storm, Bittercold Wind fixed' },
          { what: 'Gladiator and Assassin: no changes' },
        ],
      },
    ],
  },
};
