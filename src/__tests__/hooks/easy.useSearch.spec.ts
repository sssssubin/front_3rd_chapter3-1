import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const mockEvents: Event[] = [
  {
    id: '1',
    title: '회의',
    description: '팀 미팅',
    location: '회의실',
    date: '2024-10-01',
    startTime: '09:00',
    endTime: '10:00',
    category: 'meeting',
    repeat: { type: 'none', interval: 1, endDate: '2024-10-08' },
    notificationTime: 30,
  },
  {
    id: '2',
    title: '점심',
    description: '팀 점심',
    location: '식당',
    date: '2024-10-02',
    startTime: '12:00',
    endTime: '13:00',
    category: 'meal',
    repeat: { type: 'none', interval: 1, endDate: '2024-10-08' },
    notificationTime: 15,
  },
];

describe('useSearch 훅', () => {
  it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-10-01'), 'month'));
    expect(result.current.filteredEvents).toEqual(mockEvents);
  });

  it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-10-01'), 'month'));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toEqual([mockEvents[0]]);
  });

  it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
    const searchTestEvents: Event[] = [
      {
        id: '1',
        title: '회의',
        description: '일반 미팅',
        location: '회의실',
        date: '2024-10-01',
        startTime: '09:00',
        endTime: '10:00',
        category: 'meeting',
        repeat: { type: 'none', interval: 1, endDate: '2024-10-08' },
        notificationTime: 30,
      },
      {
        id: '2',
        title: '점심',
        description: '회의하며 식사',
        location: '식당',
        date: '2024-10-02',
        startTime: '12:00',
        endTime: '13:00',
        category: 'meal',
        repeat: { type: 'none', interval: 1, endDate: '2024-10-08' },
        notificationTime: 15,
      },
      {
        id: '3',
        title: '휴식',
        description: '휴식',
        location: '회의실',
        date: '2024-10-03',
        startTime: '15:00',
        endTime: '16:00',
        category: 'break',
        repeat: { type: 'none', interval: 1, endDate: '2024-10-08' },
        notificationTime: 10,
      },
    ];

    const { result } = renderHook(() =>
      useSearch(searchTestEvents, new Date('2024-10-01'), 'month')
    );

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toEqual([
      searchTestEvents[0],
      searchTestEvents[1],
      searchTestEvents[2],
    ]);
  });

  it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
    const viewTestEvents: Event[] = [
      {
        id: '1',
        title: '회의',
        description: '팀 미팅',
        location: '회의실',
        date: '2024-10-01',
        startTime: '09:00',
        endTime: '10:00',
        category: 'meeting',
        repeat: { type: 'none', interval: 1, endDate: '2024-10-08' },
        notificationTime: 30,
      },
      {
        id: '2',
        title: '점심',
        description: '팀 점심',
        location: '식당',
        date: '2024-10-08',
        startTime: '12:00',
        endTime: '13:00',
        category: 'meal',
        repeat: { type: 'none', interval: 1, endDate: '2024-10-08' },
        notificationTime: 15,
      },
    ];

    const { result } = renderHook(() => useSearch(viewTestEvents, new Date('2024-10-01'), 'week'));
    expect(result.current.filteredEvents).toEqual([viewTestEvents[0]]);
  });

  it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
    const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-10-01'), 'month'));

    act(() => {
      result.current.setSearchTerm('회의');
    });
    expect(result.current.filteredEvents).toEqual([mockEvents[0]]);

    act(() => {
      result.current.setSearchTerm('점심');
    });
    expect(result.current.filteredEvents).toEqual([mockEvents[1]]);
  });
});
