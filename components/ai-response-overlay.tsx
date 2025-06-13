"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Copy, ThumbsUp, ThumbsDown, Sparkles, Monitor, Activity } from "lucide-react"

interface AIResponseOverlayProps {
  screenContent: string
  audioContext: string
  isAnalyzing: boolean
  onClose: () => void
}

export function AIResponseOverlay({ screenContent, audioContext, isAnalyzing, onClose }: AIResponseOverlayProps) {
  const [response, setResponse] = useState("")
  const [analysisComplete, setAnalysisComplete] = useState(false)

  useEffect(() => {
    // Reset state when overlay opens
    setResponse("")
    setAnalysisComplete(false)

    // Simulate analysis process
    const analyzeScreen = async () => {
      // Start analysis immediately
      console.log("🔍 Starting AI analysis of screen content")

      // Short delay to show analysis in progress
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate response based on screen content and audio context
      const aiResponse = generateIntelligentResponse(screenContent, audioContext)
      setResponse(aiResponse)
      setAnalysisComplete(true)
      console.log("✅ AI analysis complete")
    }

    analyzeScreen()
  }, [screenContent, audioContext])

  const generateIntelligentResponse = (content: string, audio: string) => {
    // Combine screen content and audio context for more accurate response
    const combinedContext = `${content} ${audio}`.toLowerCase()

    // Check for specific topics in the context
    if (combinedContext.includes("capital") || combinedContext.includes("india")) {
      return `Based on your question about the capital of India:

**New Delhi is the capital of India.**

• It serves as the seat of all three branches of the Government of India
• It's a major administrative and political hub
• Hosts Rashtrapati Bhavan, Parliament House, and Supreme Court

New Delhi became the capital in 1911, replacing Calcutta (now Kolkata). It is the center for national government and international diplomacy.

Would you like to know more about New Delhi's history, architecture, or its role in modern India?`
    }

    if (combinedContext.includes("weather") || combinedContext.includes("forecast")) {
      return `Based on your question about the weather:

I can see you're interested in weather information. While I don't have access to real-time weather data, I can help you understand what's visible on your screen.

If you're looking at a weather forecast application, here's how to interpret the common elements:
• Temperature is typically shown in °C or °F
• Precipitation probability is shown as a percentage
• Wind speed is usually in km/h or mph
• UV index ranges from 1 (low) to 11+ (extreme)

Would you like me to help you interpret specific weather data visible on your screen?`
    }

    if (combinedContext.includes("code") || combinedContext.includes("function")) {
      return `Based on my analysis of the code visible on your screen:

I can see you're working with programming code. The code appears to be related to a web application, possibly using React or a similar framework.

Some observations:
• There are function definitions and component structures
• The code includes state management patterns
• There appear to be UI elements and event handlers

Would you like me to help with specific aspects of this code, such as debugging, optimization, or explaining certain functions?`
    }

    // Default response for general content
    return `Based on my analysis of your current screen and audio context:

I've analyzed what's currently visible on your screen and what I heard from your audio input. Here's what I can tell:

**Screen Content Analysis:**
• I can see you're working with an application or website
• There appears to be text content and possibly interactive elements
• The layout suggests this is a productivity or information tool

**From Your Audio/Transcript:**
${audio ? `• I heard: "${audio.replace("🎤 LIVE: ", "").replace("🤖 SIMULATED: ", "")}"` : "• No clear audio context detected"}

How can I help you with what you're currently working on? I can provide more specific assistance if you ask about particular elements on your screen.`
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto z-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl h-[80vh] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-gray-300" />
              <h2 className="text-2xl font-bold text-gray-300">AI Response</h2>
              <Badge className="bg-black text-gray-300">{isAnalyzing ? "Analyzing..." : "Analysis Complete"}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white rounded-lg">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-6 flex-1">
            {/* Left Panel - Screen Context */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="h-4 w-4 text-gray-400" />
                  <h3 className="font-semibold text-gray-300">Screen Analysis</h3>
                </div>
                <ScrollArea className="h-32 bg-black/50 rounded-xl p-3">
                  <p className="text-sm text-gray-300">{screenContent || "Analyzing current screen content..."}</p>
                </ScrollArea>
              </div>

              {/* Audio Context */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <h3 className="font-semibold text-gray-300">Audio Context</h3>
                </div>
                <ScrollArea className="h-32 bg-black/50 rounded-xl p-3">
                  <p className="text-sm text-gray-300">{audioContext || "No audio context available"}</p>
                </ScrollArea>
              </div>

              {/* Analysis Status */}
              {isAnalyzing && (
                <div className="bg-black/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-blue-400 animate-pulse" />
                    <div>
                      <h4 className="font-medium text-gray-300">Analyzing Content</h4>
                      <p className="text-sm text-gray-400">Processing visual elements and audio context...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - AI Response */}
            <div className="flex-1">
              {response ? (
                <div className="bg-black/50 rounded-xl p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-black text-gray-300">AI Analysis Result</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(response)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="flex-1">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{response}</p>
                  </ScrollArea>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700/50">
                    <span className="text-xs text-gray-500">Was this analysis helpful?</span>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-black/30 rounded-xl p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-8 w-8 text-blue-400 animate-pulse mx-auto mb-4" />
                    <p className="text-gray-400">Analyzing your content...</p>
                    <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
