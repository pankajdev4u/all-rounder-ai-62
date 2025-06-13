"use client"

import { useState, useEffect } from "react"

export function useScreenMonitor() {
  const [screenContent, setScreenContent] = useState("")

  useEffect(() => {
    // Mock screen monitoring - in a real app, this would use native APIs
    const mockScreenContent = () => {
      const contexts = [
        "Code editor with TypeScript function",
        "Zoom meeting with 5 participants",
        "Email composition window",
        "Browser with documentation",
        "Terminal with error messages",
        "Presentation slides about AI",
      ]

      setScreenContent(contexts[Math.floor(Math.random() * contexts.length)])
    }

    // Simulate screen content updates
    const interval = setInterval(mockScreenContent, 5000)
    mockScreenContent() // Initial call

    return () => clearInterval(interval)
  }, [])

  return { screenContent }
}
