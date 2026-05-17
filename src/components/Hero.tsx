import { useEffect, useRef, useState } from "react";

const VIDEO_1 = "/videos/03-video-full.mp4";
const VIDEO_2 = "/videos/hero-video-2.mp4";
const SFX_1 = "/sfx/whoosh.mp3";
const SFX_2 = "/sfx/splash.mp3";
const TARGET_VOLUME = 0.2;
const FADE_AUDIO_MS = 600;
const FADE_MS = 1200;
const FADE_S = FADE_MS / 1000;

const lines = [
  "Nature doesn't rush, yet it creates perfection.",
  "Every drop begins with real fruits and vegetables, pure, vibrant, alive.",
  "Fuel your day with what your body was made for.",
];

export function Hero() {
  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);
  const a1Ref = useRef<HTMLAudioElement | null>(null);
  const a2Ref = useRef<HTMLAudioElement | null>(null);
  const [active, setActive] = useState<1 | 2>(1);
  const [total, setTotal] = useState(18);
  const [t, setT] = useState(0);
  const handoffArmedRef = useRef(false);

  // Lazy-create audio elements (avoid SSR window access)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const a1 = new Audio(SFX_1);
    const a2 = new Audio(SFX_2);
    a1.preload = "auto";
    a2.preload = "auto";
    a1.volume = 0;
    a2.volume = 0;
    a1Ref.current = a1;
    a2Ref.current = a2;
    return () => {
      a1.pause();
      a2.pause();
      a1Ref.current = null;
      a2Ref.current = null;
    };
  }, []);

  const fadeAudio = (el: HTMLAudioElement, to: number, ms: number) => {
    const from = el.volume;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k < 1) requestAnimationFrame(step);
      else if (to === 0) {
        try { el.pause(); el.currentTime = 0; } catch {}
      }
    };
    requestAnimationFrame(step);
  };

  const playSfx = (which: 1 | 2) => {
    const el = which === 1 ? a1Ref.current : a2Ref.current;
    const other = which === 1 ? a2Ref.current : a1Ref.current;
    if (other) fadeAudio(other, 0, FADE_AUDIO_MS);
    if (!el) return;
    try { el.currentTime = 0; } catch {}
    el.volume = 0;
    el.play()
      .then(() => fadeAudio(el, TARGET_VOLUME, FADE_AUDIO_MS))
      .catch(() => {/* autoplay blocked until user interaction */});
  };

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
    playSfx(active);

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

  // Resume audio on first user interaction if autoplay was blocked
  useEffect(() => {
    const resume = () => {
      const el = active === 1 ? a1Ref.current : a2Ref.current;
      if (el && el.paused) playSfx(active);
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
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
                fontStyle: "italic",
                fontWeight: 500,
                letterSpacing: "-0.005em",
                textShadow:
                  "0 1px 2px rgba(0,0,0,0.55), 0 2px 14px rgba(0,0,0,0.55), 0 8px 40px rgba(0,0,0,0.45)",
              }}
              className="absolute inset-0 flex items-center justify-center px-4 text-center text-4xl leading-[1.2] text-white sm:text-5xl md:text-6xl lg:text-7xl transition-[opacity,transform] duration-[1200ms] ease-out"
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
