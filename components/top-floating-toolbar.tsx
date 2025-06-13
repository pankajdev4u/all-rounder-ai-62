"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  Sparkles,
  MessageSquare,
  EyeOff,
  Timer,
  Activity,
  BotIcon as Robot,
  MoreVertical,
} from "lucide-react"
import { AllRounderDropdownMenu } from "@/components/all-rounder-dropdown-menu"
import { cn } from "@/lib/utils"

interface TopFloatingToolbarProps {
  sessionTime: string
  isListening: boolean
  isAnalyzing: boolean
  isSimulated?: boolean
  hasFirstResponse: boolean
  opacity: number
  onMicToggle: () => void
  onAskAI: () => void
  onOpenChat: () => void
  onToggleRightPanel: () => void
  onToggleVisibility: () => void
  onMicHover: (isHovering: boolean) => void
  onOpenPersonalize: () => void
}

export function TopFloatingToolbar({
  sessionTime,
  isListening,
  isAnalyzing,
  isSimulated = false,
  hasFirstResponse,
  opacity,
  onMicToggle,
  onAskAI,
  onOpenChat,
  onToggleRightPanel,
  onToggleVisibility,
  onMicHover,
  onOpenPersonalize,
}: TopFloatingToolbarProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 pointer-events-auto z-50">
      {/* Main Toolbar - Black Background with Configurable Opacity */}
      <div
        className="bg-black backdrop-blur-xl border border-gray-700/50 rounded-full px-4 py-2 shadow-2xl"
        style={{ opacity: opacity / 100 }}
      >
        <div className="flex items-center gap-3">
          {/* Ask AI / Ask Follow-Up */}
          <Button
            onClick={onAskAI}
            disabled={isAnalyzing}
            className="bg-gray-800/50 hover:bg-gray-700/70 text-white rounded-full font-medium text-sm px-4 py-1.5 border border-gray-600/30"
          >
            {isAnalyzing ? (
              <>
                <Activity className="h-3 w-3 mr-1.5 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 mr-1.5" />
                {hasFirstResponse ? "Ask Follow-Up" : "Ask AI"}
              </>
            )}
            <Badge variant="secondary" className="ml-2 bg-gray-900/50 text-gray-300 text-xs px-1.5 py-0.5">
              Ctrl ⏎
            </Badge>
          </Button>

          {/* Chat */}
          <Button
            onClick={onOpenChat}
            className="bg-gray-800/50 hover:bg-gray-700/70 text-white rounded-full font-medium text-sm px-4 py-1.5 border border-gray-600/30"
          >
            <MessageSquare className="h-3 w-3 mr-1.5" />
            Chat
            <Badge variant="secondary" className="ml-2 bg-gray-900/50 text-gray-300 text-xs px-1.5 py-0.5">
              Ctrl C ↑
            </Badge>
          </Button>

          {/* Show/Hide */}
          <Button
            onClick={onToggleVisibility}
            className="bg-gray-800/50 hover:bg-gray-700/70 text-white rounded-full font-medium text-sm px-4 py-1.5 border border-gray-600/30"
          >
            <EyeOff className="h-3 w-3 mr-1.5" />
            Show/Hide
            <Badge variant="secondary" className="ml-2 bg-gray-900/50 text-gray-300 text-xs px-1.5 py-0.5">
              Ctrl B
            </Badge>
          </Button>

          {/* Timer */}
          <div className="flex items-center gap-1.5 text-white font-mono text-sm px-3">
            <Timer className="h-3 w-3" />
            <span>{sessionTime}</span>
          </div>

          {/* Microphone */}
          <div className="relative" onMouseEnter={() => onMicHover(true)} onMouseLeave={() => onMicHover(false)}>
            <Button
              onClick={onMicToggle}
              className={cn(
                "bg-gray-800/50 hover:bg-gray-700/70 text-white rounded-full relative border border-gray-600/30 p-2",
                isListening && !isSimulated ? "bg-red-600/80 border-red-400/50" : "",
                isListening && isSimulated ? "bg-blue-600/80 border-blue-400/50" : "",
              )}
            >
              {isListening ? (
                isSimulated ? (
                  <Robot className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )
              ) : (
                <MicOff className="h-4 w-4" />
              )}
              {isListening && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      isSimulated ? "bg-blue-300" : "bg-red-300"
                    } opacity-75`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isSimulated ? "bg-blue-400" : "bg-red-400"
                    }`}
                  ></span>
                </span>
              )}
            </Button>
          </div>

          {/* Menu Dropdown */}
          <div className="relative">
            <Button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-gray-800/50 hover:bg-gray-700/70 text-white rounded-full border border-gray-600/30 p-2"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>

            {showDropdown && (
              <AllRounderDropdownMenu
                onClose={() => setShowDropdown(false)}
                onToggleRightPanel={onToggleRightPanel}
                onOpenPersonalize={onOpenPersonalize}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
