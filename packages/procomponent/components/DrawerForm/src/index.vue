<template>
  <div @click="handleVisible">
    <slot v-if="$slots.default" />
    <NButton v-else size="small" type="primary">
      {{ props.title ? props.title : '打开' }}
    </NButton>
  </div>

  <NDrawer
    v-model:show="visible"
    :width="width"
    v-bind="$attrs"
  >
    <NDrawerContent :closable="props.closable" :title="props.title">
      <NLayout>
        <ProForm v-bind="$attrs" :columns="props.columns" />
      </NLayout>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NDrawer, NDrawerContent, NLayout } from 'naive-ui'
import { ProForm } from '../../ProForm'

defineOptions({
  name: 'DrawerForm',
})

const props = withDefaults(defineProps<DrawerFormProps>(), {
  width: '640px',
  closable: true,
})

// const emit = defineEmits({})

const visible = ref(false)

interface DrawerFormProps {
  columns: any[]
  width?: string | number
  closable?: boolean
  title?: string
}

const width = computed(() => {
  return props.width ? props.width : '640px'
})

function handleVisible() {
  visible.value = true
}
</script>

<style scoped lang="scss"></style>
