<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style>
.demo-list-item {
  overflow: hidden;
  border-radius: 5px;
}

.demo-list-odd,
.demo-list-even {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2f2f2f;
}

.demo-list-odd {
  background-color: #f6f5f5;
}

.demo-list-even {
  background-color: #d7d3d4;
}

.demo-btns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

button {
  font-size: 14px;
  word-break: break-all;
}
</style>
