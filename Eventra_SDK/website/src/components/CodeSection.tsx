import { motion } from "framer-motion";

const code = `adapter.emit({
  type: "PLAYER_KILLED",
  payload: { killer: "A", victim: "B" },
  timestamp: Date.now()
})`;

export default function CodeSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden retro-border glow-border"
        >
          {/* Tab bar */}
          <div className="flex items-center gap-3 border-b-3 bg-secondary/60 px-4 py-3" style={{ borderBottomWidth: '3px', borderColor: 'black' }}>
            <span className="h-3 w-3 retro-border-sm bg-destructive" />
            <span className="h-3 w-3 retro-border-sm bg-accent" />
            <span className="h-3 w-3 retro-border-sm bg-primary" />
            <span className="ml-3 font-pixel text-[8px] text-muted-foreground">game-adapter.ts</span>
          </div>

          <pre className="overflow-x-auto bg-card p-6 text-lg leading-relaxed">
            <code className="font-retro text-foreground">{code}</code>
          </pre>
        </motion.div>

        <div className="mt-6 space-y-2 text-center">
          <p className="font-retro text-xl text-muted-foreground">▸ Markets are automatically created and updated.</p>
          <p className="font-retro text-xl text-muted-foreground">▸ No manual market definitions required.</p>
        </div>
      </div>
    </section>
  );
}
