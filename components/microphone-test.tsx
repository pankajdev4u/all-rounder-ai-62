"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, AlertCircle, CheckCircle, Volume2 } from "lucide-react"
import { useAudioListener } from "@/hooks/use-audio-listener"

export function MicrophoneTest() {
  const [isTestingMic, setIsTestingMic] = useState(false)
  const { audioContext, transcript, isRecording, error, microphoneSupported } = useAudioListener(isTestingMic)

  const testMicrophone = async () => {
    setIsTestingMic(!isTestingMic)
  }

  return (
    <Card className="w-full max-w-md bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Microphone Test
        </h3>

        {/* Microphone Support Status */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            {microphoneSupported ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-400" />
            )}
            <span className="text-sm">
              Microphone {microphoneSupported ? "Supported" : "Not Supported"}
              {!microphoneSupported && " (Using Simulation)"}
            </span>
          </div>
        </div>

        {/* Test Button */}
        <Button
          onClick={testMicrophone}
          className={`w-full mb-4 ${isTestingMic ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
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

        {/* Status Indicators */}
        {isRecording && <Badge className="mb-3 bg-red-600/20 text-red-400">🔴 Recording Active</Badge>}

        {error && (
          <div className="mb-3 p-3 bg-red-600/20 border border-red-600/50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          </div>
        )}

        {/* Audio Context */}
        {audioContext && (
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-1">Audio Status:</p>
            <p className="text-sm text-gray-300">{audioContext}</p>
          </div>
        )}

        {/* Live Transcript */}
        {transcript && (
          <div className="bg-black/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Live Transcript:</p>
            <p className="text-sm text-gray-300">{transcript}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4 text-xs text-gray-500">
          <p>• Click "Test Microphone" to start</p>
          <p>• Allow microphone access when prompted</p>
          <p>• Speak clearly to test speech recognition</p>
          <p>• If real microphone doesn't work, simulation will be used</p>
        </div>
      </div>
    </Card>
  )
}
