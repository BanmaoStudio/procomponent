<template>
  <div style="display: inline-block;" @click="handleVisible">
    <slot v-if="$slots.trigger" name="trigger" />
    <NButton v-else size="small" type="primary">
      {{ props.title ? props.title : '打开' }}
    </NButton>
  </div>

  <NDrawer
    v-model:show="visible"
    v-bind="$attrs"
  >
    <NDrawerContent :closable="props.closable" :title="props.title">
      <NLayout>
        <slot v-if="$slots.default" />
        <ProForm
          v-else
          ref="formRef" v-bind="$attrs" :columns="props.columns" mode="drawer"
          @submit="handleSubmit"
          @reset="handleReset"
        />
      </NLayout>
      <template v-if="!props.hideFooter" #footer>
        <slot v-if="$slots.footer" />
        <NSpace v-else justify="end">
          <NButton @click="_reset">
            重置
          </NButton>
          <NButton type="primary" @click="_submit">
            确定
          </NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NDrawer, NDrawerContent, NLayout, NSpace } from 'naive-ui'
import { ProForm } from '../../ProForm'

defineOptions({
  name: 'DrawerForm',
})

const props = withDefaults(defineProps<DrawerFormProps>(), {
  closable: true,
  hideFooter: false,
})

const emit = defineEmits(['submit', 'reset'])

const visible = ref(false)

interface DrawerFormProps {
  columns: any[]
  closable?: boolean
  title?: string
  defaultValue?: any
  hideFooter?: boolean
}

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
