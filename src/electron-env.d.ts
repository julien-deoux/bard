import { PieceInstance } from '@/domain/piece'

declare global {
  interface Window {
    electronAPI: {
      getPiece: () => Promise<PieceInstance>
    }
  }
}

export {}
