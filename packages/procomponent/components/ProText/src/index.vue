<template>
  <NTooltip v-if="ellipsis" trigger="hover">
    <template #trigger>
      <TextClamp :max-lines="maxLines" :text="text">
        <template #after>
          <Icon v-if="copyable" :style="{
            ...bmIconStyle,
            color: copied ? copiedColor : defaultColor
          }" :icon="`ant-design:${copied ? 'check' : 'copy'}-outlined`" @click="handleCopy" />
        </template>
      </TextClamp>
    </template>
    <div style="max-width: 300px">
      <span>{{ text }}</span>
    </div>
  </NTooltip>
  <template v-else>
    <NText v-bind="$attrs">
      {{ text }}
    </NText>
    <Icon v-if="copyable" :style="{
      ...bmIconStyle,
      color: copied ? copiedColor : defaultColor
    }" :icon="`ant-design:${copied ? 'check' : 'copy'}-outlined`" @click="handleCopy" />
  </template>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { Icon } from '@iconify/vue'
import { NText, NTooltip } from 'naive-ui'
import TextClamp from 'vue3-text-clamp'
import { ProTextProps } from './types'

defineOptions({
  name: 'ProText'
})

const props = withDefaults(defineProps<ProTextProps>(), {
  copyable: false,
  lineClamp: 1
})


const ellipsis = computed(() => props.ellipsis !== false)
const copyable = computed(() => props.copyable)
const maxLines = computed(() => props.lineClamp)

const defaultColor = ref('#3b82f6')
const copiedColor = ref('#22c55e')
const bmIconStyle = computed(() => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'pointer'
}))

const { text: _clipboardText, copy, copied } = useClipboard({ legacy: true })

const isCopied = ref(false)

const handleCopy = () => {
  if (!props.text.toString()) {
    return
  }
  copy(props.text.toString())

  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2500)

}
</script>

<style scoped lang="scss">
.bm-text {
  vertical-align: middle;
}
</style>
