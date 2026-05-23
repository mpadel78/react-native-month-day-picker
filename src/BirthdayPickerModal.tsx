import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { BirthdayPicker } from './BirthdayPicker';
import type { BirthdayPickerModalProps, BirthdayValue } from './types';
import { DEFAULT_BIRTHDAY_VALUE } from './constants';

/**
 * A modal wrapper for BirthdayPicker that provides confirm/cancel functionality.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 * const [birthday, setBirthday] = useState({ month: 1, day: 1 });
 *
 * <BirthdayPickerModal
 *   visible={visible}
 *   value={birthday}
 *   onConfirm={(value) => {
 *     setBirthday(value);
 *     setVisible(false);
 *   }}
 *   onCancel={() => setVisible(false)}
 * />
 * ```
 */
export function BirthdayPickerModal({
  visible,
  onConfirm,
  onCancel,
  value: externalValue,
  defaultValue = DEFAULT_BIRTHDAY_VALUE,
  title = 'Select Birthday',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  animationType = 'slide',
  locale,
  monthFormat,
  allowLeapDay,
  disabled,
  testID,
  itemHeight,
  visibleItems,
  monthAccessibilityLabel,
  dayAccessibilityLabel,
}: BirthdayPickerModalProps): React.ReactElement {
  // Internal state to track the selection while modal is open
  const [internalValue, setInternalValue] = useState<BirthdayValue>(
    () => externalValue ?? defaultValue
  );

  // Reset internal value when modal opens or external value changes
  useEffect(() => {
    if (visible) {
      setInternalValue(externalValue ?? defaultValue);
    }
  }, [visible, externalValue, defaultValue]);

  // Handle value changes from the picker
  const handleChange = useCallback((newValue: BirthdayValue) => {
    setInternalValue(newValue);
  }, []);

  // Handle confirm button press
  const handleConfirm = useCallback(() => {
    onConfirm(internalValue);
  }, [onConfirm, internalValue]);

  // Handle cancel button press
  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={handleCancel}
      testID={testID}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.headerButton}
                accessibilityRole="button"
                accessibilityLabel={cancelText}
                testID={testID ? `${testID}-cancel` : undefined}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>

              <Text style={styles.title}>{title}</Text>

              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.headerButton}
                accessibilityRole="button"
                accessibilityLabel={confirmText}
                testID={testID ? `${testID}-confirm` : undefined}
              >
                <Text style={styles.confirmText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>

            {/* Picker */}
            <View style={styles.pickerWrapper}>
              <BirthdayPicker
                value={internalValue}
                onChange={handleChange}
                locale={locale}
                monthFormat={monthFormat}
                allowLeapDay={allowLeapDay}
                disabled={disabled}
                itemHeight={itemHeight}
                visibleItems={visibleItems}
                monthAccessibilityLabel={monthAccessibilityLabel}
                dayAccessibilityLabel={dayAccessibilityLabel}
                testID={testID ? `${testID}-picker` : undefined}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  safeArea: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  container: {
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 60,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  cancelText: {
    fontSize: 17,
    color: '#007AFF',
  },
  confirmText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'right',
  },
  pickerWrapper: {
    paddingVertical: 16,
  },
});

export default BirthdayPickerModal;
