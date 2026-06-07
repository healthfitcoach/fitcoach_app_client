"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, CalendarDays, Plus, X } from "lucide-react"
import { memberApi, activityApi } from "@/lib/api"
import { ExerciseRecord, ExerciseRecordRequest } from "@/lib/api/types"

interface RecordsScreenProps {
  onBack?: () => void
}

function formatDate(date: Date): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"]
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} (${days[date.getDay()]})`
}

function toISODate(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function RecordsScreen({ onBack }: RecordsScreenProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [records, setRecords] = useState<ExerciseRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<ExerciseRecordRequest>({
    date: toISODate(new Date()),
    exerciseType: "",
    exerciseTime: undefined,
    sets: undefined,
    reps: undefined,
    memo: "",
  })

  const fetchRecords = async () => {
    setLoading(true)
    try {
      // 전체 출석 기록에서 운동 기록 추출
      const res = await memberApi.getAttendances()
      const dateStr = toISODate(currentDate)
      const todayAttendances = res.data.filter((a) => a.attendanceDateTime.startsWith(dateStr))
      const allRecords = todayAttendances.flatMap((a) => a.exerciseRecords ?? [])
      setRecords(allRecords)
    } catch {
      setRecords([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [currentDate])

  const goDate = (delta: number) => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + delta)
    setCurrentDate(d)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await activityApi.recordExercise({ ...form, date: toISODate(currentDate) })
      setShowForm(false)
      setForm({ date: toISODate(currentDate), exerciseType: "", memo: "" })
      await fetchRecords()
    } catch {
    } finally {
      setSubmitting(false)
    }
  }

  const totalMinutes = records.reduce((sum, r) => sum + (r.exerciseTime ?? 0), 0)

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
        <button onClick={() => goDate(-1)} className="p-1 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-medium text-foreground">{formatDate(currentDate)}</span>
        <button onClick={() => goDate(1)} className="p-1 text-muted-foreground hover:text-foreground">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Today's Exercise */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">오늘의 운동</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 text-primary text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            기록 추가
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-sm py-4">불러오는 중...</p>
        ) : records.length > 0 ? (
          <div className="space-y-3">
            {records.map((record) => (
              <div
                key={record.recordId}
                className="bg-secondary rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <span className="text-sm font-medium text-primary">{record.exerciseType}</span>
                  {record.sets && record.reps && (
                    <p className="text-muted-foreground text-sm mt-0.5">
                      {record.sets}세트 × {record.reps}회
                    </p>
                  )}
                  {record.memo && (
                    <p className="text-muted-foreground text-xs mt-0.5">{record.memo}</p>
                  )}
                </div>
                {record.exerciseTime && (
                  <span className="text-muted-foreground text-sm">{record.exerciseTime}분</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm py-4 text-center">운동 기록이 없습니다.</p>
        )}
      </div>

      {/* Summary */}
      {records.length > 0 && (
        <div className="px-5 mt-6">
          <h2 className="text-base font-semibold text-foreground mb-4">기록 요약</h2>
          <div className="bg-secondary rounded-xl p-5 flex gap-8">
            <div>
              <span className="text-sm text-muted-foreground">총 운동 시간</span>
              <p className="text-2xl font-bold text-foreground mt-1">{totalMinutes}분</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">운동 종목</span>
              <p className="text-2xl font-bold text-foreground mt-1">{records.length}개</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Record Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
          <div className="w-full max-w-md mx-auto bg-background rounded-t-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">운동 기록 추가</h3>
              <button onClick={() => setShowForm(false)}>
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="운동 종목 (예: 벤치프레스)"
                value={form.exerciseType}
                onChange={(e) => setForm((f) => ({ ...f, exerciseType: e.target.value }))}
                required
                className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="운동 시간 (분)"
                  min={1}
                  value={form.exerciseTime ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, exerciseTime: e.target.value ? Number(e.target.value) : undefined }))}
                  className="flex-1 px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="세트"
                  min={1}
                  value={form.sets ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, sets: e.target.value ? Number(e.target.value) : undefined }))}
                  className="flex-1 px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="횟수"
                  min={1}
                  value={form.reps ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, reps: e.target.value ? Number(e.target.value) : undefined }))}
                  className="flex-1 px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="text"
                placeholder="메모 (선택)"
                value={form.memo ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))}
                className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "저장 중..." : "저장"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
