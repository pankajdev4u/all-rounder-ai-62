"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Settings, LogOut, X } from "lucide-react"

interface RightSidePanelProps {
  onClose: () => void
}

export function RightSidePanel({ onClose }: RightSidePanelProps) {
  return (
    <div className="fixed right-4 top-20 z-50">
      <Card className="w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 text-white shadow-2xl">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-green-400">All-Rounder AI</h3>
              <p className="text-sm text-gray-400">Account: UserEmail</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="bg-gray-700 mb-4" />

          {/* Scroll AI Response */}
          <Button
            variant="outline"
            className="w-full justify-between border-gray-600 text-gray-300 hover:bg-white/10 mb-3"
          >
            <span>Scroll AI Response</span>
            <div className="flex items-center gap-1">
              <span className="text-xs bg-gray-700 px-1 rounded">Ctrl</span>
              <span className="text-xs bg-gray-700 px-1 rounded">+ ↓→</span>
            </div>
          </Button>

          {/* Move Controls */}
          <div className="flex gap-2 mb-3">
            <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-300 hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Move
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-300 hover:bg-white/10">
              Move
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <Separator className="bg-gray-700 mb-4" />

          {/* Personalize */}
          <Button
            variant="outline"
            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-white/10 mb-3"
          >
            <Settings className="h-4 w-4 mr-2" />
            Personalize
          </Button>

          {/* Log Out */}
          <Button
            variant="destructive"
            className="w-full justify-start bg-red-600/20 border-red-600/50 text-red-400 hover:bg-red-600/30 mb-3"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>

          {/* Quit */}
          <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-white/10">
            Quit
          </Button>
        </div>
      </Card>
    </div>
  )
}
