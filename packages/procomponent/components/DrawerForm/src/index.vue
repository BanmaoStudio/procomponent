<template>
  <div style="display: inline-block;" @click="handleVisible">
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
        <ProForm
          ref="formRef" v-bind="$attrs" :columns="props.columns" mode="drawer"
          @submit="handleSubmit"
          @reset="handleReset"
        />
      </NLayout>
      <template #footer>
        <NSpace justify="end">
          <NButton type="primary" @click="_submit">
            确定
          </NButton>
          <NButton @click="_reset">
            重置
          </NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NDrawer, NDrawerContent, NLayout, NSpace } from 'naive-ui'
import { ProForm } from '../../ProForm'

defineOptions({
  name: 'DrawerForm',
})

const props = withDefaults(defineProps<DrawerFormProps>(), {
  width: '640px',
  closable: true,
})

const emit = defineEmits(['submit', 'reset'])

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

const formRef = ref()

function handleSubmit(value) {
  emit('submit', value)
}

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
