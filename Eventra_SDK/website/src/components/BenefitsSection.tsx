import { Check } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "Works with existing Web2 games",
  "No game logic rewrite",
  "Deterministic & verifiable",
  "Real-time odds updates",
  "On-chain settlement (BNB Chain)",
  "SDK-first, infra-level design",
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center font-pixel text-[10px] uppercase tracking-widest text-primary">Why Eventra</h2>
        <p className="mt-4 text-center font-pixel text-lg text-foreground">Built for developers, not speculators.</p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-start gap-3 retro-border bg-card p-4"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center retro-border-sm bg-primary/20 text-primary">
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="font-retro text-xl text-foreground">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
