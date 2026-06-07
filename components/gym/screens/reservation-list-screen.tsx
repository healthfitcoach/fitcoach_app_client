"use client"

import { useEffect, useState } from "react"
import { Calendar, Plus } from "lucide-react"
import { ptApi } from "@/lib/api"
import { PTSubscription } from "@/lib/api/types"

interface ReservationListScreenProps {
  onNavigate: (screen: string) => void
}

export function ReservationListScreen({ onNavigate }: ReservationListScreenProps) {
  const [ptList, setPtList] = useState<PTSubscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ptApi
      .getMyActivePTs()
      .then((r) => setPtList(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">예약</h1>
        <button
          onClick={() => onNavigate("pt-reservation")}
          className="flex items-center gap-1 px-4 py-2 bg-primary rounded-full text-primary-foreground text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          새 예약
        </button>
      </header>

      {/* Active PT Subscriptions */}
      <div className="px-5">
        <h2 className="text-base font-semibold text-foreground mb-3">내 PT 이용권</h2>

        {loading ? (
          <p className="text-sm text-muted-foreground py-4">불러오는 중...</p>
        ) : ptList.length > 0 ? (
          <div className="space-y-3">
            {ptList.map((pt) => (
              <div key={pt.id} className="bg-secondary rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">
                      PT 이용권 #{pt.id}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {pt.status === "ACTIVE" ? "이용 중" : "완료"}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">잔여 횟수</span>
                    <span className="text-foreground font-medium">
                      {pt.remainingCount} / {pt.totalCount}회
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">트레이너</span>
                    <span className="text-foreground">#{pt.trainerId}</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate("pt-reservation")}
                  className="mt-3 w-full py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors"
                >
                  PT 예약하기
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">PT 이용권이 없어요</p>
            <button
              onClick={() => onNavigate("pt-reservation")}
              className="px-6 py-3 bg-primary rounded-xl text-primary-foreground font-semibold"
            >
              PT 예약하기
            </button>
          </div>
        )}
      </div>

      {/* Past Reservations Link */}
      <div className="px-5 mt-6">
        <button className="w-full py-3 text-center text-muted-foreground text-sm">
          지난 예약 내역 보기
        </button>
      </div>
    </div>
  )
}
