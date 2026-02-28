import { Gamepad2, BarChart3, Link2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Gamepad2,
    title: "Game emits events",
    desc: "Player kills, round ends, match result",
  },
  {
    icon: BarChart3,
    title: "Eventra analyzes logs",
    desc: "Deterministic, rule-based market generation",
  },
  {
    icon: Link2,
    title: "Markets settle on-chain",
    desc: "Trustless resolution on BNB Chain",
  },
];

export default function WhatSection() {
  return (
    <section id="how" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center font-pixel text-[10px] uppercase tracking-widest text-primary">How it works</h2>
        <p className="mt-4 text-center font-pixel text-lg text-foreground">Three steps. Zero complexity.</p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group retro-border bg-card p-6 text-center transition-all hover:glow-border"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center retro-border-sm bg-primary/15 text-primary">
                <s.icon size={24} />
              </div>
              <h3 className="font-pixel text-xs text-foreground">{s.title}</h3>
              <p className="mt-3 font-retro text-xl text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
