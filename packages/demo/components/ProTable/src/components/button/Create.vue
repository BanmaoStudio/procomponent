<template>
  <NButton type="info" size="small" secondary @click="handleClick">
    <template #icon>
      <Icon icon="ant-design:plus-outlined" />
    </template>
    {{ label }}
  </NButton>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { NButton } from 'naive-ui'
import { Icon } from '@iconify/vue'

defineOptions({ name: 'CreateButton' })

const { label } = withDefaults(defineProps<CreateProps>(), {
  label: '新增',
})

const emits = defineEmits(['click'])

interface CreateProps {
  label?: string
}

function handleClick() {
  emits('click')
}
</script>
