"use client"

import { useModal } from "@/hooks/use-modal"
import NewProject from "@/components/forms/NewProject"
import { QuickSettingsForm, InviteTeamForm } from "./modal-forms"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RiAddLine, RiGitBranchLine, RiDatabase2Line, RiGroupLine } from "@remixicon/react"

interface DashboardQuickActionsProps {
  user: any
}

export function DashboardQuickActions({ user }: DashboardQuickActionsProps) {
  const { openModal, closeModal } = useModal()

  const handleNewProject = () => {
    openModal(
      'Yeni Proje Oluştur',
      <NewProject onClose={closeModal} user={user} />,
      { size: 'xl' }
    )
  }

  const handleInviteTeam = () => {
    openModal(
      'Takım Üyelerini Davet Et',
      <InviteTeamForm onClose={closeModal} />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Hızlı İşlemler</CardTitle>
        <CardDescription>
          Sık kullanılan işlemler
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start" onClick={handleNewProject}>
          <RiAddLine className="size-4" />
          Yeni Şema Oluştur
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <RiGitBranchLine className="size-4" />
          Şablon Kullan
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <RiDatabase2Line className="size-4" />
          SQL İçe Aktar
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={handleInviteTeam}>
          <RiGroupLine className="size-4" />
          Takım Davet Et
        </Button>
      </CardContent>
    </Card>
  )
} 