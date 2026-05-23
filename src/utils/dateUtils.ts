import {
  DAYS_IN_MONTH,
  FEBRUARY,
  LEAP_DAY,
  MONTHS_IN_YEAR,
} from '../constants';
import type { BirthdayValue } from '../types';

/**
 * Get the number of days in a given month
 * @param month - Month (1-12)
 * @param allowLeapDay - Whether to allow Feb 29
 * @returns Number of days in the month
 */
export function getDaysInMonth(month: number, allowLeapDay = true): number {
  if (month < 1 || month > MONTHS_IN_YEAR) {
    throw new Error(`Invalid month: ${month}. Must be between 1 and 12.`);
  }

  if (month === FEBRUARY && allowLeapDay) {
    return LEAP_DAY;
  }

  return DAYS_IN_MONTH[month];
}

/**
 * Clamp a day value to be valid for a given month
 * @param day - Day to clamp
 * @param month - Month (1-12)
 * @param allowLeapDay - Whether to allow Feb 29
 * @returns Clamped day value
 */
export function clampDay(
  day: number,
  month: number,
  allowLeapDay = true
): number {
  const maxDays = getDaysInMonth(month, allowLeapDay);
  return Math.max(1, Math.min(day, maxDays));
}

/**
 * Check if a birthday value is valid
 * @param value - Birthday value to validate
 * @param allowLeapDay - Whether to allow Feb 29
 * @returns Whether the value is valid
 */
export function isValidBirthday(
  value: BirthdayValue,
  allowLeapDay = true
): boolean {
  const { month, day } = value;

  // Check month range
  if (month < 1 || month > MONTHS_IN_YEAR) {
    return false;
  }

  // Check day range
  const maxDays = getDaysInMonth(month, allowLeapDay);
  if (day < 1 || day > maxDays) {
    return false;
  }

  return true;
}

/**
 * Generate an array of day numbers for a given month
 * @param month - Month (1-12)
 * @param allowLeapDay - Whether to allow Feb 29
 * @returns Array of day numbers [1, 2, 3, ..., n]
 */
export function getDaysArray(month: number, allowLeapDay = true): number[] {
  const maxDays = getDaysInMonth(month, allowLeapDay);
  return Array.from({ length: maxDays }, (_, i) => i + 1);
}

/**
 * Generate an array of month numbers
 * @returns Array of month numbers [1, 2, 3, ..., 12]
 */
export function getMonthsArray(): number[] {
  return Array.from({ length: MONTHS_IN_YEAR }, (_, i) => i + 1);
}

/**
 * Normalize a birthday value to ensure it's valid
 * @param value - Birthday value to normalize
 * @param allowLeapDay - Whether to allow Feb 29
 * @returns Normalized birthday value
 */
export function normalizeBirthday(
  value: BirthdayValue,
  allowLeapDay = true
): BirthdayValue {
  const month = Math.max(1, Math.min(value.month, MONTHS_IN_YEAR));
  const day = clampDay(value.day, month, allowLeapDay);
  return { month, day };
}
