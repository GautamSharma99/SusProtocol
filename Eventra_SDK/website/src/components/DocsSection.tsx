import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Download, Layers, Gamepad2, LayoutTemplate, Play } from "lucide-react";

const navItems = [
  { id: "intro", label: "Introduction", icon: Book },
  { id: "install", label: "Installation", icon: Download },
  { id: "concepts", label: "SDK Concepts", icon: Layers },
  { id: "integration", label: "Game Integration", icon: Gamepad2 },
  { id: "templates", label: "Market Templates", icon: LayoutTemplate },
  { id: "demo", label: "Demo Walkthrough", icon: Play },
];

const docs: Record<string, { title: string; content: string; code?: string }> = {
  intro: {
    title: "Introduction",
    content: `Eventra SDK is a lightweight library that allows Web2 game developers to emit in-game events and have them automatically converted into decentralized prediction markets.

No blockchain experience is needed. You emit events; Eventra handles market creation, odds calculation, and on-chain settlement on BNB Chain.

The SDK is designed to plug into your existing game server with zero changes to your game logic.`,
  },
  install: {
    title: "Installation",
    content: "Install the SDK via npm or yarn:",
    code: `npm install @eventra/sdk

# or
yarn add @eventra/sdk`,
  },
  concepts: {
    title: "SDK Concepts",
    content: `**Event Emitter** — Your game emits structured events through a lightweight adapter. Events describe what happened: a player scored, a round ended, etc.

**Market Engine** — Eventra's deterministic engine processes events and decides which prediction markets to create or update. No manual configuration needed.

**Settlement Layer** — When a market's outcome is determined, Eventra settles it on BNB Chain automatically. Results are verifiable and trustless.`,
  },
  integration: {
    title: "Game Integration",
    content: "Initialize the SDK and start emitting events:",
    code: `import { EventraAdapter } from "@eventra/sdk"

const adapter = new EventraAdapter({
  gameId: "your-game-id",
  apiKey: process.env.EVENTRA_API_KEY,
})

// Emit an event when something happens
adapter.emit({
  type: "ROUND_END",
  payload: { winner: "team_a", score: [3, 1] },
  timestamp: Date.now(),
})`,
  },
  templates: {
    title: "Market Templates",
    content: `Market templates define the types of prediction markets that can be generated from your game events.

Built-in templates include:
- **Match Winner** — Who will win the match?
- **First Blood** — Who gets the first kill?
- **Over/Under** — Will total score exceed a threshold?
- **Round Winner** — Who wins the next round?

You can also define custom templates for your specific game logic.`,
  },
  demo: {
    title: "Demo Walkthrough",
    content: `To run the demo locally:

1. Clone the demo repository
2. Install dependencies
3. Start the mock game server
4. Watch markets appear in real-time`,
    code: `git clone https://github.com/eventra/demo
cd demo
npm install
npm run start`,
  },
};

export default function DocsSection() {
  const [active, setActive] = useState("intro");
  const doc = docs[active];

  return (
    <section id="docs" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center font-pixel text-[10px] uppercase tracking-widest text-primary">Documentation</h2>
        <p className="mt-4 mb-12 text-center font-pixel text-lg text-foreground">Everything you need to get started.</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden retro-border bg-card"
        >
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-56 md:border-r-0" style={{ borderRightWidth: '3px', borderColor: 'black' }}>
              <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-left transition-colors ${
                      active === item.id
                        ? "bg-primary/15 text-primary font-pixel text-[9px]"
                        : "font-retro text-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <item.icon size={15} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8">
              <h3 className="font-pixel text-sm text-foreground">{doc.title}</h3>
              <div className="mt-4 space-y-3 font-retro text-xl leading-relaxed text-secondary-foreground whitespace-pre-line">
                {doc.content.split("\n\n").map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                ))}
              </div>
              {doc.code && (
                <pre className="mt-6 overflow-x-auto retro-border-sm bg-background p-4">
                  <code className="font-retro text-lg text-foreground">{doc.code}</code>
                </pre>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
