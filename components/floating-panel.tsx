"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, Eye, MoreVertical, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingPanelProps {
  position: { x: number; y: number }
  onPositionChange: (position: { x: number; y: number }) => void
  isListening: boolean
  onToggleListening: () => void
  onAskAI: () => void
  onOpenChat: () => void
  onToggleRightPanel: () => void
  sessionTime: string
  isAnalyzing: boolean
  onTranscriptHover: (isHovering: boolean) => void
}

export function FloatingPanel({
  position,
  onPositionChange,
  isListening,
  onToggleListening,
  onAskAI,
  onOpenChat,
  onToggleRightPanel,
  sessionTime,
  isAnalyzing,
  onTranscriptHover,
}: FloatingPanelProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const dragRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = dragRef.current?.getBoundingClientRect()
    if (rect) {
      const offsetX = e.clientX - rect.left
      const offsetY = e.clientY - rect.top

      const handleMouseMove = (e: MouseEvent) => {
        onPositionChange({
          x: e.clientX - offsetX,
          y: e.clientY - offsetY,
        })
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
  }

  if (!isVisible) {
    return (
      <div
        className="fixed z-50 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg p-2"
        style={{ left: position.x, top: position.y }}
      >
        <Button variant="ghost" size="sm" onClick={() => setIsVisible(true)} className="text-white hover:bg-white/10">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div
      ref={dragRef}
      className={cn(
        "fixed z-50 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl px-4 py-3 shadow-2xl",
        "transition-all duration-200 ease-in-out",
        isDragging ? "cursor-grabbing scale-105" : "cursor-grab",
      )}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center gap-3">
        {/* Brand */}
        <div className="text-green-400 font-semibold text-sm">All-rounder</div>

        {/* Ask AI Button */}
        <Button onClick={onAskAI} className="bg-green-600 hover:bg-green-700 text-white rounded-full" size="sm">
          Ask
          <span className="ml-1 text-xs bg-green-800 px-1 rounded">Ctrl</span>
          <span className="ml-1 text-xs bg-green-800 px-1 rounded">+ ↑</span>
        </Button>

        {/* Chat Button */}
        <Button onClick={onOpenChat} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full" size="sm">
          Chat
          <span className="ml-1 text-xs bg-blue-800 px-1 rounded">Ctrl</span>
        </Button>

        {/* Show/Hide Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="border-gray-600 text-gray-300 hover:bg-white/10 rounded-full"
        >
          Show/Hide
          <span className="ml-1 text-xs bg-gray-700 px-1 rounded">Ctrl+B</span>
        </Button>

        {/* Session Timer */}
        <div className="text-white text-sm font-mono">{sessionTime}</div>

        {/* Screen Analysis Indicator */}
        {isAnalyzing && (
          <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 animate-pulse">
            <Activity className="h-3 w-3 mr-1" />
            Analyzing
          </Badge>
        )}

        {/* Listening Toggle */}
        <div
          className="relative"
          onMouseEnter={() => onTranscriptHover(true)}
          onMouseLeave={() => onTranscriptHover(false)}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleListening}
            className={cn(
              "border-gray-600 text-white hover:bg-white/10 rounded-full",
              isListening && "bg-red-600/20 border-red-500",
            )}
          >
            <Mic className={cn("h-4 w-4", isListening && "text-red-400")} />
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </Button>
        </div>

        {/* More Options */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleRightPanel}
          className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
