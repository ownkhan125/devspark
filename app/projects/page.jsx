import ProjectsClient from "./ProjectsClient";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Projects — Devspark Studio",
  description:
    "A small, deliberately senior team. Selected work from the last year — web, product, brand, and motion.",
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <ProjectsClient />
      <CTASection
        title="Got a project worth"
        highlight="shipping"
        trailing="together?"
        description="We take on a small number of engagements each quarter. Tell us about yours — we'll come back within one business day."
      />
      <Footer />
    </main>
  );
}
