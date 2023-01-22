import { ChunkInstance } from '@shared/domain/piece/chunk'

interface ChunkSource {
  chunk: ChunkInstance
  sourceNode: AudioBufferSourceNode
}

export interface Engine {
  start: () => void
  stop: () => void
  init: () => Promise<void>
  preload: (sectionId: string, chunk: ChunkInstance) => Promise<void>
  loadSection: (sectionId: string) => void
  onNextChunk: (listener: (chunk: ChunkInstance) => void) => void
}

const getEngine = async (entryChunk: ChunkInstance): Promise<Engine> => {
  let currentSectionId: string
  let currentSource: AudioBufferSourceNode

  const nextChunkEventListeners: ((chunk: ChunkInstance) => void)[] = []

  const init = async () => {
    currentSectionId = entryChunk.sectionId
    const decodedAudio = await ctx.decodeAudioData(entryChunk.buffer.slice(0))
    currentSource = ctx.createBufferSource()
    currentSource.buffer = decodedAudio
    currentSource.connect(masterGain)
    nextChunkEventListeners.forEach((listener) => listener(entryChunk))
  }

  const ctx = new AudioContext()
  const masterGain = ctx.createGain()
  masterGain.gain.setValueAtTime(0.3, ctx.currentTime)

  masterGain.connect(ctx.destination)

  const nextSources: Record<string, ChunkSource> = {}

  const nextSourceEventListener = () => {
    const { sourceNode, chunk } = nextSources[currentSectionId]
    currentSource.removeEventListener('ended', nextSourceEventListener)
    currentSource = sourceNode
    currentSource.start()
    nextChunkEventListeners.forEach((listener) => listener(chunk))
    currentSource.addEventListener('ended', nextSourceEventListener)
  }

  const start = () => {
    if (currentSource && currentSectionId) {
      currentSource.start()
      currentSource.addEventListener('ended', nextSourceEventListener)
    }
    ctx.resume()
  }
  const stop = async () => {
    currentSource.stop()
    currentSource.removeEventListener('ended', nextSourceEventListener)
    ctx.suspend()
    await init()
  }

  const preload = async (sectionId: string, chunk: ChunkInstance) => {
    const decodedAudio = await ctx.decodeAudioData(chunk.buffer.slice(0))
    const sourceNode = ctx.createBufferSource()
    sourceNode.buffer = decodedAudio
    sourceNode.connect(masterGain)
    nextSources[sectionId] = { chunk, sourceNode }
  }

  const loadSection = (sectionId: string) => {
    currentSectionId = sectionId
  }

  const onNextChunk = (listener: (chunk: ChunkInstance) => void) =>
    nextChunkEventListeners.push(listener)

  return { start, stop, preload, loadSection, onNextChunk, init }
}

export default getEngine
