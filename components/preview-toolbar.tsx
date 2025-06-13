"use client"
import { Sparkles, MessageSquare, EyeOff, Timer, MicOff, MoreVertical } from "lucide-react"

export default function PreviewToolbar() {
  return (
    <div className="flex justify-center w-full p-8 bg-gray-900">
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 backdrop-blur-xl border border-blue-400/30 rounded-full px-4 py-2 shadow-2xl">
        <div className="flex items-center gap-3">
          {/* Ask AI Button */}
          <div className="bg-blue-700/50 hover:bg-blue-700/70 text-white rounded-full font-medium text-sm px-4 py-1.5 border border-blue-300/20 flex items-center">
            <Sparkles className="h-3 w-3 mr-1.5" />
            <span>Ask AI</span>
            <div className="ml-2 bg-blue-800/50 text-blue-200 text-xs px-1.5 py-0.5 rounded-md flex items-center">
              Ctrl ↓
            </div>
          </div>

          {/* Chat Button */}
          <div className="bg-blue-700/50 hover:bg-blue-700/70 text-white rounded-full font-medium text-sm px-4 py-1.5 border border-blue-300/20 flex items-center">
            <MessageSquare className="h-3 w-3 mr-1.5" />
            <span>Chat</span>
            <div className="ml-2 bg-blue-800/50 text-blue-200 text-xs px-1.5 py-0.5 rounded-md flex items-center">
              Ctrl ↑
            </div>
          </div>

          {/* Show/Hide Button */}
          <div className="bg-blue-700/50 hover:bg-blue-700/70 text-white rounded-full font-medium text-sm px-4 py-1.5 border border-blue-300/20 flex items-center">
            <EyeOff className="h-3 w-3 mr-1.5" />
            <span>Show/Hide</span>
            <div className="ml-2 bg-blue-800/50 text-blue-200 text-xs px-1.5 py-0.5 rounded-md flex items-center">
              Ctrl \
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5 text-white font-mono text-sm px-3">
            <Timer className="h-3 w-3" />
            <span>00:42</span>
          </div>

          {/* Microphone */}
          <div className="bg-blue-700/50 hover:bg-blue-700/70 text-white rounded-full relative border border-blue-300/20 p-2">
            <MicOff className="h-4 w-4" />
          </div>

          {/* Menu Dropdown */}
          <div className="bg-blue-700/50 hover:bg-blue-700/70 text-white rounded-full border border-blue-300/20 p-2">
            <MoreVertical className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
