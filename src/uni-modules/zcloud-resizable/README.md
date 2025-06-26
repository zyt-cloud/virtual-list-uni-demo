# ZcloudResizable

## 一个基于 Vue3 + TS 开发的 uni-app 组件，用于监测元素尺寸变化的组件。

## 使用方法

```tsx
// 组件已导出 ResizeResult 可直接导入使用
export type ResizeResult = UniApp.ObserveNodeRect & { width: number; height: number }

const onResize = (e: ResizeResult) => {
  console.log('resize', e)
}

<ZcloudResizable @resize="onResize">
  <view class="resize" :style="{ border: '1px solid red', width: `${size}px`, height: `${size}px` }">
    <text>hello world</text>
  </view>
</ZcloudResizable>
```
