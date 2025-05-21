"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CountdownTimerProps {
  targetDate: Date | string
  title?: string
  endText?: string
}

export function CountdownTimer({ targetDate, title = "Time Left", endText = "Ending" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value
  }

  const formatEndTime = (date: Date | string) => {
    const endDate = new Date(date)
    const hours = endDate.getHours()
    const minutes = endDate.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${endText} ${endDate.toLocaleDateString(undefined, { weekday: "long" })} at ${formattedHours}:${formattedMinutes} ${ampm}`
  }

  return (
    <Card className="bg-[#1e2a47] text-white border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          <TimeUnit value={formatTime(timeLeft.days)} label="days" />
          <TimeUnit value={formatTime(timeLeft.hours)} label="hours" />
          <TimeUnit value={formatTime(timeLeft.minutes)} label="min" />
          <TimeUnit value={formatTime(timeLeft.seconds)} label="sec" />
        </div>
        <p className="text-sm mt-3 text-gray-300">{timeLeft.isExpired ? "Expired" : formatEndTime(targetDate)}</p>
      </CardContent>
    </Card>
  )
}

interface TimeUnitProps {
  value: string | number
  label: string
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="bg-[#d13b4a] rounded-md p-3 flex flex-col items-center justify-center">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  )
}
