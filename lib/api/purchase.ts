import { api } from './client';
import {
  Order,
  Payment,
  PaymentRequest,
  Membership,
  MembershipPurchaseRequest,
  PTSubscription,
  PTPurchaseRequest,
  EquipmentPurchaseRequest,
  MembershipProduct,
  PTProduct,
  ExerciseProgram,
  AdditionalProduct,
  SportEquipment,
  Trainer,
} from './types';

export const purchaseApi = {
  // ── 상품 목록 ──────────────────────────────────────────────
  /** 회원권 상품 목록 */
  getMembershipProducts: () =>
    api.get<MembershipProduct[]>('/api/products/memberships'),

  /** PT 상품 목록 */
  getPtProducts: () => api.get<PTProduct[]>('/api/products/pt'),

  /** 프로그램 상품 목록 */
  getProgramProducts: () =>
    api.get<ExerciseProgram[]>('/api/products/programs'),

  /** 부가상품 목록 */
  getAdditionalProducts: () =>
    api.get<AdditionalProduct[]>('/api/products/additional'),

  /** 운동용품 목록 / 검색 */
  getSportEquipment: (keyword?: string) => {
    const q = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
    return api.get<SportEquipment[]>(`/api/products/sport-equipment${q}`);
  },

  /** 트레이너 목록 / 검색 */
  getTrainers: (keyword?: string) => {
    const q = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
    return api.get<Trainer[]>(`/api/trainers${q}`);
  },

  // ── 구매 ───────────────────────────────────────────────────
  /** 회원권 구매 */
  purchaseMembership: (body: MembershipPurchaseRequest) =>
    api.post<Membership>('/api/purchases/membership', body),

  /** PT 구매 */
  purchasePT: (body: PTPurchaseRequest) =>
    api.post<PTSubscription>('/api/purchases/pt', body),

  /** 운동용품 구매 */
  purchaseEquipment: (body: EquipmentPurchaseRequest) =>
    api.post<Order>('/api/purchases/sport-equipment', body),

  /** 부가상품 구매 */
  purchaseAdditional: (productId: number) =>
    api.post<Order>(`/api/purchases/additional/${productId}`),

  // ── 결제 ───────────────────────────────────────────────────
  /** 결제 처리 */
  processPayment: (body: PaymentRequest) =>
    api.post<Payment>('/api/payments', body),
};
