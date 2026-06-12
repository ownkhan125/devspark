import { notFound } from "next/navigation";
import {
  socialPosts,
  getSocialPost,
  adjacentSocialPosts,
} from "@/lib/socialPosts";
import SocialMediaPostDetailClient from "./SocialMediaPostDetailClient";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";

export async function generateStaticParams() {
  return socialPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getSocialPost(slug);
  if (!post) return { title: "Post — Devspark Studio" };
  return {
    title: `${post.title} · ${post.formatLabel} — Devspark Social Series`,
    description: post.concept,
  };
}

export default async function SocialMediaPostDetailPage({ params }) {
  const { slug } = await params;
  const post = getSocialPost(slug);
  if (!post) notFound();
  const { prev, next } = adjacentSocialPosts(slug);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <SocialMediaPostDetailClient post={post} prev={prev} next={next} />
      <CTASection
        title="Want a campaign of"
        highlight="your own?"
        trailing=""
        description="Tell us about the launch, the story, or the moment you're building toward. We'll come back within one business day with a small plan."
      />
      <Footer />
    </main>
  );
}
