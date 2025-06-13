"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import type { VoiceCommand } from "@/hooks/use-voice-commands"
import { Mic, X, Sparkles, MessageSquare, Eye, Settings } from "lucide-react"

interface VoiceCommandsPanelProps {
  commands: VoiceCommand[]
  onClose: () => void
  lastDetectedCommand?: { command: VoiceCommand; phrase: string; timestamp: number }
}

export function VoiceCommandsPanel({ commands, onClose, lastDetectedCommand }: VoiceCommandsPanelProps) {
  const groupedCommands = commands.reduce(
    (acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = []
      }
      acc[command.category].push(command)
      return acc
    },
    {} as Record<string, VoiceCommand[]>,
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ai":
        return <Sparkles className="h-4 w-4 text-blue-400" />
      case "navigation":
        return <MessageSquare className="h-4 w-4 text-green-400" />
      case "control":
        return <Eye className="h-4 w-4 text-purple-400" />
      case "system":
        return <Settings className="h-4 w-4 text-orange-400" />
      default:
        return <Mic className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ai":
        return "text-blue-400"
      case "navigation":
        return "text-green-400"
      case "control":
        return "text-purple-400"
      case "system":
        return "text-orange-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="fixed top-20 left-6 pointer-events-auto z-50">
      <Card className="w-80 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold">Voice Commands</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Last Detected Command */}
          {lastDetectedCommand && (
            <div className="mb-4 p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-green-600/30 text-green-300">Command Detected</Badge>
              </div>
              <p className="text-sm text-green-200">"{lastDetectedCommand.phrase}"</p>
              <p className="text-xs text-green-400 mt-1">{lastDetectedCommand.command.description}</p>
            </div>
          )}

          {/* Commands List */}
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(category)}
                    <h4 className={`font-medium capitalize ${getCategoryColor(category)}`}>{category}</h4>
                  </div>
                  <div className="space-y-2 ml-6">
                    {categoryCommands.map((command, index) => (
                      <div key={index} className="bg-black/30 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-1">{command.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {command.phrases.map((phrase, phraseIndex) => (
                            <Badge
                              key={phraseIndex}
                              variant="outline"
                              className="text-xs border-gray-600 text-gray-400"
                            >
                              "{phrase}"
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Instructions */}
          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <p>• Speak any of the phrases above while microphone is active</p>
            <p>• Commands have a 3-second cooldown to prevent spam</p>
            <p>• Works with both real microphone and simulation mode</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
