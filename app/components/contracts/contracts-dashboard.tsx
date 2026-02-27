"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { contracts, bnbTestnet, architectureNotes } from "@/lib/contracts"
import { cn } from "@/lib/utils"
import { Check, Copy, ExternalLink, Info, Network, Server, Shield, Zap } from "lucide-react"

function copy(text: string, setCopied: (value: string) => void, key: string) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(key)
    setTimeout(() => setCopied("") , 1000)
  })
}

export function ContractsDashboard() {
  const [copied, setCopied] = useState("")

  return (
    <div className="flex flex-col gap-4 p-6 mx-auto max-w-6xl">
      <div className="flex items-center justify-between gap-3 border border-border bg-card rounded-xl px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/15 border border-primary/30 p-2 text-primary">
            <Network className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs text-muted-foreground">Chain</span>
            <span className="font-mono text-sm font-bold text-foreground">{bnbTestnet.name}</span>
            <span className="font-mono text-[11px] text-muted-foreground">Chain ID {bnbTestnet.chainId} · Solidity {bnbTestnet.solidity}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-mono text-[11px]"
                  onClick={() => copy(bnbTestnet.rpcUrl, setCopied, "rpc")}
                >
                  {copied === "rpc" ? <Check className="size-3 mr-1" /> : <Server className="size-3 mr-1" />}
                  RPC URL
                </Button>
              </TooltipTrigger>
              <TooltipContent className="font-mono text-[10px]">Copy RPC to add network</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Link
            href={`${bnbTestnet.explorerBase.replace("/address/", "")}`}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-[11px] text-primary hover:bg-primary/15"
          >
            <ExternalLink className="size-3" />
            Explorer
          </Link>
        </div>
      </div>

      <Card className="border-primary/25 bg-card/80">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            <CardTitle className="font-mono text-sm">Deployed Contracts</CardTitle>
          </div>
          <CardDescription className="font-mono text-xs text-muted-foreground">
            From game/bnb/contracts/CONTRACTS.md · BNB Smart Chain Testnet
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {contracts.map((contract) => {
            const explorer = `${bnbTestnet.explorerBase}${contract.address}`
            const isCopied = copied === contract.key
            return (
              <div
                key={contract.key}
                className="rounded-lg border border-border bg-secondary/50 px-4 py-3 grid grid-cols-[auto_1fr_auto] gap-3 items-center"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-muted-foreground">{contract.file}</span>
                  <span className="font-mono text-sm font-bold text-foreground">{contract.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{contract.purpose}</span>
                  {contract.notes && (
                    <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1">
                      <Info className="size-3" />
                      {contract.notes}
                    </span>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {contract.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="font-mono text-[10px] bg-background/80 border-border/60"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] text-muted-foreground">Address</span>
                  <span className="font-mono text-sm text-foreground break-all">
                    {contract.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className={cn("font-mono text-[11px]", isCopied ? "border-primary/40 text-primary" : "")}
                    onClick={() => copy(contract.address, setCopied, contract.key)}
                  >
                    {isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
                    {isCopied ? "Copied" : "Copy"}
                  </Button>
                  <Link
                    href={explorer}
                    target="_blank"
                    className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-[11px] text-primary hover:bg-primary/15"
                  >
                    <ExternalLink className="size-3" />
                    BscScan
                  </Link>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-primary" />
            <CardTitle className="font-mono text-sm">Architecture Notes</CardTitle>
          </div>
          <CardDescription className="font-mono text-xs text-muted-foreground">
            How on-chain pieces fit the spectator + prediction flow
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {architectureNotes.map((note, idx) => (
            <div key={note} className="flex items-start gap-2 text-sm font-mono text-foreground">
              <span className="mt-[2px] text-[11px] text-muted-foreground">{idx + 1}.</span>
              <span className="text-[13px] leading-snug">{note}</span>
            </div>
          ))}
          <Separator className="my-2" />
          <p className="text-[12px] font-mono text-muted-foreground">
            BNB Smart Chain Testnet RPC: {bnbTestnet.rpcUrl}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

