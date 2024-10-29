<template>
  <div>
    <div style="display: inline-block" @click="handleVisible">
      <slot v-if="$slots.default" />
      <NButton v-else size="small" type="primary" @click="handleVisible">
        {{ props.title ? props.title : '打开' }}
      </NButton>
    </div>

    <NModal
      v-model:show="visible"
      preset="card"
      :title="props.title"
      :style="{ width }"
    >
      <ProForm
        ref="formRef"
        :columns="columns"
        mode="modal"
        @submit="handleSubmit"
        @reset="handleReset"
        v-bind="$attrs"
      />

      <template #footer>
        <NSpace justify="end" :wrap="false">
          <NButton @click="close">
            取消
          </NButton>
          <NButton type="primary" @click="_submit">
            确定
          </NButton>
          <NButton @click="_reset">
            重置
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NModal, NSpace } from 'naive-ui'
import { ProForm } from '../../ProForm'

defineOptions({
  name: 'ModalForm',
})

const props = defineProps<ModalFormProps>()

const emit = defineEmits(['submit', 'reset'])

const visible = ref(false)

interface ModalFormProps {
  title?: string
  columns: any[]
  width?: string | number
  closable?: string
}

const columns = computed(() => props.columns.filter(column => (column.key !== 'action' || column.key!== 'actions' || column.type === 'selection' || column.type ==='index')))

const width = computed(() => {
  return props.width ? props.width : '640px'
})

function handleVisible() {
  visible.value = true
}

function close() {
  visible.value = false
}

const formRef = ref()

function handleSubmit(values: any) {
  emit('submit', values)
}

defineExpose({
  close,
  open: () => handleVisible(),
})

function handleReset() {
  emit('reset')
}

function _submit() {
  formRef.value.submit()
}

function _reset() {
  formRef.value.reset()
}
</script>

<style scoped lang="scss"></style>
