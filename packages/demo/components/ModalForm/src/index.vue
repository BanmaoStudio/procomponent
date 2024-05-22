<template>
  <NButton @click="handleVisible">
    按钮
  </NButton>

  <NModal
    v-model:show="visible"
    preset="card"
    title="ModalForm"
    :style="{ width }"
  >
    <ProForm :columns="props.columns" v-bind="$attrs" />
  </NModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NModal } from 'naive-ui'
import { ProForm } from '../../ProForm'

defineOptions({
  name: 'ModalForm',
})

const props = defineProps<ModalFormProps>()

// const emit = defineEmits({})

const visible = ref(false)

interface ModalFormProps {
  columns: any[]
  width?: string | number
}

const width = computed(() => {
  return props.width ? props.width : '640px'
})

function handleVisible() {
  visible.value = true
}
</script>

<style scoped lang="scss"></style>
