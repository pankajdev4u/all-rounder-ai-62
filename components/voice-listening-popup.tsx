"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Mic, ChevronUp, ChevronDown, Volume2, BotIcon as Robot, Command, Sparkles } from "lucide-react"

interface VoiceListeningPopupProps {
  transcript: string
  sessionTime: string
  onAskAI: () => void
  isSimulated?: boolean
  onShowCommands?: () => void
  lastDetectedCommand?: { command: any; phrase: string; timestamp: number }
  isListening: boolean
}

export function VoiceListeningPopup({
  transcript,
  sessionTime,
  onAskAI,
  isSimulated = false,
  onShowCommands,
  lastDetectedCommand,
  isListening,
}: VoiceListeningPopupProps) {
  const [followUpQuery, setFollowUpQuery] = useState("")
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Show follow-up input when listening stops and we have transcript
  useEffect(() => {
    if (!isListening && transcript && transcript.trim()) {
      setShowFollowUp(true)
      // Auto-populate with a follow-up question based on transcript
      if (transcript.toLowerCase().includes("capital")) {
        setFollowUpQuery("Tell me more about this capital city")
      } else if (transcript.toLowerCase().includes("weather")) {
        setFollowUpQuery("What's the forecast for tomorrow?")
      } else {
        setFollowUpQuery("Can you explain this in more detail?")
      }
    } else if (isListening) {
      setShowFollowUp(false)
      setFollowUpQuery("")
    }
  }, [isListening, transcript])

  const handleScrollUp = () => {
    setScrollPosition(Math.max(0, scrollPosition - 50))
  }

  const handleScrollDown = () => {
    setScrollPosition(scrollPosition + 50)
  }

  const handleFollowUpSubmit = () => {
    if (followUpQuery.trim()) {
      onAskAI()
      setShowFollowUp(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleFollowUpSubmit()
    }
  }

  return (
    <div className="fixed top-20 right-6 pointer-events-auto z-50">
      <Card
        className={`w-[420px] bg-gray-900/95 backdrop-blur-xl border-2 ${
          isSimulated ? "border-blue-500/50" : isListening ? "border-green-500/50" : "border-purple-500/50"
        } text-white shadow-2xl rounded-2xl overflow-hidden`}
      >
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                {isSimulated ? (
                  <Robot className="h-6 w-6 text-blue-400" />
                ) : isListening ? (
                  <Volume2 className="h-6 w-6 text-green-400" />
                ) : (
                  <Sparkles className="h-6 w-6 text-purple-400" />
                )}
                {isListening && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                        isSimulated ? "bg-blue-400" : "bg-red-400"
                      } opacity-75`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        isSimulated ? "bg-blue-500" : "bg-red-500"
                      }`}
                    ></span>
                  </span>
                )}
              </div>
              <h2
                className={`text-xl font-bold ${
                  isSimulated
                    ? "text-blue-400"
                    : isListening
                      ? "text-green-400"
                      : showFollowUp
                        ? "text-purple-400"
                        : "text-gray-400"
                }`}
              >
                {isSimulated
                  ? "🤖 AR is simulating..."
                  : isListening
                    ? "🎤 AR is listening..."
                    : showFollowUp
                      ? "💭 Ready for follow-up"
                      : "🎤 AR Assistant"}
              </h2>
            </div>

            <div className="flex gap-2">
              {isSimulated && (
                <Badge className="bg-blue-900/30 text-blue-300 border border-blue-500/30">Simulation Mode</Badge>
              )}
              {onShowCommands && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onShowCommands}
                  className="border-gray-600 text-gray-300 hover:bg-white/10"
                >
                  <Command className="h-4 w-4 mr-1" />
                  Commands
                </Button>
              )}
            </div>
          </div>

          {/* Last Detected Command */}
          {lastDetectedCommand && Date.now() - lastDetectedCommand.timestamp < 5000 && (
            <div className="mb-3 p-2 bg-green-600/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Command className="h-3 w-3 text-green-400" />
                <span className="text-xs text-green-300">Command: "{lastDetectedCommand.phrase}"</span>
              </div>
            </div>
          )}

          {/* Live Transcription */}
          <div
            className={`${
              isSimulated
                ? "bg-blue-950/30 border-blue-600/30"
                : isListening
                  ? "bg-black/70 border-gray-600"
                  : "bg-purple-950/30 border-purple-600/30"
            } rounded-xl p-4 mb-4 relative border`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isSimulated ? (
                <Robot className="h-4 w-4 text-blue-400" />
              ) : isListening ? (
                <Mic className="h-4 w-4 text-red-400 animate-pulse" />
              ) : (
                <Sparkles className="h-4 w-4 text-purple-400" />
              )}
              <span className="text-sm font-medium text-gray-300">
                {isSimulated ? "Simulated Speech" : isListening ? "Live Transcript" : "Captured Speech"}
              </span>
            </div>
            <ScrollArea className="h-40" style={{ scrollTop: scrollPosition }}>
              <p
                className={`leading-relaxed text-sm ${
                  isSimulated ? "text-blue-200" : isListening ? "text-gray-200" : "text-purple-200"
                }`}
              >
                {transcript ||
                  (isSimulated
                    ? "🤖 Generating simulated speech... Try saying voice commands like 'ask AI', 'open chat', or 'show commands'."
                    : isListening
                      ? "🎤 Listening for your voice... Try saying voice commands like 'ask AI', 'open chat', or 'show commands'."
                      : "🎤 Click microphone to start listening...")}
              </p>
            </ScrollArea>

            {/* Scroll Controls */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleScrollUp}
                className="h-6 w-6 p-0 bg-black/50 text-gray-400 hover:text-white rounded-full"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleScrollDown}
                className="h-6 w-6 p-0 bg-black/50 text-gray-400 hover:text-white rounded-full"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Timer */}
          <div className="flex justify-center mb-4">
            <Badge
              className={`${
                isSimulated
                  ? "bg-blue-950/50 text-blue-400 border border-blue-500/30"
                  : isListening
                    ? "bg-black text-green-400"
                    : "bg-purple-950/50 text-purple-400 border border-purple-500/30"
              } px-4 py-2 text-lg font-mono rounded-xl`}
            >
              {sessionTime}
            </Badge>
          </div>

          {/* Follow-up Input (Cluely-style) */}
          {showFollowUp && (
            <div className="space-y-3 mb-4">
              <div className="bg-purple-950/30 border border-purple-600/30 rounded-xl p-4">
                <p className="text-sm text-purple-300 mb-3">💭 Ask a follow-up question:</p>
                <Input
                  value={followUpQuery}
                  onChange={(e) => setFollowUpQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What would you like to know more about?"
                  className="bg-black/50 border-purple-600/50 text-purple-200 placeholder-purple-400 mb-3"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-purple-400">Press Control+Enter to ask AI</p>
                  <Button
                    onClick={handleFollowUpSubmit}
                    disabled={!followUpQuery.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Ask AI
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Voice Commands Quick Reference (only when listening) */}
          {isListening && (
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-400 font-medium">🎙️ Try these voice commands:</p>
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs justify-center">
                  "ask AI"
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs justify-center">
                  "start over"
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs justify-center">
                  "show commands"
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs justify-center">
                  "hide interface"
                </Badge>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center">
            {showFollowUp ? (
              <p className="text-sm text-purple-400">
                🎯 Type your question above and press <kbd className="bg-purple-900/50 px-1 rounded">Ctrl+Enter</kbd>
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-3">
                  🎯 Press <kbd className="bg-gray-800 px-1 rounded">Ctrl+Enter</kbd> to ask AI •{" "}
                  <kbd className="bg-gray-800 px-1 rounded">Ctrl+H</kbd> to start over
                </p>
                <Button
                  onClick={onAskAI}
                  className={`${
                    isSimulated ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                  } text-white rounded-xl font-medium px-6 py-2`}
                >
                  🤖 Ask AI Now
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
