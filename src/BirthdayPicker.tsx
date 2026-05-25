import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import WheelPicker from '@quidone/react-native-wheel-picker';
import type { BirthdayPickerProps, BirthdayValue } from './types';
import {
  DEFAULT_BIRTHDAY_VALUE,
  DEFAULT_LOCALE,
  DEFAULT_MONTH_FORMAT,
  DEFAULT_ITEM_HEIGHT,
  DEFAULT_VISIBLE_ITEMS,
} from './constants';
import {
  getDaysArray,
  getMonthsArray,
  clampDay,
  getDaysInMonth,
} from './utils/dateUtils';
import { getMonthNames, formatDay } from './utils/localeUtils';

/**
 * Item type for wheel picker
 */
interface WheelItem {
  value: number;
  label: string;
}

/**
 * A birthday picker component that allows selecting month and day.
 * Does not include year for privacy-friendly birthday selection.
 *
 * @example
 * ```tsx
 * // Uncontrolled mode
 * <BirthdayPicker
 *   defaultValue={{ month: 6, day: 15 }}
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // Controlled mode
 * const [birthday, setBirthday] = useState({ month: 1, day: 1 });
 * <BirthdayPicker
 *   value={birthday}
 *   onChange={setBirthday}
 * />
 * ```
 */
export function BirthdayPicker({
  value: controlledValue,
  defaultValue = DEFAULT_BIRTHDAY_VALUE,
  onChange,
  locale = DEFAULT_LOCALE,
  monthFormat = DEFAULT_MONTH_FORMAT,
  allowLeapDay = true,
  disabled = false,
  testID,
  style,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  visibleItems = DEFAULT_VISIBLE_ITEMS,
  monthAccessibilityLabel = 'Month picker',
  dayAccessibilityLabel = 'Day picker',
}: BirthdayPickerProps): React.ReactElement {
  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledValue !== undefined;

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState<BirthdayValue>(
    () => controlledValue ?? defaultValue
  );

  // The actual value to display
  const value = isControlled ? controlledValue : internalValue;

  // Track previous month to detect changes for day clamping
  const prevMonthRef = useRef(value.month);

  // Get month names based on locale and format
  const monthNames = useMemo(
    () => getMonthNames(locale, monthFormat),
    [locale, monthFormat]
  );

  // Generate month items for wheel picker
  const monthItems: WheelItem[] = useMemo(() => {
    return getMonthsArray().map((month) => ({
      value: month,
      label: monthNames[month],
    }));
  }, [monthNames]);

  // Generate day items based on selected month
  const dayItems: WheelItem[] = useMemo(() => {
    return getDaysArray(value.month, allowLeapDay).map((day) => ({
      value: day,
      label: formatDay(day, locale),
    }));
  }, [value.month, allowLeapDay, locale]);

  // Handle internal value changes
  const handleValueChange = useCallback(
    (newValue: BirthdayValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  // Handle month change
  const handleMonthChange = useCallback(
    ({ item }: { item: WheelItem }) => {
      const newMonth = item.value;
      const clampedDay = clampDay(value.day, newMonth, allowLeapDay);

      const newValue: BirthdayValue = {
        month: newMonth,
        day: clampedDay,
      };

      handleValueChange(newValue);
    },
    [value.day, allowLeapDay, handleValueChange]
  );

  // Handle day change
  const handleDayChange = useCallback(
    ({ item }: { item: WheelItem }) => {
      const newValue: BirthdayValue = {
        month: value.month,
        day: item.value,
      };

      handleValueChange(newValue);
    },
    [value.month, handleValueChange]
  );

  // Sync internal state when controlled value changes
  useEffect(() => {
    if (isControlled && controlledValue) {
      setInternalValue(controlledValue);
    }
  }, [isControlled, controlledValue]);

  // Clamp day when month changes and day exceeds max days
  useEffect(() => {
    if (value.month !== prevMonthRef.current) {
      const maxDays = getDaysInMonth(value.month, allowLeapDay);
      if (value.day > maxDays) {
        const clampedValue: BirthdayValue = {
          month: value.month,
          day: maxDays,
        };
        handleValueChange(clampedValue);
      }
      prevMonthRef.current = value.month;
    }
  }, [value.month, value.day, allowLeapDay, handleValueChange]);

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      pointerEvents={disabled ? 'none' : 'auto'}
      accessibilityRole="adjustable"
    >
      <View
        style={styles.pickerContainer}
        accessibilityLabel={monthAccessibilityLabel}
      >
        <WheelPicker
          data={monthItems}
          value={value.month}
          onValueChanged={handleMonthChange}
          itemHeight={itemHeight}
          visibleItemCount={visibleItems}
          overlayItemStyle={styles.overlayItem}
          testID={testID ? `${testID}-month` : undefined}
        />
      </View>

      <View
        style={styles.pickerContainer}
        accessibilityLabel={dayAccessibilityLabel}
      >
        <WheelPicker
          data={dayItems}
          value={value.day}
          onValueChanged={handleDayChange}
          itemHeight={itemHeight}
          visibleItemCount={visibleItems}
          overlayItemStyle={styles.overlayItem}
          testID={testID ? `${testID}-day` : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    flex: 1,
  },
  overlayItem: {
    borderRadius: 0,
  },
});

export default BirthdayPicker;
