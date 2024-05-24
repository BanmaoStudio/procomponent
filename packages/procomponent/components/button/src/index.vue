<template>
  <button class="btn" :style="{ color }" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#000000',
  },
})

const emit = defineEmits(['click'])

function handleClick(e: MouseEvent) {
  emit('click', e)
}

const color = computed(() => props.color)
</script>
