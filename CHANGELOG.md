# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-05-25

### Changed

- Replaced React Native `SafeAreaView` with `react-native-safe-area-context`
- Added `react-native-safe-area-context` as a required peer dependency
- Pinned compatible root dev dependencies for `react-native-gesture-handler` and `react-native-reanimated`
- Removed border radius from the wheel picker selected overlay

## [0.1.0] - 2026-05-23

### Added

- Initial release
- `BirthdayPicker` component for inline birthday selection
- `BirthdayPickerModal` component for modal presentation
- `useBirthdayPicker` hook for custom implementations
- Full TypeScript support
- Localization support via `Intl.DateTimeFormat`
- Configurable month formats (long, short, numeric)
- Leap day handling with `allowLeapDay` prop
- Automatic day clamping when month changes
- Accessibility labels support
- Comprehensive test suite
- Example Expo app
