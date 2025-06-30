<script setup lang="ts" name="VirtualList">
import type { VirtualListProps } from '@/uni-modules/zcloud-virtual/typings'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import {
  getRectSizeAsync,
  getScrollViewContextNode,
  getWindowRect,
  virtualizerUUID,
} from '@/uni-modules/zcloud-virtual/utils'
import { useVirualizer } from '@/uni-modules/zcloud-virtual/hooks/use-virtualizer'
import ZcloudResizable from '@/uni-modules/zcloud-resizable/components/zcloud-resizable/zcloud-resizable.vue'
import { useVirtualizerStyle } from '@/uni-modules/zcloud-virtual/hooks/use-virtualizer-style'
import { randomColors, randomSize } from './utils'

const dynamicSizes = new Array(10000).fill(true).map(() => randomSize() + 80)

const options = ref<VirtualListProps>({
  size: 140,
  count: 10000,
  overscan: 5,
  lanes: 2,
  gap: 10,
  followPageScroll: true,
  dynamicSize: true,
})

const virtualizerRef = useVirualizer(options)

const virtualItems = computed(() => virtualizerRef.value?.getVirtualItems() ?? [])

const totalSize = computed(() => virtualizerRef.value?.getTotalSize() ?? 0)

const { contentStyle } = useVirtualizerStyle(options)

const scrollId = `zcoud-virtual-list-${virtualizerUUID.value++}`

virtualizerUUID.value++

const onScroll = (e: any) => {
  virtualizerRef.value?.onScroll(e.detail)
}

const instance = getCurrentInstance()

async function init() {
  const windowRect = getWindowRect()
  const elementRect = await getRectSizeAsync(scrollId)
  const scrollNode: any = await getScrollViewContextNode(scrollId, instance?.proxy)

  virtualizerRef.value!.scrollTo = function (offset, behavior) {
    if (!scrollNode) {
      console.warn('获取scrollNode失败')
      return
    }

    scrollNode.scrollTo({
      [this.options.horizontal ? 'left' : 'top']: offset,
      animated: false,
    })
  }

  virtualizerRef.value!.setScrollElementRect(windowRect)
  virtualizerRef.value!.options.scrollMargin = elementRect.top ?? 0
  virtualizerRef.value!.init()
}

onMounted(() => {
  if (virtualizerRef.value) {
    init()
  }
})
</script>

<template>
  <view style="padding: 14px">
    <view style="margin: 12px 0"> 动态尺寸+瀑布流+局部滚动 </view>
    <view style="margin: 12px 0">
      这是无slot的虚拟列表，直接复制使用，slot在小程序中循环的话会有异常
    </view>
    <view class="demo-btns" style="grid-template-columns: repeat(2, 1fr)">
      <button @click="virtualizerRef?.scrollToIndex(3000, { align: 'center' })">
        scrollToIndex(3000) with align center
      </button>
      <button @click="virtualizerRef?.scrollToOffset(4000, 'instant')">scrollToOffset(4000)</button>
    </view>
    <scroll-view :id="scrollId" scroll-y enhanced @scroll="onScroll" style="height: 400px">
      <view :style="[contentStyle, { height: `${totalSize}px`, width: '100%' }]">
        <view
          v-for="item in virtualItems"
          class="demo-list-item"
          :key="item.index"
          :style="{
            overflow: 'hidden',
            gridArea: `lane${item.lane}`,
            transform: `translateY(${item.start - (virtualizerRef?.options.scrollMargin ?? 0)}px)`,
          }"
        >
          <ZcloudResizable
            :styles="{ width: '100%' }"
            emit-when-mounted
            @resize="
              (res) =>
                virtualizerRef?.onElementSizeChange(item.index, {
                  height: res.height,
                  width: res.width,
                })
            "
          >
            <view
              :style="{
                backgroundColor: randomColors[item.index % randomColors.length],
                height: `${dynamicSizes[item.index]}px`,
              }"
              >item {{ item.index }}</view
            >
          </ZcloudResizable>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
