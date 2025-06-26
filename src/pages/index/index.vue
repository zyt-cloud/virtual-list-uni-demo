<script setup lang="ts">
import ZcloudResizable, {
  type ResizeResult,
} from '@/uni-modules/zcloud-resizable/components/zcloud-resizable/zcloud-resizable.vue'
import { ref } from 'vue'

const size = ref(100)
const onResize = (e: ResizeResult) => {
  console.log('resize', e)
}
</script>

<template>
  <view class="content">
    <button @click="size = size === 100 ? 50 : 100">点击放大缩小</button>

    <ZcloudResizable @resize="onResize" emit-when-mounted>
      <view
        class="resize"
        :style="{ borderRadius: '4px', border: '4px solid red', width: `${size}px`, height: `${size}px` }"
      >
        <text>hello world</text>
      </view>
    </ZcloudResizable>
    <view style="margin: 24px 0">虚拟列表demos</view>
    <view class="demo-btns">
      <navigator url="/pages/vertical/index" open-type="navigate">
        <button>垂直列表</button>
      </navigator>
      <navigator url="/pages/horizontal/index" open-type="navigate">
        <button>水平列表</button>
      </navigator>
      <navigator url="/pages/grid/index" open-type="navigate">
        <button>grid列表</button>
      </navigator>

      <navigator url="/pages/dynamic/index" open-type="navigate">
        <button>动态尺寸 + 瀑布流</button>
      </navigator>
      <navigator url="/pages/waterfall/index" open-type="navigate">
        <button>瀑布流 + 跟随页面</button>
      </navigator>
      <navigator url="/pages/page/index" open-type="navigate">
        <button>跟随页面滚动</button>
      </navigator>
    </view>
  </view>
</template>

<style>
.resize {
  background-color: #999;
}

.content {
  padding: 14px;
}
</style>
