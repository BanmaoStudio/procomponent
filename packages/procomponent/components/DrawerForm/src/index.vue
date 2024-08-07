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
          :columns="props.columns" mode="drawer"
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
import { NButton, NDrawer, NDrawerContent, NLayout, NSpace, drawerProps } from 'naive-ui'
import { ProForm } from '../../ProForm'

defineOptions({
  name: 'DrawerForm',
})

// const props = withDefaults(defineProps<DrawerFormProps>(), {
//   closable: true,
//   hideFooter: false,
// })
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
      type: Array,
      default: () => [],
    },
    defaultValue: {
      type: Object,
      default: () => ({}),
    },
  })
)

const emit = defineEmits(['submit', 'reset'])

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

<style scoped lang="scss"></style>
