import { describe, expect, it } from 'vitest';
import { withBase } from './url';

describe('withBase', () => {
  it('joins root base', () => {
    expect(withBase('/classes/gladiator', '/')).toBe('/classes/gladiator');
  });
  it('joins a repo base with or without trailing slash', () => {
    expect(withBase('classes', '/aion2-guides')).toBe('/aion2-guides/classes');
    expect(withBase('/classes', '/aion2-guides/')).toBe('/aion2-guides/classes');
  });
});
