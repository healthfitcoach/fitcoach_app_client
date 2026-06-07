"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { memberApi } from "@/lib/api"
import { MemberUpdateRequest } from "@/lib/api/types"

interface ProfileEditScreenProps {
  onBack: () => void
}

export function ProfileEditScreen({ onBack }: ProfileEditScreenProps) {
  const { member, refreshMember } = useAuth()

  const [form, setForm] = useState<MemberUpdateRequest & { newPasswordConfirm?: string }>({
    nickname: member?.nickname ?? "",
    phone: member?.phone ?? "",
    birthDate: member?.birthDate ?? "",
    bodyInfo: member?.bodyInfo ?? "",
    address: member?.address ?? "",
    newPassword: "",
    newPasswordConfirm: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (form.newPassword && form.newPassword !== form.newPasswordConfirm) {
      setError("새 비밀번호가 일치하지 않습니다.")
      return
    }

    setSubmitting(true)
    try {
      const { newPasswordConfirm, ...updateBody } = form
      // 빈 값 제거
      const cleaned: MemberUpdateRequest = Object.fromEntries(
        Object.entries(updateBody).filter(([, v]) => v !== "" && v !== undefined)
      ) as MemberUpdateRequest

      await memberApi.updateMe(cleaned)
      await refreshMember()
      setSuccess(true)
      setForm((prev) => ({ ...prev, newPassword: "", newPasswordConfirm: "" }))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "수정에 실패했습니다.")
    } finally {
      setSubmitting(false)
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
          내 정보 수정
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="px-5 pt-4 space-y-4">
        {/* 읽기 전용 필드 */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">아이디 (변경 불가)</label>
          <input
            type="text"
            value={member?.loginId ?? ""}
            disabled
            className="w-full px-4 py-3 bg-muted rounded-xl text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">이름 (변경 불가)</label>
          <input
            type="text"
            value={member?.name ?? ""}
            disabled
            className="w-full px-4 py-3 bg-muted rounded-xl text-muted-foreground"
          />
        </div>

        {/* 수정 가능 필드 */}
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">닉네임</label>
          <input
            type="text"
            placeholder="닉네임"
            value={form.nickname ?? ""}
            onChange={(e) => set("nickname", e.target.value)}
            className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">전화번호</label>
          <input
            type="tel"
            placeholder="010-0000-0000"
            value={form.phone ?? ""}
            onChange={(e) => set("phone", e.target.value)}
            className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">생년월일</label>
          <input
            type="date"
            value={form.birthDate ?? ""}
            onChange={(e) => set("birthDate", e.target.value)}
            className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">주소</label>
          <input
            type="text"
            placeholder="주소"
            value={form.address ?? ""}
            onChange={(e) => set("address", e.target.value)}
            className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">신체 정보 (키/몸무게 등)</label>
          <input
            type="text"
            placeholder="예: 170cm / 65kg"
            value={form.bodyInfo ?? ""}
            onChange={(e) => set("bodyInfo", e.target.value)}
            className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="pt-2">
          <p className="text-sm font-semibold text-foreground mb-3">비밀번호 변경 (선택)</p>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="새 비밀번호 (8자 이상)"
              value={form.newPassword ?? ""}
              onChange={(e) => set("newPassword", e.target.value)}
              minLength={form.newPassword ? 8 : undefined}
              className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={form.newPasswordConfirm ?? ""}
              onChange={(e) => set("newPasswordConfirm", e.target.value)}
              className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}
        {success && (
          <p className="text-sm text-primary text-center">수정되었습니다.</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {submitting ? "저장 중..." : "저장"}
        </button>
      </form>
    </div>
  )
}
