"use client"

import { ChevronLeft, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title?: string
  showBack?: boolean
  showNotification?: boolean
  onBack?: () => void
  rightElement?: React.ReactNode
  className?: string
}

export function Header({
  title,
  showBack = false,
  showNotification = false,
  onBack,
  rightElement,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background flex items-center justify-between px-4 py-3 min-h-[56px]",
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-[40px]">
        {showBack && (
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
      </div>

      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-foreground">
          {title}
        </h1>
      )}

      <div className="flex items-center gap-2 min-w-[40px] justify-end">
        {showNotification && (
          <button className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        )}
        {rightElement}
      </div>
    </header>
  )
}
