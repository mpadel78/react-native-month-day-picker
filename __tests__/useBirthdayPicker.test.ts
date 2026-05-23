import { renderHook, act } from '@testing-library/react-native';
import { useBirthdayPicker } from '../src/hooks/useBirthdayPicker';

describe('useBirthdayPicker', () => {
  describe('initialization', () => {
    it('uses default value when no initial value provided', () => {
      const { result } = renderHook(() => useBirthdayPicker());
      expect(result.current.value).toEqual({ month: 1, day: 1 });
    });

    it('uses provided initial value', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 6, day: 15 } })
      );
      expect(result.current.value).toEqual({ month: 6, day: 15 });
    });

    it('normalizes invalid initial value', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 4, day: 31 } })
      );
      expect(result.current.value).toEqual({ month: 4, day: 30 });
    });
  });

  describe('setMonth', () => {
    it('updates month correctly', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 1, day: 15 } })
      );

      act(() => {
        result.current.setMonth(6);
      });

      expect(result.current.value.month).toBe(6);
      expect(result.current.value.day).toBe(15);
    });

    it('clamps day when switching to shorter month', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 3, day: 31 } })
      );

      act(() => {
        result.current.setMonth(4); // April has 30 days
      });

      expect(result.current.value).toEqual({ month: 4, day: 30 });
    });

    it('clamps day when switching to February', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 1, day: 31 } })
      );

      act(() => {
        result.current.setMonth(2);
      });

      expect(result.current.value).toEqual({ month: 2, day: 29 });
    });

    it('clamps to 28 for February when allowLeapDay is false', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({
          initialValue: { month: 1, day: 31 },
          allowLeapDay: false,
        })
      );

      act(() => {
        result.current.setMonth(2);
      });

      expect(result.current.value).toEqual({ month: 2, day: 28 });
    });

    it('clamps invalid month values', () => {
      const { result } = renderHook(() => useBirthdayPicker());

      act(() => {
        result.current.setMonth(15);
      });
      expect(result.current.value.month).toBe(12);

      act(() => {
        result.current.setMonth(0);
      });
      expect(result.current.value.month).toBe(1);
    });
  });

  describe('setDay', () => {
    it('updates day correctly', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 1, day: 1 } })
      );

      act(() => {
        result.current.setDay(25);
      });

      expect(result.current.value.day).toBe(25);
    });

    it('clamps day to max for month', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 4, day: 1 } })
      );

      act(() => {
        result.current.setDay(31);
      });

      expect(result.current.value.day).toBe(30);
    });

    it('clamps day to minimum 1', () => {
      const { result } = renderHook(() => useBirthdayPicker());

      act(() => {
        result.current.setDay(0);
      });

      expect(result.current.value.day).toBe(1);
    });
  });

  describe('setValue', () => {
    it('updates entire value', () => {
      const { result } = renderHook(() => useBirthdayPicker());

      act(() => {
        result.current.setValue({ month: 12, day: 25 });
      });

      expect(result.current.value).toEqual({ month: 12, day: 25 });
    });

    it('normalizes invalid values', () => {
      const { result } = renderHook(() => useBirthdayPicker());

      act(() => {
        result.current.setValue({ month: 4, day: 31 });
      });

      expect(result.current.value).toEqual({ month: 4, day: 30 });
    });
  });

  describe('daysInMonth', () => {
    it('returns correct days for current month', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 1, day: 1 } })
      );

      expect(result.current.daysInMonth).toBe(31);
    });

    it('returns 29 for February with leap day', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({
          initialValue: { month: 2, day: 1 },
          allowLeapDay: true,
        })
      );

      expect(result.current.daysInMonth).toBe(29);
    });

    it('returns 28 for February without leap day', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({
          initialValue: { month: 2, day: 1 },
          allowLeapDay: false,
        })
      );

      expect(result.current.daysInMonth).toBe(28);
    });

    it('updates when month changes', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 1, day: 1 } })
      );

      expect(result.current.daysInMonth).toBe(31);

      act(() => {
        result.current.setMonth(4);
      });

      expect(result.current.daysInMonth).toBe(30);
    });
  });

  describe('isValid', () => {
    it('returns true for valid birthday', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({ initialValue: { month: 6, day: 15 } })
      );

      expect(result.current.isValid).toBe(true);
    });

    it('returns true for Feb 29 with leap day', () => {
      const { result } = renderHook(() =>
        useBirthdayPicker({
          initialValue: { month: 2, day: 29 },
          allowLeapDay: true,
        })
      );

      expect(result.current.isValid).toBe(true);
    });
  });
});
