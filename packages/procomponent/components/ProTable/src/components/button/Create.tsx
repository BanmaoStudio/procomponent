import { Icon } from '@iconify/vue'
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'

defineOptions({ name: 'CreateButton' })

export default defineComponent({
  name: 'CreateButton',
  props: {
    label: {
      type: String,
      default: '新增',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click')
    }

    return () => (
      <NButton type="info" size="small" secondary onClick={handleClick}>
        {{
          icon: () => <Icon icon="ant-design:plus-outlined" />,
          default: () => props.label,
        }}
      </NButton>
    )
  },
})
