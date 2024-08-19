<template>
  <UseClipboard v-slot="{ copy, copied }" :source="text">
    <NTooltip v-if="ellipsis" trigger="hover">
      <template #trigger>
        <TextClamp :max-lines="maxLines" :text="text">
          <template #after>
            <Icon
              v-if="copyable"
              :style="{
                ...bmIconStyle,
                color: copied ? copiedColor : defaultColor
              }"
              :icon="`ant-design:${copied ? 'check' : 'copy'}-outlined`"
              @click="copy()" />
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
      <Icon
        v-if="copyable"
        :style="{
          ...bmIconStyle,
          color: copied ? copiedColor : defaultColor
        }"
        :icon="`ant-design:${copied ? 'check' : 'copy'}-outlined`"
        @click="copy()" />
    </template>
  </UseClipboard>
</template>

<script setup lang="ts">
  import { UseClipboard } from '@vueuse/components'
  import { Icon } from '@iconify/vue'
  import { NText, NTooltip } from 'naive-ui'
  import TextClamp from 'vue3-text-clamp'

  defineOptions({
    name: 'ProText'
  })

  const props = withDefaults(defineProps<ProTextProps>(), {
    copyable: false,
    lineClamp: 1
  })

  export interface ProTextProps {
    text: string
    copyable?: boolean
    ellipsis?: boolean
    lineClamp?: number | string
  }
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
</script>

<style scoped lang="scss">
  .bm-text {
    vertical-align: middle;
  }
</style>
