<template>
  <div ref="containerRef" class="watermark-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// import { useMutationObserver } from '@vueuse/core'
import { useWatermarkBg } from './useWatermarkBg'

defineOptions({
  name: 'ProWatermark',
})

const props = withDefaults(defineProps<WatermarkProps>(), {
  text: 'watermark',
  color: '#000',
  fontSize: 16,
  gap: 50,
})

interface WatermarkProps {
  text: string
  color?: string
  fontSize?: number
  gap: number
}

const bg = useWatermarkBg(props)
console.log(bg)
const containerRef = ref<HTMLDivElement | null>(null)

/**
 * 重置水印
 */
let div: any
function resetWatermark() {
  if (!containerRef.value)
    return

  if (div)
    div.remove()

  const { base64, size } = bg.value
  div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.backgroundImage = `url(${base64})`
  div.style.backgroundSize = `${size}px ${size}px`
  div.style.backgroundRepeat = 'repeat'
  div.style.zIndex = '9999'
  div.style.pointerEvents = 'none'
  div.style.inset = '0'

  containerRef.value.appendChild(div)
}

// useMutationObserver(containerRef, (entries: any[]) => {
//   for (const entry of entries) {
//     // 处理删除
//     if (!entry.removedNodes)
//       continue

//     for (const node of entry.removedNodes) {
//       if (node === div)
//         resetWatermark()
//     }
//     // 处理修改
//     if (entry.target === div)
//       resetWatermark()
//   }
// }, {
//   attributes: true,
//   childList: true,
//   subtree: true,
// })

// onMounted(() => {
//   resetWatermark()
// })

const ob = new MutationObserver((entries: any[]) => {
  for (const entry of entries) {
    // 处理删除
    for (const node of entry.removedNodes) {
      if (node === div)
        resetWatermark()
    }
    // 处理修改
    if (entry.target === div)
      resetWatermark()
  }
})

onMounted(() => {
  resetWatermark()
  if (!containerRef.value)
    return
  ob.observe(containerRef.value, {
    attributes: true,
    childList: true,
    subtree: true,
  })
})

onUnmounted(() => {
  ob.disconnect()
})
</script>

<style scoped>
.watermark-container {
    position: relative;
}
</style>
