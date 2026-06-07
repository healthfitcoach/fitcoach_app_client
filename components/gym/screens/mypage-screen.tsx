"use client"

import { useEffect, useState } from "react"
import {
  ChevronRight,
  User,
  CreditCard,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { memberApi } from "@/lib/api"
import { Membership } from "@/lib/api/types"

interface MyPageScreenProps {
  onNavigate: (screen: string) => void
}

const menuItems = [
  { icon: CreditCard, label: "회원권 관리", screen: "membership" },
  { icon: Calendar, label: "예약 내역", screen: "reservation" },
  { icon: Bell, label: "알림 설정", screen: "notifications" },
  { icon: Settings, label: "설정", screen: "settings" },
  { icon: HelpCircle, label: "고객센터", screen: "help" },
]

function calcDday(endDate: string): string {
  const diff = Math.ceil(
    (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
  if (diff < 0) return "만료"
  return `D-${diff}`
}

export function MyPageScreen({ onNavigate }: MyPageScreenProps) {
  const { member, logout } = useAuth()
  const [membership, setMembership] = useState<Membership | null>(null)
  const [pointBalance, setPointBalance] = useState<number | null>(null)
  const [attendanceCount, setAttendanceCount] = useState<number | null>(null)

  useEffect(() => {
    memberApi.getActiveMembership().then((r) => setMembership(r.data)).catch(() => {})
    memberApi.getPoint().then((r) => setPointBalance(r.data.balance)).catch(() => {})
    memberApi.getAttendances().then((r) => setAttendanceCount(r.data.length)).catch(() => {})
  }, [])

  const displayName = member?.nickname ?? member?.name ?? "회원"

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">마이페이지</h1>
      </header>

      {/* Profile Card */}
      <div className="px-5 mb-6">
        <div className="bg-secondary rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            {member?.profileImage ? (
              <img src={member.profileImage} alt="프로필" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">{displayName}님</h2>
            {member?.phone && <p className="text-sm text-muted-foreground">{member.phone}</p>}
            {member?.loginId && <p className="text-sm text-muted-foreground">{member.loginId}</p>}
          </div>
          <button
            onClick={() => onNavigate("profile-edit")}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate("membership")}
            className="bg-secondary rounded-xl p-4 text-center hover:bg-muted transition-colors"
          >
            <p className="text-2xl font-bold text-primary">
              {membership ? calcDday(membership.endDate) : "-"}
            </p>
            <span className="text-xs text-muted-foreground">회원권</span>
          </button>
          <button
            onClick={() => onNavigate("points")}
            className="bg-secondary rounded-xl p-4 text-center hover:bg-muted transition-colors"
          >
            <p className="text-2xl font-bold text-primary">
              {pointBalance !== null ? pointBalance.toLocaleString() : "-"}
            </p>
            <span className="text-xs text-muted-foreground">포인트</span>
          </button>
          <button className="bg-secondary rounded-xl p-4 text-center hover:bg-muted transition-colors">
            <p className="text-2xl font-bold text-primary">
              {attendanceCount !== null ? attendanceCount : "-"}
            </p>
            <span className="text-xs text-muted-foreground">출석일</span>
          </button>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-5">
        <div className="bg-secondary rounded-xl overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.label}>
                <button
                  onClick={() => onNavigate(item.screen)}
                  className="w-full flex items-center justify-between px-4 py-4 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
                {index < menuItems.length - 1 && (
                  <div className="h-px bg-border mx-4" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-5 mt-6">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          로그아웃
        </button>
      </div>
    </div>
  )
}
