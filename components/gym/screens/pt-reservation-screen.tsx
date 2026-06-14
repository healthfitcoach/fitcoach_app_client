"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ptApi } from "@/lib/api"
import { PTSubscription, PTSchedule } from "@/lib/api/types"

interface PTReservationScreenProps {
  onBack: () => void
}

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

function toISODate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export function PTReservationScreen({ onBack }: PTReservationScreenProps) {
  const [step, setStep] = useState(1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedPT, setSelectedPT] = useState<PTSubscription | null>(null)
  const [ptList, setPtList] = useState<PTSubscription[]>([])
  const [completedSchedule, setCompletedSchedule] = useState<PTSchedule | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    ptApi.getMyActivePTs().then((r) => setPtList(r.data)).catch(() => {})
  }, [])

  // 달력 계산
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay()
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
  const weeks: (number | null)[][] = []
  let dayCounter = 1 - firstDay
  while (dayCounter <= daysInMonth) {
    const week: (number | null)[] = []
    for (let i = 0; i < 7; i++) {
      week.push(dayCounter >= 1 && dayCounter <= daysInMonth ? dayCounter : null)
      dayCounter++
    }
    weeks.push(week)
  }

  const today = new Date()
  const isCurrentMonth = (year: number, month: number) =>
    year === today.getFullYear() && month === today.getMonth()

  const prevMonth = () => {
    const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear
    const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1
    setSelectedYear(newYear)
    setSelectedMonth(newMonth)
    setSelectedDay(isCurrentMonth(newYear, newMonth) ? today.getDate() : 1)
  }
  const nextMonth = () => {
    const newYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear
    const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1
    setSelectedYear(newYear)
    setSelectedMonth(newMonth)
    setSelectedDay(isCurrentMonth(newYear, newMonth) ? today.getDate() : 1)
  }
  const handleNext = () => { if (step < 3) setStep(s => s + 1) }
  const handlePrev = () => { if (step > 1) setStep(s => s - 1) }

  const handleReserve = async () => {
    if (!selectedDay || !selectedTime || !selectedPT) return
    setSubmitting(true)
    setError("")
    try {
      const res = await ptApi.reserveSchedule({
        ptId: selectedPT.id,
        trainerId: selectedPT.trainerId,
        date: toISODate(selectedYear, selectedMonth, selectedDay),
        time: selectedTime,
      })
      setCompletedSchedule(res.data)
      setStep(3)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "예약에 실패했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  const canNext1 = selectedDay !== null && selectedTime !== null
  const canNext2 = selectedPT !== null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background flex items-center px-4 py-3">
        <button
          onClick={step > 1 ? handlePrev : onBack}
          className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          {step > 1 && step < 3 ? <X className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
        <h1 className="text-lg font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
          PT 예약
        </h1>
      </header>

      {/* Step Indicator */}
      <div className="px-5 py-4 flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              )}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {s === 1 ? "일시 선택" : s === 2 ? "이용권 선택" : "예약 확인"}
              </span>
            </div>
            {s < 3 && <div className="w-12 h-0.5 bg-border -mt-5" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1 px-5 overflow-y-auto">
        {/* Step 1: 날짜 & 시간 선택 */}
        {step === 1 && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">날짜 선택</h2>
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-1 text-muted-foreground">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium text-foreground">
                {selectedYear}년 {selectedMonth + 1}월
              </span>
              <button onClick={nextMonth} className="p-1 text-muted-foreground">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-secondary rounded-xl p-4 mb-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                  <div key={d} className="text-center text-sm text-muted-foreground py-2">{d}</div>
                ))}
              </div>
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1">
                  {week.map((day, di) => (
                    <button
                      key={di}
                      onClick={() => day && setSelectedDay(day)}
                      disabled={!day}
                      className={cn(
                        "py-2 text-center text-sm rounded-lg transition-colors",
                        day === selectedDay
                          ? "bg-primary text-primary-foreground font-semibold"
                          : day ? "text-foreground hover:bg-muted" : "text-transparent"
                      )}
                    >
                      {day ?? ""}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <h2 className="text-base font-semibold text-foreground mb-3">시간 선택</h2>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={cn(
                    "py-2.5 rounded-xl text-sm font-medium border-2 transition-colors",
                    selectedTime === t
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-foreground hover:border-primary/30"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: PT 선택 */}
        {step === 2 && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">PT 이용권 선택</h2>
            {ptList.length === 0 ? (
              <p className="text-sm text-muted-foreground">활성 PT 이용권이 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {ptList.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPT(pt)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors",
                      selectedPT?.id === pt.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className="text-left">
                      <p className="font-medium text-foreground">PT 이용권 #{pt.id}</p>
                      <p className="text-sm text-muted-foreground">잔여 {pt.remainingCount}회 / {pt.totalCount}회</p>
                    </div>
                    {selectedPT?.id === pt.id && <Check className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
            )}

            {error && <p className="text-sm text-destructive mt-4 text-center">{error}</p>}
          </div>
        )}

        {/* Step 3: 완료 */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-6">예약이 완료되었습니다!</h2>
            {completedSchedule && (
              <div className="w-full bg-secondary rounded-xl p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">예약 날짜</span>
                  <span className="text-foreground font-medium">{completedSchedule.scheduleDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">예약 시간</span>
                  <span className="text-foreground font-medium">{completedSchedule.scheduleTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">트레이너</span>
                  <span className="text-foreground font-medium">#{completedSchedule.trainerId}</span>
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-4 text-center">
              예약 내역은 예약 탭에서 확인할 수 있습니다.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-5 pb-8">
        {step === 1 && (
          <button
            onClick={handleNext}
            disabled={!canNext1}
            className={cn(
              "w-full py-4 rounded-xl font-semibold transition-colors",
              canNext1 ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground"
            )}
          >
            다음
          </button>
        )}
        {step === 2 && (
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="flex-1 py-4 bg-secondary rounded-xl text-foreground font-semibold hover:bg-muted transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleReserve}
              disabled={!canNext2 || submitting}
              className={cn(
                "flex-1 py-4 rounded-xl font-semibold transition-colors",
                canNext2 && !submitting ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground"
              )}
            >
              {submitting ? "예약 중..." : "예약하기"}
            </button>
          </div>
        )}
        {step === 3 && (
          <button
            onClick={onBack}
            className="w-full py-4 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            확인
          </button>
        )}
      </div>
    </div>
  )
}
