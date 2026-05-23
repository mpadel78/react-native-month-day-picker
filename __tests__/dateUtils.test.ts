import {
  getDaysInMonth,
  clampDay,
  isValidBirthday,
  getDaysArray,
  getMonthsArray,
  normalizeBirthday,
} from '../src/utils/dateUtils';

describe('dateUtils', () => {
  describe('getDaysInMonth', () => {
    it('returns 31 for January', () => {
      expect(getDaysInMonth(1)).toBe(31);
    });

    it('returns 29 for February when allowLeapDay is true', () => {
      expect(getDaysInMonth(2, true)).toBe(29);
    });

    it('returns 28 for February when allowLeapDay is false', () => {
      expect(getDaysInMonth(2, false)).toBe(28);
    });

    it('returns 30 for April', () => {
      expect(getDaysInMonth(4)).toBe(30);
    });

    it('returns 31 for December', () => {
      expect(getDaysInMonth(12)).toBe(31);
    });

    it('throws error for invalid month 0', () => {
      expect(() => getDaysInMonth(0)).toThrow('Invalid month: 0');
    });

    it('throws error for invalid month 13', () => {
      expect(() => getDaysInMonth(13)).toThrow('Invalid month: 13');
    });

    const expectedDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    expectedDays.forEach((days, index) => {
      const month = index + 1;
      it(`returns ${days} for month ${month}`, () => {
        expect(getDaysInMonth(month, true)).toBe(days);
      });
    });
  });

  describe('clampDay', () => {
    it('clamps day to max when exceeds month days', () => {
      expect(clampDay(31, 4)).toBe(30); // April has 30 days
    });

    it('clamps day to 29 for Feb with leap day', () => {
      expect(clampDay(31, 2, true)).toBe(29);
    });

    it('clamps day to 28 for Feb without leap day', () => {
      expect(clampDay(31, 2, false)).toBe(28);
    });

    it('returns same day if within range', () => {
      expect(clampDay(15, 1)).toBe(15);
    });

    it('clamps day to 1 if less than 1', () => {
      expect(clampDay(0, 1)).toBe(1);
      expect(clampDay(-5, 1)).toBe(1);
    });

    it('handles edge case of exactly max days', () => {
      expect(clampDay(31, 1)).toBe(31);
      expect(clampDay(30, 4)).toBe(30);
    });
  });

  describe('isValidBirthday', () => {
    it('returns true for valid birthday', () => {
      expect(isValidBirthday({ month: 6, day: 15 })).toBe(true);
    });

    it('returns true for Feb 29 with leap day', () => {
      expect(isValidBirthday({ month: 2, day: 29 }, true)).toBe(true);
    });

    it('returns false for Feb 29 without leap day', () => {
      expect(isValidBirthday({ month: 2, day: 29 }, false)).toBe(false);
    });

    it('returns false for invalid month', () => {
      expect(isValidBirthday({ month: 0, day: 1 })).toBe(false);
      expect(isValidBirthday({ month: 13, day: 1 })).toBe(false);
    });

    it('returns false for invalid day', () => {
      expect(isValidBirthday({ month: 1, day: 0 })).toBe(false);
      expect(isValidBirthday({ month: 1, day: 32 })).toBe(false);
      expect(isValidBirthday({ month: 4, day: 31 })).toBe(false);
    });

    it('returns true for edge cases', () => {
      expect(isValidBirthday({ month: 1, day: 1 })).toBe(true);
      expect(isValidBirthday({ month: 12, day: 31 })).toBe(true);
    });
  });

  describe('getDaysArray', () => {
    it('returns array of days for January', () => {
      const days = getDaysArray(1);
      expect(days).toHaveLength(31);
      expect(days[0]).toBe(1);
      expect(days[30]).toBe(31);
    });

    it('returns 29 days for February with leap day', () => {
      const days = getDaysArray(2, true);
      expect(days).toHaveLength(29);
    });

    it('returns 28 days for February without leap day', () => {
      const days = getDaysArray(2, false);
      expect(days).toHaveLength(28);
    });

    it('returns 30 days for April', () => {
      const days = getDaysArray(4);
      expect(days).toHaveLength(30);
    });
  });

  describe('getMonthsArray', () => {
    it('returns array of 12 months', () => {
      const months = getMonthsArray();
      expect(months).toHaveLength(12);
      expect(months[0]).toBe(1);
      expect(months[11]).toBe(12);
    });
  });

  describe('normalizeBirthday', () => {
    it('returns same value for valid birthday', () => {
      const input = { month: 6, day: 15 };
      expect(normalizeBirthday(input)).toEqual(input);
    });

    it('clamps month to valid range', () => {
      expect(normalizeBirthday({ month: 0, day: 15 })).toEqual({
        month: 1,
        day: 15,
      });
      expect(normalizeBirthday({ month: 15, day: 15 })).toEqual({
        month: 12,
        day: 15,
      });
    });

    it('clamps day when exceeds month maximum', () => {
      expect(normalizeBirthday({ month: 4, day: 31 })).toEqual({
        month: 4,
        day: 30,
      });
    });

    it('handles Feb 29 with allowLeapDay', () => {
      expect(normalizeBirthday({ month: 2, day: 29 }, true)).toEqual({
        month: 2,
        day: 29,
      });
      expect(normalizeBirthday({ month: 2, day: 29 }, false)).toEqual({
        month: 2,
        day: 28,
      });
    });
  });
});
