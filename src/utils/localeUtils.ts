import {
  MONTHS_IN_YEAR,
  DEFAULT_LOCALE,
  DEFAULT_MONTH_FORMAT,
} from '../constants';
import type { MonthFormat } from '../types';

/**
 * Cache for month names to avoid repeated Intl.DateTimeFormat calls
 */
const monthNamesCache = new Map<string, string[]>();

/**
 * Generate a cache key for month names
 */
function getCacheKey(locale: string, format: MonthFormat): string {
  return `${locale}-${format}`;
}

/**
 * Get month names for a given locale and format
 * @param locale - BCP 47 locale string (e.g., 'en-US', 'ja-JP')
 * @param format - Format for month names ('long', 'short', 'numeric')
 * @returns Array of month names/numbers (1-indexed, index 0 is empty string)
 */
export function getMonthNames(
  locale: string = DEFAULT_LOCALE,
  format: MonthFormat = DEFAULT_MONTH_FORMAT
): string[] {
  const cacheKey = getCacheKey(locale, format);

  // Return cached result if available
  if (monthNamesCache.has(cacheKey)) {
    return monthNamesCache.get(cacheKey)!;
  }

  const names: string[] = [''];

  if (format === 'numeric') {
    // For numeric format, just use month numbers
    for (let i = 1; i <= MONTHS_IN_YEAR; i++) {
      names.push(String(i));
    }
  } else {
    // Use Intl.DateTimeFormat for localized month names
    const formatter = new Intl.DateTimeFormat(locale, { month: format });

    for (let i = 0; i < MONTHS_IN_YEAR; i++) {
      // Create a date in month i (0-indexed for Date constructor)
      const date = new Date(2024, i, 1);
      names.push(formatter.format(date));
    }
  }

  // Cache the result
  monthNamesCache.set(cacheKey, names);

  return names;
}

/**
 * Format a single month number to a localized string
 * @param month - Month number (1-12)
 * @param locale - BCP 47 locale string
 * @param format - Format for month name
 * @returns Formatted month name
 */
export function formatMonth(
  month: number,
  locale: string = DEFAULT_LOCALE,
  format: MonthFormat = DEFAULT_MONTH_FORMAT
): string {
  if (month < 1 || month > MONTHS_IN_YEAR) {
    throw new Error(`Invalid month: ${month}. Must be between 1 and 12.`);
  }

  const names = getMonthNames(locale, format);
  return names[month];
}

/**
 * Format a day number with optional locale-specific formatting
 * @param day - Day number (1-31)
 * @param locale - BCP 47 locale string (currently unused, for future i18n)
 * @returns Formatted day string
 */
export function formatDay(
  day: number,
  locale: string = DEFAULT_LOCALE
): string {
  return new Intl.NumberFormat(locale).format(day);
}

/**
 * Clear the month names cache (useful for testing)
 */
export function clearMonthNamesCache(): void {
  monthNamesCache.clear();
}
