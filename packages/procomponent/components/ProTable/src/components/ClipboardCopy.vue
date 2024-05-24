<template>
  <UseClipboard v-slot="{ copy, copied }" :source="text">
    <div class="flex items-center gap-2">
      <span>{{ text }}</span>
      <Icon
        class="text-18px cursor-pointer text-blue-500" :class="[{ 'text-green-500': copied }]"
        :icon="`ant-design:${copied ? 'check' : 'copy'}-outlined`"
        @click="copy()"
      />
    </div>
  </UseClipboard>
</template>

<script setup lang="ts">
import { UseClipboard } from '@vueuse/components'
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'ClipboardCopy',
})

const { text } = defineProps<{ text: string }>()
</script>
