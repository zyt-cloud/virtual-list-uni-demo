<script setup lang="ts">
import ZcloudVirtualList from '@/uni-modules/zcloud-virtual/components/zcloud-virtual-list/zcloud-virtual-list.vue'
import { type VirtualizerInstance } from '@/uni-modules/zcloud-virtual/typings'
import { ref } from 'vue'
import { randomColors, randomSize } from './utils'

const instanceRef = ref<VirtualizerInstance>()

const dynamicSizes = new Array(10000).fill(true).map(() => randomSize() + 80)

const onReady = (virtualizer: VirtualizerInstance) => {
  console.log('ready', virtualizer)
  instanceRef.value = virtualizer
}
</script>

<template>
  <view style="padding: 10px 12px">
    <view class="demo-btns" style="grid-template-columns: repeat(2, 1fr)">
      <button @click="instanceRef?.scrollToIndex(3000, { align: 'center' })">
        scrollToIndex(3000) with align center
      </button>
      <button @click="instanceRef?.scrollToOffset(4000, 'instant')">scrollToOffset(4000)</button>
    </view>
    <ZcloudVirtualList
      itemClassName="demo-list-item"
      :height="600"
      :count="10000"
      :size="110"
      :overscan="6"
      dynamic-size
      :gap="10"
      :lanes="2"
      @ready="onReady"
    >
      <template #default="{ index }">
        <view
          :style="{
            backgroundColor: randomColors[index % randomColors.length],
            height: `${dynamicSizes[index]}px`,
          }"
        />
      </template>
    </ZcloudVirtualList>
  </view>
</template>
