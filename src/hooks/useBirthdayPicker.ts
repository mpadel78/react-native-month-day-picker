import { useState, useCallback, useMemo } from 'react';
import type {
  BirthdayValue,
  UseBirthdayPickerOptions,
  UseBirthdayPickerReturn,
} from '../types';
import { DEFAULT_BIRTHDAY_VALUE } from '../constants';
import {
  getDaysInMonth,
  clampDay,
  isValidBirthday,
  normalizeBirthday,
} from '../utils/dateUtils';

/**
 * Hook for managing birthday picker state
 *
 * @param options - Configuration options
 * @returns State and handlers for birthday picker
 *
 * @example
 * ```tsx
 * const { value, setMonth, setDay, daysInMonth } = useBirthdayPicker({
 *   initialValue: { month: 6, day: 15 },
 * });
 * ```
 */
export function useBirthdayPicker(
  options: UseBirthdayPickerOptions = {}
): UseBirthdayPickerReturn {
  const { initialValue = DEFAULT_BIRTHDAY_VALUE, allowLeapDay = true } =
    options;

  // Normalize the initial value
  const normalizedInitial = useMemo(
    () => normalizeBirthday(initialValue, allowLeapDay),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // Only compute once on mount
  );

  const [value, setValueInternal] = useState<BirthdayValue>(normalizedInitial);

  /**
   * Set the month, clamping the day if necessary
   */
  const setMonth = useCallback(
    (month: number) => {
      setValueInternal((prev) => {
        const clampedMonth = Math.max(1, Math.min(month, 12));
        const clampedDay = clampDay(prev.day, clampedMonth, allowLeapDay);
        return { month: clampedMonth, day: clampedDay };
      });
    },
    [allowLeapDay]
  );

  /**
   * Set the day, clamping to valid range for current month
   */
  const setDay = useCallback(
    (day: number) => {
      setValueInternal((prev) => {
        const clampedDay = clampDay(day, prev.month, allowLeapDay);
        return { ...prev, day: clampedDay };
      });
    },
    [allowLeapDay]
  );

  /**
   * Set the entire value, normalizing both month and day
   */
  const setValue = useCallback(
    (newValue: BirthdayValue) => {
      setValueInternal(normalizeBirthday(newValue, allowLeapDay));
    },
    [allowLeapDay]
  );

  /**
   * Number of days in the currently selected month
   */
  const daysInMonth = useMemo(
    () => getDaysInMonth(value.month, allowLeapDay),
    [value.month, allowLeapDay]
  );

  /**
   * Whether the current value is valid
   */
  const isValid = useMemo(
    () => isValidBirthday(value, allowLeapDay),
    [value, allowLeapDay]
  );

  return {
    value,
    setMonth,
    setDay,
    setValue,
    daysInMonth,
    isValid,
  };
}

export default useBirthdayPicker;
