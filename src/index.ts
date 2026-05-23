// Main components
export { BirthdayPicker } from './BirthdayPicker';
export { BirthdayPickerModal } from './BirthdayPickerModal';

// Hook
export { useBirthdayPicker } from './hooks/useBirthdayPicker';

// Types
export type {
  BirthdayValue,
  MonthFormat,
  BirthdayPickerProps,
  BirthdayPickerModalProps,
  UseBirthdayPickerOptions,
  UseBirthdayPickerReturn,
} from './types';

// Utilities (for advanced usage)
export {
  getDaysInMonth,
  clampDay,
  isValidBirthday,
  getDaysArray,
  getMonthsArray,
  normalizeBirthday,
} from './utils/dateUtils';

export { getMonthNames, formatMonth, formatDay } from './utils/localeUtils';

// Default export
export { BirthdayPicker as default } from './BirthdayPicker';
