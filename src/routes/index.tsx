import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

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
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
    </main>
  );
}
