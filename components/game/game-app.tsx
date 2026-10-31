'use client'

import { ChapterScreen } from './chapter/chapter-screen'
import { GameProvider, useGame } from './game-provider'
import { BottomNav, TopBar } from './navigation'
import { StarField } from './star-field'
import { CharacterCreator } from './screens/character-creator'
import { HomeScreen } from './screens/home-screen'
import { MissionMap } from './screens/mission-map'
import { ShopScreen } from './screens/shop-screen'

function CurrentScreen() {
  const { screen } = useGame()
  switch (screen) {
    case 'creator':
      return <CharacterCreator />
    case 'missions':
      return <MissionMap />
    case 'shop':
      return <ShopScreen />
    case 'chapter':
      return <ChapterScreen />
    default:
      return <HomeScreen />
  }
}

export function GameApp() {
  return (
    <GameProvider>
      <StarField />
      <TopBar />
      <main className="relative pb-24 md:pb-0">
        <CurrentScreen />
      </main>
      <BottomNav />
    </GameProvider>
  )
}
