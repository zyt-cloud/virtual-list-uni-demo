<script setup lang="ts" name="VirtualList">
import type { VirtualListProps } from '@z-cloud/virtual-uni/typings'
import { computed, onMounted, ref } from 'vue'
import { getRectSizeAsync, getWindowRect, virtualizerUUID } from '@z-cloud/virtual-uni/utils'
import { useVirualizer } from '@z-cloud/virtual-uni/hooks/use-virtualizer'
import ZcloudResizable from '@z-cloud/resizable-uni/components/zcloud-resizable/zcloud-resizable.vue'
import { useVirtualizerStyle } from '@z-cloud/virtual-uni/hooks/use-virtualizer-style'
import { onPageScroll } from '@dcloudio/uni-app'
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

// 监听页面滚动 子组件直接监听无效
onPageScroll((e) => {
  virtualizerRef.value?.onScroll(e)
})

async function init() {
  const windowRect = getWindowRect()
  const elementRect = await getRectSizeAsync(scrollId)

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
    <view style="margin: 12px 0"> 动态尺寸+瀑布流+跟随页面 </view>
    <view style="margin: 12px 0">
      这是无slot的虚拟列表，直接复制使用，slot在小程序中循环的话会有异常
    </view>
    <view :id="scrollId" :style="[contentStyle, { height: `${totalSize}px`, width: '100%' }]">
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
          />
        </ZcloudResizable>
      </view>
    </view>
  </view>
</template>
