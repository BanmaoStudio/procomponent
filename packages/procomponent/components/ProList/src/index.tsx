import { NFlex, NList, NListItem, NPagination } from 'naive-ui'
import type { VNodeChild } from 'vue'

export default defineComponent({
  name: 'ProList',
  props: {
    pagination: {
      type: Object,
      default: () => ({
        page: 1,
        pageSize: 10,
        total: 0,
      })
    },
    title: String,
    renderItem: {
      type: Function as PropType<(row: any) => VNodeChild>,
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props) {

    return () => {
      return (
        <NFlex vertical>
          <NList>
            {{
              header: '',
              footer: '',
              default: () =>
                props.data.map((item) => {
                  return <NListItem>{props.renderItem && props.renderItem(item)}</NListItem>
                })
            }}
          </NList>
          <div class="flex" style="justify-content: end;">
            <NPagination {...props.pagination } />
          </div>
        </NFlex>
      )
    }
  }
})
