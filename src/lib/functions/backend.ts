"use server"
import { Project } from "@/types/types"

export const getUserProjects = async (user_id: string) => {
    const projects = await fetch(`/api/project/get/all/${user_id}`)
    const projectsData = await projects.json()
    return projectsData as Project[]
}

export const getProject = async (project_id: string) => {
    const project = await fetch(`${process.env.API_URL}/project/get/${project_id}`)
    const projectData = await project.json()
    return projectData
}
