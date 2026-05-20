import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type Juice = {
  title: string;
  image: string;
  description: string;
  ingredients: string;
  position?: string;
};

const juices: Juice[] = [
  { title: "High Blood Pressure", image: "/images/high-blood-pressure.png", description: "A heart-friendly blend that supports healthy circulation.", ingredients: "Cucumber, celery, beetroot, pomegranate, spinach, lemon and fresh ginger." },
  { title: "Diabetes", image: "/images/diabetes.png", description: "A low-glycemic green blend to help balance sugar levels.", ingredients: "Bitter gourd, cucumber, spinach, celery, green apple and lemon." },
  { title: "Arthritis", image: "/images/arthritis.png", description: "An anti-inflammatory blend to soothe joints and mobility.", ingredients: "Pineapple, turmeric, carrot, ginger, lemon and orange." },
  { title: "Asthma", image: "/images/asthma.png", description: "A clarifying blend to support easier breathing.", ingredients: "Carrot, spinach, ginger, lemon, apple and parsley." },
  { title: "Weight Loss", image: "/images/weight-loss.png", description: "A light metabolism-boosting blend to support your goals.", ingredients: "Cucumber, mint, lemon, green apple, celery and ginger." },
  { title: "High Cholesterol", image: "/images/high-cholesterol.png", description: "A cleansing blend that supports a healthy lipid profile.", ingredients: "Apple, carrot, beetroot, lemon, ginger and garlic.", position: "14% center" },
  { title: "Eye Care", image: "/images/eye-care.png", description: "Beta-carotene rich blend to nourish your vision.", ingredients: "Carrot, orange, spinach, apple, beetroot and lemon." },
  { title: "Energy", image: "/images/energy.png", description: "A vibrant blend to power your day naturally.", ingredients: "Beetroot, orange, carrot, apple, ginger and lemon." },
];

export const Route = createFileRoute("/juices")({
  head: () => ({
    meta: [
      { title: "Juices — Portal Juice" },
      { name: "description", content: "Eight cold-pressed juice blends crafted for specific wellness goals. No added sugar. No added water." },
      { property: "og:title", content: "Juices — Portal Juice" },
      { property: "og:description", content: "Premium cold-pressed juices for High Blood Pressure, Diabetes, Arthritis, Asthma, Cholesterol, Weight Loss, Eye Care and Energy." },
    ],
  }),
  component: JuicesPage,
});

function JuiceCard({ juice, onHover }: { juice: Juice; onHover?: () => void }) {
  return (
    <article
      onMouseEnter={onHover}
      onFocus={onHover}
      tabIndex={0}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--brand-green)]/40 bg-white outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${juice.image})`, backgroundPosition: juice.position ?? "center" }}
        role="img"
        aria-label={juice.title}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/40 to-transparent p-5">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white drop-shadow-sm">
          {juice.title}
        </h2>
      </div>
      <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/55 to-black/10 p-6 text-white opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">Wellness Blend</p>
        <h3 className="mt-1 font-serif text-xl font-semibold tracking-tight">{juice.title}</h3>
        <p className="mt-3 max-w-[28ch] text-pretty text-sm leading-relaxed text-white/90">{juice.description}</p>
        <div className="mt-4 flex gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
          <span>No Added Sugar</span><span>·</span><span>No Added Water</span>
        </div>
        <button
          type="button"
          className="mt-5 inline-flex w-fit items-center justify-center border-b border-white/70 pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
        >
          Order
        </button>
      </div>
    </article>
  );
}

function JuicesPage() {
  const [activeJuice, setActiveJuice] = useState<Juice>(juices[7]);
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main className="overflow-x-hidden px-6 pb-32 pt-28 md:px-12 md:pt-36 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <section aria-label="Juice categories" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {juices.map((j) => (
              <JuiceCard key={j.title} juice={j} onHover={() => setActiveJuice(j)} />
            ))}
          </section>

          <section aria-label="Featured wellness blend" className="mt-24 border-t border-[var(--brand-green)]/20 pt-16">
            <article className="overflow-hidden rounded-2xl border border-[var(--brand-green)]/30 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  key={activeJuice.title + "-img"}
                  className="aspect-[4/5] w-full animate-fade-in bg-cover bg-center transition-all duration-500 md:aspect-auto md:min-h-[520px]"
                  style={{ backgroundImage: `url(${activeJuice.image})`, backgroundPosition: activeJuice.position ?? "center" }}
                  role="img"
                  aria-label={`${activeJuice.title} cold-pressed wellness blend`}
                />
                <div key={activeJuice.title} className="flex animate-fade-in flex-col justify-center gap-6 p-8 md:p-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-green)]">{activeJuice.title}</p>
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {activeJuice.title}, Naturally Bottled.
                  </h3>
                  <p className="max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                    {activeJuice.description}
                  </p>
                  <div className="space-y-1 text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                    <p>No Added Sugar</p><p>No Added Water</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Ingredients</p>
                    <p className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-foreground/80">{activeJuice.ingredients}</p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 inline-flex w-fit items-center justify-center rounded-sm border border-foreground bg-foreground px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-[var(--brand-green)] hover:border-[var(--brand-green)] hover:text-white"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}