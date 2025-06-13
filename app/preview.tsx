"use client"

import PreviewToolbar from "@/components/preview-toolbar"

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-white mb-8">Updated Toolbar Preview</h1>

      <div className="w-full max-w-3xl mb-12">
        <PreviewToolbar />
      </div>

      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-white mb-4">Changes Made:</h2>

        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>
              <strong>Removed "Upgrade to Pro" button</strong> - Toolbar now starts directly with "Ask AI"
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>
              <strong>Matched Cluely.ai hotkeys</strong> - Ctrl+↓ for Ask AI, Ctrl+↑ for Chat, Ctrl+\ for Show/Hide
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>
              <strong>Kept V20 UI colors & background</strong> - Blue gradient background and button styling preserved
            </span>
          </li>
        </ul>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-medium text-white mb-2">Hotkey Summary:</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <strong>Ctrl + ↓</strong> → Ask AI (or Ask Follow-Up after first response)
            </li>
            <li>
              <strong>Ctrl + ↑</strong> → Open Chat
            </li>
            <li>
              <strong>Ctrl + \</strong> → Show/Hide interface
            </li>
            <li>
              <strong>Ctrl + H</strong> → Start Over (reset everything)
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
