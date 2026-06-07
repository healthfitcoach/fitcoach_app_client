'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { authApi, memberApi } from './api';
import { getToken, setToken, removeToken } from './api/client';
import { LoginRequest, SignupRequest, MemberInfoResponse } from './api/types';

interface AuthContextValue {
  isLoggedIn: boolean;
  member: MemberInfoResponse | null;
  login: (body: LoginRequest) => Promise<void>;
  signup: (body: SignupRequest) => Promise<void>;
  logout: () => void;
  refreshMember: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<MemberInfoResponse | null>(null);

  const refreshMember = useCallback(async () => {
    try {
      const res = await memberApi.getMe();
      setMember(res.data);
    } catch {
      setMember(null);
    }
  }, []);

  useEffect(() => {
    if (getToken()) {
      refreshMember();
    }
  }, [refreshMember]);

  const login = async (body: LoginRequest) => {
    const res = await authApi.login(body);
    setToken(res.data.token);
    await refreshMember();
  };

  const signup = async (body: SignupRequest) => {
    await authApi.signup(body);
  };

  const logout = () => {
    removeToken();
    setMember(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!member,
        member,
        login,
        signup,
        logout,
        refreshMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
