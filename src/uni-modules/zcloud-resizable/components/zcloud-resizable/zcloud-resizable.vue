<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, ref, type CSSProperties } from 'vue'
import { resizeUUID } from '../../utils'

export type ResizeResult = UniApp.ObserveNodeRect & { width: number; height: number }

const props = defineProps<{
  emitWhenMounted?: boolean
  className?: string
  styles?: CSSProperties
}>()

const emit = defineEmits<{
  (e: 'resize', res: ResizeResult): void
}>()

const width = ref(0)
const height = ref(0)
const resizeId = `zcloud-resize-${resizeUUID.value}`
const resizeFlexClass = `zcloud-resize-flex-${resizeUUID.value}`

resizeUUID.value += 1

const instance = getCurrentInstance()

let observer: UniApp.IntersectionObserver

onMounted(() => {
  const query = uni.createSelectorQuery().in(instance?.proxy).select(`#${resizeId}`).boundingClientRect()
  query.exec((res) => {
    width.value = res[0].width
    height.value = res[0].height

    if (props.emitWhenMounted) {
      emit('resize', { ...res[0], width: res[0].width, height: res[0].height })
    }
  })

  observer = uni.createIntersectionObserver(instance, { observeAll: true })
  observer.relativeTo(`#${resizeId}`).observe(`.${resizeFlexClass}`, (res) => {
    // TODO 微信文档这里的res 包含 width 和 height，但uni-app类型提示没有，暂时这样计算width 和 height
    const currWidth = res.relativeRect.right - res.relativeRect.left
    const currHeight = res.relativeRect.bottom - res.relativeRect.top

    if (currWidth !== width.value || currHeight !== height.value) {
      width.value = currWidth
      height.value = currHeight
      emit('resize', { ...res.relativeRect, width: currWidth, height: currHeight })
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <view :id="resizeId" :class="`zcloud-resize-wrap ${className ?? ''}`" :style="styles">
    <slot></slot>
    <view
      class="zcloud-resize-flex"
      :class="resizeFlexClass"
      :style="{ left: `${width - 1}px`, top: `${height - 1}px` }"
    />
    <view class="zcloud-resize-flex" :class="resizeFlexClass" :style="{ left: `${width - 1}px`, top: `${height}px` }" />
    <view class="zcloud-resize-flex" :class="resizeFlexClass" :style="{ left: `${width}px`, top: `${height - 1}px` }" />
  </view>
</template>

<style lang="css" scoped>
.zcloud-resize-wrap {
  position: relative;
  width: fit-content;
}

.zcloud-resize-flex {
  position: absolute;
  width: 1px;
  height: 1px;
  z-index: -10;
  visibility: hidden;
  pointer-events: none;
}
</style>
