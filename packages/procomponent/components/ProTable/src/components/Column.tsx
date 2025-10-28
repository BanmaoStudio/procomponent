import { Icon } from '@iconify/vue'
import { NButton, NPopover } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { VueDraggableNext as VueDraggable } from 'vue-draggable-next'

export default defineComponent({
  name: 'ProTableColumnComponent',
  components: {
    Icon,
    NButton,
    NPopover,
    VueDraggable,
  },
  setup() {
    const list = ref([
      { key: 1, name: 'John' },
      { key: 2, name: 'Jane' },
      { key: 3, name: 'Bob' },
    ])
    return () => (
      <NPopover placement="bottom" trigger="click">
        {{
          trigger: () => (
            <NButton size="small" type="warning">
              <Icon icon="hugeicons-setting-01" class="mr-4px text-16px" />
            </NButton>
          ),
          default: () => (
            <div class="w-210px">
              <div>hahah</div>
              <VueDraggable v-model={list} item-key="key">
                {{
                  item: ({ element }) => element.title,
                }}
              </VueDraggable>
            </div>
          ),
        }}
      </NPopover>
    )
  },
})
