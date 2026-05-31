"use client"

import { ChevronLeft, Dumbbell, CheckCircle, GraduationCap, Gift } from "lucide-react"
import { useState } from "react"

interface PointsScreenProps {
  onBack: () => void
}

const pointsHistory = [
  { type: "운동 기록", icon: Dumbbell, points: "+100P", date: "2024.05.20", description: "" },
  { type: "출석 체크", icon: CheckCircle, points: "+50P", date: "2024.05.20", description: "" },
  { type: "PT 수업 완료", icon: GraduationCap, points: "+300P", date: "2024.05.18", description: "" },
  { type: "이벤트 참여", icon: Gift, points: "+200P", date: "2024.05.15", description: "" },
]

export function PointsScreen({ onBack }: PointsScreenProps) {
  const [activeTab, setActiveTab] = useState<"earn" | "use">("earn")

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
          포인트
        </h1>
      </header>

      {/* Points Summary */}
      <div className="px-5 pt-4 mb-4">
        <div className="bg-secondary rounded-2xl p-5 text-center">
          <span className="text-sm text-muted-foreground">사용 가능 포인트</span>
          <p className="text-4xl font-bold text-primary mt-2">3,200P</p>
          <div className="flex justify-center gap-8 mt-4 text-sm">
            <div>
              <span className="text-muted-foreground">적립 예정</span>
              <p className="text-foreground font-medium mt-1">500P</p>
            </div>
            <div>
              <span className="text-muted-foreground">이번 달 소멸 예정</span>
              <p className="text-foreground font-medium mt-1">200P</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Points Button */}
      <div className="px-5 mb-6">
        <button className="w-full py-3 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
          포인트 사용하기
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("earn")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "earn"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            적립 내역
          </button>
          <button
            onClick={() => setActiveTab("use")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "use"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            사용 내역
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="px-5">
        {activeTab === "earn" ? (
          <div className="space-y-1">
            {pointsHistory.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-foreground font-medium">{item.type}</span>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-primary font-semibold">{item.points}</span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            사용 내역이 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
