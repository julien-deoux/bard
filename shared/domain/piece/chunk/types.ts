export interface PathToSection {
  distance: number
  nextChunk: ChunkInstance
}

export interface ChunkInstance {
  sectionId: string
  id: string
  buffer: ArrayBuffer
  pathsToSections: {
    [sectionId: string]: PathToSection
  }
}
