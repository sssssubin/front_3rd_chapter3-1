import { fetchHolidays } from '../../apis/fetchHolidays';
describe('fetchHolidays', () => {
  it('주어진 월의 공휴일만 반환한다', async () => {
    const holidays = await fetchHolidays(new Date('2024-07-01'));
    expect(holidays).toEqual({});
  });

  it('공휴일이 없는 월에 대해 빈 객체를 반환한다', async () => {
    const holidays = await fetchHolidays(new Date('2024-08-01'));
    expect(holidays).toEqual({
      '2024-08-15': '광복절',
    });
  });

  it('여러 공휴일이 있는 월에 대해 모든 공휴일을 반환한다', async () => {
    const holidays = await fetchHolidays(new Date('2024-12-01'));
    expect(holidays).toEqual({
      '2024-12-25': '크리스마스',
    });
  });
});
