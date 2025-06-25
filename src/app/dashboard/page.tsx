import { getUser } from "@/lib/supabase/auth/action"
import { 
  StatsCards, 
  RecentProjects, 
  RecentActivity, 
  StatsSummary
} from "@/components/dashboard"
import { DashboardHeaderActions } from "@/components/dashboard/dashboard-header-actions"
import { DashboardQuickActions } from "@/components/dashboard/dashboard-quick-actions"

export default async function DashboardPage() {
  const user = await getUser()
  
  // Mock data - gerçek uygulamada bu veriler veritabanından gelecek
  const stats = {
    totalProjects: 12,
    activeSchemas: 8,
    collaborators: 24
  }


  const activities = [
    {
      id: "1",
      action: "E-Ticaret Veritabanı'na yeni tablo eklendi",
      time: "2 saat önce",
      type: "create" as const
    },
    {
      id: "2",
      action: "Blog CMS Sistemi güncellendi",
      time: "5 saat önce",
      type: "update" as const
    },
    {
      id: "3",
      action: "Yeni işbirlikçi eklendi",
      time: "1 gün önce",
      type: "user" as const
    },
    {
      id: "4",
      action: "Envanter Takip projesi paylaşıldı",
      time: "2 gün önce",
      type: "share" as const
    }
  ]

  const monthlyStats = {
    newProjects: 3,
    completed: 5,
    totalViews: 127,
    shared: 8
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
                Projelerinizi yönetin ve yeni tasarımlar oluşturun
              </p>
            </div>
            <DashboardHeaderActions user={user} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <StatsCards {...stats} />

            {/* Recent Projects */}
            <RecentProjects user={user} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <DashboardQuickActions user={user} />

            {/* Recent Activity */}
            <RecentActivity activities={activities} />

            {/* Stats Summary */}
            <StatsSummary {...monthlyStats} />
          </div>
        </div>
      </div>
    </div>
  )
}