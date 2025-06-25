import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsSummaryProps {
  newProjects: number
  completed: number
  totalViews: number
  shared: number
}

export function StatsSummary({ newProjects, completed, totalViews, shared }: StatsSummaryProps) {
  return (
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
            <span className="text-sm font-medium">{newProjects}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tamamlanan</span>
            <span className="text-sm font-medium">{completed}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Toplam Görüntüleme</span>
            <span className="text-sm font-medium">{totalViews}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Paylaşılan</span>
            <span className="text-sm font-medium">{shared}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 