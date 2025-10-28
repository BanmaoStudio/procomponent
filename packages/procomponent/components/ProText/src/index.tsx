// import type { ProTextProps } from './types'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import { NText, NTooltip } from 'naive-ui'
import { Fragment } from 'vue'
import TextClamp from 'vue3-text-clamp'

import './index.scss'

export default defineComponent({
  name: 'ProText',
  components: {
    Icon,
    NText,
    NTooltip,
    TextClamp,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    copyable: {
      type: Boolean,
      default: false,
    },
    ellipsis: {
      type: Boolean,
      default: true,
    },
    lineClamp: {
      type: [Number, String],
      default: 1,
    },
  },
  setup(props, { attrs }) {
    const defaultColor = ref('#3b82f6')
    const copiedColor = ref('#22c55e')

    const ellipsis = computed(() => props.ellipsis !== false)
    const copyable = computed(() => props.copyable)
    const maxLines = computed(() => props.lineClamp)

    const bmIconStyle = computed(() => ({
      display: 'inline-block',
      verticalAlign: 'middle',
      cursor: 'pointer',
    }))

    const { text: _clipboardText, copy, copied } = useClipboard({ legacy: true })

    const isCopied = ref(false)

    function handleCopy() {
      if (!props.text.toString()) {
        return
      }
      copy(props.text.toString())

      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2500)
    }

    if (ellipsis) {
      return (
        <NTooltip trigger="hover">
          {{
            trigger: () => (
              <TextClamp max-lines={maxLines} text={props.text}>
                {{
                  after: () => (
                    <div
                      onClick={handleCopy}
                    >
                      <Icon
                        style={{
                          ...bmIconStyle,
                          color: copied ? copiedColor : defaultColor,
                        }}
                        icon={`ant-design:${isCopied ? 'check' : 'copy'}-outlined`}
                      />
                    </div>
                  ),
                }}
              </TextClamp>
            ),
            default: () => (
              <div style="max-width: 300px">
                <span>{ props.text }</span>
              </div>
            ),
          }}

        </NTooltip>
      )
    }
    else {
      return (
        <Fragment>
          <NText v-bind={attrs}>
            { props.text }
          </NText>
          { copyable && (
            <div
              onClick={handleCopy}
            >
              <Icon
                style={{
                  ...bmIconStyle,
                  color: copied ? copiedColor : defaultColor,
                }}
                icon={`ant-design:${isCopied ? 'check' : 'copy'}-outlined`}
              />
            </div>
          )}
        </Fragment>
      )
    }
  },
})
