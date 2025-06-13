"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Copy, ThumbsUp, ThumbsDown, Sparkles, Monitor } from "lucide-react"

interface OverlayWindowProps {
  context: string
  screenContent: string
  onClose: () => void
}

export function OverlayWindow({ context, screenContent, onClose }: OverlayWindowProps) {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Auto-generate query based on screen content
  useEffect(() => {
    if (screenContent && !query) {
      setQuery(`What can you tell me about: ${screenContent.slice(0, 100)}...`)
    }
  }, [screenContent, query])

  // Simulate AI response based on context
  const handleAskAI = async () => {
    if (!query.trim()) return

    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate contextual response based on screen content
    const mockResponse = generateContextualResponse(query, screenContent)
    setResponse(mockResponse)
    setIsLoading(false)
  }

  // Generate contextual suggestions
  useEffect(() => {
    const contextSuggestions = generateSuggestions(screenContent)
    setSuggestions(contextSuggestions)
  }, [screenContent])

  const generateContextualResponse = (query: string, screenContent: string) => {
    if (screenContent.includes("Gemini") || screenContent.includes("AI")) {
      return "I can see you're working with AI tools. Based on the Gemini interface visible on your screen, it looks like you're exploring AI capabilities. I can help you understand AI concepts, compare different AI models, or assist with AI-related development tasks."
    }
    if (screenContent.includes("code") || screenContent.includes("function")) {
      return "I notice you have code visible on your screen. I can help you debug, optimize, or explain the code you're working with. Would you like me to analyze the specific code patterns I can see?"
    }
    if (screenContent.includes("browser") || screenContent.includes("tab")) {
      return "I can see you have multiple browser tabs open. Based on your current browsing context, I can help you research topics, summarize content, or assist with web-based tasks you're working on."
    }
    return `Based on your screen content showing "${screenContent.slice(0, 100)}...", I can provide contextual assistance. What specific help do you need with what you're currently viewing?`
  }

  const generateSuggestions = (screenContent: string) => {
    if (screenContent.includes("Gemini") || screenContent.includes("AI")) {
      return [
        "Explain AI capabilities I'm seeing",
        "Compare AI models",
        "Help with AI development",
        "Summarize AI concepts",
      ]
    }
    if (screenContent.includes("code")) {
      return ["Debug this code", "Optimize performance", "Explain code structure", "Suggest improvements"]
    }
    return [
      "Summarize what's on my screen",
      "Help me understand this content",
      "Suggest next steps",
      "Explain key concepts",
    ]
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-gray-900/95 border-gray-700 text-white shadow-2xl flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-400" />
              <h2 className="text-lg font-semibold">All-rounder AI Assistant</h2>
              <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                Screen Aware
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-6 flex-1">
            {/* Left Side - Screen Analysis */}
            <div className="flex-1">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-medium">Current Screen Analysis</h3>
                </div>
                <ScrollArea className="h-32 bg-gray-800/50 rounded-lg p-3">
                  <p className="text-sm text-gray-300">{screenContent || "Analyzing screen content..."}</p>
                </ScrollArea>
              </div>

              {/* Quick Suggestions */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Contextual suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(suggestion)}
                      className="border-gray-600 text-gray-300 hover:bg-white/10"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Query Input */}
              <div className="mb-4">
                <Textarea
                  placeholder="Ask me anything about what's on your screen..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none"
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      handleAskAI()
                    }
                  }}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">Ctrl+Enter to send</p>
                  <Button
                    onClick={handleAskAI}
                    disabled={!query.trim() || isLoading}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    {isLoading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side - Response */}
            <div className="flex-1">
              {response && (
                <div className="bg-gray-800/50 rounded-lg p-4 h-full">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                      AI Response
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(response)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="h-[calc(100%-60px)]">
                    <p className="text-gray-200 leading-relaxed">{response}</p>
                  </ScrollArea>

                  {/* Feedback */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
                    <span className="text-xs text-gray-500">Was this helpful?</span>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
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
