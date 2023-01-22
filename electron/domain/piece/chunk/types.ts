export * from '@shared/domain/piece/chunk/types'

export interface Chunk {
  sectionId: string
  id: string
  path: string
  tails: string[]
}
