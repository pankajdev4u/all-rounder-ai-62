"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TranscriptPopupProps {
  transcript: string
  onAskAI: () => void
}

export function TranscriptPopup({ transcript, onAskAI }: TranscriptPopupProps) {
  const [time, setTime] = useState("01:40")

  // Update timer
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date()
      const minutes = date.getMinutes().toString().padStart(2, "0")
      const seconds = date.getSeconds().toString().padStart(2, "0")
      setTime(`${minutes}:${seconds}`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed left-1/2 top-1/3 -translate-x-1/2 z-50">
      <Card className="w-[400px] bg-gray-900/95 backdrop-blur-md border border-gray-700/50 text-white shadow-2xl">
        <div className="p-4">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-green-400">All-rounder is listening...</h2>
          </div>

          {/* Transcript */}
          <ScrollArea className="bg-gray-800/50 rounded-lg p-3 mb-4 h-[300px]">
            <p className="text-gray-300 text-sm mb-4">
              {transcript ||
                "This is a web-based simulation of the 'All-rounder' desktop AI assistant. In a real desktop application (Electron/Tauri): The control panel would be truly **floating, always-on-top, and repositionable**. **Screen content** would be automatically analyzed via OCR/context detection. **Ambient audio** would be passively listened to via OS-level microphone access. The app would be **invisible in screen shares/recordings**."}
            </p>

            {/* Timer */}
            <div className="flex justify-center my-4">
              <Badge variant="outline" className="bg-gray-800/70 text-gray-300 px-4 py-1 text-lg">
                {time}
              </Badge>
            </div>

            {/* Suggested Context */}
            <div className="space-y-2">
              <div className="text-xs text-gray-500 mb-2">**Keyboard Shortcuts (Simulated):**</div>
              <div className="text-xs text-gray-400">
                • Ctrl + B: Toggle Show/Hide Overlay
                <br />• Ctrl + Enter: Ask AI (for screen content answer)
                <br />• Ctrl + Shift + S: Start Over (simulated for Ctrl + Windows)
                <br />• Ctrl + Shift + C: Open Chat (simulated for Ctrl + Arrow Up + Enter)
              </div>
            </div>
          </ScrollArea>

          {/* Scroll Controls */}
          <div className="flex justify-center gap-2 mb-3">
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-white/10">
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-white/10">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400">
            <p>Press Control+Enter to ask AI</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
