<template>
  <NPopover placement="bottom" trigger="click">
    <template #trigger>
      <NButton size="small" type="warning">
        <Icon icon="hugeicons-setting-01" class="mr-4px text-16px" />
      </NButton>
    </template>
    <div class="w-210px">
      <div>hahah</div>
      <VueDraggable v-model="list" item-key="key">
        <template #item="{ element }">
          {{ element.title }}
        </template>
      </VueDraggable>
    </div>
  </NPopover>
</template>

<script setup lang="ts">
import { NButton, NPopover } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { VueDraggableNext as VueDraggable } from 'vue-draggable-next'
import { ref } from 'vue'

const list = ref([
  { key: 1, name: 'John' },
  { key: 2, name: 'Jane' },
  { key: 3, name: 'Bob' },
])
</script>
