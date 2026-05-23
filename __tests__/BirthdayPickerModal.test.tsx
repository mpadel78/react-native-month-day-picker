import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BirthdayPickerModal } from '../src/BirthdayPickerModal';

// Mock the wheel picker using jest.setup.js

describe('BirthdayPickerModal', () => {
  const defaultProps = {
    visible: true,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    value: { month: 6, day: 15 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('visibility', () => {
    it('renders when visible is true', () => {
      const { getByText } = render(<BirthdayPickerModal {...defaultProps} />);

      expect(getByText('Select Birthday')).toBeTruthy();
    });
  });

  describe('header', () => {
    it('displays custom title', () => {
      const { getByText } = render(
        <BirthdayPickerModal {...defaultProps} title="Choose Date" />
      );

      expect(getByText('Choose Date')).toBeTruthy();
    });

    it('displays custom button text', () => {
      const { getByText } = render(
        <BirthdayPickerModal
          {...defaultProps}
          confirmText="Done"
          cancelText="Back"
        />
      );

      expect(getByText('Done')).toBeTruthy();
      expect(getByText('Back')).toBeTruthy();
    });
  });

  describe('confirm', () => {
    it('calls onConfirm with current value', () => {
      const onConfirm = jest.fn();
      const { getByText } = render(
        <BirthdayPickerModal {...defaultProps} onConfirm={onConfirm} />
      );

      fireEvent.press(getByText('Confirm'));

      expect(onConfirm).toHaveBeenCalledWith({ month: 6, day: 15 });
    });

    it('calls onConfirm with updated value after selection', () => {
      const onConfirm = jest.fn();
      const { getByText, getByTestId } = render(
        <BirthdayPickerModal
          {...defaultProps}
          onConfirm={onConfirm}
          testID="modal"
        />
      );

      // Change month to December
      fireEvent.press(getByTestId('modal-picker-month-item-12'));

      // Confirm
      fireEvent.press(getByText('Confirm'));

      expect(onConfirm).toHaveBeenCalledWith({ month: 12, day: 15 });
    });
  });

  describe('cancel', () => {
    it('calls onCancel when cancel button pressed', () => {
      const onCancel = jest.fn();
      const { getByText } = render(
        <BirthdayPickerModal {...defaultProps} onCancel={onCancel} />
      );

      fireEvent.press(getByText('Cancel'));

      expect(onCancel).toHaveBeenCalled();
    });
  });

  describe('value reset', () => {
    it('resets to external value when modal reopens', () => {
      const { rerender, getByTestId } = render(
        <BirthdayPickerModal
          {...defaultProps}
          value={{ month: 6, day: 15 }}
          testID="modal"
        />
      );

      // Change month
      fireEvent.press(getByTestId('modal-picker-month-item-12'));

      // Close modal
      rerender(
        <BirthdayPickerModal
          {...defaultProps}
          visible={false}
          value={{ month: 6, day: 15 }}
          testID="modal"
        />
      );

      // Reopen modal
      rerender(
        <BirthdayPickerModal
          {...defaultProps}
          visible={true}
          value={{ month: 6, day: 15 }}
          testID="modal"
        />
      );

      // Should be back to original value
      expect(getByTestId('modal-picker-month-value').props.children).toBe('6');
    });
  });

  describe('accessibility', () => {
    it('has accessible confirm button', () => {
      const { getByTestId } = render(
        <BirthdayPickerModal {...defaultProps} testID="modal" />
      );

      const confirmButton = getByTestId('modal-confirm');
      expect(confirmButton.props.accessibilityRole).toBe('button');
    });

    it('has accessible cancel button', () => {
      const { getByTestId } = render(
        <BirthdayPickerModal {...defaultProps} testID="modal" />
      );

      const cancelButton = getByTestId('modal-cancel');
      expect(cancelButton.props.accessibilityRole).toBe('button');
    });
  });
});
