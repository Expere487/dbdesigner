"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectOption } from "@/components/ui/select"
import { RiAddLine, RiArrowRightLine, RiDatabase2Line, RiGitBranchLine, RiGroupLine, RiPieChartLine, RiSettingsLine, RiTimelineView, RiFolder3Line, RiEyeLine, RiShare2Line } from "@remixicon/react"
import Link from "next/link"
import { useModal } from "@/hooks/use-modal"
import { useState } from "react"
import NewProject from "@/components/forms/NewProject"

export default function DashboardPage() {
  const { openModal, closeModal } = useModal()

  const handleNewProject = () => {
    openModal(
      'Create New Project',
      <NewProject onClose={closeModal} />,
      { size: 'xl' }
    )
  }

  const handleQuickSettings = () => {
    openModal(
      'Quick Settings',
      <QuickSettingsForm onClose={closeModal} />,
      { size: 'sm' }
    )
  }

  const handleInviteTeam = () => {
    openModal(
      'Invite Team Members',
      <InviteTeamForm onClose={closeModal} />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your projects and create new designs
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleQuickSettings}>
                <RiSettingsLine className="size-4" />
                Settings
              </Button>
              <Button size="sm" onClick={handleNewProject}>
                <RiAddLine className="size-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Total Projects
                      </p>
                      <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                        12
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <RiFolder3Line className="size-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Active Schemas
                      </p>
                      <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                        8
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-green-500/10">
                      <RiDatabase2Line className="size-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Collaborators
                      </p>
                      <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                        24
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-purple-500/10">
                      <RiGroupLine className="size-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Projects */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Recent Projects
                </h2>
                <Button variant="ghost" size="sm">
                  View All
                  <RiArrowRightLine className="size-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "E-Commerce Database",
                    description: "Schema designed for customer and order management",
                    tables: 12,
                    lastModified: "2 saat önce",
                    status: "Aktif"
                  },
                  {
                    name: "Blog CMS System",
                    description: "Content management and user system",
                    tables: 8,
                    lastModified: "1 gün önce",
                    status: "Taslak"
                  },
                  {
                    name: "Inventory Tracking",
                    description: "Stock and product management system",
                    tables: 15,
                    lastModified: "3 gün önce",
                    status: "Aktif"
                  },
                  {
                    name: "Customer Relationships",
                    description: "CRM database design",
                    tables: 10,
                    lastModified: "1 hafta önce",
                    status: "Tamamlandı"
                  }
                ].map((project, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-base group-hover:text-primary transition-colors">
                            {project.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {project.description}
                          </CardDescription>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Aktif' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            project.status === 'Taslak' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                          {project.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <RiDatabase2Line className="size-4" />
                            {project.tables} tablo
                          </span>
                          <span>{project.lastModified}</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <RiEyeLine className="size-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <RiShare2Line className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>
                  Frequently used actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={handleNewProject}>
                  <RiAddLine className="size-4" />
                  Create New Schema
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RiGitBranchLine className="size-4" />
                  Use Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RiDatabase2Line className="size-4" />
                  Import SQL
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleInviteTeam}>
                  <RiGroupLine className="size-4" />
                  Invite Team
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Son Aktiviteler</CardTitle>
                <CardDescription>
                  Güncel işlemler ve değişiklikler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "E-Ticaret Veritabanı'na yeni tablo eklendi",
                      time: "2 saat önce",
                      type: "create"
                    },
                    {
                      action: "Blog CMS Sistemi güncellendi",
                      time: "5 saat önce",
                      type: "update"
                    },
                    {
                      action: "Yeni işbirlikçi eklendi",
                      time: "1 gün önce",
                      type: "user"
                    },
                    {
                      action: "Envanter Takip projesi paylaşıldı",
                      time: "2 gün önce",
                      type: "share"
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 last:pb-0 border-b last:border-b-0">
                      <div className={`p-1.5 rounded-full ${activity.type === 'create' ? 'bg-green-100 dark:bg-green-900/30' :
                          activity.type === 'update' ? 'bg-blue-100 dark:bg-blue-900/30' :
                            activity.type === 'user' ? 'bg-purple-100 dark:bg-purple-900/30' :
                              'bg-orange-100 dark:bg-orange-900/30'
                        }`}>
                        {activity.type === 'create' && <RiAddLine className="size-3 text-green-600 dark:text-green-400" />}
                        {activity.type === 'update' && <RiTimelineView className="size-3 text-blue-600 dark:text-blue-400" />}
                        {activity.type === 'user' && <RiGroupLine className="size-3 text-purple-600 dark:text-purple-400" />}
                        {activity.type === 'share' && <RiShare2Line className="size-3 text-orange-600 dark:text-orange-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bu Ay</CardTitle>
                <CardDescription>
                  Performans özeti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Yeni Projeler</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tamamlanan</span>
                    <span className="text-sm font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Toplam Görüntüleme</span>
                    <span className="text-sm font-medium">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Paylaşılan</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



function QuickSettingsForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark Mode</span>
          <Button variant="outline" size="sm">Toggle</Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Notifications</span>
          <Button variant="outline" size="sm">On</Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto Save</span>
          <Button variant="outline" size="sm">Enabled</Button>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  )
}

function InviteTeamForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Inviting:', email)
    setEmail('')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="colleague@company.com"
          required
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Send Invitation</Button>
      </div>
    </form>
  )
}