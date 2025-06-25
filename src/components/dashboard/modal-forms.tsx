"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function QuickSettingsForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Karanlık Mod</span>
          <Button variant="outline" size="sm">Değiştir</Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Bildirimler</span>
          <Button variant="outline" size="sm">Açık</Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Otomatik Kaydet</span>
          <Button variant="outline" size="sm">Etkin</Button>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button onClick={onClose}>Tamam</Button>
      </div>
    </div>
  )
}

export function InviteTeamForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Davet gönderiliyor:', email)
    setEmail('')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-posta Adresi</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="meslektaş@şirket.com"
          required
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          İptal
        </Button>
        <Button type="submit">Davet Gönder</Button>
      </div>
    </form>
  )
} 