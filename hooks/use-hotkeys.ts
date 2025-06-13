"use client"

import { useEffect } from "react"

export function useHotkeys(keys: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyCombo = keys.toLowerCase().split("+")
      const pressedKeys = []

      if (event.ctrlKey || event.metaKey) pressedKeys.push("ctrl")
      if (event.altKey) pressedKeys.push("alt")
      if (event.shiftKey) pressedKeys.push("shift")

      // Handle special key combinations
      if (event.key === "Enter") pressedKeys.push("enter")
      else if (event.key === "ArrowDown") pressedKeys.push("down")
      else if (event.key === "ArrowUp") pressedKeys.push("up")
      else if (event.key === "\\") pressedKeys.push("\\")
      else if (event.key === "b") pressedKeys.push("b")
      else if (event.key === "c") pressedKeys.push("c")
      else if (event.key === "h") pressedKeys.push("h")
      else pressedKeys.push(event.key.toLowerCase())

      const isMatch = keyCombo.every((key) => pressedKeys.includes(key)) && keyCombo.length === pressedKeys.length

      if (isMatch) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keys, callback])
}
