import { Icon } from '@iconify/vue'
import { NButton, NTooltip } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RefreshButton',
  props: {
    label: {
      type: String,
      default: '刷新',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click')
    }

    return () => (
      <NTooltip trigger="hover">
        {{
          trigger: () => (
            <NButton size="small" quaternary onClick={handleClick}>
              <Icon
                icon="mdi-refresh"
                class={['mr-4px lt-sm:mr-0 text-16px', { 'animate-spin': props.loading }]}
              />
            </NButton>
          ),
          default: () => props.label,
        }}
      </NTooltip>
    )
  },
})
