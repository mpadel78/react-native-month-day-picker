import {
  getMonthNames,
  formatMonth,
  formatDay,
  clearMonthNamesCache,
} from '../src/utils/localeUtils';

describe('localeUtils', () => {
  beforeEach(() => {
    clearMonthNamesCache();
  });

  describe('getMonthNames', () => {
    it('returns 13 items (index 0 empty + 12 months)', () => {
      const names = getMonthNames('en-US', 'long');
      expect(names).toHaveLength(13);
      expect(names[0]).toBe('');
    });

    it('returns correct month names for en-US long format', () => {
      const names = getMonthNames('en-US', 'long');
      expect(names[1]).toBe('January');
      expect(names[6]).toBe('June');
      expect(names[12]).toBe('December');
    });

    it('returns correct month names for en-US short format', () => {
      const names = getMonthNames('en-US', 'short');
      expect(names[1]).toBe('Jan');
      expect(names[6]).toBe('Jun');
      expect(names[12]).toBe('Dec');
    });

    it('returns numeric values for numeric format', () => {
      const names = getMonthNames('en-US', 'numeric');
      expect(names[1]).toBe('1');
      expect(names[6]).toBe('6');
      expect(names[12]).toBe('12');
    });

    it('caches results for same locale and format', () => {
      const names1 = getMonthNames('en-US', 'long');
      const names2 = getMonthNames('en-US', 'long');
      expect(names1).toBe(names2); // Same reference
    });

    it('returns different results for different formats', () => {
      const long = getMonthNames('en-US', 'long');
      const short = getMonthNames('en-US', 'short');
      expect(long[1]).not.toBe(short[1]);
    });

    it('works with different locales', () => {
      const englishNames = getMonthNames('en-US', 'long');
      const germanNames = getMonthNames('de-DE', 'long');

      // German has different month names
      expect(englishNames[1]).toBe('January');
      expect(germanNames[1]).toBe('Januar');
    });

    it('uses default locale and format when not specified', () => {
      const names = getMonthNames();
      expect(names[1]).toBe('January');
    });
  });

  describe('formatMonth', () => {
    it('formats month correctly for long format', () => {
      expect(formatMonth(1, 'en-US', 'long')).toBe('January');
      expect(formatMonth(12, 'en-US', 'long')).toBe('December');
    });

    it('formats month correctly for short format', () => {
      expect(formatMonth(1, 'en-US', 'short')).toBe('Jan');
      expect(formatMonth(12, 'en-US', 'short')).toBe('Dec');
    });

    it('formats month correctly for numeric format', () => {
      expect(formatMonth(1, 'en-US', 'numeric')).toBe('1');
      expect(formatMonth(12, 'en-US', 'numeric')).toBe('12');
    });

    it('throws error for invalid month', () => {
      expect(() => formatMonth(0, 'en-US', 'long')).toThrow('Invalid month: 0');
      expect(() => formatMonth(13, 'en-US', 'long')).toThrow(
        'Invalid month: 13'
      );
    });

    it('uses default locale and format', () => {
      expect(formatMonth(1)).toBe('January');
    });
  });

  describe('formatDay', () => {
    it('returns day as string', () => {
      expect(formatDay(1)).toBe('1');
      expect(formatDay(15)).toBe('15');
      expect(formatDay(31)).toBe('31');
    });
  });
});
