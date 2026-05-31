"use client"

import { FileText, Calendar, Search, Loader2 } from "lucide-react"

interface EmptyStateProps {
  type: "no-records" | "no-reservations" | "no-results" | "loading"
  onAction?: () => void
}

const emptyStates = {
  "no-records": {
    icon: FileText,
    title: "기록이 없어요",
    description: "운동을 기록하고\n포인트를 받아보세요!",
    buttonText: "기록 시작하기",
  },
  "no-reservations": {
    icon: Calendar,
    title: "예약 내역이 없어요",
    description: "PT 예약을\n체계적으로 관리하세요!",
    buttonText: "PT 예약하기",
  },
  "no-results": {
    icon: Search,
    title: "검색 결과가 없어요",
    description: "다른 검색어를 입력하거나\n조건을 변경해보세요.",
    buttonText: "다시 검색하기",
  },
  "loading": {
    icon: Loader2,
    title: "준비 중이에요",
    description: "더 좋은 서비스를 위해\n준비하고 있어요.",
    buttonText: "확인",
  },
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const state = emptyStates[type]
  const Icon = state.icon

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Icon 
          className={`w-12 h-12 text-primary ${type === "loading" ? "animate-spin" : ""}`} 
        />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{state.title}</h3>
      <p className="text-sm text-muted-foreground text-center whitespace-pre-line mb-6">
        {state.description}
      </p>
      <button
        onClick={onAction}
        className="px-6 py-3 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
      >
        {state.buttonText}
      </button>
    </div>
  )
}
