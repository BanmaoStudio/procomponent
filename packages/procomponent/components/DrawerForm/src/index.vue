<script setup lang="ts">
import { drawerProps, NButton, NDrawer, NDrawerContent, NLayout, NSpace } from 'naive-ui'
import { ref } from 'vue'
import { ProForm } from '../../ProForm'

defineOptions({
  name: 'DrawerForm',
})

const props = defineProps(
  Object.assign(drawerProps, {
    closable: {
      type: Boolean,
      default: true,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    columns: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    defaultValue: {
      type: Object,
      default: () => ({}),
    },
  }),
)

const emit = defineEmits(['submit', 'reset'])

const columns = computed(() => {
  const cols = props.columns
  return cols.filter(col => col?.type !== 'index' && col?.type !== 'selection' && col?.key !== 'actions')
})

const defaultValue = computed(() => props.defaultValue)

const visible = ref(false)

// interface DrawerFormProps {
//   columns: any[]
//   closable?: boolean
//   title?: string
//   defaultValue?: any
//   hideFooter?: boolean
// }

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}
defineExpose({
  open,
  close,
})

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

<template>
  <div style="display: inline-block;" @click="open">
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
          ref="formRef"
          v-bind="{
            ...$attrs,
            defaultValue,
          }"
          :columns="columns"
          mode="drawer"
          @submit="handleSubmit"
          @reset="handleReset"
        />
      </NLayout>
      <template v-if="!props.hideFooter" #footer>
        <slot v-if="$slots.footer" name="footer" />
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

<style scoped lang="scss"></style>
