import { NButton, NModal, NSpace } from 'naive-ui'
import { computed, Fragment, ref } from 'vue'
import { ProForm } from '../../ProForm'

export default defineComponent({
  name: 'ModalForm',
  props: {
    title: {
      type: String,
      default: '标题',
    },
    width: {
      type: Number,
      default: 500,
    },
    columns: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    closable: {
      type: Boolean,
      default: true,
    },
    model: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['submit', 'reset'],
  expose: ['close', 'open'],
  setup(props, { emit, slots, attrs }) {
    const visible = ref(false)

    const columns = computed(() => {
      const cols = props.columns
      return cols.filter(col => (col?.type !== 'index' && col?.type !== 'selection') && col?.key !== 'actions')
    })

    const width = computed(() => {
      return props.width ? props.width : '640px'
    })

    function handleVisible() {
      visible.value = true
    }

    function close() {
      visible.value = false
    }

    const formRef = ref()

    function handleSubmit(values: any) {
      emit('submit', values)
    }

    function handleReset() {
      emit('reset')
    }

    function _submit() {
      formRef.value?.submit()
    }

    function _reset() {
      formRef.value?.reset()
    }

    const children = slots.default?.()
    return () => (
      <Fragment>
        <div style="display: inline-block" onClick={handleVisible}>
          { children || (
            <NButton size="small" type="primary" onClick={handleVisible}>
              { props.title ? props.title : '打开' }
            </NButton>
          )}
        </div>

        <NModal
          v-model:show={visible}
          preset="card"
          title={props.title}
          style={{ width }}
        >
          {{
            default: () => (
              <ProForm
                ref={formRef}
                columns={columns.value}
                mode="modal"
                model={props.model}
                v-bind={attrs}
                onSubmit={handleSubmit}
                onReset={handleReset}
              />
            ),
            footer: () => (
              <NSpace justify="end" wrap={false}>
                <NButton onClick={close}>取消</NButton>
                <NButton type="primary" onClick={_submit}>确定</NButton>
                <NButton onClick={_reset}>重置</NButton>
              </NSpace>
            ),
          }}
        </NModal>
      </Fragment>
    )
  },
})
