import { act, RenderResult } from '@testing-library/react-hooks';
import { FocusContextValue, useFocusContext } from 'contexts/Focus';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfWeek,
  startOfWeek
} from 'date-fns';

import { customRenderHook } from 'test/render';
import { freezeBeforeAll } from 'test/utils';

let renderResult: RenderResult<FocusContextValue>;

const today = new Date(2021, 11, 8); // make sure is in the middle of the week for the complete test
freezeBeforeAll(today);
function setup() {
  const { result } = customRenderHook(() => useFocusContext());
  renderResult = result;
}

type HookFunction =
  | 'focusDayAfter'
  | 'focusDayBefore'
  | 'focusWeekAfter'
  | 'focusWeekBefore'
  | 'focusMonthBefore'
  | 'focusMonthAfter'
  | 'focusYearBefore'
  | 'focusYearAfter'
  | 'focusStartOfWeek'
  | 'focusEndOfWeek';

beforeEach(() => {
  setup();
});

test('`focusedDay` should be undefined', () => {
  expect(renderResult.current.focusedDay).toBeUndefined();
});

const tests: Array<HookFunction> = [
  'focusDayAfter',
  'focusDayBefore',
  'focusWeekAfter',
  'focusWeekBefore',
  'focusMonthBefore',
  'focusMonthAfter',
  'focusYearBefore',
  'focusYearAfter',
  'focusStartOfWeek',
  'focusEndOfWeek'
];
describe.each(tests)('when calling %s', (fn: HookFunction) => {
  beforeEach(() => {
    renderResult.current[fn];
  });
  test('`focusedDay` should be undefined', () => {
    expect(renderResult.current.focusedDay).toBeUndefined();
  });
});

describe('when a day is focused', () => {
  const day = today;
  beforeEach(() => {
    act(() => renderResult.current.focus(day));
  });
  test('should set the focused day', () => {
    expect(renderResult.current.focusedDay).toEqual(day);
  });
  describe('when "focusDayBefore" is called', () => {
    const dayBefore = addDays(day, -1);
    beforeEach(() => {
      act(() => renderResult.current.focusDayBefore());
    });
    test('should focus the day before', () => {
      expect(renderResult.current.focusedDay).toEqual(dayBefore);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusDayAfter" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusDayAfter());
    });
    test('should focus the day after', () => {
      const dayAfter = addDays(day, 1);
      expect(renderResult.current.focusedDay).toEqual(dayAfter);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusWeekBefore" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusWeekBefore());
    });
    test('should focus the day in the previous week', () => {
      const prevWeek = addWeeks(day, -1);
      expect(renderResult.current.focusedDay).toEqual(prevWeek);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusWeekAfter" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusWeekAfter());
    });
    test('should focus the day in the next week', () => {
      const nextWeek = addWeeks(day, 1);
      expect(renderResult.current.focusedDay).toEqual(nextWeek);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusStartOfWeek" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusStartOfWeek());
    });
    test('should focus the first day of the week', () => {
      const firstDayOfWeek = startOfWeek(day);
      expect(renderResult.current.focusedDay).toEqual(firstDayOfWeek);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusEndOfWeek" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusEndOfWeek());
    });
    test('should focus the last day of the week', () => {
      const lastDayOfWeek = endOfWeek(day);
      expect(renderResult.current.focusedDay).toEqual(lastDayOfWeek);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusMonthBefore" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusMonthBefore());
    });
    test('should focus the day in the month before', () => {
      const monthBefore = addMonths(day, -1);
      expect(renderResult.current.focusedDay).toEqual(monthBefore);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusMonthAfter" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusMonthAfter());
    });
    test('should focus the day in the month after', () => {
      const monthAfter = addMonths(day, 1);
      expect(renderResult.current.focusedDay).toEqual(monthAfter);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusYearBefore" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusYearBefore());
    });
    test('should focus the day in the year before', () => {
      const prevYear = addYears(day, -1);
      expect(renderResult.current.focusedDay).toEqual(prevYear);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when "focusYearAfter" is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.focusYearAfter());
    });
    test('should focus the day in the year after', () => {
      const nextYear = addYears(day, 1);
      expect(renderResult.current.focusedDay).toEqual(nextYear);
    });
    test.todo('should call the navigation goToDate');
  });
  describe('when blur is called', () => {
    beforeEach(() => {
      act(() => renderResult.current.blur());
    });
    test('`focusedDay` should be undefined', () => {
      expect(renderResult.current.focusedDay).toBeUndefined();
    });
  });
});
