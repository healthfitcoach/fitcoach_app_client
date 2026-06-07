import { api } from './client';
import { Apparatus, ExerciseMethod, Notice } from './types';

export const infoApi = {
  /** 공지사항 목록 조회 */
  getNotices: () => api.get<Notice[]>('/api/info/notices'),

  /** 공지사항 상세 조회 */
  getNotice: (noticeId: number) =>
    api.get<Notice>(`/api/info/notices/${noticeId}`),

  /** 기구 목록 조회 / 검색 */
  getApparatus: (keyword?: string) => {
    const q = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
    return api.get<Apparatus[]>(`/api/info/apparatus${q}`);
  },

  /** 기구 상세 조회 */
  getApparatusById: (apparatusId: number) =>
    api.get<Apparatus>(`/api/info/apparatus/${apparatusId}`),

  /** 기구별 운동방법 조회 */
  getExerciseMethods: (equipmentId: string) =>
    api.get<ExerciseMethod[]>(`/api/info/apparatus/${equipmentId}/methods`),
};
