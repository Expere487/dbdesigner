"use client"

import { useModal } from "@/hooks/use-modal"
import NewProject from "@/components/forms/NewProject"
import { QuickSettingsForm, InviteTeamForm } from "./modal-forms"
import { RiAddLine, RiSettingsLine } from "@remixicon/react"

interface DashboardHeaderActionsProps {
  user: any
}

export function DashboardHeaderActions({ user }: DashboardHeaderActionsProps) {
  const { openModal, closeModal } = useModal()

  const handleNewProject = () => {
    openModal(
      'Yeni Proje Oluştur',
      <NewProject onClose={closeModal} user={user} />,
      { size: 'xl' }
    )
  }

  const handleQuickSettings = () => {
    openModal(
      'Hızlı Ayarlar',
      <QuickSettingsForm onClose={closeModal} />,
      { size: 'sm' }
    )
  }

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={handleQuickSettings}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground"
      >
        <RiSettingsLine className="size-4" />
        Ayarlar
      </button>
      <button 
        onClick={handleNewProject}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
      >
        <RiAddLine className="size-4" />
        Yeni Proje
      </button>
    </div>
  )
} 