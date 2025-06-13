"use client"

import { useState, useEffect, useRef } from "react"

export function useAudioListener(isListening: boolean) {
  const [audioContext, setAudioContext] = useState("")
  const [transcript, setTranscript] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState("")
  const [isSimulated, setIsSimulated] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recognitionRef = useRef<any>(null)
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const attemptCountRef = useRef(0)

  // Check if browser supports speech recognition
  const getSpeechRecognition = () => {
    if (typeof window === "undefined") return null
    return window.SpeechRecognition || (window as any).webkitSpeechRecognition || null
  }

  const startSimulation = () => {
    console.log("🤖 Starting simulation mode")
    setIsSimulated(true)
    setIsRecording(true)
    setError("")

    const mockTranscripts = [
      "Hello, this is a simulated transcript because your microphone isn't working properly.",
      "I planned all preparations. Four weeks from now is probably the earliest possible date.",
      "I'd like you to meet with two of my managers to discuss opinions about the meeting's location and timing.",
      "We need to finalize the project timeline by next Friday. The client is expecting a full report.",
      "Let's review the quarterly numbers before the board meeting. Sales are up 15% but we're seeing some concerning trends.",
      "The weather today is quite nice. I think we should have our meeting outdoors.",
      "This simulation allows you to test the interface even when the real microphone has issues.",
      "You can still use all the features with this simulated speech data.",
    ]

    // Set initial transcript immediately
    const initialTranscript = mockTranscripts[0]
    setTranscript("🤖 " + initialTranscript)
    setAudioContext("🤖 SIMULATED: " + initialTranscript)

    let transcriptIndex = 1

    // Clear any existing simulation
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current)
    }

    // Update transcript every 4 seconds
    const interval = setInterval(() => {
      if (isListening && transcriptIndex < mockTranscripts.length) {
        const newTranscript = mockTranscripts[transcriptIndex]
        setTranscript("🤖 " + newTranscript)
        setAudioContext("🤖 SIMULATED: " + newTranscript)
        console.log("🤖 Simulation transcript updated:", newTranscript)
        transcriptIndex++
      } else if (transcriptIndex >= mockTranscripts.length) {
        // Loop back to beginning
        transcriptIndex = 0
      }
    }, 4000)

    simulationIntervalRef.current = interval
  }

  const stopAllRecording = () => {
    console.log("🎤 Stopping all recording")

    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
        recognitionRef.current.abort()
      } catch (e) {
        console.log("🎤 Error stopping recognition:", e)
      }
      recognitionRef.current = null
    }

    // Stop media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop()
      } catch (e) {
        console.log("🎤 Error stopping media recorder:", e)
      }
      mediaRecorderRef.current = null
    }

    // Stop simulation
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current)
      simulationIntervalRef.current = null
    }

    setIsRecording(false)
    setIsSimulated(false)
    attemptCountRef.current = 0
  }

  const SpeechRecognition = getSpeechRecognition()
  const microphoneSupported =
    typeof window !== "undefined" &&
    "mediaDevices" in navigator &&
    "getUserMedia" in navigator.mediaDevices &&
    Boolean(SpeechRecognition)

  useEffect(() => {
    console.log("🎤 Audio listener effect triggered, isListening:", isListening)

    if (!isListening) {
      stopAllRecording()
      setAudioContext("")
      setTranscript("")
      return
    }

    // Reset attempt counter
    attemptCountRef.current = 0

    // If no speech recognition support, go straight to simulation
    if (!SpeechRecognition) {
      console.log("🎤 No speech recognition support, starting simulation")
      setError("Speech recognition not supported - using simulation")
      startSimulation()
      return
    }

    // Try real microphone first, but with a timeout
    const tryRealMicrophone = async () => {
      try {
        console.log("🎤 Attempting real microphone access...")

        // Set a timeout for microphone access
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Microphone access timeout")), 3000)
        })

        const streamPromise = navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        })

        const stream = (await Promise.race([streamPromise, timeoutPromise])) as MediaStream

        console.log("🎤 Microphone access granted")
        setIsSimulated(false)

        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = "en-US"

        recognition.onstart = () => {
          console.log("🎤 Speech recognition started successfully")
          setIsRecording(true)
          setAudioContext("🎤 Listening... Speak now!")
          setError("")
        }

        recognition.onresult = (event: any) => {
          console.log("🎤 Speech recognition result received")
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
          console.log("🎤 Real transcript:", currentTranscript)
          setTranscript(currentTranscript)
          setAudioContext(`🎤 LIVE: ${currentTranscript}`)
        }

        recognition.onerror = (event: any) => {
          console.error("🎤 Speech recognition error:", event.error)
          attemptCountRef.current++

          // If we've had multiple errors or specific error types, switch to simulation
          if (
            event.error === "aborted" ||
            event.error === "network" ||
            event.error === "not-allowed" ||
            attemptCountRef.current >= 2
          ) {
            console.log("🎤 Switching to simulation due to error:", event.error)
            setError(`Microphone error (${event.error}) - using simulation`)
            startSimulation()
          }
        }

        recognition.onend = () => {
          console.log("🎤 Speech recognition ended")

          if (isListening && !isSimulated) {
            attemptCountRef.current++

            if (attemptCountRef.current < 3) {
              // Try to restart
              try {
                console.log("🎤 Attempting to restart speech recognition")
                setTimeout(() => {
                  if (recognitionRef.current && isListening) {
                    recognition.start()
                  }
                }, 500)
              } catch (e) {
                console.log("🎤 Failed to restart, switching to simulation")
                startSimulation()
              }
            } else {
              console.log("🎤 Too many restart attempts, switching to simulation")
              startSimulation()
            }
          }
        }

        recognitionRef.current = recognition

        try {
          recognition.start()
        } catch (e) {
          console.error("🎤 Failed to start recognition:", e)
          throw e
        }

        // Stop the stream after setting up recognition
        stream.getTracks().forEach((track) => track.stop())
      } catch (err: any) {
        console.error("🎤 Real microphone failed:", err.message)
        setError(`Microphone failed: ${err.message} - using simulation`)
        startSimulation()
      }
    }

    // Start with real microphone attempt
    tryRealMicrophone()

    return () => {
      stopAllRecording()
    }
  }, [isListening])

  return {
    audioContext,
    transcript,
    isRecording,
    error,
    isSimulated,
    microphoneSupported,
  }
}
