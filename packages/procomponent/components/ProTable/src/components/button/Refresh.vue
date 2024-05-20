<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <NButton size="small" quaternary @click="handleClick">
        <Icon
          icon="mdi-refresh"
          class="mr-4px lt-sm:mr-0 text-16px"
          :class="{ 'animate-spin': loading }"
        />
      </NButton>
    </template>
    刷新
  </NTooltip>
</template>

<script setup lang="ts">
import { NButton, NTooltip } from 'naive-ui'
import { Icon } from '@iconify/vue'

defineOptions({ name: 'RefreshButton' })

const { loading } = defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<RefreshButtonEmits>()

interface RefreshButtonEmits {
  (e: 'click'): void
}

function handleClick() {
  emit('click')
}
</script>
