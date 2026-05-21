import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <div className="relative h-screen overflow-hidden bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden px-6 md:px-12 lg:px-20 pt-[calc(var(--nav-h)+1rem)] pb-[calc(var(--footer-h)+1rem)]">
        <div className="mx-auto max-w-7xl">
          <section aria-label="Juice categories" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {juices.map((j) => (
              <JuiceCard key={j.title} juice={j} />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}