"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, BotIcon as Robot } from "lucide-react"
import { useAudioListener } from "@/hooks/use-audio-listener"

export function MicrophoneTestSimple() {
  const [isTestingMic, setIsTestingMic] = useState(false)
  const { audioContext, transcript, isRecording, error, isSimulated } = useAudioListener(isTestingMic)

  return (
    <div className="fixed bottom-4 right-4 pointer-events-auto z-50">
      <Card className="w-80 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            {isSimulated ? <Robot className="h-5 w-5 text-blue-400" /> : <Mic className="h-5 w-5 text-green-400" />}
            Quick Mic Test
          </h3>

          {/* Test Button */}
          <Button
            onClick={() => setIsTestingMic(!isTestingMic)}
            className={`w-full mb-3 ${
              isTestingMic
                ? isSimulated
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isTestingMic ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Test
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Test Microphone
              </>
            )}
          </Button>

          {/* Status */}
          {isRecording && (
            <Badge
              className={`mb-3 ${
                isSimulated ? "bg-blue-600/20 text-blue-400" : "bg-red-600/20 text-red-400"
              } block text-center`}
            >
              {isSimulated ? "🤖 Simulation Active" : "🔴 Recording Active"}
            </Badge>
          )}

          {/* Error */}
          {error && (
            <div className="mb-3 p-2 bg-yellow-600/20 border border-yellow-600/50 rounded-lg">
              <span className="text-xs text-yellow-400">{error}</span>
            </div>
          )}

          {/* Transcript */}
          {transcript && (
            <div
              className={`p-3 rounded-lg ${isSimulated ? "bg-blue-950/30 border border-blue-600/30" : "bg-black/50"}`}
            >
              <p className="text-xs text-gray-400 mb-1">Transcript:</p>
              <p className={`text-sm ${isSimulated ? "text-blue-200" : "text-gray-300"}`}>{transcript}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-3 text-xs text-gray-500">
            <p>• Click to test microphone</p>
            <p>• {isSimulated ? "Blue = Simulation" : "Red = Real microphone"}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
