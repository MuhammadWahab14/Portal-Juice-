import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal Juice — Gateway To Health" },
      {
        name: "description",
        content:
          "Portal Juice — cold-pressed wellness blends crafted by purpose. No added sugar, no added water. Just ingredients that work.",
      },
      { property: "og:title", content: "Portal Juice — Gateway To Health" },
      {
        property: "og:description",
        content: "Cold-pressed wellness blends, crafted by purpose.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
