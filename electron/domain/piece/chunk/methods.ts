import { readFile } from 'fs/promises'

import { Chunk, ChunkInstance, PathToSection } from './types'

export const instanciate = async ({
  id,
  path,
  sectionId,
}: Chunk): Promise<ChunkInstance> => {
  const fileContents = await readFile(path)

  const { buffer } = fileContents

  return {
    id,
    sectionId,
    buffer,
    pathsToSections: {},
  }
}

export const findPathToSection = (
  { pathsToSections, sectionId }: ChunkInstance,
  nextSection: string,
): PathToSection => {
  const sectionPath = pathsToSections[nextSection]
  if (sectionPath !== undefined) {
    return sectionPath
  }
  const nextChunk = pathsToSections[sectionId].nextChunk
  const { distance } = findPathToSection(nextChunk, nextSection)
  return {
    distance: distance + 1,
    nextChunk,
  }
}
