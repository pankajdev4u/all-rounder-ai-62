"use client"

import { useState, useEffect, useCallback } from "react"
import { TopFloatingToolbar } from "@/components/top-floating-toolbar"
import { RightSideAssistantCard } from "@/components/right-side-assistant-card"
import { VoiceListeningPopup } from "@/components/voice-listening-popup"
import { VoiceCommandsPanel } from "@/components/voice-commands-panel"
import { UnifiedAIResponseOverlay } from "@/components/unified-ai-response-overlay"
import { ChatInterface } from "@/components/chat-interface"
import { MicrophoneDebug } from "@/components/microphone-debug"
import { PersonalizePanel } from "@/components/personalize-panel"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { useScreenAnalyzer } from "@/hooks/use-screen-analyzer"
import { useAudioListener } from "@/hooks/use-audio-listener"
import { useVoiceCommands, type VoiceCommand } from "@/hooks/use-voice-commands"
import { Button } from "@/components/ui/button"

export default function AllRounderAIAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false)
  const [isAIResponseOpen, setIsAIResponseOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [sessionTime, setSessionTime] = useState("00:00")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const [showCommands, setShowCommands] = useState(false)
  const [showVoicePopup, setShowVoicePopup] = useState(false)
  const [showPersonalize, setShowPersonalize] = useState(false)
  const [appOpacity, setAppOpacity] = useState(90) // Default 90% opacity
  const [inputSource, setInputSource] = useState<"audio" | "screen" | null>(null)
  const [lastDetectedCommand, setLastDetectedCommand] = useState<{
    command: VoiceCommand
    phrase: string
    timestamp: number
  } | null>(null)
  const [hasFirstResponse, setHasFirstResponse] = useState(false)

  // Real-time screen analysis and audio listening
  const { screenContent } = useScreenAnalyzer()
  const { audioContext, transcript, isSimulated, isRecording } = useAudioListener(isListening)

  // Show voice popup when listening starts or when we have transcript
  useEffect(() => {
    if (isListening || (transcript && transcript.trim())) {
      setShowVoicePopup(true)
    } else {
      // Keep popup visible for a few seconds after listening stops if we have transcript
      if (transcript && transcript.trim()) {
        const timer = setTimeout(() => {
          if (!isListening) {
            setShowVoicePopup(false)
          }
        }, 10000) // Keep visible for 10 seconds after listening stops
        return () => clearTimeout(timer)
      } else {
        setShowVoicePopup(false)
      }
    }
  }, [isListening, transcript])

  // Smart input detection for Ask AI
  const handleSmartAskAI = useCallback(() => {
    console.log("🔍 Smart Ask AI triggered")

    // Determine input source based on current state
    let detectedSource: "audio" | "screen"

    if (isListening || (transcript && transcript.trim() && showVoicePopup)) {
      // AR listening is active or has recent transcript
      detectedSource = "audio"
      console.log("📱 Using AUDIO input source (AR listening active)")

      // Stop listening if currently active to capture final transcript
      if (isListening) {
        setIsListening(false)
      }
    } else {
      // No AR listening, use screen analysis
      detectedSource = "screen"
      console.log("🖥️ Using SCREEN input source (no AR listening)")
    }

    setInputSource(detectedSource)

    // Close all other popups
    setIsRightPanelOpen(false)
    setIsChatOpen(false)
    setShowCommands(false)
    setShowPersonalize(false)

    // Start analyzing
    setIsAnalyzing(true)

    // Wait a moment for analysis
    setTimeout(() => {
      setIsAIResponseOpen(true)
      setIsAnalyzing(false)
      setHasFirstResponse(true) // Mark that we've had a first response
    }, 1000)
  }, [isListening, transcript, showVoicePopup])

  // Start Over functionality
  const handleStartOver = useCallback(() => {
    console.log("🔄 Starting over - resetting all states")

    // Reset all states
    setIsListening(false)
    setIsAIResponseOpen(false)
    setIsChatOpen(false)
    setIsRightPanelOpen(false)
    setShowCommands(false)
    setShowVoicePopup(false)
    setShowPersonalize(false)
    setInputSource(null)
    setLastDetectedCommand(null)
    setIsAnalyzing(false)
    setHasFirstResponse(false) // Reset first response state

    // Clear any existing analysis
    console.log("✅ Ready for new request")
  }, [])

  // Define voice commands
  const voiceCommands: VoiceCommand[] = [
    // AI Commands
    {
      phrases: ["ask AI", "ask ai", "hey AI", "hey ai", "AI help", "ai help"],
      action: handleSmartAskAI,
      description: "Smart AI analysis (audio or screen)",
      category: "ai",
    },
    {
      phrases: ["analyze screen", "analyze this", "what do you see", "screen analysis"],
      action: handleSmartAskAI,
      description: "Analyze current content",
      category: "ai",
    },
    {
      phrases: ["start over", "new request", "reset", "clear all"],
      action: handleStartOver,
      description: "Start over with new request",
      category: "ai",
    },

    // Navigation Commands
    {
      phrases: ["open chat", "start chat", "chat mode", "conversation"],
      action: handleOpenChat,
      description: "Open chat interface",
      category: "navigation",
    },
    {
      phrases: ["show menu", "open menu", "more options", "settings menu"],
      action: () => setIsRightPanelOpen(true),
      description: "Show right side menu",
      category: "navigation",
    },
    {
      phrases: ["show commands", "voice commands", "what can I say", "help commands"],
      action: () => setShowCommands(true),
      description: "Show available voice commands",
      category: "navigation",
    },
    {
      phrases: ["personalize", "settings", "customize", "preferences"],
      action: () => setShowPersonalize(true),
      description: "Open personalization settings",
      category: "navigation",
    },

    // Control Commands
    {
      phrases: ["hide interface", "hide UI", "invisible mode", "hide everything"],
      action: () => setIsVisible(false),
      description: "Hide the AR interface",
      category: "control",
    },
    {
      phrases: ["stop listening", "stop microphone", "mic off", "silence"],
      action: () => setIsListening(false),
      description: "Turn off microphone",
      category: "control",
    },
    {
      phrases: ["close all", "close everything", "dismiss all", "clear screen"],
      action: handleCloseAll,
      description: "Close all open panels",
      category: "control",
    },

    // System Commands
    {
      phrases: ["debug mode", "show debug", "troubleshoot", "debug microphone"],
      action: () => setShowDebug(true),
      description: "Open debug panel",
      category: "system",
    },
  ]

  // Use voice commands hook
  useVoiceCommands({
    transcript,
    isListening,
    commands: voiceCommands,
    onCommandDetected: (command, phrase) => {
      console.log("🎙️ Voice command executed:", phrase)
      setLastDetectedCommand({
        command,
        phrase,
        timestamp: Date.now(),
      })
    },
  })

  // Update session timer
  useEffect(() => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const minutes = Math.floor(elapsed / 60)
        .toString()
        .padStart(2, "0")
      const seconds = (elapsed % 60).toString().padStart(2, "0")
      setSessionTime(`${minutes}:${seconds}`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Updated Hotkey handlers - Your preferred mappings
  useHotkeys("ctrl+enter", handleSmartAskAI) // Ctrl + Enter for Ask AI
  useHotkeys("ctrl+h", handleStartOver) // Ctrl+H for start over

  useHotkeys("ctrl+c+up", () => {
    // Ctrl + C + ↑ for Chat
    setIsAIResponseOpen(false)
    setIsChatOpen(true)
  })

  useHotkeys("ctrl+b", () => {
    // Ctrl + B for Show/Hide
    setIsVisible(!isVisible)
    if (!isVisible) {
      setIsAIResponseOpen(false)
      setIsChatOpen(false)
      setIsRightPanelOpen(false)
      setShowPersonalize(false)
    }
  })

  function handleOpenChat() {
    setIsAIResponseOpen(false)
    setIsRightPanelOpen(false)
    setShowCommands(false)
    setShowPersonalize(false)
    setIsChatOpen(true)
  }

  function handleCloseAll() {
    setIsAIResponseOpen(false)
    setIsChatOpen(false)
    setIsRightPanelOpen(false)
    setShowCommands(false)
    setShowDebug(false)
    setShowVoicePopup(false)
    setShowPersonalize(false)
  }

  const handleMicToggle = () => {
    console.log("🎤 Toggling microphone:", !isListening)
    setIsListening(!isListening)
  }

  // Show debug tool if requested
  if (showDebug) {
    return <MicrophoneDebug onClose={() => setShowDebug(false)} />
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 text-white hover:bg-gray-800"
        >
          Show AR Assistant
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 system-font">
      {/* Debug Button */}
      <div className="fixed bottom-4 left-4 pointer-events-auto z-50">
        <Button
          onClick={() => setShowDebug(true)}
          variant="outline"
          size="sm"
          className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 text-white hover:bg-gray-800"
        >
          🐛 Debug Microphone
        </Button>
      </div>

      {/* Start Over Button */}
      <div className="fixed bottom-4 left-40 pointer-events-auto z-50">
        <Button
          onClick={handleStartOver}
          variant="outline"
          size="sm"
          className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 text-white hover:bg-gray-800"
        >
          🔄 Start Over (Ctrl+H)
        </Button>
      </div>

      {/* Opacity Display */}
      <div className="fixed bottom-4 right-4 pointer-events-auto z-50">
        <Button
          onClick={() => setShowPersonalize(true)}
          variant="outline"
          size="sm"
          className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 text-white hover:bg-gray-800"
        >
          ⚙️ Opacity: {appOpacity}%
        </Button>
      </div>

      {/* Top Floating Toolbar */}
      <TopFloatingToolbar
        sessionTime={sessionTime}
        isListening={isListening}
        isAnalyzing={isAnalyzing}
        isSimulated={isSimulated}
        hasFirstResponse={hasFirstResponse}
        opacity={appOpacity}
        onMicToggle={handleMicToggle}
        onAskAI={handleSmartAskAI}
        onOpenChat={handleOpenChat}
        onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
        onToggleVisibility={() => setIsVisible(!isVisible)}
        onMicHover={() => {}}
        onOpenPersonalize={() => setShowPersonalize(true)}
      />

      {/* Voice Commands Panel */}
      {showCommands && (
        <VoiceCommandsPanel
          commands={voiceCommands}
          onClose={() => setShowCommands(false)}
          lastDetectedCommand={lastDetectedCommand || undefined}
        />
      )}

      {/* Right Side Assistant Card */}
      {isRightPanelOpen && <RightSideAssistantCard onClose={() => setIsRightPanelOpen(false)} />}

      {/* Personalize Panel */}
      {showPersonalize && (
        <PersonalizePanel
          onClose={() => setShowPersonalize(false)}
          opacity={appOpacity}
          onOpacityChange={setAppOpacity}
        />
      )}

      {/* Voice Listening Popup */}
      {showVoicePopup && (
        <VoiceListeningPopup
          transcript={transcript}
          sessionTime={sessionTime}
          onAskAI={handleSmartAskAI}
          isSimulated={isSimulated}
          onShowCommands={() => setShowCommands(true)}
          lastDetectedCommand={lastDetectedCommand || undefined}
          isListening={isListening}
        />
      )}

      {/* Unified AI Response Overlay */}
      {isAIResponseOpen && (
        <UnifiedAIResponseOverlay
          screenContent={screenContent}
          audioContext={audioContext}
          transcript={transcript}
          inputSource={inputSource}
          isAnalyzing={isAnalyzing}
          onClose={() => setIsAIResponseOpen(false)}
          onStartOver={handleStartOver}
        />
      )}

      {/* Chat Interface */}
      {isChatOpen && (
        <ChatInterface screenContent={screenContent} audioContext={audioContext} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  )
}
