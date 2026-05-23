import type { ViewStyle } from 'react-native';

/**
 * Represents a month-day birthday value without year.
 * Month is 1-indexed (1 = January, 12 = December)
 * Day is 1-indexed (1-31 depending on month)
 */
export type BirthdayValue = {
  month: number; // 1-12
  day: number; // 1-31
};

/**
 * Format for displaying month names
 */
export type MonthFormat = 'long' | 'short' | 'numeric';

/**
 * Props for the BirthdayPicker component
 */
export interface BirthdayPickerProps {
  /**
   * Current value (controlled mode)
   */
  value?: BirthdayValue;

  /**
   * Default value (uncontrolled mode)
   */
  defaultValue?: BirthdayValue;

  /**
   * Called when value changes
   */
  onChange?: (value: BirthdayValue) => void;

  /**
   * BCP 47 locale string for month name formatting
   * @default 'en-US'
   */
  locale?: string;

  /**
   * How to format month names
   * @default 'long'
   */
  monthFormat?: MonthFormat;

  /**
   * Whether to allow Feb 29 as a valid birthday
   * @default true
   */
  allowLeapDay?: boolean;

  /**
   * Disable interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Container style
   */
  style?: ViewStyle;

  /**
   * Height of each item in the wheel
   * @default 40
   */
  itemHeight?: number;

  /**
   * Number of visible items in each wheel (must be odd)
   * @default 5
   */
  visibleItems?: number;

  /**
   * Accessibility label for month picker
   * @default 'Month picker'
   */
  monthAccessibilityLabel?: string;

  /**
   * Accessibility label for day picker
   * @default 'Day picker'
   */
  dayAccessibilityLabel?: string;
}

/**
 * Props for the BirthdayPickerModal component
 */
export interface BirthdayPickerModalProps extends BirthdayPickerProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;

  /**
   * Called when user confirms selection
   */
  onConfirm: (value: BirthdayValue) => void;

  /**
   * Called when user cancels
   */
  onCancel: () => void;

  /**
   * Modal title
   * @default 'Select Birthday'
   */
  title?: string;

  /**
   * Confirm button text
   * @default 'Confirm'
   */
  confirmText?: string;

  /**
   * Cancel button text
   * @default 'Cancel'
   */
  cancelText?: string;

  /**
   * Animation type for modal presentation
   * @default 'slide'
   */
  animationType?: 'slide' | 'fade' | 'none';
}

/**
 * Options for useBirthdayPicker hook
 */
export interface UseBirthdayPickerOptions {
  /**
   * Initial value
   */
  initialValue?: BirthdayValue;

  /**
   * Whether to allow Feb 29
   * @default true
   */
  allowLeapDay?: boolean;
}

/**
 * Return type of useBirthdayPicker hook
 */
export interface UseBirthdayPickerReturn {
  /**
   * Current birthday value
   */
  value: BirthdayValue;

  /**
   * Set the month (will clamp day if needed)
   */
  setMonth: (month: number) => void;

  /**
   * Set the day
   */
  setDay: (day: number) => void;

  /**
   * Set the entire value
   */
  setValue: (value: BirthdayValue) => void;

  /**
   * Number of days in the currently selected month
   */
  daysInMonth: number;

  /**
   * Whether the current value is valid
   */
  isValid: boolean;
}
