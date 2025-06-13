"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Settings, LogOut, X } from "lucide-react"

interface RightSideAssistantCardProps {
  onClose: () => void
}

export function RightSideAssistantCard({ onClose }: RightSideAssistantCardProps) {
  return (
    <div className="fixed top-20 right-6 pointer-events-auto z-50">
      <Card className="w-72 bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-300">AR</h3>
              <p className="text-sm text-gray-400 mt-1">User Email</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white rounded-lg">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="bg-gray-700/50 mb-4" />

          {/* Scroll AI Response */}
          <Button className="w-full justify-between bg-black hover:bg-gray-900 text-gray-300 hover:text-gray-100 rounded-xl mb-3 h-12">
            <span className="font-medium">Scroll AI Response</span>
            <div className="flex items-center gap-1">
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">Ctrl</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">⬇</span>
            </div>
          </Button>

          {/* Move Controls */}
          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              className="flex-1 bg-black hover:bg-gray-900 text-gray-300 hover:text-gray-100 rounded-xl h-10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Move
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-black hover:bg-gray-900 text-gray-300 hover:text-gray-100 rounded-xl h-10"
            >
              Move
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <Separator className="bg-gray-700/50 mb-4" />

          {/* Personalize */}
          <Button className="w-full justify-start bg-black hover:bg-gray-900 text-gray-300 hover:text-gray-100 rounded-xl mb-3 h-12">
            <Settings className="h-4 w-4 mr-3" />
            <span className="font-medium">Personalize</span>
          </Button>

          {/* Log Out */}
          <Button className="w-full justify-start bg-black hover:bg-gray-900 text-gray-300 hover:text-gray-100 rounded-xl mb-3 h-12">
            <LogOut className="h-4 w-4 mr-3" />
            <span className="font-medium">Log Out</span>
          </Button>

          {/* Quit */}
          <Button className="w-full justify-start bg-black hover:bg-gray-900 text-gray-300 hover:text-gray-100 rounded-xl h-12">
            <span className="font-medium">Quit</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
