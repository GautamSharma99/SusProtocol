import { motion } from "framer-motion";
import { Play, Radio, TrendingUp, Flag, Link2 } from "lucide-react";

const steps = [
  { icon: Play, title: "Demo game starts", desc: "A simulated match begins streaming events." },
  { icon: Radio, title: "Events stream to Eventra", desc: "Kill, round, and score events are emitted in real-time." },
  { icon: TrendingUp, title: "Markets appear live", desc: "Prediction markets are generated with live odds." },
  { icon: Flag, title: "Game ends", desc: "Final results are captured and locked." },
  { icon: Link2, title: "On-chain settlement", desc: "Payouts execute trustlessly on BNB Chain." },
];

export default function DemoSection() {
  return (
    <section id="demo" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center font-pixel text-[10px] uppercase tracking-widest text-primary">Demo Flow</h2>
        <p className="mt-4 mb-14 text-center font-pixel text-lg text-foreground">See it in action.</p>

        <div className="relative ml-4 border-l-4 border-black pl-8 sm:ml-0 sm:pl-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="relative mb-10 last:mb-0"
            >
              {/* Dot */}
              <div className="absolute -left-[calc(2rem+8px)] sm:-left-[calc(2.5rem+8px)] flex h-4 w-4 items-center justify-center border-3 border-black bg-primary" style={{ borderWidth: '3px' }} />

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center retro-border-sm bg-primary/15 text-primary">
                  <s.icon size={18} />
                </div>
                <div>
                  <h4 className="font-pixel text-xs text-foreground">{s.title}</h4>
                  <p className="mt-1 font-retro text-xl text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
