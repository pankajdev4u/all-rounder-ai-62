"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { X, Settings, Eye, Palette, Volume2, Mic } from "lucide-react"

interface PersonalizePanelProps {
  onClose: () => void
  opacity: number
  onOpacityChange: (opacity: number) => void
}

export function PersonalizePanel({ onClose, opacity, onOpacityChange }: PersonalizePanelProps) {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoHide: false,
    soundEffects: true,
    voiceCommands: true,
    animations: true,
    compactMode: false,
  })

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/95 backdrop-blur-xl border border-gray-700/50 text-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-white" />
              <h2 className="text-xl font-semibold">Personalize All Rounder AI</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Opacity Control */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-4 w-4 text-blue-400" />
                <h3 className="text-lg font-medium">Appearance</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">App Opacity</Label>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {opacity}%
                    </Badge>
                  </div>
                  <Slider
                    value={[opacity]}
                    onValueChange={(value) => onOpacityChange(value[0])}
                    max={100}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>20% (Transparent)</span>
                    <span>100% (Solid)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Dark Mode</Label>
                    <p className="text-xs text-gray-400">Use dark theme interface</p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Compact Mode</Label>
                    <p className="text-xs text-gray-400">Smaller interface elements</p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => updateSetting("compactMode", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Behavior Settings */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-4 w-4 text-purple-400" />
                <h3 className="text-lg font-medium">Behavior</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Auto Hide</Label>
                    <p className="text-xs text-gray-400">Hide interface when inactive</p>
                  </div>
                  <Switch
                    checked={settings.autoHide}
                    onCheckedChange={(checked) => updateSetting("autoHide", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Animations</Label>
                    <p className="text-xs text-gray-400">Enable smooth transitions</p>
                  </div>
                  <Switch
                    checked={settings.animations}
                    onCheckedChange={(checked) => updateSetting("animations", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Audio Settings */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Volume2 className="h-4 w-4 text-green-400" />
                <h3 className="text-lg font-medium">Audio</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Sound Effects</Label>
                    <p className="text-xs text-gray-400">Play notification sounds</p>
                  </div>
                  <Switch
                    checked={settings.soundEffects}
                    onCheckedChange={(checked) => updateSetting("soundEffects", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Voice Commands</Label>
                    <p className="text-xs text-gray-400">Enable voice control</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.voiceCommands}
                      onCheckedChange={(checked) => updateSetting("voiceCommands", checked)}
                    />
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
                      <Mic className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between gap-3 mt-8 pt-4 border-t border-gray-700">
            <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:bg-white/10">
              Cancel
            </Button>
            <Button onClick={onClose} className="bg-white text-black hover:bg-gray-200">
              Save Changes
            </Button>
          </div>

          {/* Quick Opacity Presets */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Quick Opacity Presets:</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpacityChange(30)}
                className="border-gray-600 text-gray-300 hover:bg-white/10 text-xs"
              >
                30% Subtle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpacityChange(60)}
                className="border-gray-600 text-gray-300 hover:bg-white/10 text-xs"
              >
                60% Balanced
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpacityChange(90)}
                className="border-gray-600 text-gray-300 hover:bg-white/10 text-xs"
              >
                90% Solid
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
