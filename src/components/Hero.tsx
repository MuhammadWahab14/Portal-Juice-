import { useEffect, useState } from "react";
import video1 from "@/assets/hero-video-1.mp4.asset.json";
import video2 from "@/assets/hero-video-2.mp4.asset.json";

const sources = [video1.url, video2.url];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % sources.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {sources.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-brand">
          Cold-Pressed Wellness
        </p>
        <h1 className="font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
          Your Gateway <br className="hidden sm:block" /> To Health.
        </h1>
        <p className="mt-8 max-w-xl text-base text-white/80 sm:text-lg">
          Eight purposeful blends, crafted from raw, whole ingredients.
          No added sugar. No added water. Just nature, bottled.
        </p>

        <div className="mt-12 flex items-center gap-3 text-white/70">
          {sources.map((_, i) => (
            <button
              key={i}
              aria-label={`Show video ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-[2px] transition-all duration-500 ${
                i === active ? "w-12 bg-white" : "w-6 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">
        Scroll
      </div>
    </section>
  );
}