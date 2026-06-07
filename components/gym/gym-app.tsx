"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { BottomNav } from "./bottom-nav"
import { LoginScreen } from "./screens/login-screen"
import { SignupScreen } from "./screens/signup-screen"
import { HomeScreen } from "./screens/home-screen"
import { RecordsScreen } from "./screens/records-screen"
import { AttendanceScreen } from "./screens/attendance-screen"
import { MembershipScreen } from "./screens/membership-screen"
import { PointsScreen } from "./screens/points-screen"
import { PTReservationScreen } from "./screens/pt-reservation-screen"
import { MyPageScreen } from "./screens/mypage-screen"
import { ReservationListScreen } from "./screens/reservation-list-screen"

type Screen =
  | "home"
  | "records"
  | "reservation"
  | "mypage"
  | "attendance"
  | "membership"
  | "points"
  | "pt-reservation"

type Tab = "home" | "records" | "reservation" | "mypage"

type AuthScreen = "login" | "signup"

export function GymApp() {
  const { isLoggedIn } = useAuth()
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login")
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [activeTab, setActiveTab] = useState<Tab>("home")

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen)
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setCurrentScreen(tab)
  }

  const handleBack = () => {
    setCurrentScreen(activeTab)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />
      case "records":
        return <RecordsScreen />
      case "reservation":
        return <ReservationListScreen onNavigate={handleNavigate} />
      case "mypage":
        return <MyPageScreen onNavigate={handleNavigate} />
      case "attendance":
        return <AttendanceScreen onBack={handleBack} />
      case "membership":
        return <MembershipScreen onBack={handleBack} />
      case "points":
        return <PointsScreen onBack={handleBack} />
      case "pt-reservation":
        return <PTReservationScreen onBack={handleBack} />
      default:
        return <HomeScreen onNavigate={handleNavigate} />
    }
  }

  const showBottomNav = ["home", "records", "reservation", "mypage"].includes(currentScreen)

  if (!isLoggedIn) {
    if (authScreen === "signup") {
      return (
        <div className="max-w-md mx-auto bg-background h-screen flex flex-col">
          <div className="h-11 bg-background flex-shrink-0" />
          <div className="flex-1 overflow-y-auto">
            <SignupScreen
              onBack={() => setAuthScreen("login")}
              onSuccess={() => setAuthScreen("login")}
            />
          </div>
        </div>
      )
    }
    return (
      <div className="max-w-md mx-auto bg-background h-screen flex flex-col">
        <div className="h-11 bg-background flex-shrink-0" />
        <div className="flex-1 overflow-y-auto">
          <LoginScreen onSignup={() => setAuthScreen("signup")} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-background h-screen flex flex-col">
      {/* Mobile Status Bar Simulation */}
      <div className="h-11 bg-background flex-shrink-0" />

      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>

      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  )
}
