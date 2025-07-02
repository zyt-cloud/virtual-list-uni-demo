<script setup lang="ts" name="VirtualList">
import { computed, onMounted } from 'vue'
import { getRectSizeAsync, virtualizerUUID, type Rect } from '@z-cloud/virtual-uni/utils'
import { useVirualizer } from '@z-cloud/virtual-uni/hooks/use-virtualizer'

// 如果需要动态改变 count 可以用ref
const props = {
  count: 10000,
  overscan: 6,
  gap: 10,
  size: 60,
}
const virtualizerRef = useVirualizer({
  ...props,
  // grid模式当前虚拟器只能竖向滚动
  horizontal: false,
})

const gridColVirtualizerRef = useVirualizer({
  ...props,
  size: 120,
  horizontal: true,
})

const virtualItems = computed(() => {
  return [
    virtualizerRef.value?.getVirtualItems() ?? [],
    gridColVirtualizerRef?.value?.getVirtualItems() ?? [],
  ]
})

const totalSizes = computed(() => {
  return [
    virtualizerRef.value?.getTotalSize() ?? 0,
    gridColVirtualizerRef?.value?.getTotalSize() ?? 0,
  ]
})

const scrollId = `zcoud-virtual-list-${virtualizerUUID.value++}`

virtualizerUUID.value++

const onScroll = (e: any) => {
  virtualizerRef.value?.onScroll(e.detail)
  gridColVirtualizerRef?.value?.onScroll(e.detail)
}

function init(rect: Rect) {
  virtualizerRef.value!.setScrollElementRect(rect)
  virtualizerRef.value!.init()
  gridColVirtualizerRef.value?.setScrollElementRect(rect)
  gridColVirtualizerRef.value?.init()
}

onMounted(() => {
  if (virtualizerRef.value) {
    getRectSizeAsync(scrollId).then((rect) => {
      init(rect)
    })
  }
})
</script>

<template>
  <view style="padding: 14px">
    <view style="margin: 12px 0"> grid虚拟列表 </view>
    <view style="margin: 12px 0">
      这是无slot的虚拟grid列表，直接复制使用，slot在小程序中循环的话会有异常
    </view>
    <scroll-view :id="scrollId" style="height: 400px" scroll-x scroll-y enhanced @scroll="onScroll">
      <view
        class="scroll-container"
        :style="{
          height: `${totalSizes[0]}px`,
          width: `${totalSizes[1]}px`,
        }"
      >
        <template v-for="rowItem in virtualItems[0]" :key="rowItem.index">
          <view
            v-for="colItem in virtualItems[1]"
            :key="colItem.index"
            :style="{
              gridArea: 'item',
              height: `${rowItem.size}px`,
              width: `${colItem.size}px`,
              transform: `translate(${colItem.start}px,${rowItem.start}px)`,
            }"
          >
            <view
              :style="{ height: `${rowItem.size}px`, width: `${colItem.size}px` }"
              :class="colItem.index % 2 ? 'demo-list-odd' : 'demo-list-even'"
              >cell {{ rowItem.index }} {{ colItem.index }}</view
            >
          </view>
        </template>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.scroll-container {
  display: grid;
  grid-template-areas: 'item';
}
</style>
