"use client"

import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PTReservationScreenProps {
  onBack: () => void
}

const trainers = [
  { name: "김태훈 트레이너", experience: "경력 6년", rating: "고객 만족도 4.9", time: "10:00" },
  { name: "이지현 트레이너", experience: "경력 8년", rating: "고객 만족도 4.8", time: "11:00" },
  { name: "박민수 트레이너", experience: "경력 10년", rating: "고객 만족도 4.9", time: "12:00" },
  { name: "최유진 트레이너", experience: "경력 5년", rating: "고객 만족도 4.7", time: "13:00" },
]

export function PTReservationScreen({ onBack }: PTReservationScreenProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(22)
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null)

  const calendarDays = [
    { week: 1, days: [null, null, null, 1, 2, 3, 4] },
    { week: 2, days: [5, 6, 7, 8, 9, 10, 11] },
    { week: 3, days: [12, 13, 14, 15, 16, 17, 18] },
    { week: 4, days: [19, 20, 21, 22, 23, 24, 25] },
    { week: 5, days: [26, 27, 28, 29, 30, null, null] },
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

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
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : step > s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {s === 1 ? "일시 선택" : s === 2 ? "트레이너 선택" : "예약 확인"}
              </span>
            </div>
            {s < 3 && <div className="w-12 h-0.5 bg-border -mt-5" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1 px-5">
        {step === 1 && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">날짜 선택</h2>
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button className="p-1 text-muted-foreground">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium text-foreground">2024년 5월</span>
              <button className="p-1 text-muted-foreground">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar */}
            <div className="bg-secondary rounded-xl p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>
              {calendarDays.map((week) => (
                <div key={week.week} className="grid grid-cols-7 gap-1">
                  {week.days.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && setSelectedDate(day)}
                      disabled={!day}
                      className={cn(
                        "py-2 text-center text-sm rounded-lg transition-colors",
                        day === selectedDate
                          ? "bg-primary text-primary-foreground font-semibold"
                          : day
                          ? "text-foreground hover:bg-muted"
                          : "text-transparent"
                      )}
                    >
                      {day || ""}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">트레이너 선택</h2>
            <div className="space-y-3">
              {trainers.map((trainer) => (
                <button
                  key={trainer.name}
                  onClick={() => setSelectedTrainer(trainer.name)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors",
                    selectedTrainer === trainer.name
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-semibold">
                      {trainer.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{trainer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {trainer.experience} | {trainer.rating}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-secondary rounded-lg text-primary font-semibold text-sm">
                    {trainer.time}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-6">
              예약이 완료되었습니다!
            </h2>
            <div className="w-full bg-secondary rounded-xl p-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">예약 일시</span>
                <span className="text-foreground font-medium">2024.05.22 (수) 10:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">트레이너</span>
                <span className="text-foreground font-medium">김태훈 트레이너</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">장소</span>
                <span className="text-foreground font-medium">강남점 PT룸 1</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              {"예약 내역은 마이 > PT 예약 내역에서"}
              <br />
              확인할 수 있습니다.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-5 pb-8">
        {step < 3 ? (
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={handlePrev}
                className="flex-1 py-4 bg-secondary rounded-xl text-foreground font-semibold hover:bg-muted transition-colors"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={step === 2 && !selectedTrainer}
              className={cn(
                "flex-1 py-4 rounded-xl font-semibold transition-colors",
                step === 2 && !selectedTrainer
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              다음
            </button>
          </div>
        ) : (
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
