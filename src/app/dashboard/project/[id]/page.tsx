import type { Metadata } from "next";
import Header from "@/components/header";
import SchemaVisualizer from "@/components/schema-visualizer";
import { getProject } from "@/lib/functions/backend";
export const metadata: Metadata = {
  title: "Experiment 07 - Crafted.is",
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const project = await getProject(id)
  console.log(project)
  return (
    <div className="h-[calc(100svh-3rem)] md:h-[calc(100svh-4rem)] overflow-hidden">
      <SchemaVisualizer  />
    </div>
  );
}
