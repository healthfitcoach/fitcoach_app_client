"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, Dumbbell, CheckCircle, GraduationCap, Gift, TrendingDown } from "lucide-react"
import { memberApi } from "@/lib/api"
import { Point, PointHistory } from "@/lib/api/types"

interface PointsScreenProps {
  onBack: () => void
}

function getIcon(type: string) {
  if (type.includes("운동")) return Dumbbell
  if (type.includes("출석")) return CheckCircle
  if (type.includes("PT")) return GraduationCap
  if (type.includes("사용") || type.includes("차감")) return TrendingDown
  return Gift
}

export function PointsScreen({ onBack }: PointsScreenProps) {
  const [activeTab, setActiveTab] = useState<"earn" | "use">("earn")
  const [point, setPoint] = useState<Point | null>(null)
  const [histories, setHistories] = useState<PointHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      memberApi.getPoint().then((r) => setPoint(r.data)),
      memberApi.getPointHistories().then((r) => setHistories(r.data)),
    ])
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const earnList = histories.filter((h) => h.amount > 0)
  const useList = histories.filter((h) => h.amount < 0)
  const displayList = activeTab === "earn" ? earnList : useList

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
          {loading ? (
            <p className="text-4xl font-bold text-primary mt-2">--</p>
          ) : (
            <p className="text-4xl font-bold text-primary mt-2">
              {(point?.balance ?? 0).toLocaleString()}P
            </p>
          )}
          {point?.expiryDate && (
            <p className="text-sm text-muted-foreground mt-2">
              만료일: {point.expiryDate}
            </p>
          )}
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
        {loading ? (
          <p className="text-center text-muted-foreground py-12">불러오는 중...</p>
        ) : displayList.length > 0 ? (
          <div className="space-y-1">
            {displayList.map((item) => {
              const Icon = getIcon(item.reason ?? item.type)
              const isEarn = item.amount > 0
              return (
                <div
                  key={item.historyId}
                  className="flex items-center justify-between py-4 border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-foreground font-medium">
                        {item.reason ?? item.type}
                      </span>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.date}</p>
                    </div>
                  </div>
                  <span className={isEarn ? "text-primary font-semibold" : "text-destructive font-semibold"}>
                    {isEarn ? "+" : ""}{item.amount.toLocaleString()}P
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            {activeTab === "earn" ? "적립 내역이 없습니다" : "사용 내역이 없습니다"}
          </div>
        )}
      </div>
    </div>
  )
}
