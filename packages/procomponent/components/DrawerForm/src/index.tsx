import { drawerProps, NButton, NDrawer, NDrawerContent, NLayout, NSpace } from 'naive-ui'
import { Fragment, ref } from 'vue'
import { ProForm } from '../../ProForm'

export default defineComponent({
  name: 'DrawerForm',
  props: Object.assign(drawerProps, {
    closable: {
      type: Boolean,
      default: true,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    columns: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    defaultValue: {
      type: Object,
      default: () => ({}),
    },
  }),
  emits: ['submit', 'reset'],
  setup(props, { emit, slots, attrs, expose }) {
    const columns = computed(() => {
      const cols = props.columns
      return cols.filter(col => col?.type !== 'index' && col?.type !== 'selection' && col?.key !== 'actions')
    })

    const defaultValue = computed(() => props.defaultValue)

    const visible = ref(false)

    function open() {
      visible.value = true
    }

    function close() {
      visible.value = false
    }

    expose({
      open,
      close,
    })

    const formRef = ref()

    function handleSubmit(values: any) {
      emit('submit', values)
    }

    function handleReset() {
      emit('reset')
    }

    function _submit() {
      formRef.value.submit()
    }

    function _reset() {
      formRef.value.reset()
    }

    return () => (
      <Fragment>
        <div style="display: inline-block" onClick={open}>
          { slots.trigger
            ? slots.trigger()
            : (
                <NButton v-else size="small" type="primary">
                  { props.title ? props.title : '打开' }
                </NButton>
              ) }
        </div>
        <NDrawer v-model:show={visible} v-bind={attrs}>
          <NDrawerContent closable={props.closable} title={props.title}>
            <NLayout>
              {
                slots.default
                  ? slots.default?.()
                  : (
                      <ProForm
                        ref={formRef}
                        v-bind={{ ...attrs, defaultValue }}
                        columns={columns.value}
                        mode="drawer"
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                      />
                    )
              }
            </NLayout>
            {
              !props.hideFooter && (
                <Fragment>
                  { slots.footer
                    ? slots.footer()
                    : (
                        <NSpace justify="end">
                          <NButton onClick={_reset}>重置</NButton>
                          <NButton type="primary" onClick={_submit}>确定</NButton>
                        </NSpace>
                      )}
                </Fragment>
              )
            }
          </NDrawerContent>
        </NDrawer>
      </Fragment>
    )
  },
})
