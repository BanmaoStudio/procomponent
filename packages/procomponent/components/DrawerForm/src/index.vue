<template>
  <NButton @click="handleVisible">
    按钮
  </NButton>

  <NDrawer
    v-model:show="visible"
    :width="width"
    v-bind="$attrs"
  >
    <NDrawerContent :closable="props.closable" :title="props.title">
      <NCard>
        <ProForm v-bind="$attrs" :columns="props.columns" />
      </NCard>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NCard, NDrawer, NDrawerContent } from 'naive-ui'
import { ProForm } from '../../ProForm'

defineOptions({
  name: 'DrawerForm',
})

const props = defineProps<DrawerFormProps>()

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
