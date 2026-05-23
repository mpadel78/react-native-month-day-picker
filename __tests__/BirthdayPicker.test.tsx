import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BirthdayPicker } from '../src/BirthdayPicker';

// Mock the wheel picker using jest.setup.js

describe('BirthdayPicker', () => {
  describe('rendering', () => {
    it('renders month and day pickers', () => {
      const { getByTestId } = render(
        <BirthdayPicker
          defaultValue={{ month: 6, day: 15 }}
          testID="birthday"
        />
      );

      expect(getByTestId('birthday-month')).toBeTruthy();
      expect(getByTestId('birthday-day')).toBeTruthy();
    });

    it('displays correct initial values', () => {
      const { getByTestId } = render(
        <BirthdayPicker
          defaultValue={{ month: 6, day: 15 }}
          testID="birthday"
        />
      );

      expect(getByTestId('birthday-month-value').props.children).toBe('6');
      expect(getByTestId('birthday-day-value').props.children).toBe('15');
    });
  });

  describe('uncontrolled mode', () => {
    it('updates internally when month changes', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <BirthdayPicker
          defaultValue={{ month: 1, day: 15 }}
          onChange={onChange}
          testID="birthday"
        />
      );

      // Simulate selecting month 6
      fireEvent.press(getByTestId('birthday-month-item-6'));

      expect(onChange).toHaveBeenCalledWith({ month: 6, day: 15 });
    });

    it('updates internally when day changes', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <BirthdayPicker
          defaultValue={{ month: 1, day: 1 }}
          onChange={onChange}
          testID="birthday"
        />
      );

      // Simulate selecting day 25
      fireEvent.press(getByTestId('birthday-day-item-25'));

      expect(onChange).toHaveBeenCalledWith({ month: 1, day: 25 });
    });
  });

  describe('controlled mode', () => {
    it('uses provided value', () => {
      const { getByTestId } = render(
        <BirthdayPicker value={{ month: 12, day: 25 }} testID="birthday" />
      );

      expect(getByTestId('birthday-month-value').props.children).toBe('12');
      expect(getByTestId('birthday-day-value').props.children).toBe('25');
    });

    it('calls onChange when month changes', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <BirthdayPicker
          value={{ month: 1, day: 15 }}
          onChange={onChange}
          testID="birthday"
        />
      );

      fireEvent.press(getByTestId('birthday-month-item-3'));

      expect(onChange).toHaveBeenCalledWith({ month: 3, day: 15 });
    });

    it('calls onChange when day changes', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <BirthdayPicker
          value={{ month: 1, day: 1 }}
          onChange={onChange}
          testID="birthday"
        />
      );

      fireEvent.press(getByTestId('birthday-day-item-20'));

      expect(onChange).toHaveBeenCalledWith({ month: 1, day: 20 });
    });
  });

  describe('day clamping', () => {
    it('clamps day when switching to shorter month', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <BirthdayPicker
          value={{ month: 3, day: 31 }}
          onChange={onChange}
          testID="birthday"
        />
      );

      // Switch to April (30 days)
      fireEvent.press(getByTestId('birthday-month-item-4'));

      expect(onChange).toHaveBeenCalledWith({ month: 4, day: 30 });
    });

    it('clamps day when switching to February', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <BirthdayPicker
          value={{ month: 1, day: 31 }}
          onChange={onChange}
          testID="birthday"
        />
      );

      // Switch to February
      fireEvent.press(getByTestId('birthday-month-item-2'));

      expect(onChange).toHaveBeenCalledWith({ month: 2, day: 29 });
    });
  });

  describe('leap day handling', () => {
    it('shows 29 days for February when allowLeapDay is true', () => {
      const { queryByTestId } = render(
        <BirthdayPicker
          value={{ month: 2, day: 1 }}
          allowLeapDay={true}
          testID="birthday"
        />
      );

      expect(queryByTestId('birthday-day-item-29')).toBeTruthy();
    });

    it('shows 28 days for February when allowLeapDay is false', () => {
      const { queryByTestId } = render(
        <BirthdayPicker
          value={{ month: 2, day: 1 }}
          allowLeapDay={false}
          testID="birthday"
        />
      );

      expect(queryByTestId('birthday-day-item-29')).toBeNull();
    });
  });

  describe('locale support', () => {
    it('formats months according to locale', () => {
      const { getByTestId } = render(
        <BirthdayPicker
          value={{ month: 1, day: 1 }}
          locale="en-US"
          monthFormat="long"
          testID="birthday"
        />
      );

      // Check that January is rendered
      expect(getByTestId('birthday-month-item-1')).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('applies disabled state to container', () => {
      const { getByTestId } = render(
        <BirthdayPicker
          value={{ month: 1, day: 1 }}
          disabled={true}
          testID="birthday"
        />
      );

      const container = getByTestId('birthday');
      expect(container.props.pointerEvents).toBe('none');
    });
  });
});
