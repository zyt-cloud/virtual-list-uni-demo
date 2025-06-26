import type { Rect } from '@/components/vanilla'
import { getCurrentInstance } from 'vue'

export const virtualizerUUID = {
  value: 1,
}

export function getRectSize(id: string, success?: (rect: Rect) => void, fail?: () => void, retryMs = 500) {
  const query = uni.createSelectorQuery().in(getCurrentInstance()?.proxy)
  try {
    query
      .select(`#${id}`)
      .boundingClientRect((res) => {
        if (res instanceof Array ? res.length > 0 : res) {
          success?.(res as Rect)
        } else {
          fail?.()
        }
      })
      .exec()
  } catch (err) {
    setTimeout(() => {
      getRectSize(id, success, fail, retryMs)
    }, retryMs)
  }
}

export function getRectSizeAsync(id: string, retryMs = 500, retryTimes = 3) {
  return new Promise<Rect>((resolve) => {
    function retry() {
      if (retryTimes <= 0) return
      setTimeout(async () => {
        try {
          const res = await getRectSizeAsync(id, retryMs, --retryTimes)
          resolve(res)
        } catch (err) {
          retry()
        }
      }, retryMs)
    }
    getRectSize(id, resolve, retry, retryMs)
  })
}

export async function getScrollViewContextNode(id: string) {
  const query = uni.createSelectorQuery()
  return new Promise((resolve) =>
    query
      .select(`#${id}`)
      .node(({ node }) => resolve(node))
      .exec()
  )
}
