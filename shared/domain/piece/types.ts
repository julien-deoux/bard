import { ChunkInstance } from './chunk/types'
import { SectionInstance } from './section/types'

export interface PieceInstance {
  id: string
  title: string
  entryChunk: ChunkInstance
  sections: SectionInstance[]
}
