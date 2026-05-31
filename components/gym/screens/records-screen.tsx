"use client"

import { ChevronLeft, ChevronRight, CalendarDays, Plus } from "lucide-react"
import { useState } from "react"

interface RecordsScreenProps {
  onBack?: () => void
}

const exercises = [
  { category: "가슴 운동", name: "벤치프레스", sets: "4세트", color: "text-primary" },
  { category: "등 운동", name: "렛풀다운", sets: "4세트", color: "text-primary" },
  { category: "하체 운동", name: "스쿼트", sets: "5세트", color: "text-primary" },
]

export function RecordsScreen({ onBack }: RecordsScreenProps) {
  const [currentDate] = useState(new Date(2024, 4, 20))

  const formatDate = (date: Date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"]
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} (${days[date.getDay()]})`
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background flex items-center justify-between px-4 py-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
          운동 기록
        </h1>
        <button className="p-2 text-foreground">
          <CalendarDays className="w-6 h-6" />
        </button>
      </header>

      {/* Date Navigation */}
      <div className="px-5 py-3 flex items-center justify-between">
        <button className="p-1 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-medium text-foreground">{formatDate(currentDate)}</span>
        <button className="p-1 text-muted-foreground hover:text-foreground">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Today's Exercise */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">오늘의 운동</h2>
          <button className="flex items-center gap-1 text-primary text-sm font-medium">
            <Plus className="w-4 h-4" />
            기록 추가
          </button>
        </div>

        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <span className={`text-sm font-medium ${exercise.color}`}>
                  {exercise.category}
                </span>
                <p className="text-muted-foreground text-sm mt-0.5">{exercise.name}</p>
              </div>
              <span className="text-muted-foreground text-sm">{exercise.sets}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="px-5 mt-6">
        <h2 className="text-base font-semibold text-foreground mb-4">기록 요약</h2>
        <div className="bg-secondary rounded-xl p-5 flex gap-8">
          <div>
            <span className="text-sm text-muted-foreground">운동 시간</span>
            <p className="text-2xl font-bold text-foreground mt-1">01:25:30</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">칼로리</span>
            <p className="text-2xl font-bold text-foreground mt-1">520 kcal</p>
          </div>
        </div>
      </div>
    </div>
  )
}
