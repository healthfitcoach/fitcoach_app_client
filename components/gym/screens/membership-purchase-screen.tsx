"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, Check, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { purchaseApi } from "@/lib/api"
import { MembershipProduct, Membership } from "@/lib/api/types"

interface MembershipPurchaseScreenProps {
  onBack: () => void
  onSuccess?: () => void
}

const PAYMENT_METHODS = ["카드", "계좌이체", "포인트"]

export function MembershipPurchaseScreen({ onBack, onSuccess }: MembershipPurchaseScreenProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [products, setProducts] = useState<MembershipProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<MembershipProduct | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("카드")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<Membership | null>(null)

  useEffect(() => {
    purchaseApi
      .getMembershipProducts()
      .then((r) => setProducts(r.data.filter((p) => p.status === "ON_SALE")))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const today = new Date()
  const startDate = today.toISOString().split("T")[0]
  const endDateObj = new Date(today)
  endDateObj.setMonth(endDateObj.getMonth() + (selectedProduct?.monthCount ?? 1))
  const endDate = endDateObj.toISOString().split("T")[0]

  const handlePurchase = async () => {
    if (!selectedProduct) return
    setSubmitting(true)
    setError("")
    try {
      const res = await purchaseApi.purchaseMembership({
        productId: selectedProduct.id,
        startDate,
        endDate,
      })
      setResult(res.data)
      setStep(3)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "구매에 실패했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background flex items-center px-4 py-3">
        <button
          onClick={step > 1 && step < 3 ? () => setStep((s) => (s - 1) as 1 | 2 | 3) : onBack}
          className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
          회원권 구매
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
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {s === 1 ? "상품 선택" : s === 2 ? "결제" : "완료"}
              </span>
            </div>
            {s < 3 && <div className="w-12 h-0.5 bg-border -mt-5" />}
          </div>
        ))}
      </div>

      <div className="flex-1 px-5 overflow-y-auto">
        {/* Step 1: 상품 선택 */}
        {step === 1 && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">회원권 상품</h2>
            {loading ? (
              <p className="text-sm text-muted-foreground py-4">불러오는 중...</p>
            ) : products.length > 0 ? (
              <div className="space-y-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={cn(
                      "w-full text-left rounded-xl border-2 p-4 transition-colors",
                      selectedProduct?.id === product.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">{product.name}</span>
                      {selectedProduct?.id === product.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.monthCount}개월 이용권
                    </p>
                    {product.description && (
                      <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                    )}
                    <p className="text-lg font-bold text-primary">
                      {product.price.toLocaleString()}원
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">
                판매 중인 상품이 없습니다.
              </p>
            )}
          </div>
        )}

        {/* Step 2: 결제 */}
        {step === 2 && selectedProduct && (
          <div className="space-y-4">
            <div className="bg-secondary rounded-xl p-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">주문 상품</h3>
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{selectedProduct.name}</span>
                <span className="font-bold text-primary">
                  {selectedProduct.price.toLocaleString()}원
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedProduct.monthCount}개월 · {startDate} ~ {endDate}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">결제 수단</h3>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={cn(
                      "py-3 rounded-xl border-2 text-sm font-medium transition-colors",
                      paymentMethod === method
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary/30"
                    )}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">상품 금액</span>
                <span className="text-foreground">{selectedProduct.price.toLocaleString()}원</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex items-center justify-between py-2">
                <span className="font-semibold text-foreground">최종 결제 금액</span>
                <span className="font-bold text-primary text-lg">
                  {selectedProduct.price.toLocaleString()}원
                </span>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
          </div>
        )}

        {/* Step 3: 완료 */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CreditCard className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">구매 완료!</h2>
            <p className="text-muted-foreground text-sm mb-6">회원권이 활성화되었습니다.</p>
            {result && (
              <div className="w-full bg-secondary rounded-xl p-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">이용 기간</span>
                  <span className="text-foreground font-medium">
                    {result.startDate} ~ {result.endDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">상태</span>
                  <span className="text-primary font-medium">이용 중</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-5 pb-8">
        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            disabled={!selectedProduct}
            className={cn(
              "w-full py-4 rounded-xl font-semibold transition-colors",
              selectedProduct
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground"
            )}
          >
            다음
          </button>
        )}
        {step === 2 && (
          <button
            onClick={handlePurchase}
            disabled={submitting}
            className="w-full py-4 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "결제 중..." : `${selectedProduct?.price.toLocaleString()}원 결제하기`}
          </button>
        )}
        {step === 3 && (
          <button
            onClick={onSuccess ?? onBack}
            className="w-full py-4 bg-primary rounded-xl text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            확인
          </button>
        )}
      </div>
    </div>
  )
}
