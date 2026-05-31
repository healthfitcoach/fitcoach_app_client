"use client"

import { 
  ChevronRight, 
  User,
  CreditCard, 
  Calendar, 
  Bell, 
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react"

interface MyPageScreenProps {
  onNavigate: (screen: string) => void
}

const menuItems = [
  { icon: CreditCard, label: "회원권 관리", screen: "membership" },
  { icon: Calendar, label: "예약 내역", screen: "reservations" },
  { icon: Bell, label: "알림 설정", screen: "notifications" },
  { icon: Settings, label: "설정", screen: "settings" },
  { icon: HelpCircle, label: "고객센터", screen: "help" },
]

export function MyPageScreen({ onNavigate }: MyPageScreenProps) {
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
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">경수님</h2>
            <p className="text-sm text-muted-foreground">010-1234-5678</p>
            <p className="text-sm text-muted-foreground">gym_user@email.com</p>
          </div>
          <button className="p-2 text-muted-foreground hover:text-foreground">
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
            <p className="text-2xl font-bold text-primary">D-12</p>
            <span className="text-xs text-muted-foreground">회원권</span>
          </button>
          <button 
            onClick={() => onNavigate("points")}
            className="bg-secondary rounded-xl p-4 text-center hover:bg-muted transition-colors"
          >
            <p className="text-2xl font-bold text-primary">3,200</p>
            <span className="text-xs text-muted-foreground">포인트</span>
          </button>
          <button className="bg-secondary rounded-xl p-4 text-center hover:bg-muted transition-colors">
            <p className="text-2xl font-bold text-primary">15</p>
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
        <button className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="w-5 h-5" />
          로그아웃
        </button>
      </div>
    </div>
  )
}
