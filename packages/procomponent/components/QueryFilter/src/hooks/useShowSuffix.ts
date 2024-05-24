import { nextTick, onMounted, ref } from 'vue'

export function useShowSuffix(domRef: any, num: number) {
  const showSuffix = ref<boolean>(true)

  onMounted(() => {
    nextTick(() => {
      const len = domRef.value.contentEl.children.length || 0
      if (len > num)
        showSuffix.value = true
      else
        showSuffix.value = false
    })
  })

  return {
    showSuffix,
  }
}
