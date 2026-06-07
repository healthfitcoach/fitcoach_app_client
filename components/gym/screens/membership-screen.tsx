"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, CreditCard, Clock, Dumbbell, FileText } from "lucide-react"
import { memberApi } from "@/lib/api"
import { Membership } from "@/lib/api/types"

interface MembershipScreenProps {
  onBack: () => void
}

function calcDday(endDate: string): string {
  const diff = Math.ceil(
    (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  if (diff < 0) return "만료"
  return `D-${diff}`
}

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "이용 중",
  PAUSED: "일시정지",
  CANCELLED: "취소됨",
}

export function MembershipScreen({ onBack }: MembershipScreenProps) {
  const [membership, setMembership] = useState<Membership | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    memberApi
      .getActiveMembership()
      .then((r) => setMembership(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background flex items-center px-4 py-3">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
          회원권 관리
        </h1>
      </header>

      {/* Membership Card */}
      <div className="px-5 pt-4 mb-6">
        <div className="bg-primary rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-20">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M20 30L40 20L60 30L40 40L20 30Z" fill="white" />
              <path d="M20 40L40 50L60 40" stroke="white" strokeWidth="2" />
              <path d="M20 50L40 60L60 50" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          {loading ? (
            <p className="text-primary-foreground/70 text-sm">불러오는 중...</p>
          ) : membership ? (
            <>
              <span className="text-primary-foreground/80 text-sm font-medium">
                {membership.type ?? "회원권"} · {STATUS_LABEL[membership.status]}
              </span>
              <p className="text-5xl font-bold text-primary-foreground mt-2">
                {calcDday(membership.endDate)}
              </p>
              <p className="text-primary-foreground/70 text-sm mt-2">
                {membership.startDate} ~ {membership.endDate}
              </p>
            </>
          ) : (
            <p className="text-primary-foreground/70 text-sm">활성 회원권이 없습니다.</p>
          )}
        </div>
      </div>

      {/* Extend Button */}
      <div className="px-5 mb-6">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-secondary rounded-xl text-foreground font-medium hover:bg-muted transition-colors">
          <CreditCard className="w-5 h-5" />
          회원권 연장
        </button>
      </div>

      {/* Info List */}
      <div className="px-5">
        <div className="space-y-1">
          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">이용 시간</span>
            </div>
            <span className="text-muted-foreground">06:00 ~ 24:00</span>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">주 이용 시설</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>헬스, GX룸, 사우나</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">이용 안내</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>이용 규칙 및 안내사항</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
