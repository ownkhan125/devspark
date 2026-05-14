import BlogsClient from "./BlogsClient";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Field Notes — Devspark Studio",
  description:
    "Creative insights and smart solutions from the studio — design, engineering, branding, and the work in between.",
};

export default function BlogsPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <BlogsClient />
      <CTASection
        title="Like what you've"
        highlight="read?"
        trailing="Let's build something."
        description="Notes are a side effect of the work. If something here resonates, we'd love to hear what you're shipping."
      />
      <Footer />
    </main>
  );
}
