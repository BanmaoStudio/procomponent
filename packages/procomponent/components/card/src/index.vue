<template>
  <NCard
    :style="{ backgroundColor: color }"
    :title="title"
    @click="handleClick"
  >
    <slot />
  </NCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard } from 'naive-ui'

const props = defineProps({
  color: {
    type: String,
    default: '#000000',
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

function handleClick(e: MouseEvent) {
  emit('click', e)
}

const title = computed(() => props.title)
const color = computed(() => props.color)
</script>
