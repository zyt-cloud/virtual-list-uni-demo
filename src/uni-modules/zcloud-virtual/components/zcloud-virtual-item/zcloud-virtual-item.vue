<script setup lang="ts">
import ZcloudResizable from '@/uni-modules/zcloud-resizable/components/zcloud-resizable/zcloud-resizable.vue'
import { inject, Fragment } from 'vue'
import type { IVirtualListProps } from '../zcloud-virtual-list/zcloud-virtual-list.vue'
import type { VirtualItem } from '@/components/vanilla'

defineOptions({
  options: {
    virtualHost: true,
  },
})

const options = inject<IVirtualListProps>('virtualOptions')
const items = inject<[VirtualItem[], VirtualItem[]]>('virtualItems') ?? []
console.log(15, options)
</script>

<template>
  <view
    v-for="item in items[0]"
    v-if="!options?.grid"
    :class="options?.itemClassName"
    :style="{
      overflow: 'hidden',
      ...options?.itemStyle,
      gridArea: `lane${item.lane}`,
      height: options?.horizontal || options?.dynamicSize ? void 0 : `${item.size}px`,
      width: !options?.horizontal || options?.dynamicSize ? void 0 : `${item.size}px`,
      transform: options?.horizontal ? `translateX(${item.start}px)` : `translateY(${item.start - 0}px)`,
    }"
  >
    <ZcloudResizable v-if="options?.dynamicSize" :styles="{ width: '100%' }">
      <!-- shit 不支持 v-bind 为了和 web 端的包保持一致，逐一展开 -->
      <slot
        :key="item.key"
        :index="item.index"
        :size="item.size"
        :lane="item.lane"
        :start="item.start"
        :end="item.end"
      />
    </ZcloudResizable>
    <slot
      v-else
      :key="item.key"
      :index="item.index"
      :size="item.size"
      :lane="item.lane"
      :start="item.start"
      :end="item.end"
    />
  </view>

  <!-- <template v-if="options?.grid" v-for="rowItem in items[0]" :key="rowItem.index">
    <view
      v-for="colItem in items[1]"
      :key="colItem.index"
      :class="options?.itemClassName"
      :style="{
        ...options?.itemStyle,
        gridArea: 'item',
        height: `${rowItem.size}px`,
        width: `${colItem.size}px`,
        transform: `translate(${colItem.start}px,${rowItem.start}px)`,
      }"
    >
      <slot name="grid" :rowItem="rowItem" :colItem="colItem" />
    </view>
  </template> -->
</template>
