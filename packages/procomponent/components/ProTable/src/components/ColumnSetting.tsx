import type { ProTableColumn } from 'naive-ui'
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'
import { NButton, NCheckbox, NPopover } from 'naive-ui'
import { Fragment, ref, watch } from 'vue'
import { VueDraggableNext as VueDraggable } from 'vue-draggable-next'
import './ColumnSetting.scss'

type Column = ProTableColumn
type List = Column & { checked?: boolean }

interface ElementItem {
  key: string
  title: string
  type: string
  hideInTable?: boolean
}

const VueDraggableItem = defineComponent({
  name: 'VueDraggableItem',
  components: {
    Icon,
  },
  props: {
    element: {
      type: Object as PropType<ElementItem>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { element } = toRefs(props)
    return () => (
      <Fragment key={element.value.key}>
        {
          element.value.type === 'selection'
            ? (
                <div
                  class="drag-list-item"
                >
                  <Icon icon="mdi-drag" class="text-24px cursor-move" />
                  <NCheckbox v-model:checked={element.value.hideInTable}>
                    多选框
                  </NCheckbox>
                </div>
              )
            : (
                <div
                  class="drag-list-item"
                >
                  <Icon icon="mdi-drag" class="text-24px cursor-move" />
                  <NCheckbox v-model:checked={element.value.hideInTable}>
                    { element.value.title }
                  </NCheckbox>
                </div>
              )
        }

      </Fragment>
    )
  },
})

export default defineComponent({
  name: 'ColumnSetting',
  props: {
    columns: {
      type: Array as PropType<Column[]>,
      default: () => [],
    },
    label: {
      type: [String, Boolean],
      default: '表格列设置',
    },
  },
  emits: ['update:columns'],
  setup(props, { emit }) {
    const list = ref(initList())

    function initList(): List[] {
      return props.columns.map(item => ({
        ...item,
        hideInTable: !item.hideInTable,
      }))
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

    return () => (
      <NPopover placement="bottom" trigger="click">
        {{
          trigger: () => (
            <NButton size="small" quaternary>
              <Icon icon="ant-design:setting-outlined" class="mr-4px text-16px" />
              <span v-if="label">
                { props.label }
              </span>
            </NButton>
          ),
          default: () => (
            <div>
              <VueDraggable v-model={list} item-key="key">
                {
                  list.value.map((element: List) => (
                    <VueDraggableItem key={element.value.key} element={element} />
                    // <Fragment key={element.key}>
                    //   <div
                    //     v-if="element.type === 'selection'"
                    //     class="drag-list-item"
                    //   >
                    //     <Icon icon="mdi-drag" class="text-24px cursor-move" />
                    //     <NCheckbox v-model:checked="element.hideInTable">
                    //       多选框
                    //     </NCheckbox>
                    //   </div>
                    //   <div
                    //     v-else-if="element.key"
                    //     class="drag-list-item"
                    //   >
                    //     <Icon icon="mdi-drag" class="text-24px cursor-move" />
                    //     <NCheckbox v-model:checked="element.hideInTable">
                    //       { element.title }
                    //     </NCheckbox>
                    //   </div>
                    // </Fragment>
                  ))
                }
              </VueDraggable>
            </div>
          ),
        }}
      </NPopover>
    )
  },
})
