import { describe, expect, it } from 'vitest';
import { BREA_LAUNCH_DESTINATION, BREA_SCREENSHOTS, BREA_TOUR_DESTINATION, TOUR_STEPS } from './brea-tour';

describe('Brea introduction boundaries', () => {
  it('keeps the campaign introduction separate from the existing app launch', () => {
    expect(BREA_TOUR_DESTINATION).toBe('/how-brea-works');
    expect(BREA_LAUNCH_DESTINATION).toBe('/brea');
  });
  it('contains four ordered steps with five genuine-upload slots, not invented screenshots', () => {
    expect(TOUR_STEPS.map(step => step.id)).toEqual(['01', '02', '03', '04']);
    expect(TOUR_STEPS.flatMap(step => [...step.slots])).toEqual(['brea-welcome', 'brea-pathways', 'brea-learning', 'brea-community', 'brea-find-care']);
    expect(Object.values(BREA_SCREENSHOTS).every(slot => slot.image === undefined)).toBe(true);
  });
});