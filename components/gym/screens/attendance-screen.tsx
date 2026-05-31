"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Clock, ChevronRight } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface AttendanceScreenProps {
  onBack: () => void
}

export function AttendanceScreen({ onBack }: AttendanceScreenProps) {
  const [timeLeft, setTimeLeft] = useState(299) // 4:59 in seconds

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
          <p className="text-muted-foreground">
            QR 코드를 스캔하여
            <br />
            출석을 완료해주세요.
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-8">
          <div className="bg-secondary rounded-2xl p-8">
            <div className="bg-white p-4 rounded-xl">
              <QRCodeSVG
                value="GYM-CHECKIN-2024-MEMBER-12345"
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
          <Clock className="w-5 h-5" />
          <span>남은 시간</span>
          <span className="font-semibold text-foreground">{formatTime(timeLeft)}</span>
        </div>

        {/* View History Link */}
        <button className="w-full flex items-center justify-center gap-1 text-primary font-medium">
          출석 내역 보기 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
