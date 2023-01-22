import { mapValues, reduce } from 'radash'

import * as Q from '@/util/queue'

import * as C from './chunk'
import * as S from './section'
import { Piece, PieceInstance } from './types'

export const instanciate = async ({
  id,
  title,
  entryChunk,
  chunks,
  sections,
}: Piece): Promise<PieceInstance> => {
  const chunksMap = await reduce(
    chunks,
    async (acc, chunk) => ({ ...acc, [chunk.id]: chunk }),
    {} as Record<string, C.Chunk>,
  )
  const chunkInstanceMap: Record<string, C.ChunkInstance> = {}
  const sectionInstanceMap: Record<string, S.SectionInstance> = {}

  sections.forEach(
    (section) => (sectionInstanceMap[section.id] = S.instanciate(section)),
  )
  const chunkInstancePromises = chunks.map((chunk) => C.instanciate(chunk))
  ;(await Promise.all(chunkInstancePromises)).map(
    (chunkInstance) => (chunkInstanceMap[chunkInstance.id] = chunkInstance),
  )

  const visitedChunks = mapValues(chunkInstanceMap, () => false)
  const entryChunkInstance = chunkInstanceMap[entryChunk]

  const chunkQueue = Q.constructor<C.ChunkInstance>()
  Q.push(chunkQueue, entryChunkInstance)

  while (Q.length(chunkQueue) !== 0) {
    const { id, pathsToSections } = Q.pop(chunkQueue)
    visitedChunks[id] = true
    const { tails } = chunksMap[id]
    tails.forEach((tail) => {
      const nextChunk = chunkInstanceMap[tail]
      pathsToSections[nextChunk.sectionId] = {
        distance: 0,
        nextChunk,
      }
      if (!visitedChunks[nextChunk.id]) Q.push(chunkQueue, nextChunk)
    })
  }

  const sectionInstanceArray = Object.values(sectionInstanceMap)
  const chunkInstanceArray = Object.values(chunkInstanceMap)
  chunkInstanceArray.forEach((chunkInstance) => {
    const { pathsToSections } = chunkInstance
    sectionInstanceArray.forEach(({ id }) => {
      if (!pathsToSections[id]) {
        pathsToSections[id] = C.findPathToSection(chunkInstance, id)
      }
    })
  })

  return {
    id,
    title,
    entryChunk: entryChunkInstance,
    sections: sectionInstanceArray,
  }
}
