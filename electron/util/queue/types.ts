export interface Queue<T> {
  elements: Record<number, T>
  head: number
  tail: number
}
