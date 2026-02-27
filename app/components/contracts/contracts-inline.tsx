"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { contracts, bnbTestnet } from "@/lib/contracts"
import { cn } from "@/lib/utils"
import { Check, Copy, ExternalLink, Network } from "lucide-react"

interface ContractsInlineProps {
  keys?: string[]
}

export function ContractsInline({ keys }: ContractsInlineProps) {
  const [copied, setCopied] = useState("")
  const selected = contracts.filter((c) => !keys || keys.includes(c.key))

  function handleCopy(addr: string, key: string) {
    navigator.clipboard.writeText(addr).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(""), 1000)
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2 text-xs font-mono">
      <div className="flex items-center gap-1 text-muted-foreground mr-2">
        <Network className="size-3" />
        <span>{bnbTestnet.name}</span>
      </div>
      {selected.map((contract) => {
        const isCopied = copied === contract.key
        return (
          <div
            key={contract.key}
            className="flex items-center gap-1 rounded-md border border-border bg-background/70 px-2 py-1"
          >
            <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/30">
              {contract.name}
            </Badge>
            <span className="text-[10px] text-muted-foreground hidden sm:inline">
              {contract.address.slice(0, 6)}…{contract.address.slice(-4)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className={cn("h-6 px-2 text-[10px]", isCopied ? "text-primary" : "text-foreground")}
              onClick={() => handleCopy(contract.address, contract.key)}
            >
              {isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
              {isCopied ? "Copied" : "Copy"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              asChild
              className="h-6 px-2 text-[10px] text-primary"
            >
              <Link
                href={`${bnbTestnet.explorerBase}${contract.address}`}
                target="_blank"
              >
                <ExternalLink className="size-3" />
                View
              </Link>
            </Button>
          </div>
        )
      })}
      <Button
        asChild
        size="sm"
        variant="outline"
        className="ml-auto font-mono text-[10px] h-7 border-primary/30 text-primary hover:bg-primary/10"
      >
        <Link href="/contracts">Full list</Link>
      </Button>
    </div>
  )
}

