<script setup lang="ts">
import ZcloudVirtualList from '@/uni-modules/zcloud-virtual/components/zcloud-virtual-list/zcloud-virtual-list.vue'
import { type VirtualizerInstance } from '@/uni-modules/zcloud-virtual/typings'
import { ref } from 'vue'
import { randomColors, randomSize } from '../dynamic/utils'
import { onPageScroll } from '@dcloudio/uni-app'

const instanceRef = ref<VirtualizerInstance>()

onPageScroll((e) => {
  instanceRef.value?.onScroll(e)
})

const onReady = (virtualizer: VirtualizerInstance) => {
  console.log('ready', virtualizer)
  instanceRef.value = virtualizer
}
</script>

<template>
  <view style="padding: 10px 12px">
    <view class="demo-btns">
      <button @click="instanceRef?.scrollToIndex(2000, { behavior: 'smooth' })">scrollToIndex(2000) with smooth</button>
      <button @click="instanceRef?.scrollToIndex(3000, { align: 'center' })">
        scrollToIndex(3000) with align center
      </button>
      <button @click="instanceRef?.scrollToOffset(4000, 'smooth')">scrollToOffset(4000) with smooth</button>
    </view>
    <ZcloudVirtualList
      itemClassName="demo-list-item"
      :count="10000"
      follow-page-scroll
      :size="() => randomSize() + 30"
      :overscan="6"
      :gap="10"
      :lanes="2"
      @ready="onReady"
    >
      <template #default="{ index, size }">
        <view
          :style="{
            backgroundColor: randomColors[index % randomColors.length],
            height: `${size}px`,
          }"
        />
      </template>
    </ZcloudVirtualList>
  </view>
</template>
