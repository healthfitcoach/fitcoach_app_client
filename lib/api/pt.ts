import { api } from './client';
import {
  PTSubscription,
  PTSchedule,
  PTScheduleRequest,
  Trainer,
} from './types';

export const ptApi = {
  /** 트레이너 목록 / 전문분야 검색 */
  getTrainers: (keyword?: string) => {
    const q = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
    return api.get<Trainer[]>(`/api/pt/trainers${q}`);
  },

  /** 내 활성 PT 이용권 목록 */
  getMyActivePTs: () => api.get<PTSubscription[]>('/api/pt/my'),

  /** PT 일정 예약 */
  reserveSchedule: (body: PTScheduleRequest) =>
    api.post<PTSchedule>('/api/pt/schedules', body),

  /** 슬롯 예약 가능 여부 확인 */
  checkSlotAvailability: (trainerId: number, date: string, time: string) =>
    api.get<boolean>(
      `/api/pt/schedules/availability?trainerId=${trainerId}&date=${date}&time=${encodeURIComponent(time)}`,
    ),
};
