import { useEffect, useState } from "react";

const VIDEO_1 = "/videos/03-video-full.mp4";
const VIDEO_2 = "/videos/hero-video-2.mp4";
const V1_DURATION = 9;
const V2_DURATION = 10;
const TOTAL = V1_DURATION + V2_DURATION; // 19s
const FADE = 1.2;

const lines = [
  "Nature doesn't rush… yet it creates perfection.",
  "Every drop begins with real fruits and vegetables — pure, vibrant, alive.",
  "Fuel your day with what your body was made for.",
];

export function Hero() {
  const [t, setT] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      setT(((now - start) / 1000) % TOTAL);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Video crossfade: show video2 from V1_DURATION - FADE onwards
  const showV2 = t > V1_DURATION - FADE;

  // Text timing: 3 lines spread across TOTAL with gentle fades
  const segment = TOTAL / lines.length; // ~6.33s
  const activeIndex = Math.min(lines.length - 1, Math.floor(t / segment));
  const localT = t - activeIndex * segment;
  const fadeIn = Math.min(1, localT / 1.4);
  const fadeOut = Math.min(1, (segment - localT) / 1.4);
  const textOpacity = Math.max(0, Math.min(fadeIn, fadeOut));
  const lift = (1 - fadeIn) * 16; // px

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        src={VIDEO_1}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
          showV2 ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        src={VIDEO_2}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
          showV2 ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="relative h-[260px] w-full max-w-5xl sm:h-[240px] md:h-[260px]">
          {lines.map((line, i) => (
            <p
              key={i}
              style={{
                opacity: i === activeIndex ? textOpacity : 0,
                transform: i === activeIndex ? `translateY(${lift}px)` : "translateY(16px)",
              }}
              className="font-serif absolute inset-0 flex items-center justify-center text-3xl font-medium leading-[1.25] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl transition-[opacity,transform] duration-700 ease-out"
            >
              {line}
            </p>
          ))}
        </div>

        <a
          href="/juices"
          className="mt-12 inline-flex items-center gap-3 border border-brand/70 bg-brand/10 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all duration-500 hover:bg-brand hover:border-brand hover:tracking-[0.4em]"
        >
          Explore Juices
          <span aria-hidden className="h-px w-6 bg-current" />
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">
        Scroll
      </div>
    </section>
  );
}
