"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff, AlertCircle, Bug, X } from "lucide-react"

interface MicrophoneDebugProps {
  onClose?: () => void
}

export function MicrophoneDebug({ onClose }: MicrophoneDebugProps) {
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState("")
  const [recognition, setRecognition] = useState<any>(null)

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setDebugInfo((prev) => [...prev, `[${timestamp}] ${message}`])
    console.log(`🎤 ${message}`)
  }

  const testMicrophone = async () => {
    if (isListening) {
      // Stop listening
      if (recognition) {
        recognition.stop()
      }
      setIsListening(false)
      addDebugLog("Stopping microphone test")
      return
    }

    setIsListening(true)
    setError("")
    setTranscript("")
    addDebugLog("Starting microphone test...")

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      addDebugLog("❌ Speech Recognition not supported in this browser")
      addDebugLog("Browser: " + navigator.userAgent)
      setError("Speech Recognition not supported")
      setIsListening(false)

      // Use simulation mode
      addDebugLog("🎭 Starting simulation mode...")
      simulateTranscript()
      return
    }

    addDebugLog("✅ Speech Recognition API found")

    // Check microphone permission
    try {
      addDebugLog("Requesting microphone permission...")
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      addDebugLog("✅ Microphone permission granted")

      // Set up speech recognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = "en-US"

      recognitionInstance.onstart = () => {
        addDebugLog("✅ Speech recognition started - speak now!")
      }

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        const currentTranscript = finalTranscript || interimTranscript
        setTranscript(currentTranscript)
        addDebugLog(`📝 Transcript: "${currentTranscript}"`)
      }

      recognitionInstance.onerror = (event: any) => {
        addDebugLog(`❌ Speech recognition error: ${event.error}`)
        setError(`Error: ${event.error}`)
        setIsListening(false)

        // Fall back to simulation
        addDebugLog("🎭 Falling back to simulation mode...")
        simulateTranscript()
      }

      recognitionInstance.onend = () => {
        addDebugLog("Speech recognition ended")
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
      recognitionInstance.start()
      addDebugLog("Speech recognition starting...")

      // Stop the stream after setting up recognition
      stream.getTracks().forEach((track) => track.stop())
    } catch (err: any) {
      addDebugLog(`❌ Microphone access denied: ${err.message}`)
      setError(`Microphone access denied: ${err.message}`)
      setIsListening(false)

      // Use simulation mode
      addDebugLog("🎭 Starting simulation mode...")
      simulateTranscript()
    }
  }

  const simulateTranscript = () => {
    const mockTranscripts = [
      "Hello, this is a simulated transcript.",
      "The microphone simulation is working correctly.",
      "You can see this text updating in real-time.",
      "This demonstrates how the transcript feature works.",
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < mockTranscripts.length) {
        const currentTranscript = mockTranscripts[index]
        setTranscript(currentTranscript)
        addDebugLog(`🎭 Simulated: "${currentTranscript}"`)
        index++
      } else {
        clearInterval(interval)
        addDebugLog("🎭 Simulation complete")
        setIsListening(false)
      }
    }, 2000)
  }

  const clearLogs = () => {
    setDebugInfo([])
    setTranscript("")
    setError("")
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold">Microphone Debug Tool</h2>
            </div>
            <div className="flex gap-2">
              <Button onClick={clearLogs} variant="outline" size="sm" className="border-gray-600 text-gray-300">
                Clear Logs
              </Button>
              {onClose && (
                <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Test Button */}
          <Button
            onClick={testMicrophone}
            className={`w-full mb-4 ${isListening ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            {isListening ? (
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
          {isListening && (
            <Badge className="mb-3 bg-red-600/20 text-red-400 self-start">🔴 Recording Active - Speak now!</Badge>
          )}

          {/* Error */}
          {error && (
            <div className="mb-3 p-3 bg-red-600/20 border border-red-600/50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <span className="text-sm text-red-400">{error}</span>
              </div>
            </div>
          )}

          {/* Current Transcript */}
          {transcript && (
            <div className="mb-4 p-3 bg-green-600/20 border border-green-600/50 rounded-lg">
              <p className="text-sm text-green-400 mb-1">Current Transcript:</p>
              <p className="text-white">{transcript}</p>
            </div>
          )}

          {/* Debug Logs */}
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2 text-gray-300">Debug Logs:</h3>
            <ScrollArea className="h-full bg-black/50 rounded-lg p-3">
              <div className="space-y-1">
                {debugInfo.map((log, index) => (
                  <p key={index} className="text-xs text-gray-300 font-mono">
                    {log}
                  </p>
                ))}
                {debugInfo.length === 0 && (
                  <p className="text-xs text-gray-500">Click "Test Microphone" to start debugging...</p>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <p>• This tool will help diagnose microphone issues</p>
            <p>• Check the debug logs for detailed information</p>
            <p>• Make sure to allow microphone access when prompted</p>
            <p>• If real microphone fails, simulation mode will activate</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
