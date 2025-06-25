import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiDatabase2Line, RiEyeLine, RiShare2Line, RiTable2 } from "@remixicon/react"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { Project } from "@/types/types"
import { Badge } from "../ui/badge"
import { Database } from "lucide-react"
import Link from "next/link"

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/dashboard/project/${project.id}`}>
            <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 group">
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
                        <Badge variant="default" className="capitalize">
                            <Database className="size-4" />
                            {project.db_type}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <RiTable2 className="size-4" />
                                Tablo
                            </span>
                            <span>{new Date(project.created_at).toLocaleDateString()}</span>
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
        </Link>
    )
}

export function ProjectCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-1/2 h-4" />
                </CardTitle>
                <CardDescription className="flex flex-col gap-2">
                    <Skeleton className="w-1/2 h-4" />
                </CardDescription>
            </CardHeader>
        </Card>
    )
}