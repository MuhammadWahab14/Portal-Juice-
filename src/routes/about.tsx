import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import heroJuice from "@/assets/carrotjuice.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Portal Juice" },
      { name: "description", content: "Portal Juice is your Gateway to Health — cold-pressed juices crafted in Dubai with no added sugar, no water dilution, and no artificial additives." },
      { property: "og:title", content: "About — Portal Juice" },
      { property: "og:description", content: "Cold-pressed wellness juices crafted with care in Dubai." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative h-screen overflow-hidden bg-white text-foreground flex flex-col">
      <Navbar />

      <section
        id="about"
        className="flex-1 overflow-y-auto bg-white pt-[calc(var(--nav-h)+1rem)] pb-[calc(var(--footer-h)+1rem)]"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 items-center gap-x-4 gap-y-3 sm:block md:grid md:grid-cols-12 md:gap-x-12 lg:gap-x-14">
            {/* Column 1 */}
            <div className="md:col-span-4">
              <p className="font-serif text-[14px] font-semibold leading-snug text-[hsl(280_45%_30%)] sm:text-lg md:text-[22px]">
                Portal Juice is your <strong className="font-semibold italic">Gateway to Health</strong>.
              </p>
              <blockquote className="mt-2 border-l-[1.5px] border-[hsl(280_40%_50%)] pl-3 font-serif text-[12px] italic leading-snug text-[hsl(280_45%_35%)] sm:mt-3 sm:text-base md:mt-4 md:text-[17px]">
                “You’ve wanted this for so long. Let’s make it real - one move at a time.”
              </blockquote>
              <p className="mt-2 text-[10.5px] leading-relaxed text-[hsl(280_45%_32%)] sm:mt-3 sm:text-[12.5px] md:mt-4 md:text-[13.5px]">
                We believe nature has always been one of life’s most gentle ways of caring for us.
                Our cold-pressed juices in Dubai are thoughtfully prepared using carefully selected
                fruits and vegetables, inspired by simpler times - when food was natural and
                aligned with the nutritional needs of the body.
              </p>
              <p className="mt-2 border-l-[1.5px] border-[hsl(330_75%_55%)] pl-3 text-[10.5px] leading-relaxed text-[hsl(330_75%_48%)] sm:mt-3 sm:text-[12.5px] md:mt-4 md:text-[13.5px]">
                We are not doctors and we do not diagnose, treat or cure any disease. We are
                simply caretakers of something pure, offering fresh wellness juices that gently
                accompany a mindful lifestyle, supporting balance and lightness.
              </p>
            </div>

            {/* Column 2 */}
            <div className="md:col-span-4">
              <p className="border-l-[1.5px] border-[hsl(32_90%_55%)] pl-3 text-[10.5px] font-bold leading-relaxed text-[hsl(30_90%_45%)] sm:mt-3 sm:text-[12.5px] md:mt-0 md:text-[13.5px]">
                We use only the finest natural ingredients, including premium dates and Manuka
                honey, with absolutely <strong className="font-bold text-amber-600">no added sugar</strong>,{" "}
                <strong className="font-bold text-amber-600">no water dilution</strong>, and{" "}
                <strong className="font-bold text-amber-600 whitespace-nowrap">no artificial additives</strong>.
              </p>
              <p className="mt-2 text-[10.5px] font-normal leading-relaxed text-[hsl(30_90%_45%)] sm:mt-3 sm:text-[12.5px] md:mt-4 md:text-[13.5px]">
                Portal Juice is born from care and sincerity for human vitality. We warmly
                invite you to experience this healthy ritual in Dubai, designed for those who
                seek it.
              </p>
              <p className="mt-2 text-[10.5px] leading-relaxed sm:mt-3 sm:text-[12.5px] md:mt-4 md:text-[13.5px] text-amber-500">
                More than a brand, Portal Juice represents a refined juice culture in the UAE. It
                is our heartfelt joy to be part of your{" "}
                <strong className="font-semibold text-amber-500">daily wellness journey</strong>, bringing
                you closer to nature - one drink at a time.
              </p>
              <blockquote className="mt-2 border-l-[1.5px] border-[hsl(140_40%_42%)] pl-3 font-serif text-[12px] italic leading-snug text-[hsl(140_45%_28%)] sm:mt-4 sm:text-base md:mt-5 md:text-[17px]">
                “It’s not a juice purchase. It’s a <strong className="font-semibold not-italic">health decision</strong>.”
              </blockquote>
              <p className="mt-1 font-serif text-[12px] tracking-wide text-[hsl(140_45%_30%)] sm:mt-2 sm:text-base md:mt-3 md:text-[17px]">
                <strong className="font-semibold">Portal Juice is ready when you are.</strong>
              </p>
            </div>

            {/* Column 3 — Image */}
            <div className="col-span-2 md:col-span-4">
              <div className="relative overflow-hidden rounded-sm bg-[hsl(40_30%_96%)] p-1.5 shadow-[0_8px_24px_-12px_rgba(60,30,80,0.18)] md:p-2">
                <img
                  src={heroJuice}
                  alt="Cold-pressed green juice with fresh ingredients"
                  loading="lazy"
                  width={1100}
                  height={1400}
                  className="h-[120px] w-full rounded-[2px] object-cover object-[center_42%] sm:h-[220px] md:h-[380px] lg:h-[440px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}