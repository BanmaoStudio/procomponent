import type { CascaderOption } from 'naive-ui'
import type { PropType } from 'vue'
import { cascaderProps, NCascader } from 'naive-ui'
import { defineComponent, ref, watchEffect } from 'vue'
import initTreeData from '../utils/buildTree'

defineComponent({
  name: 'RemoteCascader',
  props: {
    ...cascaderProps,
    // ...
    value: {
      type: Array as PropType<string[] | null>,
      default: null,
    },
    defaultValue: {
      type: Array as PropType<string[] | null>,
    },
    options: {
      type: Array as PropType<CascaderOption[]>,
      default: () => [],
    },
    onInit: {
      type: Function as PropType<(value?: string | number) => Promise<CascaderOption[]>>,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    // ...
    const realValue = ref<string | [string, string] | null>(null)

    const { value, defaultValue, options, onInit, ...restProps } = props

    const initRemoteOptions = ref<CascaderOption[] | null>(null)

    // TODO 1. 当 defaultValue 有值，通过 onInit 方法 去 获取默认options的更新
    async function getInitOptions() {
      if (!defaultValue?.length) {
        return
      }
      if (!onInit) {
        return
      }

      initRemoteOptions.value = await initTreeData(defaultValue, onInit)
    }

    const optionsData = computed(() => {
      if (initRemoteOptions.value) {
        return initRemoteOptions.value
      }
      return options
    })

    onMounted(() => {
      getInitOptions()
    })

    watchEffect(() => {
      realValue.value = value && value[value?.length - 1]
    })

    const handleUpdate = (_v: string[], _o: any, paths: string[]) => {
      emit('update:value', paths)
    }

    return () => (
      <NCascader
        v-model:value={realValue}
        options={optionsData.value}
        {...restProps}
        onLoad={props.onLoad}
        onUpdate:value={handleUpdate}
      />
    )
  },
})
