<template>
  <UseClipboard v-slot="{ copy, copied }" :source="text">
    <div class="bm-text">
      <div v-if="props.ellipsis !== false" style="display: flex;">
        <NEllipsis>
          <template #tooltip>
            <div style="max-width: 400px">
              {{ text }}
            </div>
          </template>
          <NText v-bind="$attrs">
            {{ text }}
          </NText>
        </NEllipsis>
        <div style="width: 18px">
          <Icon
            v-if="copyable"
            :style="{
              ...bmIconStyle,
              color: copied ? copiedColor : defaultColor,
            }"
            :icon="`ant-design:${copied ? 'check' : 'copy'}-outlined`"
            @click="copy()"
          />
        </div>
      </div>
      <template v-else>
        <NText v-bind="$attrs">
          {{ text }}
        </NText>
        <Icon
          v-if="copyable"
          :style="{
            ...bmIconStyle,
            color: copied ? copiedColor : defaultColor,
          }"
          :icon="`ant-design:${copied ? 'check' : 'copy'}-outlined`"
          @click="copy()"
        />
      </template>
    </div>
  </UseClipboard>
</template>

<script setup lang="ts">
import { UseClipboard } from '@vueuse/components'
import { Icon } from '@iconify/vue'
import { NEllipsis, NText } from 'naive-ui'

defineOptions({
  name: 'ProText',
})

const props = withDefaults(defineProps<{ text: string; copyable?: boolean; ellipsis?: boolean }>(), {
  copyable: true,
})

const copyable = computed(() => props.copyable)

const defaultColor = ref('#3b82f6')
const copiedColor = ref('#22c55e')
const bmIconStyle = computed(() => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'pointer',
}))
</script>

<style scoped lang="scss">
.bm-text {
  vertical-align: middle;
}
</style>
