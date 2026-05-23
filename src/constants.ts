import type { BirthdayValue, MonthFormat } from './types';

/**
 * Default birthday value (January 1st)
 */
export const DEFAULT_BIRTHDAY_VALUE: BirthdayValue = {
  month: 1,
  day: 1,
};

/**
 * Default locale for month formatting
 */
export const DEFAULT_LOCALE = 'en-US';

/**
 * Default month format
 */
export const DEFAULT_MONTH_FORMAT: MonthFormat = 'long';

/**
 * Default item height in pixels
 */
export const DEFAULT_ITEM_HEIGHT = 40;

/**
 * Default number of visible items
 */
export const DEFAULT_VISIBLE_ITEMS = 5;

/**
 * Days in each month (1-indexed, index 0 is unused)
 * February is set to 28, leap day handling is separate
 */
export const DAYS_IN_MONTH: readonly number[] = [
  0, // Index 0 unused
  31, // January
  28, // February (leap day handled separately)
  31, // March
  30, // April
  31, // May
  30, // June
  31, // July
  31, // August
  30, // September
  31, // October
  30, // November
  31, // December
];

/**
 * Number of months in a year
 */
export const MONTHS_IN_YEAR = 12;

/**
 * February month number
 */
export const FEBRUARY = 2;

/**
 * Leap day (Feb 29)
 */
export const LEAP_DAY = 29;
