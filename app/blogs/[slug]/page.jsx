import { notFound } from "next/navigation";
import { getPost, posts, relatedPosts } from "@/lib/posts";
import BlogDetailClient from "./BlogDetailClient";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Field notes — Devspark Studio" };
  return {
    title: `${p.title} — Devspark Studio`,
    description: p.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(slug, 3);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <BlogDetailClient post={post} related={related} />
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
