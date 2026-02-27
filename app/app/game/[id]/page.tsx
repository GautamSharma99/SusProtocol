import { SpectatorApp } from "@/components/spectator/spectator-app"

interface GamePageProps {
  params: { id: string }
}

export default function GamePage({ params }: GamePageProps) {
  const gameId = decodeURIComponent(params.id)
  return <SpectatorApp gameId={gameId} />
}

