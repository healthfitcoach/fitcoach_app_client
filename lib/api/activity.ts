import { api } from './client';
import { Attendance, ExerciseRecord, ExerciseRecordRequest } from './types';

export const activityApi = {
  /** 출석 체크인 */
  checkIn: () => api.post<Attendance>('/api/activity/attendance'),

  /** 운동 기록 등록 */
  recordExercise: (body: ExerciseRecordRequest) =>
    api.post<ExerciseRecord>('/api/activity/exercise-records', body),

  /** 포인트 적립 (오늘 운동 기록 기반) */
  earnPoints: (exerciseTime: number) =>
    api.post<number>(`/api/activity/points/earn?exerciseTime=${exerciseTime}`),
};
