"use client"

import { MicrophoneTestSimple } from "@/components/microphone-test-simple"

export default function TestSimplePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Simple Microphone Test</h1>
        <p className="text-gray-400 mb-8">
          This test will automatically fall back to simulation mode if the real microphone fails.
        </p>
      </div>
      <MicrophoneTestSimple />
    </div>
  )
}
