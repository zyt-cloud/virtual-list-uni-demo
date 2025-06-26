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
  <view>
    <view class="demo-btns">
      <button @click="instanceRef?.scrollToIndex(2000, { behavior: 'smooth' })">scrollToIndex(2000) with smooth</button>
      <button @click="instanceRef?.scrollToIndex(3000, { align: 'center' })">
        scrollToIndex(3000) with align center
      </button>
      <button @click="instanceRef?.scrollToOffset(4000, 'smooth')">scrollToOffset(4000) with smooth</button>
    </view>
    <ZcloudVirtualList
      itemClassName="demo-list-item"
      :height="400"
      :count="10000"
      :size="60"
      :overscan="6"
      :gap="10"
      :lanes="2"
      @ready="onReady"
    >
      <template #default="{ index, size }">
        <view
          :style="{
            backgroundColor: randomColors[index % randomColors.length],
            height: `${dynamicSizes[index]}px`,
          }"
          >item {{ index }}</view
        >
      </template>
    </ZcloudVirtualList>
  </view>
</template>
