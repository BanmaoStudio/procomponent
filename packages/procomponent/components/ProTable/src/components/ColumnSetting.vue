<template>
  <NPopover placement="bottom" trigger="click">
    <template #trigger>
      <NButton size="small" quaternary>
        <Icon icon="ant-design:setting-outlined" class="mr-4px text-16px" />
        <span v-if="label">
          {{ label }}
        </span>
      </NButton>
    </template>
    <div>
      <VueDraggable v-model="list" item-key="key">
        <template v-for="element in list" :key="element.key">
          <div
            v-if="element.type === 'selection'"
            class="drag-list-item"
          >
            <Icon icon="mdi-drag" class="text-24px cursor-move" />
            <NCheckbox v-model:checked="element.hideInTable">
              多选框
            </NCheckbox>
          </div>
          <div
            v-else-if="element.key"
            class="drag-list-item"
          >
            <Icon icon="mdi-drag" class="text-24px cursor-move" />
            <NCheckbox v-model:checked="element.hideInTable">
              {{ element.title }}
            </NCheckbox>
          </div>
        </template>
      </VueDraggable>
    </div>
  </NPopover>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueDraggableNext as VueDraggable } from 'vue-draggable-next'
import { NButton, NCheckbox, NPopover } from 'naive-ui'
import { Icon } from '@iconify/vue'
import type { ProTableColumn } from 'naive-ui'

defineOptions({
  name: 'ColumnSetting',
})

const { columns } = withDefaults(defineProps<Props>(), {
  label: '表格列设置',
})

const emit = defineEmits<Emits>()

interface Props {
  columns: Column[]
  label?: string | false
}

type Column = ProTableColumn

interface Emits {
  (event: 'update:columns', value: Column[]): void
}

type List = Column & { checked?: boolean }

const list = ref(initList())

function initList(): List[] {
  return columns.map(item => ({ ...item, hideInTable: !item.hideInTable }))
}

watch(list, (newValue: List[]) => {
  const newColumns = newValue.filter(item => item.hideInTable)

  const columns: Column[] = newColumns.map((item) => {
    const column = { ...item }
    delete column.hideInTable
    return column
  }) as Column[]

  emit('update:columns', columns)
}, {
  deep: true,
})
</script>

<style scoped lang="scss">
.drag-list-item {
  display: flex;
  align-items: center;
  padding: 8px 0px;
  box-sizing: border-box;
  gap: 8px;
  cursor: move;
  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
