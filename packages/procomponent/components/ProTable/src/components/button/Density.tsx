import { Icon } from '@iconify/vue'
import { NButton, NDropdown, NTooltip } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import './density.scss'

export default defineComponent({
  name: 'DensityButton',
  emits: ['update:select'],
  setup(props, { emit }) {
    const defaultOpt = ref('large')

    const options = computed(() => {
      return [
        {
          label: '默认',
          key: 'large',
          props: { class: { active: defaultOpt.value === 'large' } },
        },
        {
          label: '中等',
          key: 'medium',
          props: { class: { active: defaultOpt.value === 'medium' } },
        },
        {
          label: '紧凑',
          key: 'small',
          props: { class: { active: defaultOpt.value === 'small' } },
        },
      ]
    })

    function handleSelect(key: string) {
      defaultOpt.value = key
      emit('update:select', key)
    }

    return () => (
      <NDropdown trigger="click" options={options.value} onSelect={handleSelect}>
        <NTooltip trigger="hover">
          {{
            trigger: () => (
              <NButton size="small" quaternary>

                {{
                  icon: () => (
                    <Icon
                      icon="ant-design:column-height-outlined"
                      class="text-18px"
                    />
                  ),
                }}
              </NButton>
            ),
          }}
          密度
        </NTooltip>
      </NDropdown>
    )
  },
})
