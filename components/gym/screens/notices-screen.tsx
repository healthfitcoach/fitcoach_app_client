"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react"
import { infoApi } from "@/lib/api"
import { Notice } from "@/lib/api/types"

interface NoticesScreenProps {
  onBack: () => void
}

const CATEGORY_LABEL: Record<string, string> = {
  NOTICE: "공지",
  EVENT: "이벤트",
  UPDATE: "변경",
  MAINTENANCE: "점검",
}

export function NoticesScreen({ onBack }: NoticesScreenProps) {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Notice | null>(null)

  useEffect(() => {
    infoApi
      .getNotices()
      .then((r) => setNotices(r.data))
      .catch(() => setNotices([]))
      .finally(() => setLoading(false))
  }, [])

  // 공지 상세 화면
  if (selected) {
    return (
      <div className="min-h-screen bg-background pb-10">
        <header className="sticky top-0 z-50 bg-background flex items-center px-4 py-3">
          <button
            onClick={() => setSelected(null)}
            className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
            공지사항
          </h1>
        </header>

        <div className="px-5 pt-4">
          <div className="mb-1">
            {selected.category && (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {CATEGORY_LABEL[selected.category] ?? selected.category}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-foreground mt-2 mb-1">{selected.title}</h2>
          {selected.createdDate && (
            <p className="text-sm text-muted-foreground mb-5">{selected.createdDate}</p>
          )}
          <div className="h-px bg-border mb-5" />
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {selected.content ?? "내용이 없습니다."}
          </p>
        </div>
      </div>
    )
  }

  // 공지 목록 화면
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
          공지사항
        </h1>
      </header>

      <div className="px-5 pt-2">
        {loading ? (
          <p className="text-center text-muted-foreground py-16 text-sm">불러오는 중...</p>
        ) : notices.length > 0 ? (
          <div className="divide-y divide-border">
            {notices.map((notice) => (
              <button
                key={notice.id}
                onClick={() => setSelected(notice)}
                className="w-full flex items-center justify-between py-4 hover:bg-muted/50 transition-colors text-left px-1"
              >
                <div className="flex-1 mr-3">
                  <div className="flex items-center gap-2 mb-1">
                    {notice.category && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {CATEGORY_LABEL[notice.category] ?? notice.category}
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-foreground line-clamp-1">{notice.title}</p>
                  {notice.createdDate && (
                    <p className="text-xs text-muted-foreground mt-1">{notice.createdDate}</p>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Megaphone className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">공지사항이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
