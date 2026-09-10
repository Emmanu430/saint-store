import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
    const session = await auth();
  if (session) {
    redirect("/shop");
  }

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-[6vw] pt-32 pb-20 bg-obsidian text-ivory">
      <Image
        src="/saint-logo.svg"
        className="invert w-[75vw] max-w-[320px] h-auto"
        alt="SAINT — The Motion Never Ends"
        width={320}
        height={280}
        priority
      />
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
    <span className="block text-xs tracking-[0.3em] uppercase text-burgundy-bright font-bold mb-5">
      Our Philosophy
    </span>

    <h2 className="text-3xl md:text-4xl font-black leading-snug tracking-tight">
      You may slow down, <span className="text-ivory-dim">but you never stop moving.</span> Every stitch carries the weight of the work it took to get here.
    </h2>

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
      </section>
      <section className="bg-charcoal px-[6vw] py-24 md:py-36">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-end gap-5 mb-12">
          <h2 className="font-display text-4xl sm:text-5xl">The Collection</h2>
          <p className="text-ivory-dim text-sm max-w-xs leading-relaxed">
            Premium streetwear built for people carrying something heavier than fabric.{" "}
            <a href="/shop" className="text-ivory underline">View full shop →</a>
          </p>
        </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-10 bg-ivory/10">
  {[
    { name: "Saint Blessed Tees", detail: "Ivory · Puff Print", image: "/products/img3.jpg" },
    { name: "Saint Swag Polo", detail: "Obsidian · Embroidered", image: "/products/img2.jpg" },
    { name: "Saint Rogue Sweat Jorts", detail: "Charcoal · Reflective Trim", image: "/products/img1.jpg" },
    { name: "Saint Skull Cap", detail: "Obsidian · Debossed", image: "/products/img4.jpg" },
  ].map((item) => (
    <div key={item.name} className="bg-obsidian aspect-3/4 flex items-end p-6 relative group cursor-pointer overflow-hidden">
      <Image src={item.image} alt={item.name} fill className="object-cover" />
      <div className="relative z-10">
        <b className="block text-base tracking-wide mb-1">{item.name}</b>
        <span className="text-xs text-ivory-dim">{item.detail}</span>
      </div>
    </div>
  ))}
</div>
        </section>
        <section id="manifesto" className="text-center px-[6vw] py-40">
          <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto leading-snug">
            &ldquo;Slow is still moving. Stopped is the only sin.&rdquo;
          </blockquote>
          <cite className="not-italic block mt-6 text-xs tracking-[0.3em] uppercase text-gunmetal">
            SAINT — EST. 2026
          </cite>
        </section>
      </>
  );
}