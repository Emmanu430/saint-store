import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LookboxClient from "@/components/LookbookClient";
import Reveal from "@/components/Reveal";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DriftingCrosses, BurgundyGlow } from "@/components/Backgrounds";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/shop");
  }

  return (
    <>
      <main className="relative isolate overflow-hidden w-full flex min-h-screen flex-col items-center justify-center text-center px-[6vw] pt-32 pb-20 bg-obsidian text-ivory">
  <DriftingCrosses />
  <div className="animate-hero-in">
    <Image
      src="/saint-logo.svg"
      className="invert w-[75vw] max-w-[320px] h-auto animate-float-soft"
      alt="SAINT — The Motion Never Ends"
      width={320}
      height={280}
      priority
    />
  </div>
  <Link
    href="/shop"
    style={{ animationDelay: "600ms" }}
    className="group mt-10 inline-flex items-center gap-2 border border-ivory/25 px-7 py-3.5 text-xs tracking-[0.2em] uppercase animate-hero-in hover:bg-ivory hover:text-obsidian transition-colors duration-300"
  >
    Shop the collection
    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
  <ChevronDown aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 w-5 h-5 text-ivory-dim animate-cue" />
</main>

      <div className="bg-burgundy overflow-hidden whitespace-nowrap py-3.5 border-y border-ivory/15">
        <div className="inline-flex animate-marquee">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="inline-flex">
              <span className="font-display text-2xl px-10 text-ivory">THE MOTION NEVER ENDS</span>
              <span className="font-display text-2xl px-10 text-ivory">FAITH · GRIND · PURPOSE</span>
              <span className="font-display text-2xl px-10 text-ivory">EST. 2026</span>
            </div>
          ))}
        </div>
      </div>

      <section id="philosophy" className="max-w-3xl mx-auto text-center px-[6vw] py-36">
        <Reveal>
          <span className="block text-xs tracking-[0.3em] uppercase text-burgundy-bright font-bold mb-5">
            Our Philosophy
          </span>
        </Reveal>

        <Reveal>
          <h2 className="text-3xl md:text-4xl font-black leading-snug tracking-tight">
            You may slow down, <span className="text-ivory-dim">but you never stop moving.</span> Every stitch carries the weight of the work it took to get here.
          </h2>
        </Reveal>

        <Reveal>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 border-t border-ivory/10">
            {[
              { title: "Faith", desc: "Belief before proof" },
              { title: "Grind", desc: "The unseen hours" },
              { title: "Purpose", desc: "Why you started" },
              { title: "Motion", desc: "Forward, always" },
              { title: "Legacy", desc: "What outlives you" },
            ].map((p) => (
              <div key={p.title} className="px-3 py-7 border-r border-b md:border-b-0 border-ivory/10 last:border-r-0">
                <b className="block text-sm tracking-widest uppercase mb-1.5">{p.title}</b>
                <span className="text-xs text-ivory-dim">{p.desc}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="collection" className="bg-charcoal px-[6vw] py-24 md:py-36">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-end gap-5 mb-12">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl">The Collection</h2>
          </Reveal>
          <Reveal>
            <p className="text-ivory-dim text-sm max-w-xs leading-relaxed">
              Premium streetwear built for people carrying something heavier than fabric.{" "}
              <a href="/shop" className="text-ivory underline">View full shop →</a>
            </p>
          </Reveal>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
          {[
            { name: "Saint Blessed Tees", image: "/products/img3.jpg" },
            { name: "Saint Swag Polo", image: "/products/img2.jpg" },
            { name: "Saint Rogue Sweat Jorts", image: "/products/img1.jpg" },
            { name: "Saint Swag Long Sleeve", image: "/products/img4.jpg" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <Link
                href="/shop"
                className="bg-obsidian aspect-3/4 flex items-end p-4 md:p-6 relative group overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
                <div className="relative z-10">
                  <b className="block text-sm md:text-base tracking-wide mb-1">{item.name}</b>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="lookbook" className="bg-obsidian px-[6vw] py-24 md:py-36">
        <Reveal>
          <div className="max-w-6xl mx-auto mb-12">
            <span className="block text-xs tracking-[0.3em] uppercase text-burgundy-bright font-bold mb-5">
              In The Field
            </span>
            <h2 className="font-display text-4xl sm:text-5xl">Worn By SAINT</h2>
          </div>
        </Reveal>
        <LookboxClient />
      </section>

      <section id="manifesto" className="relative isolate overflow-hidden text-center px-[6vw] py-40">
        <BurgundyGlow />
        <Reveal>
          <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto leading-snug">
            &ldquo;Slow is still moving. Stopped is the only sin.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal>
          <cite className="not-italic block mt-6 text-xs tracking-[0.3em] uppercase text-gunmetal">
            SAINT — EST. 2026
          </cite>
        </Reveal>
      </section>
    </>
  );
}