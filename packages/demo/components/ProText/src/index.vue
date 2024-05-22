<template>
  <UseClipboard v-slot="{ copy, copied }" :source="text">
    <div class="bm-text">
      <NText v-bind="$attrs">
        {{ text }}
      </NText>
      <Icon
        class="bm-icon"
        :class="[{ 'bm-icon-color': copied }]"
        :icon="`ant-design:${copied ? 'check' : 'copy'}-outlined`"
        @click="copy()"
      />
    </div>
  </UseClipboard>
</template>

<script setup lang="ts">
import { UseClipboard } from '@vueuse/components'
import { Icon } from '@iconify/vue'
import { NText } from 'naive-ui'

defineOptions({
  name: 'ProText',
})

const { text } = defineProps<{ text: string }>()
</script>

<style scoped lang="scss">
.bm-text {
    display: flex;
    align-items: center;
    gap: 4px;
}

.bm-icon {
    font-size: 18px;
    cursor: pointer;
    color: #3b82f6;
}
.bm-icon-color {
    color: #22c55e;
}
</style>
