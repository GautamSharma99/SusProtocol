"use client"

import { useMemo } from "react"
import { useGameStore } from "@/hooks/use-game-store"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Target,
  Clock,
  CheckCircle2,
  Users,
  Flame,
  Medal,
} from "lucide-react"

function formatAccuracy(correct: number, total: number) {
  if (total === 0) return "0%"
  return `${Math.round((correct / total) * 100)}%`
}

function phaseLabel(phase: string) {
  if (phase === "running") return "LIVE SCORING"
  if (phase === "meeting") return "LOCK WINDOW"
  if (phase === "ended") return "FINALIZED"
  return "WAITING"
}

export function TokenLaunchpad() {
  const { leaderboard, markets, phase, currentUserId } = useGameStore()

  const you = leaderboard.find((entry) => entry.userId === currentUserId)
  const resolved = markets.filter((m) => m.status === "RESOLVED").length
  const open = markets.filter((m) => m.status === "OPEN").length
  const frozen = markets.filter((m) => m.status === "FROZEN").length

  const topStreak = useMemo(
    () => leaderboard.reduce((max, entry) => Math.max(max, entry.bestStreak), 0),
    [leaderboard]
  )

  return (
    <div className="flex gap-4 p-4 h-full overflow-auto">
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            <span className="font-mono text-sm font-bold text-foreground">
              Live Prediction Leaderboard
            </span>
          </div>
          <Badge className="font-mono text-[10px] bg-primary/10 text-primary border border-primary/30">
            {phaseLabel(phase)}
          </Badge>
        </div>

        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="size-4 text-primary" />
            <span className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
              Scoring Rules
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
            <div className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-primary">
              Correct prediction: +10
            </div>
            <div className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-accent">
              Early bonus: +2
            </div>
            <div className="rounded-md border border-border bg-secondary/40 px-2.5 py-1.5 text-muted-foreground">
              Wrong prediction: +0
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-secondary/50 p-3 flex-1 min-h-0 overflow-auto">
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-4 text-primary" />
            <span className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
              Match Ranking
            </span>
            <span className="ml-auto text-[10px] text-muted-foreground font-mono">
              {leaderboard.length} predictors
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {leaderboard.map((entry) => {
              const isYou = entry.userId === currentUserId
              return (
                <div
                  key={entry.userId}
                  className={`rounded-md border px-3 py-2 ${
                    isYou
                      ? "border-primary/30 bg-primary/10"
                      : "border-border/50 bg-background/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground w-6">
                      #{entry.rank}
                    </span>
                    {entry.rank <= 3 && <Medal className="size-3.5 text-primary" />}
                    <span
                      className={`font-mono text-xs font-bold ${
                        isYou ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {entry.username}
                    </span>
                    <span className="ml-auto font-mono text-sm font-bold text-foreground tabular-nums">
                      {entry.points} pts
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                    <span>
                      Accuracy: {formatAccuracy(entry.correct, entry.total)}
                    </span>
                    <span>
                      Picks: {entry.total}
                    </span>
                    <span>
                      Streak: {entry.streak}
                    </span>
                    <span className={entry.lastDelta > 0 ? "text-primary" : ""}>
                      Last: +{entry.lastDelta}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-[280px] shrink-0 flex flex-col gap-3">
        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="size-4 text-primary" />
            <span className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
              Your Performance
            </span>
          </div>
          {you ? (
            <div className="flex flex-col gap-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rank</span>
                <span className="font-bold text-foreground">#{you.rank}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Points</span>
                <span className="font-bold text-primary">{you.points}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-bold text-foreground">
                  {formatAccuracy(you.correct, you.total)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border/50 pt-1.5">
                <span className="text-muted-foreground">Best streak</span>
                <span className="font-bold text-foreground">{you.bestStreak}</span>
              </div>
            </div>
          ) : (
            <p className="font-mono text-xs text-muted-foreground">
              Submit predictions to enter ranking.
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-4 text-primary" />
            <span className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
              Market Status
            </span>
          </div>
          <div className="flex flex-col gap-1.5 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Open</span>
              <span className="text-foreground">{open}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Frozen</span>
              <span className="text-foreground">{frozen}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Resolved</span>
              <span className="text-primary">{resolved}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="size-4 text-primary" />
            <span className="font-mono text-xs font-bold text-foreground tracking-wider uppercase">
              Match Momentum
            </span>
          </div>
          <div className="flex flex-col gap-1.5 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Top streak</span>
              <span className="text-foreground">{topStreak}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Questions asked</span>
              <span className="text-foreground">{markets.length}</span>
            </div>
            <div className="text-[10px] text-muted-foreground pt-1 border-t border-border/50">
              Leaderboard updates after each resolved prediction.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
