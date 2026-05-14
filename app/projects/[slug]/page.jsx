import { notFound } from "next/navigation";
import { getProject, projects, relatedProjects } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project — Devspark Studio" };
  return {
    title: `${p.name} — Case study · Devspark Studio`,
    description: p.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const related = relatedProjects(slug, 2);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <ProjectDetailClient project={project} related={related} />
      <CTASection
        title="Got a project worth"
        highlight="shipping"
        trailing="together?"
        description="Send a short brief on what you're building. We'll come back within one business day with a small plan and a calendar invite."
      />
      <Footer />
    </main>
  );
}
