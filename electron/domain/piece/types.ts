export * from '@shared/domain/piece/types'

import { Chunk } from './chunk/types'
import { Section } from './section/types'

export interface Piece {
  id: string
  title: string
  entryChunk: string
  sections: Section[]
  chunks: Chunk[]
}
