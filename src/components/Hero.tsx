import { useEffect, useRef, useState } from "react";

const VIDEO_1 = "/videos/03-video-full.mp4";
const VIDEO_2 = "/videos/hero-video-2.mp4";
const FADE_MS = 1200;
const FADE_S = FADE_MS / 1000;

const lines = [
  "Nature doesn't rush… yet it creates perfection.",
  "Every drop begins with real fruits and vegetables — pure, vibrant, alive.",
  "Fuel your day with what your body was made for.",
];

export function Hero() {
  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<1 | 2>(1);
  const [total, setTotal] = useState(18);
  const [t, setT] = useState(0);
  const handoffArmedRef = useRef(false);

  // Measure durations once metadata is loaded
  useEffect(() => {
    const update = () => {
      const d1 = v1Ref.current?.duration;
      const d2 = v2Ref.current?.duration;
      if (d1 && d2 && Number.isFinite(d1) && Number.isFinite(d2)) {
        setTotal(d1 + d2);
      }
    };
    const v1 = v1Ref.current;
    const v2 = v2Ref.current;
    v1?.addEventListener("loadedmetadata", update);
    v2?.addEventListener("loadedmetadata", update);
    update();
    return () => {
      v1?.removeEventListener("loadedmetadata", update);
      v2?.removeEventListener("loadedmetadata", update);
    };
  }, []);

  // Seamless handoff: when the active video nears its end, pre-roll the other
  // and switch after the crossfade.
  useEffect(() => {
    const activeEl = active === 1 ? v1Ref.current : v2Ref.current;
    const otherEl = active === 1 ? v2Ref.current : v1Ref.current;
    if (!activeEl || !otherEl) return;

    handoffArmedRef.current = false;
    activeEl.play().catch(() => {});

    const onTime = () => {
      const d = activeEl.duration;
      if (!d || !Number.isFinite(d)) return;
      const remaining = d - activeEl.currentTime;
      if (!handoffArmedRef.current && remaining <= FADE_S) {
        handoffArmedRef.current = true;
        try {
          otherEl.currentTime = 0;
        } catch {}
        otherEl.play().catch(() => {});
        window.setTimeout(() => {
          setActive((prev) => (prev === 1 ? 2 : 1));
          try {
            activeEl.pause();
            activeEl.currentTime = 0;
          } catch {}
        }, FADE_MS);
      }
    };

    activeEl.addEventListener("timeupdate", onTime);
    return () => activeEl.removeEventListener("timeupdate", onTime);
  }, [active]);

  // Global clock for text timing, synced to combined duration
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      setT(((now - start) / 1000) % total);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  const segment = total / lines.length;
  const activeIndex = Math.min(lines.length - 1, Math.floor(t / segment));
  const localT = t - activeIndex * segment;
  const fadeIn = Math.min(1, localT / 1.4);
  const fadeOut = Math.min(1, (segment - localT) / 1.4);
  const textOpacity = Math.max(0, Math.min(fadeIn, fadeOut));
  const lift = (1 - fadeIn) * 16;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={v1Ref}
        src={VIDEO_1}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
          active === 1 ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={v2Ref}
        src={VIDEO_2}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
          active === 2 ? "opacity-100" : "opacity-0"
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
                fontFamily: "var(--font-display)",
                textShadow: "0 2px 24px rgba(0,0,0,0.45)",
              }}
              className="absolute inset-0 flex items-center justify-center px-4 text-center text-4xl italic font-light leading-[1.15] tracking-[-0.01em] text-white sm:text-5xl md:text-6xl lg:text-7xl transition-[opacity,transform] duration-[1200ms] ease-out"
            >
              {line}
            </p>
          ))}
        </div>

        <a
          href="/juices"
          className="group mt-12 inline-flex items-center gap-3 border border-brand/70 bg-brand/10 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all duration-700 ease-out hover:bg-brand hover:border-brand hover:tracking-[0.4em] hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.6)]"
        >
          EXPLORE JUICES
          <span aria-hidden className="h-px w-6 bg-current transition-all duration-700 ease-out group-hover:w-10" />
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60" />
    </section>
  );
}
