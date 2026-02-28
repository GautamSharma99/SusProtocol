import { SpectatorApp } from "@/components/spectator/spectator-app"

interface GamePageProps {
  params: Promise<{ id: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  const gameId = decodeURIComponent(id)
  return <SpectatorApp gameId={gameId} />
}

