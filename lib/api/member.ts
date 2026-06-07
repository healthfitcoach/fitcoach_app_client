import { api } from './client';
import {
  MemberInfoResponse,
  MemberUpdateRequest,
  Membership,
  Order,
  Point,
  PointHistory,
  Attendance,
} from './types';

export const memberApi = {
  /** 내 정보 조회 */
  getMe: () => api.get<MemberInfoResponse>('/api/members/me'),

  /** 내 정보 수정 */
  updateMe: (body: MemberUpdateRequest) =>
    api.put<void>('/api/members/me', body),

  /** 포인트 조회 */
  getPoint: () => api.get<Point>('/api/members/me/point'),

  /** 포인트 내역 조회 */
  getPointHistories: () =>
    api.get<PointHistory[]>('/api/members/me/point-history'),

  /** 주문 목록 조회 */
  getOrders: () => api.get<Order[]>('/api/members/me/orders'),

  /** 회원권 목록 조회 */
  getMemberships: () => api.get<Membership[]>('/api/members/me/memberships'),

  /** 활성 회원권 조회 */
  getActiveMembership: () =>
    api.get<Membership>('/api/members/me/membership/active'),

  /** 출석 기록 조회 */
  getAttendances: () =>
    api.get<Attendance[]>('/api/members/me/attendance'),

  /** PT 잔여 횟수 합계 */
  getActivePtRemainingCount: () =>
    api.get<number>('/api/members/me/pt/remaining-count'),
};
