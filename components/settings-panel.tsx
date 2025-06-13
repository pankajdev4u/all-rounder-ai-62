"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, Monitor, Shield, Palette, Keyboard, Database, Zap } from "lucide-react"

interface SettingsPanelProps {
  onClose: () => void
  panelPosition: { x: number; y: number }
  onPositionChange: (position: { x: number; y: number }) => void
}

export function SettingsPanel({ onClose, panelPosition, onPositionChange }: SettingsPanelProps) {
  const [settings, setSettings] = useState({
    screenMonitoring: true,
    audioListening: false,
    autoResponses: true,
    invisibleMode: true,
    darkMode: true,
    opacity: [90],
    hotkey: "ctrl+enter",
    aiModel: "gpt-4o",
    responseSpeed: "balanced",
    dataRetention: "session-only",
    notifications: true,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetPosition = () => {
    onPositionChange({ x: 20, y: 20 })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] bg-gray-900 border-gray-700 text-white shadow-2xl overflow-hidden">
        <div className="p-6 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold">All-rounder Settings</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Core Features */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Monitor className="h-4 w-4 text-blue-400" />
                <h3 className="text-lg font-medium">Core Features</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Screen Monitoring</Label>
                    <p className="text-xs text-gray-400">Analyze screen content for context</p>
                  </div>
                  <Switch
                    checked={settings.screenMonitoring}
                    onCheckedChange={(checked) => updateSetting("screenMonitoring", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Audio Listening</Label>
                    <p className="text-xs text-gray-400">Listen to ambient audio for context</p>
                  </div>
                  <Switch
                    checked={settings.audioListening}
                    onCheckedChange={(checked) => updateSetting("audioListening", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Auto Responses</Label>
                    <p className="text-xs text-gray-400">Proactive suggestions based on context</p>
                  </div>
                  <Switch
                    checked={settings.autoResponses}
                    onCheckedChange={(checked) => updateSetting("autoResponses", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Privacy & Security */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-4 w-4 text-green-400" />
                <h3 className="text-lg font-medium">Privacy & Security</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Invisible Mode</Label>
                    <p className="text-xs text-gray-400">Hide from screen recordings & shares</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.invisibleMode}
                      onCheckedChange={(checked) => updateSetting("invisibleMode", checked)}
                    />
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
                      Active
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Data Retention</Label>
                  <Select
                    value={settings.dataRetention}
                    onValueChange={(value) => updateSetting("dataRetention", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="session-only">Session Only</SelectItem>
                      <SelectItem value="24-hours">24 Hours</SelectItem>
                      <SelectItem value="7-days">7 Days</SelectItem>
                      <SelectItem value="never">Never Delete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Appearance */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-4 w-4 text-purple-400" />
                <h3 className="text-lg font-medium">Appearance</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Dark Mode</Label>
                    <p className="text-xs text-gray-400">Use dark theme</p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Panel Opacity: {settings.opacity[0]}%</Label>
                  <Slider
                    value={settings.opacity}
                    onValueChange={(value) => updateSetting("opacity", value)}
                    max={100}
                    min={20}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Panel Position</Label>
                    <p className="text-xs text-gray-400">
                      X: {panelPosition.x}, Y: {panelPosition.y}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetPosition}
                    className="border-gray-600 text-gray-300 hover:bg-white/10"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Controls */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Keyboard className="h-4 w-4 text-yellow-400" />
                <h3 className="text-lg font-medium">Controls</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">AI Hotkey</Label>
                  <Select value={settings.hotkey} onValueChange={(value) => updateSetting("hotkey", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="ctrl+enter">Ctrl + Enter</SelectItem>
                      <SelectItem value="ctrl+space">Ctrl + Space</SelectItem>
                      <SelectItem value="alt+a">Alt + A</SelectItem>
                      <SelectItem value="cmd+j">Cmd + J</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Notifications</Label>
                    <p className="text-xs text-gray-400">Show system notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateSetting("notifications", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* AI Configuration */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-4 w-4 text-cyan-400" />
                <h3 className="text-lg font-medium">AI Configuration</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">AI Model</Label>
                  <Select value={settings.aiModel} onValueChange={(value) => updateSetting("aiModel", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Response Speed</Label>
                  <Select
                    value={settings.responseSpeed}
                    onValueChange={(value) => updateSetting("responseSpeed", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="fast">Fast (Less accurate)</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="thorough">Thorough (More accurate)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 mt-8 pt-4 border-t border-gray-700">
            <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:bg-white/10">
              Cancel
            </Button>
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
              Save Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
