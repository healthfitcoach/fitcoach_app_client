"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { authApi } from "@/lib/api"

interface SignupScreenProps {
  onBack: () => void
  onSuccess: () => void
}

export function SignupScreen({ onBack, onSuccess }: SignupScreenProps) {
  const { login } = useAuth()
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    name: "",
    nickname: "",
    phone: "",
  })
  const [idDuplicate, setIdDuplicate] = useState<boolean | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleCheckId = async () => {
    if (!form.loginId) return
    const res = await authApi.checkLoginId(form.loginId)
    setIdDuplicate(res.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.")
      return
    }
    if (idDuplicate === true) {
      setError("이미 사용 중인 아이디입니다.")
      return
    }

    setLoading(true)
    try {
      const { loginId, password, name, nickname, phone } = form
      await authApi.signup({ loginId, password, name, nickname, phone })
      await login({ loginId, password })
      onSuccess()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="sticky top-0 z-50 bg-background flex items-center px-4 py-3">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
          회원가입
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="px-5 pt-4 space-y-4">
        {/* 아이디 */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="아이디"
            value={form.loginId}
            onChange={(e) => { set("loginId", e.target.value); setIdDuplicate(null) }}
            required
            className="flex-1 px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={handleCheckId}
            className="px-4 py-3 bg-secondary rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors whitespace-nowrap"
          >
            중복확인
          </button>
        </div>
        {idDuplicate === false && (
          <p className="text-sm text-primary -mt-2">사용 가능한 아이디입니다.</p>
        )}
        {idDuplicate === true && (
          <p className="text-sm text-destructive -mt-2">이미 사용 중인 아이디입니다.</p>
        )}

        <input
          type="password"
          placeholder="비밀번호 (8자 이상)"
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          required
          minLength={8}
          className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={form.passwordConfirm}
          onChange={(e) => set("passwordConfirm", e.target.value)}
          required
          className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          placeholder="이름"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          required
          className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          placeholder="닉네임"
          value={form.nickname}
          onChange={(e) => set("nickname", e.target.value)}
          required
          className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="tel"
          placeholder="전화번호 (010-0000-0000)"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          required
          className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </form>
    </div>
  )
}
