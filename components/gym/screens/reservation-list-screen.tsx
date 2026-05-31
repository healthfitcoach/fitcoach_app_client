"use client"

import { Calendar, Plus } from "lucide-react"

interface ReservationListScreenProps {
  onNavigate: (screen: string) => void
}

const upcomingReservations = [
  {
    id: 1,
    date: "2024.05.22 (수)",
    time: "10:00",
    trainer: "김태훈 트레이너",
    location: "강남점 PT룸 1",
    status: "예약 확정",
  },
  {
    id: 2,
    date: "2024.05.25 (토)",
    time: "14:00",
    trainer: "이지현 트레이너",
    location: "강남점 PT룸 2",
    status: "예약 확정",
  },
]

export function ReservationListScreen({ onNavigate }: ReservationListScreenProps) {
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

      {/* Upcoming Reservations */}
      <div className="px-5">
        <h2 className="text-base font-semibold text-foreground mb-3">다가오는 예약</h2>
        
        {upcomingReservations.length > 0 ? (
          <div className="space-y-3">
            {upcomingReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-secondary rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">
                      {reservation.date} {reservation.time}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {reservation.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">트레이너</span>
                    <span className="text-foreground">{reservation.trainer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">장소</span>
                    <span className="text-foreground">{reservation.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">예약 내역이 없어요</p>
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
