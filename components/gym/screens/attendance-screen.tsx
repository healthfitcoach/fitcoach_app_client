"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Clock, ChevronRight, CheckCircle2 } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { activityApi } from "@/lib/api"
import { getToken } from "@/lib/api/client"
import { Attendance } from "@/lib/api/types"

interface AttendanceScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
}

export function AttendanceScreen({ onBack, onNavigate }: AttendanceScreenProps) {
  const [timeLeft, setTimeLeft] = useState(299)
  const [checkedIn, setCheckedIn] = useState<Attendance | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // QR 값은 현재 토큰 (회원 식별용)
  const qrValue = getToken() ?? "FITCOACH-GUEST"

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCheckIn = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await activityApi.checkIn()
      setCheckedIn(res.data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "출석 체크에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background flex items-center px-4 py-3">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="px-5 pt-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">출석 체크</h1>
          {checkedIn ? (
            <p className="text-primary font-medium">출석이 완료되었습니다!</p>
          ) : (
            <p className="text-muted-foreground">
              QR 코드를 스캔하거나
              <br />
              아래 버튼으로 출석을 완료해주세요.
            </p>
          )}
        </div>

        {/* QR Code / Success */}
        <div className="flex justify-center mb-8">
          {checkedIn ? (
            <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-24 h-24 text-primary" />
            </div>
          ) : (
            <div className="bg-secondary rounded-2xl p-8">
              <div className="bg-white p-4 rounded-xl">
                <QRCodeSVG
                  value={qrValue}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
          )}
        </div>

        {/* Timer */}
        {!checkedIn && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
            <Clock className="w-5 h-5" />
            <span>남은 시간</span>
            <span className="font-semibold text-foreground">{formatTime(timeLeft)}</span>
          </div>
        )}

        {/* Check-in Button */}
        {!checkedIn && (
          <button
            onClick={handleCheckIn}
            disabled={loading}
            className="w-full py-4 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 mb-4"
          >
            {loading ? "처리 중..." : "출석 체크인"}
          </button>
        )}

        {error && (
          <p className="text-center text-sm text-destructive mb-4">{error}</p>
        )}

        {checkedIn && (
          <div className="bg-secondary rounded-xl p-4 mb-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">출석 시간</span>
              <span className="text-foreground font-medium">
                {new Date(checkedIn.attendanceDateTime).toLocaleString("ko-KR")}
              </span>
            </div>
          </div>
        )}

        {/* View History Link */}
        <button
          onClick={() => onNavigate?.("attendance-history")}
          className="w-full flex items-center justify-center gap-1 text-primary font-medium"
        >
          출석 내역 보기 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
