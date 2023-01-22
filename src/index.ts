import { Elm } from './Main.elm'
import getEngine, { Engine } from './playback'

let engine: Engine

const elmApp = Elm.Main.init({
  node: document.getElementById('app') || undefined,
})

elmApp.ports.transportAction.subscribe((value) => {
  if (value === 'play') {
    engine?.start?.()
  }
  if (value === 'stop') {
    engine?.stop?.()
  }
})

elmApp.ports.electronAction.subscribe(async () => {
  engine?.stop?.()
  const piece = await window.electronAPI.getPiece()
  const { entryChunk } = piece
  engine = await getEngine(entryChunk)

  engine.onNextChunk(({ pathsToSections }) => {
    const sectionIds = Object.keys(pathsToSections)
    elmApp.ports.sectionsReceiver.send(sectionIds)
    for (const [sectionId, { nextChunk }] of Object.entries(pathsToSections)) {
      engine.preload(sectionId, nextChunk)
    }
  })

  await engine.init()
})

elmApp.ports.sectionAction.subscribe((value) => {
  engine?.loadSection?.(value)
})
