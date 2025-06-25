import { Card, CardContent } from "@/components/ui/card"
import { RiFolder3Line, RiDatabase2Line, RiGroupLine } from "@remixicon/react"

interface StatsCardsProps {
  totalProjects: number
  activeSchemas: number
  collaborators: number
}

export function StatsCards({ totalProjects, activeSchemas, collaborators }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Toplam Proje
              </p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {totalProjects}
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
                Aktif Şema
              </p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                {activeSchemas}
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
                İşbirlikçi
              </p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {collaborators}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-500/10">
              <RiGroupLine className="size-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 