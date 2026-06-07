// ─── 공통 응답 래퍼 ──────────────────────────────────────────
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// ─── Auth ─────────────────────────────────────────────────────
export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  memberId: number;
  name: string;
  nickname: string;
}

export interface SignupRequest {
  loginId: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  birthDate?: string;       // "YYYY-MM-DD"
  bodyInfo?: string;
  address?: string;
  profileImage?: string;
}

// ─── Member ───────────────────────────────────────────────────
export interface MemberInfoResponse {
  id: number;
  loginId: string;
  name: string;
  nickname: string;
  phone: string;
  birthDate?: string;
  bodyInfo?: string;
  address?: string;
  profileImage?: string;
  joinDate?: string;
}

export interface MemberUpdateRequest {
  nickname?: string;
  phone?: string;
  birthDate?: string;
  bodyInfo?: string;
  address?: string;
  profileImage?: string;
  newPassword?: string;
}

// ─── Activity ─────────────────────────────────────────────────
export interface ExerciseRecord {
  recordId: string;
  memberId: string;
  exerciseDate: string;
  exerciseType: string;
  exerciseTime?: number;
  sets?: number;
  reps?: number;
  memo?: string;
  photo?: string;
}

export interface ExerciseRecordRequest {
  date: string;
  exerciseType: string;
  exerciseTime?: number;
  sets?: number;
  reps?: number;
  memo?: string;
  photo?: string;
}

export interface Attendance {
  id: number;
  memberId: number;
  attendanceDateTime: string;
  authMethod?: string;
  exerciseRecords?: ExerciseRecord[];
}

// ─── Point ────────────────────────────────────────────────────
export interface PointHistory {
  historyId: string;
  memberId: string;
  type: string;
  amount: number;
  reason?: string;
  date: string;
  balanceAfter: number;
}

export interface Point {
  pointId: string;
  memberId: string;
  balance: number;
  expiryDate?: string;
  histories?: PointHistory[];
}

// ─── Membership ───────────────────────────────────────────────
export type MembershipStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED';

export interface Membership {
  id: number;
  memberId: number;
  productId: number;
  type?: string;
  price?: number;
  status: MembershipStatus;
  startDate: string;
  endDate: string;
  pauseDate?: string;
  resumeDate?: string;
}

export interface MembershipProduct {
  id: number;
  name: string;
  price: number;
  description?: string;
  status: 'ON_SALE' | 'OFF_SALE';
  monthCount: number;
}

export interface MembershipPurchaseRequest {
  productId: number;
  startDate: string;
  endDate: string;
}

// ─── PT ───────────────────────────────────────────────────────
export type PTSubscriptionStatus = 'ACTIVE' | 'COMPLETED';
export type PTScheduleStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface PTSubscription {
  id: number;
  status: PTSubscriptionStatus;
  totalCount: number;
  remainingCount: number;
  price: number;
  trainerId: number;
  memberId: number;
  productId: number;
}

export interface PTProduct {
  id: number;
  name: string;
  price: number;
  description?: string;
  status: 'ON_SALE' | 'OFF_SALE';
  sessionCount: number;
  prMessage?: string;
  trainerId: number;
}

export interface PTSchedule {
  id: number;
  ptId: number;
  trainerId: number;
  memberId: number;
  scheduleDate: string;
  scheduleTime: string;
  status: PTScheduleStatus;
}

export interface PTScheduleRequest {
  ptId: number;
  trainerId: number;
  date: string;
  time: string;
}

export interface PTPurchaseRequest {
  productId: number;
  trainerId: number;
  firstDate: string;
  firstTime: string;
}

// ─── Trainer ──────────────────────────────────────────────────
export interface Trainer {
  trainerId: number;
  specialty?: string;
  certification?: string;
  rating?: number;
  experienceYears?: number;
  profileImage?: string;
}

// ─── Purchase / Order / Payment ───────────────────────────────
export interface Payment {
  paymentId: string;
  memberId: string;
  productId: string;
  productType?: string;
  paymentMethod?: string;
  amount: number;
  usedPoints?: number;
  status?: string;
  paymentDateTime?: string;
  pgAuthNumber?: string;
}

export interface Order {
  orderId: string;
  memberId: string;
  productId: string;
  quantity?: number;
  totalAmount?: number;
  shippingAddress?: string;
  status?: string;
  orderDateTime?: string;
  payment?: Payment;
}

export interface PaymentRequest {
  amount: number;
  productId: string;
  productType: string;
  paymentMethod: string;
  usedPoints?: number;
}

export interface EquipmentPurchaseRequest {
  productId: number;
  quantity?: number;
  shippingAddress: string;
}

// ─── Products ─────────────────────────────────────────────────
export interface SportEquipment {
  id: number;
  name: string;
  price: number;
  description?: string;
  status: 'ON_SALE' | 'OFF_SALE';
  stock?: number;
  category?: string;
}

export interface ExerciseProgram {
  id: number;
  name: string;
  price: number;
  description?: string;
  status: 'ON_SALE' | 'OFF_SALE';
  startDate?: string;
  endDate?: string;
  capacity?: number;
  remainingCapacity?: number;
  instructorId?: number;
}

export interface AdditionalProduct {
  id: number;
  name: string;
  price: number;
  description?: string;
  status: 'ON_SALE' | 'OFF_SALE';
  usagePeriodDays?: number;
}

// ─── Info ─────────────────────────────────────────────────────
export interface Notice {
  id: number;
  title: string;
  content?: string;
  category?: string;
  createdDate?: string;
  attachment?: string;
  authorEmployeeId?: number;
}

export interface ExerciseMethod {
  methodId: string;
  equipmentId: string;
  exerciseName?: string;
  targetBodyPart?: string;
  difficulty?: string;
  preparationPose?: string;
  stepByStepMethod?: string;
  image?: string;
  videoUrl?: string;
}

export interface Apparatus {
  id: number;
  name: string;
  category?: string;
  status: 'ACTIVE' | 'INACTIVE';
  quantity?: number;
  manufacturer?: string;
  purchaseDate?: string;
  lastInspectionDate?: string;
  exerciseMethods?: ExerciseMethod[];
}
