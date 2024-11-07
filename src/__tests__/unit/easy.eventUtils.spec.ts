import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

const mockEvents: Event[] = [
  // 여기에 이벤트 객체를 추가하세요
  {
    id: '1',
    title: '이벤트 1',
    date: '2024-07-01',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    location: '',
    category: '',
    repeat: 'none' as any,
    notificationTime: 0,
  },
  {
    id: '2',
    title: '이벤트 2',
    date: '2024-07-02',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    location: '',
    category: '',
    repeat: 'none' as any,
    notificationTime: 0,
  },
];

describe('getFilteredEvents', () => {
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const events = getFilteredEvents(
      mockEvents as Event[],
      '이벤트 2',
      new Date('2024-07-01'),
      'week'
    );
    expect(events).toEqual([
      {
        category: '',
        date: '2024-07-02',
        description: '',
        endTime: '10:00',
        id: '2',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 2',
      },
    ]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const events = getFilteredEvents(mockEvents as Event[], '', new Date('2024-07-01'), 'week');
    expect(events).toEqual([
      {
        category: '',
        date: '2024-07-01',
        description: '',
        endTime: '10:00',
        id: '1',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 1',
      },
      {
        category: '',
        date: '2024-07-02',
        description: '',
        endTime: '10:00',
        id: '2',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 2',
      },
    ]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const events = getFilteredEvents(mockEvents as Event[], '', new Date('2024-07-01'), 'month');
    expect(events).toEqual([
      {
        category: '',
        date: '2024-07-01',
        description: '',
        endTime: '10:00',
        id: '1',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 1',
      },
      {
        category: '',
        date: '2024-07-02',
        description: '',
        endTime: '10:00',
        id: '2',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 2',
      },
    ]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const events = getFilteredEvents(
      mockEvents as Event[],
      '이벤트',
      new Date('2024-07-01'),
      'week'
    );
    expect(events).toEqual([
      {
        category: '',
        date: '2024-07-01',
        description: '',
        endTime: '10:00',
        id: '1',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 1',
      },
      {
        category: '',
        date: '2024-07-02',
        description: '',
        endTime: '10:00',
        id: '2',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 2',
      },
    ]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const events = getFilteredEvents(mockEvents as Event[], '', new Date('2024-07-01'), 'week');
    expect(events).toEqual([
      {
        category: '',
        date: '2024-07-01',
        description: '',
        endTime: '10:00',
        id: '1',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 1',
      },
      {
        category: '',
        date: '2024-07-02',
        description: '',
        endTime: '10:00',
        id: '2',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 2',
      },
    ]);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const events = getFilteredEvents(
      mockEvents as Event[],
      '이벤트 1',
      new Date('2024-07-01'),
      'week'
    );
    expect(events).toEqual([
      {
        category: '',
        date: '2024-07-01',
        description: '',
        endTime: '10:00',
        id: '1',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 1',
      },
    ]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const events = getFilteredEvents(mockEvents as Event[], '', new Date('2024-07-01'), 'month');
    expect(events).toEqual([
      {
        category: '',
        date: '2024-07-01',
        description: '',
        endTime: '10:00',
        id: '1',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 1',
      },
      {
        category: '',
        date: '2024-07-02',
        description: '',
        endTime: '10:00',
        id: '2',
        location: '',
        notificationTime: 0,
        repeat: 'none',
        startTime: '09:00',
        title: '이벤트 2',
      },
    ]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const events = getFilteredEvents([], '', new Date('2024-07-01'), 'week');
    expect(events).toEqual([]);
  });
});
