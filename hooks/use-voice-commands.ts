"use client"

import { useEffect, useRef } from "react"

export interface VoiceCommand {
  phrases: string[]
  action: () => void
  description: string
  category: "navigation" | "ai" | "control" | "system"
}

interface UseVoiceCommandsProps {
  transcript: string
  isListening: boolean
  commands: VoiceCommand[]
  onCommandDetected?: (command: VoiceCommand, phrase: string) => void
}

export function useVoiceCommands({ transcript, isListening, commands, onCommandDetected }: UseVoiceCommandsProps) {
  const lastProcessedTranscript = useRef("")
  const commandCooldown = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!isListening || !transcript || transcript === lastProcessedTranscript.current) {
      return
    }

    // Only process new transcript content
    const newContent = transcript.replace(lastProcessedTranscript.current, "").toLowerCase().trim()
    if (!newContent) return

    console.log("🎙️ Processing voice command:", newContent)

    // Check for commands in the new content
    for (const command of commands) {
      for (const phrase of command.phrases) {
        const normalizedPhrase = phrase.toLowerCase()

        // Check if the phrase is in the new content
        if (newContent.includes(normalizedPhrase)) {
          const commandKey = `${command.category}-${phrase}`

          // Prevent rapid-fire commands (cooldown)
          if (commandCooldown.current.has(commandKey)) {
            continue
          }

          console.log("🎙️ Voice command detected:", phrase)

          // Execute the command
          command.action()

          // Notify about command detection
          onCommandDetected?.(command, phrase)

          // Add cooldown
          commandCooldown.current.add(commandKey)
          setTimeout(() => {
            commandCooldown.current.delete(commandKey)
          }, 3000) // 3 second cooldown

          break // Only execute first matching command
        }
      }
    }

    lastProcessedTranscript.current = transcript
  }, [transcript, isListening, commands, onCommandDetected])

  // Clear processed transcript when listening stops
  useEffect(() => {
    if (!isListening) {
      lastProcessedTranscript.current = ""
      commandCooldown.current.clear()
    }
  }, [isListening])
}
