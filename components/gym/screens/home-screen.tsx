"use client"

import { useEffect, useState } from "react"
import { Bell, ChevronRight, Search, Volume2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { memberApi } from "@/lib/api"
import { Membership } from "@/lib/api/types"

function PTIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="8" rx="1" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M8 16v2" />
      <path d="M16 16v2" />
    </svg>
  )
}

function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 7h2v10H6z" />
      <path d="M16 7h2v10h-2z" />
      <path d="M8 10h8v4H8z" />
      <path d="M4 9h2v6H4z" />
      <path d="M18 9h2v6h-2z" />
    </svg>
  )
}

interface HomeScreenProps {
  onNavigate: (screen: string) => void
}

function calcDday(endDate: string): string {
  const diff = Math.ceil(
    (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  if (diff < 0) return "만료"
  return `D-${diff}`
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { member } = useAuth()
  const [membership, setMembership] = useState<Membership | null>(null)
  const [pointBalance, setPointBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      memberApi.getActiveMembership().then((r) => setMembership(r.data)).catch(() => {}),
      memberApi.getPoint().then((r) => setPointBalance(r.data.balance)).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [])

  const displayName = member?.nickname ?? member?.name ?? "회원"

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div />
        <button className="p-2 text-foreground">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      {/* Greeting */}
      <div className="px-5 pt-2 pb-4">
        <h1 className="text-2xl font-bold text-foreground">
          안녕하세요,
          <br />
          {displayName}님 👋
        </h1>
      </div>

      {/* Check-in Card */}
      <div className="px-5 mb-6">
        <button
          onClick={() => onNavigate("attendance")}
          className="w-full bg-primary rounded-2xl p-5 text-left relative overflow-hidden"
        >
          <span className="text-primary-foreground/80 text-sm font-medium">오늘 운동</span>
          <h2 className="text-primary-foreground text-xl font-bold mt-1">출석하기</h2>
          <p className="text-primary-foreground/70 text-sm mt-1">
            헬스장에 도착하셨나요?
          </p>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-primary-foreground" />
          </div>
        </button>
      </div>

      {/* Status Section */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-foreground">내 현황</h3>
          <button className="text-sm text-muted-foreground flex items-center">
            더보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-4">
          <div
            onClick={() => onNavigate("membership")}
            className="flex-1 bg-secondary rounded-xl p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <span className="text-sm text-muted-foreground">회원권</span>
            {loading ? (
              <p className="text-2xl font-bold text-primary mt-1">--</p>
            ) : membership ? (
              <>
                <p className="text-2xl font-bold text-primary mt-1">{calcDday(membership.endDate)}</p>
                <p className="text-xs text-muted-foreground mt-1">{membership.endDate} 만료</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">없음</p>
            )}
          </div>
          <div
            onClick={() => onNavigate("points")}
            className="flex-1 bg-secondary rounded-xl p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <span className="text-sm text-muted-foreground">포인트</span>
            {loading ? (
              <p className="text-2xl font-bold text-primary mt-1">--</p>
            ) : (
              <>
                <p className="text-2xl font-bold text-primary mt-1">
                  {pointBalance !== null ? `${pointBalance.toLocaleString()}P` : "0P"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">사용 가능 포인트</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="px-5">
        <h3 className="text-base font-semibold text-foreground mb-3">빠른 메뉴</h3>
        <div className="bg-secondary rounded-xl overflow-hidden">
          <button
            onClick={() => onNavigate("pt-reservation")}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors"
          >
            <PTIcon className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">PT 예약</span>
          </button>
          <div className="h-px bg-border mx-4" />
          <button
            onClick={() => onNavigate("records")}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors"
          >
            <DumbbellIcon className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">운동 기록</span>
          </button>
          <div className="h-px bg-border mx-4" />
          <button
            onClick={() => onNavigate("apparatus")}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">기구 검색</span>
          </button>
          <div className="h-px bg-border mx-4" />
          <button
            onClick={() => onNavigate("notices")}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors"
          >
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">공지사항</span>
          </button>
        </div>
      </div>
    </div>
  )
}
