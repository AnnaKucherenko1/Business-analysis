import { formatDate, formatDatesToMonth, formatNumber } from "./utils";

describe('formatDate function', () => {
  it('should handle an invalid date input gracefully', () => {
    const inputDate = 'InvalidDate';
    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toBe('Nesprávny dátum');
  });

  it('should format a valid date correctly', () => {
    const inputDate = '2023-10-01';
    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toBe('10/2023');
  });
});

describe('formatNumber function', () => {
  it('should format a positive number with two decimal places correctly', () => {
    const inputNumber = 1234567.89;
    const formattedNumber = formatNumber(inputNumber);
    expect(formattedNumber).toBe('1 234 567,89 €');
  });

  it('should format a negative number with two decimal places correctly', () => {
    const inputNumber = -987654.32;
    const formattedNumber = formatNumber(inputNumber);
    expect(formattedNumber).toBe('-987 654,32 €');
  });

  it('should format a number without decimal places correctly', () => {
    const inputNumber = 12345;
    const formattedNumber = formatNumber(inputNumber);
    expect(formattedNumber).toBe('12 345,00 €');
  });

  it('should handle zero correctly', () => {
    const inputNumber = 0;
    const formattedNumber = formatNumber(inputNumber);
    expect(formattedNumber).toBe('0,00 €');
  });
});

describe('formatDatesToMonth function', () => {
  it('should handle an empty input array', () => {
    const inputDates: string[] = [];
    const formattedDates = formatDatesToMonth(inputDates);
    expect(formattedDates).toEqual([]);
  });
  it('should format input dates correctly', () => {
    const inputDates = ['2023-01-15T12:00:00', '2023-02-20T08:30:00', '2023-03-10T16:45:00'];
    const formattedDates = formatDatesToMonth(inputDates);
    const expectedOutput = ['január 23', 'február 23', 'marec 23'];
    expect(formattedDates).toEqual(expectedOutput);
  });

});