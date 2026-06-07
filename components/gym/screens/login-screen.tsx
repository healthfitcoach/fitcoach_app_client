"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

interface LoginScreenProps {
  onSignup: () => void
}

export function LoginScreen({ onSignup }: LoginScreenProps) {
  const { login } = useAuth()
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login({ loginId, password })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-5">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">안녕하세요!</h1>
        <p className="text-muted-foreground mt-1">FitCoach에 로그인하세요.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
            className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <button
        onClick={onSignup}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        아직 회원이 아니신가요?{" "}
        <span className="text-primary font-medium">회원가입</span>
      </button>
    </div>
  )
}
