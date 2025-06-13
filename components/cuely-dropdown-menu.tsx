"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Settings, LogOut, X, RotateCcw, ChevronUp } from "lucide-react"

interface CuelyDropdownMenuProps {
  onClose: () => void
  onToggleRightPanel: () => void
}

export function CuelyDropdownMenu({ onClose, onToggleRightPanel }: CuelyDropdownMenuProps) {
  return (
    <div className="absolute top-12 right-0 pointer-events-auto z-50">
      <Card className="w-64 bg-blue-900/95 backdrop-blur-xl border border-blue-700/50 text-white shadow-2xl rounded-xl overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-blue-200">Cluely</h3>
              <p className="text-sm text-blue-300">Account: user@example.com</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-blue-300 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="bg-blue-700/50 mb-3" />

          {/* Scroll AI Response */}
          <Button className="w-full justify-between bg-blue-800/50 hover:bg-blue-800/70 text-blue-200 hover:text-blue-100 rounded-lg mb-2 h-10">
            <span className="font-medium">Scroll AI Response</span>
            <div className="flex items-center gap-1">
              <span className="text-xs bg-blue-900/50 px-1.5 py-0.5 rounded">Ctrl</span>
              <ChevronUp className="h-3 w-3" />
            </div>
          </Button>

          {/* Move Controls */}
          <div className="flex gap-2 mb-3">
            <Button
              size="sm"
              className="flex-1 bg-blue-800/50 hover:bg-blue-800/70 text-blue-200 hover:text-blue-100 rounded-lg h-9"
            >
              <ArrowLeft className="h-3 w-3 mr-1.5" />
              Move
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-blue-800/50 hover:bg-blue-800/70 text-blue-200 hover:text-blue-100 rounded-lg h-9"
            >
              Move
              <ArrowRight className="h-3 w-3 ml-1.5" />
            </Button>
          </div>

          <Separator className="bg-blue-700/50 mb-3" />

          {/* Personalize */}
          <Button className="w-full justify-start bg-blue-800/50 hover:bg-blue-800/70 text-blue-200 hover:text-blue-100 rounded-lg mb-2 h-10">
            <Settings className="h-4 w-4 mr-2" />
            <span className="font-medium">Personalize</span>
          </Button>

          {/* Log Out */}
          <Button className="w-full justify-start bg-blue-800/50 hover:bg-blue-800/70 text-blue-200 hover:text-blue-100 rounded-lg mb-2 h-10">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="font-medium">Log Out</span>
          </Button>

          {/* Quit */}
          <Button className="w-full justify-start bg-blue-800/50 hover:bg-blue-800/70 text-blue-200 hover:text-blue-100 rounded-lg mb-2 h-10">
            <span className="font-medium">Quit</span>
          </Button>

          {/* Update and Restart */}
          <Button className="w-full justify-start bg-blue-800/50 hover:bg-blue-800/70 text-blue-200 hover:text-blue-100 rounded-lg h-10">
            <RotateCcw className="h-4 w-4 mr-2" />
            <span className="font-medium">Update and Restart</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
