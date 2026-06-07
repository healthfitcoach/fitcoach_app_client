import { api } from './client';
import { LoginRequest, LoginResponse, SignupRequest } from './types';

export const authApi = {
  /** 로그인 */
  login: (body: LoginRequest) =>
    api.post<LoginResponse>('/api/auth/login', body),

  /** 회원가입 */
  signup: (body: SignupRequest) =>
    api.post<number>('/api/auth/signup', body),

  /** 아이디 중복 확인 (true = 이미 사용 중) */
  checkLoginId: (loginId: string) =>
    api.get<boolean>(`/api/auth/check-id?loginId=${encodeURIComponent(loginId)}`),
};
