<script setup lang="ts">
import ZcloudResizable, {
  type ResizeResult,
} from '@/uni-modules/zcloud-resizable/components/zcloud-resizable/zcloud-resizable.vue'
import { h, ref } from 'vue'

const generateText = () => {
  return Array(Math.ceil(Math.random() * 20))
    .fill('我是动态内容')
    .join(',')
}

const text = ref(generateText())

const rect = ref({ width: 0, height: 0 })
const onResize = (e: ResizeResult) => {
  console.log('resize', e)
  rect.value = { width: e.width, height: e.height }
}
</script>

<template>
  <view class="content">
    <button @click="text = generateText()" style="margin-bottom: 16px">点击测试动态内容</button>

    <ZcloudResizable @resize="onResize" emit-when-mounted>
      <view class="resize" style="border-radius: 4px; border: 4px solid red">
        <view>w: {{ rect.width }}</view>
        <view>h: {{ rect.height }}</view>
        <view>动态内容：{{ text }}</view>
      </view>
    </ZcloudResizable>
    <view style="margin: 24px 0">虚拟列表懒人版 demos</view>
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
        <button>动态尺寸+瀑布流</button>
      </navigator>
      <navigator url="/pages/waterfall/index" open-type="navigate">
        <button>瀑布流+跟随页面</button>
      </navigator>
      <navigator url="/pages/page/index" open-type="navigate">
        <button>跟随页面滚动</button>
      </navigator>
    </view>

    <view style="margin: 24px 0">虚拟列表自助版 demos</view>
    <view class="demo-btns">
      <navigator url="/pages/grid/without-slot" open-type="navigate">
        <button>高性能grid</button>
      </navigator>
      <navigator url="/pages/dynamic/without-slot" open-type="navigate">
        <button>动态尺寸+瀑布流+跟随页面</button>
      </navigator>
      <navigator url="/pages/dynamic/element-scroll" open-type="navigate">
        <button>动态尺寸+瀑布流+局部滚动</button>
      </navigator>
    </view>
  </view>
</template>

<style>
.resize {
  /* font-size: 12px; */
  background-color: #999;
}

.content {
  padding: 14px;
}
</style>
