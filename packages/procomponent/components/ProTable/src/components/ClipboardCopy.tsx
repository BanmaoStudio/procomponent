import { NButton, NText } from 'naive-ui'
import { useClipboard } from '@vueuse/core'
import { Icon } from '@iconify/vue'

function clipboardIcon(isCopied: boolean) {
  const icons = {
    success: <Icon icon="ant-design:check-outlined" class="text-green-500" />,
    copy: <Icon icon="ant-design:copy-outlined" class="text-blue-500" />
  }
  return icons[isCopied ? 'success' : 'copy']
}

export default defineComponent({
  name: 'ClipBoardText',
  props: {
    text: {
      type: String,
      default: ''
    },
    ellipsis: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isCopied = ref(false)
    const { text, ellipsis } = toRefs(props)

    const {
      text: _clipBoardText,
      isSupported,
      copy
    } = useClipboard({ legacy: true })

    const handleCopy = () => {
      if (!text.toString()) {
        return
      }
      copy(text.toString())

      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 3000)
    }

    return () => {
      if (!isSupported.value) {
        return <span>{text.value}</span>
      }

      return (
        <NText v-if="isSupported" class="flex-y-center">
          <span style="white-space: nowrap" class={{ ellipsis: ellipsis.value }}>
            {text}
          </span>
          <NButton text onClick={() => handleCopy()}>
            { clipboardIcon(isCopied.value) }
          </NButton>
        </NText>
      )
    }
  }
})
