<script setup lang="ts">
import ZcloudVirtualList from '@z-cloud/virtual-uni/components/zcloud-virtual-list/zcloud-virtual-list.vue'
import { type VirtualizerInstance } from '@z-cloud/virtual-uni/typings'
import { ref } from 'vue'

const instanceRef = ref<VirtualizerInstance>()

const onReady = (virtualizer: VirtualizerInstance) => {
  console.log('ready', virtualizer)
  instanceRef.value = virtualizer
}
</script>

<template>
  <view style="padding: 10px 12px">
    <view class="demo-btns">
      <button @click="instanceRef?.scrollToIndex(2000, { behavior: 'smooth' })">
        scrollToIndex(2000) with smooth
      </button>
      <button @click="instanceRef?.scrollToIndex(3000, { align: 'center' })">
        scrollToIndex(3000) with align center
      </button>
      <button @click="instanceRef?.scrollToOffset(4000, 'smooth')">
        scrollToOffset(4000) with smooth
      </button>
    </view>
    <ZcloudVirtualList
      itemClassName="demo-list-item"
      :height="200"
      :count="10000"
      horizontal
      :size="120"
      :overscan="6"
      :gap="10"
      className="demo-list"
      @ready="onReady"
    >
      <template #default="{ index }">
        <view
          :style="{ height: `${200}px` }"
          :class="index % 2 ? 'demo-list-odd' : 'demo-list-even'"
          >item {{ index }}</view
        >
      </template>
    </ZcloudVirtualList>
  </view>
</template>
