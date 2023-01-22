import { Queue } from './types'

export const constructor = <T>(): Queue<T> => ({
  elements: {},
  head: 0,
  tail: 0,
})

export const push = <T>(queue: Queue<T>, item: T): void => {
  queue.elements[queue.tail] = item
  queue.tail++
}

export const pop = <T>(queue: Queue<T>): T => {
  const item = queue.elements[queue.head]
  delete queue.elements[queue.head]
  queue.head++
  return item
}

export const length = ({ head, tail }: Queue<unknown>): number => tail - head
