import type { WatermarkProps } from './types'

import { onMounted, onUnmounted, ref } from 'vue'
// import { useMutationObserver } from '@vueuse/core'
import { useWatermarkBg } from './hooks/useWatermarkBg'
import './index.scss'

export default defineComponent({
  name: 'ProWatermark',
  props: {
    ...withDefaults(defineProps<WatermarkProps>(), {
      text: 'watermark',
      color: '#000',
      fontSize: 16,
      gap: 50,
      rotate: -30,
    }),
  },
  setup(props) {
    const bg = useWatermarkBg(props)
    const containerRef = ref<HTMLDivElement | null>(null)

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

    return () => (
      <div ref="containerRef" class="watermark-container">
        <slot />
      </div>
    )
  },
})
