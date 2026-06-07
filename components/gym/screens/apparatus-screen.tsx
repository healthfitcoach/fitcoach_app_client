"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { infoApi } from "@/lib/api"
import { Apparatus, ExerciseMethod } from "@/lib/api/types"

interface ApparatusScreenProps {
  onBack: () => void
}

export function ApparatusScreen({ onBack }: ApparatusScreenProps) {
  const [keyword, setKeyword] = useState("")
  const [query, setQuery] = useState("")
  const [list, setList] = useState<Apparatus[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Apparatus | null>(null)
  const [methods, setMethods] = useState<ExerciseMethod[]>([])
  const [methodsLoading, setMethodsLoading] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<ExerciseMethod | null>(null)

  const fetchList = (q?: string) => {
    setLoading(true)
    infoApi
      .getApparatus(q)
      .then((r) => setList(r.data))
      .catch(() => setList([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchList()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(keyword)
    fetchList(keyword || undefined)
  }

  const handleSelect = async (apparatus: Apparatus) => {
    setSelected(apparatus)
    setMethods([])
    setSelectedMethod(null)
    setMethodsLoading(true)
    infoApi
      .getExerciseMethods(String(apparatus.id))
      .then((r) => setMethods(r.data))
      .catch(() => setMethods([]))
      .finally(() => setMethodsLoading(false))
  }

  const STATUS_LABEL: Record<string, string> = {
    ACTIVE: "사용 중",
    INACTIVE: "점검 중",
  }

  // 운동 방법 상세 화면
  if (selectedMethod) {
    return (
      <div className="min-h-screen bg-background pb-10">
        <header className="sticky top-0 z-50 bg-background flex items-center px-4 py-3">
          <button
            onClick={() => setSelectedMethod(null)}
            className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
            {selectedMethod.exerciseName ?? "운동 방법"}
          </h1>
        </header>

        <div className="px-5 pt-4 space-y-4">
          {selectedMethod.image && (
            <img
              src={selectedMethod.image}
              alt={selectedMethod.exerciseName ?? ""}
              className="w-full rounded-xl object-cover max-h-52"
            />
          )}

          <div className="flex flex-wrap gap-2">
            {selectedMethod.targetBodyPart && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {selectedMethod.targetBodyPart}
              </span>
            )}
            {selectedMethod.difficulty && (
              <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">
                난이도: {selectedMethod.difficulty}
              </span>
            )}
          </div>

          {selectedMethod.preparationPose && (
            <div className="bg-secondary rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">준비 자세</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {selectedMethod.preparationPose}
              </p>
            </div>
          )}

          {selectedMethod.stepByStepMethod && (
            <div className="bg-secondary rounded-xl p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">운동 방법</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {selectedMethod.stepByStepMethod}
              </p>
            </div>
          )}

          {selectedMethod.videoUrl && (
            <a
              href={selectedMethod.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 text-center bg-primary rounded-xl text-primary-foreground font-medium"
            >
              영상 보기
            </a>
          )}
        </div>
      </div>
    )
  }

  // 기구 상세 화면
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
            {selected.name}
          </h1>
        </header>

        <div className="px-5 pt-4">
          {/* 기구 정보 카드 */}
          <div className="bg-secondary rounded-2xl p-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold text-foreground">{selected.name}</span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  selected.status === "ACTIVE"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {STATUS_LABEL[selected.status]}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              {selected.category && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">카테고리</span>
                  <span className="text-foreground">{selected.category}</span>
                </div>
              )}
              {selected.quantity && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">수량</span>
                  <span className="text-foreground">{selected.quantity}개</span>
                </div>
              )}
              {selected.manufacturer && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">제조사</span>
                  <span className="text-foreground">{selected.manufacturer}</span>
                </div>
              )}
              {selected.lastInspectionDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">최근 점검일</span>
                  <span className="text-foreground">{selected.lastInspectionDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* 운동 방법 목록 */}
          <h2 className="text-base font-semibold text-foreground mb-3">운동 방법</h2>
          {methodsLoading ? (
            <p className="text-sm text-muted-foreground py-4">불러오는 중...</p>
          ) : methods.length > 0 ? (
            <div className="space-y-2">
              {methods.map((method) => (
                <button
                  key={method.methodId}
                  onClick={() => setSelectedMethod(method)}
                  className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-4 hover:bg-muted transition-colors"
                >
                  <div className="text-left">
                    <p className="font-medium text-foreground">
                      {method.exerciseName ?? "운동 방법"}
                    </p>
                    <div className="flex gap-2 mt-1">
                      {method.targetBodyPart && (
                        <span className="text-xs text-primary">{method.targetBodyPart}</span>
                      )}
                      {method.difficulty && (
                        <span className="text-xs text-muted-foreground">
                          · {method.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">
              등록된 운동 방법이 없습니다.
            </p>
          )}
        </div>
      </div>
    )
  }

  // 기구 목록 화면
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
          기구 검색
        </h1>
      </header>

      <div className="px-5 pt-2 pb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="기구명 또는 카테고리 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-9 pr-9 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            {keyword && (
              <button
                type="button"
                onClick={() => { setKeyword(""); setQuery(""); fetchList() }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-3 bg-primary rounded-xl text-primary-foreground text-sm font-medium"
          >
            검색
          </button>
        </form>
        {query && (
          <p className="text-sm text-muted-foreground mt-2">
            &quot;{query}&quot; 검색 결과 {list.length}건
          </p>
        )}
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-12 text-sm">불러오는 중...</p>
      ) : list.length > 0 ? (
        <div className="px-5 space-y-2">
          {list.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-4 hover:bg-muted transition-colors"
            >
              <div className="text-left">
                <p className="font-medium text-foreground">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {item.category && (
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  )}
                  <span
                    className={`text-xs font-medium ${
                      item.status === "ACTIVE" ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    · {STATUS_LABEL[item.status]}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground text-sm">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
