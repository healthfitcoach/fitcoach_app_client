"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, CalendarCheck } from "lucide-react"
import { memberApi } from "@/lib/api"
import { Attendance } from "@/lib/api/types"

interface AttendanceHistoryScreenProps {
  onBack: () => void
}

function formatDateTime(dt: string): { date: string; time: string } {
  const d = new Date(dt)
  const days = ["일", "월", "화", "수", "목", "금", "토"]
  const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} (${days[d.getDay()]})`
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
  return { date, time }
}

export function AttendanceHistoryScreen({ onBack }: AttendanceHistoryScreenProps) {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    memberApi
      .getAttendances()
      .then((r) => {
        const sorted = [...r.data].sort(
          (a, b) =>
            new Date(b.attendanceDateTime).getTime() -
            new Date(a.attendanceDateTime).getTime()
        )
        setAttendances(sorted)
      })
      .catch(() => setAttendances([]))
      .finally(() => setLoading(false))
  }, [])

  // 이번 달 출석 수
  const thisMonth = new Date().toISOString().slice(0, 7)
  const thisMonthCount = attendances.filter((a) =>
    a.attendanceDateTime.startsWith(thisMonth)
  ).length

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background flex items-center px-4 py-3">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
          출석 내역
        </h1>
      </header>

      {/* 요약 */}
      <div className="px-5 pt-4 mb-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-primary">{attendances.length}</p>
            <span className="text-xs text-muted-foreground">누적 출석일</span>
          </div>
          <div className="bg-secondary rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-primary">{thisMonthCount}</p>
            <span className="text-xs text-muted-foreground">이번 달 출석</span>
          </div>
        </div>
      </div>

      {/* 목록 */}
      <div className="px-5">
        <h2 className="text-base font-semibold text-foreground mb-3">출석 기록</h2>
        {loading ? (
          <p className="text-center text-muted-foreground py-12 text-sm">불러오는 중...</p>
        ) : attendances.length > 0 ? (
          <div className="space-y-2">
            {attendances.map((a) => {
              const { date, time } = formatDateTime(a.attendanceDateTime)
              const recordCount = a.exerciseRecords?.length ?? 0
              return (
                <div key={a.id} className="bg-secondary rounded-xl px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CalendarCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{date}</p>
                        <p className="text-sm text-muted-foreground">{time} 체크인</p>
                      </div>
                    </div>
                    {recordCount > 0 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        운동 {recordCount}종목
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <CalendarCheck className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">출석 기록이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
