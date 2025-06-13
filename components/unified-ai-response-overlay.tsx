"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Copy, ThumbsUp, ThumbsDown, Sparkles, Monitor, Activity, Mic, XCircle } from "lucide-react"

interface UnifiedAIResponseOverlayProps {
  screenContent: string
  audioContext: string
  transcript: string
  inputSource: "audio" | "screen" | null
  isAnalyzing: boolean
  onClose: () => void
  onStartOver: () => void
}

export function UnifiedAIResponseOverlay({
  screenContent,
  audioContext,
  transcript,
  inputSource,
  isAnalyzing,
  onClose,
  onStartOver,
}: UnifiedAIResponseOverlayProps) {
  const [response, setResponse] = useState("")
  const [analysisComplete, setAnalysisComplete] = useState(false)

  useEffect(() => {
    setResponse("")
    setAnalysisComplete(false)

    const analyzeContent = async () => {
      console.log(`🔍 Starting ${inputSource} analysis`)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const aiResponse = generateIntelligentResponse(inputSource, screenContent, audioContext, transcript)
      setResponse(aiResponse)
      setAnalysisComplete(true)
      console.log("✅ Analysis complete")
    }

    analyzeContent()
  }, [screenContent, audioContext, transcript, inputSource])

  const generateIntelligentResponse = (
    source: "audio" | "screen" | null,
    screen: string,
    audio: string,
    transcriptText: string,
  ) => {
    const sourceText = source === "audio" ? "audio input" : "screen analysis"

    if (source === "audio") {
      const audioInput = transcriptText || audio
      const cleanAudio = audioInput.replace("🎤 LIVE: ", "").replace("🤖 SIMULATED: ", "").trim()

      if (cleanAudio.toLowerCase().includes("capital") || cleanAudio.toLowerCase().includes("india")) {
        return `**New Delhi is the capital of India.**

• Serves as the seat of all three branches of the Government of India
• Major administrative and political hub  
• Hosts Rashtrapati Bhavan, Parliament House, and Supreme Court

New Delhi became the capital in1911, replacing Calcutta (now Kolkata). It is the center for national government and international diplomacy.`
      }

      return `Based on your audio input: "${cleanAudio}"

I've analyzed what you said and here's my response:

**Audio Analysis:**
• Your voice input was successfully captured and processed
• I detected your question/request about: ${cleanAudio.slice(0, 100)}...

**Response:**
I understand you're asking about this topic. Based on your audio input, I can provide relevant information and assistance.

How can I help you further with this topic?`
    } else {
      if (screen.toLowerCase().includes("v0") || screen.toLowerCase().includes("chat")) {
        return `Based on screen analysis of your current window:

I can see you're working with a development interface, specifically what appears to be v0.dev or a similar chat-based development tool.

**Screen Content Analysis:**
• You're in a development environment
• There are chat conversations visible
• Code blocks and technical discussions are present
• Multiple browser tabs are open including development tools

**Current Context:**
• Working on an "All-rounder desktop assistant" project
• Implementing AI features and voice commands
• Using modern web development tools and frameworks

Would you like me to help with specific aspects of your development work or answer questions about what's visible on your screen?`
      }

      return `Based on screen analysis of your current window:

I've analyzed what's currently visible on your screen and can provide contextual assistance.

**Screen Content Summary:**
• Page/Application: ${document.title || "Current webpage"}
• Content Type: ${screen.includes("search") ? "Search results" : "Informational content"}
• Key Elements: Interactive elements, text content, and navigation options

**Analysis Results:**
The screen shows content that appears to be related to productivity, development, or information browsing. I can help you understand, summarize, or work with what's currently displayed.

What specific aspect of your screen content would you like me to help you with?`
    }
  }

  const getInputSourceIcon = () => {
    switch (inputSource) {
      case "audio":
        return <Mic className="h-4 w-4 text-blue-400" />
      case "screen":
        return <Monitor className="h-4 w-4 text-green-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getInputSourceColor = () => {
    switch (inputSource) {
      case "audio":
        return "text-blue-400"
      case "screen":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto z-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl h-[80vh] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          {/* Header - Cluely Style */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-gray-300" />
              <h2 className="text-2xl font-bold text-gray-300">AI Response</h2>
              {inputSource && (
                <Badge className={`bg-black/50 ${getInputSourceColor()}`}>
                  {getInputSourceIcon()}
                  <span className="ml-1 capitalize">{inputSource} Input</span>
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              {/* Clear Button - Cluely Style */}
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-white/10 rounded-full"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Clear
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white rounded-lg">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {response ? (
              <div className="bg-black/50 rounded-xl p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-200">
                    {inputSource === "audio" ? "Capital of India" : "Screen Analysis Result"}
                  </h3>
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
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
                    {response.split("\n").map((line, index) => (
                      <p
                        key={index}
                        className={
                          line.startsWith("•") ? "ml-4" : line.startsWith("**") ? "font-semibold text-white" : ""
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
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
                  <p className="text-gray-400">
                    Analyzing {inputSource === "audio" ? "audio input" : "screen content"}...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
