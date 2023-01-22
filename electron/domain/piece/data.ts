import path from 'path'

import { Piece } from './types'

export const EXAMPLE: Piece = {
  id: '1',
  title: 'Example piece',
  entryChunk: '1',
  sections: [
    {
      id: 'A',
      title: 'Resting',
    },
    {
      id: 'B',
      title: 'Tension',
    },
  ],
  chunks: [
    {
      id: '1',
      sectionId: 'A',
      path: path.join(__dirname, '../audio/rest.ogg'),
      tails: ['1', '2'],
    },
    {
      id: '2',
      sectionId: 'B',
      path: path.join(__dirname, '../audio/tension.ogg'),
      tails: ['1', '2'],
    },
  ],
}
