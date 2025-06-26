# uni-app 虚拟组件 zclou-virtual-list

该组件包含常规虚拟列表、瀑布流、网格 grid

## 使用注意事项

跟随页面滚动的虚拟列表需要在页面注册 onPageScroll 事件，具体如下

```ts
onPageScroll((e) => {
  instanceRef.value?.onScroll(e)
})
```
