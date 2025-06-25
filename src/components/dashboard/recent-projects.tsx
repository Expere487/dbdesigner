"use client"
import { Button } from "@/components/ui/button"
import { RiArrowRightLine, RiDatabase2Line, RiEyeLine, RiShare2Line } from "@remixicon/react"
import { useEffect, useState } from "react"
import { ProjectCard, ProjectCardSkeleton } from "../cards/ProjectCard"
import { useQuery } from "@tanstack/react-query"
import { getUserProjects } from "@/lib/functions/backend"
import { Project } from "@/types/types"


interface RecentProjectsProps {
  user: any
}

export function RecentProjects({ user }: RecentProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getUserProjects(user.id)
  })

    return(
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Son Projeler
        </h2>
        <Button variant="ghost" size="sm">
          Tümünü Görüntüle
          <RiArrowRightLine className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          isPending ? (
            <ProjectCardSkeleton />
          ) : (
            data?.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )
        }
      </div>
    </div >
  )
} 