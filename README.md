# react-native-month-day-picker

A privacy-friendly birthday picker for React Native that uses only month and day (no year). Built on top of `@quidone/react-native-wheel-picker` for smooth, native-feeling scroll behavior and full Expo compatibility.

## Features

- **Privacy-friendly**: Only captures month and day, no year required
- **Expo Go compatible**: Works without custom native builds
- **Smooth scrolling**: Native-feeling wheel picker experience
- **Localization**: Full i18n support with customizable month formats
- **Leap day handling**: Configurable Feb 29 support
- **TypeScript**: Full type definitions included
- **Accessible**: Screen reader support with customizable labels

## Installation

```bash
npm install react-native-month-day-picker
# or
yarn add react-native-month-day-picker
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react-native-gesture-handler react-native-reanimated
```

If you're using Expo, these may already be included. Otherwise, follow the installation instructions for:

- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)

## Usage

### Basic Usage (Uncontrolled)

```tsx
import { BirthdayPicker } from 'react-native-month-day-picker';

function MyComponent() {
  return (
    <BirthdayPicker
      defaultValue={{ month: 1, day: 1 }}
      onChange={(value) => console.log('Birthday:', value)}
    />
  );
}
```

### Controlled Mode

```tsx
import { useState } from 'react';
import { BirthdayPicker, BirthdayValue } from 'react-native-month-day-picker';

function MyComponent() {
  const [birthday, setBirthday] = useState<BirthdayValue>({
    month: 6,
    day: 15,
  });

  return <BirthdayPicker value={birthday} onChange={setBirthday} />;
}
```

### Modal Presentation

```tsx
import { useState } from 'react';
import { Button } from 'react-native';
import {
  BirthdayPickerModal,
  BirthdayValue,
} from 'react-native-month-day-picker';

function MyComponent() {
  const [visible, setVisible] = useState(false);
  const [birthday, setBirthday] = useState<BirthdayValue>({
    month: 12,
    day: 25,
  });

  return (
    <>
      <Button title="Select Birthday" onPress={() => setVisible(true)} />
      <BirthdayPickerModal
        visible={visible}
        value={birthday}
        onConfirm={(value) => {
          setBirthday(value);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        title="Select Your Birthday"
      />
    </>
  );
}
```

### Using the Hook

For custom implementations, use the `useBirthdayPicker` hook:

```tsx
import { useBirthdayPicker } from 'react-native-month-day-picker';

function MyCustomPicker() {
  const {
    value,
    setMonth,
    setDay,
    daysInMonth,
    isValid,
  } = useBirthdayPicker({
    initialValue: { month: 3, day: 14 },
  });

  return (
    // Your custom picker UI
  );
}
```

## API Reference

### BirthdayValue

```typescript
type BirthdayValue = {
  month: number; // 1-12 (January = 1)
  day: number; // 1-31 (depends on month)
};
```

### BirthdayPicker Props

| Prop                      | Type                             | Default                | Description                           |
| ------------------------- | -------------------------------- | ---------------------- | ------------------------------------- |
| `value`                   | `BirthdayValue`                  | -                      | Current value (controlled mode)       |
| `defaultValue`            | `BirthdayValue`                  | `{ month: 1, day: 1 }` | Default value (uncontrolled mode)     |
| `onChange`                | `(value: BirthdayValue) => void` | -                      | Called when value changes             |
| `locale`                  | `string`                         | `'en-US'`              | BCP 47 locale for month names         |
| `monthFormat`             | `'long' \| 'short' \| 'numeric'` | `'long'`               | Month display format                  |
| `allowLeapDay`            | `boolean`                        | `true`                 | Whether Feb 29 is selectable          |
| `disabled`                | `boolean`                        | `false`                | Disable interaction                   |
| `testID`                  | `string`                         | -                      | Test ID for testing                   |
| `style`                   | `ViewStyle`                      | -                      | Container style                       |
| `itemHeight`              | `number`                         | `40`                   | Height of each wheel item             |
| `visibleItems`            | `number`                         | `5`                    | Number of visible items (must be odd) |
| `monthAccessibilityLabel` | `string`                         | `'Month picker'`       | Accessibility label for month wheel   |
| `dayAccessibilityLabel`   | `string`                         | `'Day picker'`         | Accessibility label for day wheel     |

### BirthdayPickerModal Props

Includes all `BirthdayPicker` props, plus:

| Prop            | Type                             | Default             | Description               |
| --------------- | -------------------------------- | ------------------- | ------------------------- |
| `visible`       | `boolean`                        | -                   | Whether modal is visible  |
| `onConfirm`     | `(value: BirthdayValue) => void` | -                   | Called when user confirms |
| `onCancel`      | `() => void`                     | -                   | Called when user cancels  |
| `title`         | `string`                         | `'Select Birthday'` | Modal title               |
| `confirmText`   | `string`                         | `'Confirm'`         | Confirm button text       |
| `cancelText`    | `string`                         | `'Cancel'`          | Cancel button text        |
| `animationType` | `'slide' \| 'fade' \| 'none'`    | `'slide'`           | Modal animation           |

### useBirthdayPicker Hook

```typescript
function useBirthdayPicker(options?: {
  initialValue?: BirthdayValue;
  allowLeapDay?: boolean;
}): {
  value: BirthdayValue;
  setMonth: (month: number) => void;
  setDay: (day: number) => void;
  setValue: (value: BirthdayValue) => void;
  daysInMonth: number;
  isValid: boolean;
};
```

## Localization

The picker supports any locale available in `Intl.DateTimeFormat`:

```tsx
// German
<BirthdayPicker locale="de-DE" />

// Japanese
<BirthdayPicker locale="ja-JP" />

// French with short format
<BirthdayPicker locale="fr-FR" monthFormat="short" />
```

## Leap Day Handling

By default, February shows 29 days to accommodate leap day birthdays. To disable:

```tsx
<BirthdayPicker allowLeapDay={false} />
```

When `allowLeapDay` is `false`:

- February shows 28 days
- Selecting a day > 28 in February will clamp to 28

## Day Clamping

When the month changes, the day is automatically clamped if it exceeds the maximum for the new month:

- March 31 → April = April 30
- January 31 → February = February 29 (or 28 if `allowLeapDay={false}`)

## Utility Functions

The package exports utility functions for advanced use cases:

```typescript
import {
  getDaysInMonth,
  clampDay,
  isValidBirthday,
  getMonthNames,
  formatMonth,
} from 'react-native-month-day-picker';

// Get days in a month
getDaysInMonth(2, true); // 29 (February with leap day)
getDaysInMonth(2, false); // 28 (February without leap day)

// Clamp a day to valid range
clampDay(31, 4); // 30 (April has 30 days)

// Validate a birthday
isValidBirthday({ month: 2, day: 30 }); // false

// Get localized month names
getMonthNames('de-DE', 'long'); // ['', 'Januar', 'Februar', ...]

// Format a single month
formatMonth(1, 'en-US', 'short'); // 'Jan'
```

## TypeScript

Full TypeScript support is included:

```typescript
import type {
  BirthdayValue,
  MonthFormat,
  BirthdayPickerProps,
  BirthdayPickerModalProps,
  UseBirthdayPickerOptions,
  UseBirthdayPickerReturn,
} from 'react-native-month-day-picker';
```

## License

MIT
