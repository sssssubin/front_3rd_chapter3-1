import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01과 14:30을 정확한 Date 객체로 변환한다', () => {
    expect(parseDateTime('2024-07-01', '14:30')).toEqual(new Date('2024-07-01T14:30:00'));
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    expect(parseDateTime('invalid-date', '14:30')).toEqual(new Date('Invalid Date'));
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    expect(parseDateTime('2024-07-01', 'invalid-time')).toEqual(new Date('Invalid Date'));
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    expect(parseDateTime('', '14:30')).toEqual(new Date('Invalid Date'));
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    expect(
      convertEventToDateRange({
        date: '2024-07-01',
        startTime: '09:00',
        endTime: '10:00',
        title: 'Sample Event',
        description: 'This is a sample event',
        location: 'Sample Location',
        category: 'Sample Category',
        repeat: 'none' as any,
        notificationTime: 0,
      })
    ).toEqual({
      start: new Date('2024-07-01T09:00:00'),
      end: new Date('2024-07-01T10:00:00'),
    });
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    expect(
      convertEventToDateRange({
        date: 'invalid-date',
        startTime: '09:00',
        endTime: '10:00',
        title: 'Sample Event',
        description: 'This is a sample event',
        location: 'Sample Location',
        category: 'Sample Category',
        repeat: 'none' as any,
        notificationTime: 0,
      })
    ).toEqual({
      start: new Date('Invalid Date'),
      end: new Date('Invalid Date'),
    });
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    expect(
      convertEventToDateRange({
        date: '2024-07-01',
        startTime: 'invalid-time',
        endTime: '10:00',
        title: 'Sample Event',
        description: 'This is a sample event',
        location: 'Sample Location',
        category: 'Sample Category',
        repeat: 'none' as any,
        notificationTime: 0,
      })
    ).toEqual({
      start: parseDateTime('2024-07-01', 'invalid-time'),
      end: parseDateTime('2024-07-01', '10:00'),
    });
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const event1 = {
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
    } as Event;
    const event2 = {
      date: '2024-07-01',
      startTime: '09:30',
      endTime: '10:30',
    } as Event;
    expect(isOverlapping(event1, event2)).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1 = {
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
    } as Event;
    const event2 = {
      date: '2024-07-01',
      startTime: '10:30',
      endTime: '11:30',
    } as Event;
    expect(isOverlapping(event1, event2)).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const newEvent = {
      id: 1 as unknown as string,
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Sample Event',
      description: 'This is a sample event',
      location: 'Sample Location',
      category: 'Sample Category',
      repeat: 'none' as any,
      notificationTime: 0,
    } as Event;
    const events = [
      {
        id: 2 as unknown as string,
        date: '2024-07-01',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Sample Event',
        description: 'This is a sample event',
        location: 'Sample Location',
        category: 'Sample Category',
        repeat: 'none' as any,
        notificationTime: 0,
      } as Event,
      {
        id: 3 as unknown as string,
        date: '2024-07-01',
        startTime: '10:30',
        endTime: '11:30',
        title: 'Sample Event',
        description: 'This is a sample event',
        location: 'Sample Location',
        category: 'Sample Category',
        repeat: 'none' as any,
        notificationTime: 0,
      } as Event,
    ];
    expect(findOverlappingEvents(newEvent, events)).toEqual([events[0]]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const newEvent = {
      id: 1 as unknown as string,
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Sample Event',
      description: 'This is a sample event',
      location: 'Sample Location',
      category: 'Sample Category',
      repeat: 'none' as any,
      notificationTime: 0,
    } as Event;
    const events = [
      {
        id: 2 as unknown as string,
        date: '2024-07-01',
        startTime: '10:30',
        endTime: '11:30',
        title: 'Sample Event',
        description: 'This is a sample event',
        location: 'Sample Location',
        category: 'Sample Category',
        repeat: 'none' as any,
        notificationTime: 0,
      } as Event,
    ];
    expect(findOverlappingEvents(newEvent, events)).toEqual([]);
  });
});
