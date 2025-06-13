"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CluelyListeningPanelProps {
  transcript: string
  isListening: boolean
  isSimulated: boolean
  questions: string[]
}

export function CluelyListeningPanel({ transcript, isListening, isSimulated, questions }: CluelyListeningPanelProps) {
  return (
    <div className="fixed top-20 right-6 pointer-events-auto z-50">
      <Card className="w-80 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Cluely is listening...</h3>
            {isSimulated && (
              <Badge className="bg-blue-900/30 text-blue-300 border border-blue-500/30">Simulation</Badge>
            )}
          </div>

          {/* Chat Bubbles */}
          <div className="space-y-3 mb-4">
            {questions.map((question, index) => (
              <div key={index} className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                  <p className="text-sm">{question}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Current Transcript */}
          {transcript && (
            <div className="bg-black/50 rounded-xl p-3 mb-4">
              <ScrollArea className="h-24">
                <p className="text-sm text-gray-300">{transcript}</p>
              </ScrollArea>
            </div>
          )}

          {/* Control Prompt */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Press <kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-xs">Control+Enter</kbd> to ask AI
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
