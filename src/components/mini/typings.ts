import type { BasicVirtualizerOptions } from '../vanilla'

export interface ScrollOption {
  scrollTop: number
  scrollLeft?: number
  scrollHeight?: number
  scrollWidth?: number
  deltaX?: number
  deltaY?: number
}

export interface VirtualizerOptions extends BasicVirtualizerOptions {}
