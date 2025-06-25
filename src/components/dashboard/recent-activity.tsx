import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiAddLine, RiTimelineView, RiGroupLine, RiShare2Line } from "@remixicon/react"

interface Activity {
  id: string
  action: string
  time: string
  type: 'create' | 'update' | 'user' | 'share'
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Son Aktiviteler</CardTitle>
        <CardDescription>
          Güncel işlemler ve değişiklikler
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-3 last:pb-0 border-b last:border-b-0">
              <div className={`p-1.5 rounded-full ${
                activity.type === 'create' ? 'bg-green-100 dark:bg-green-900/30' :
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
  )
} 