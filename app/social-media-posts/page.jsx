import SocialMediaPostsClient from "./SocialMediaPostsClient";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Social Media Posts — Devspark Studio",
  description:
    "A premium social media campaign — twenty designed Instagram feed posts and story compositions, viewable live in the browser.",
};

export default function SocialMediaPostsPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <SocialMediaPostsClient />
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
