"use client"

import { useState, useEffect } from "react"

export function useScreenAnalyzer() {
  const [screenContent, setScreenContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const analyzeScreen = async () => {
      setIsAnalyzing(true)

      // Enhanced screen analysis
      const analysis = () => {
        const currentUrl = window.location.href
        const pageTitle = document.title
        const visibleText = document.body.innerText.slice(0, 1000)
        const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
          .map((h) => h.textContent)
          .join(", ")
        const links = Array.from(document.querySelectorAll("a"))
          .slice(0, 10)
          .map((a) => a.textContent)
          .join(", ")

        let content = `Page: ${pageTitle}\nURL: ${currentUrl}\n\nMain headings: ${headings}\n\nVisible content: ${visibleText}\n\nKey links: ${links}`

        // Enhanced pattern detection
        if (
          visibleText.toLowerCase().includes("global warming") ||
          visibleText.toLowerCase().includes("climate change")
        ) {
          content +=
            "\n\nDetected: Environmental/Climate content - user researching global warming and climate change topics"
        }
        if (visibleText.toLowerCase().includes("nasa") || visibleText.toLowerCase().includes("science")) {
          content += "\n\nDetected: Scientific content from authoritative sources"
        }
        if (visibleText.toLowerCase().includes("search results")) {
          content += "\n\nDetected: Search results page - user looking for information"
        }
        if (document.querySelectorAll("input, textarea").length > 0) {
          content += "\n\nDetected: Interactive elements - forms or input fields present"
        }

        return content
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setScreenContent(analysis())
      setIsAnalyzing(false)
    }

    analyzeScreen()
    const interval = setInterval(analyzeScreen, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { screenContent, isAnalyzing }
}
