import { descriptionsProps, NDescriptions, NDescriptionsItem } from 'naive-ui'

export default defineComponent({
  name: 'ProDescriptions',
  props: {
    ...descriptionsProps,
    title: {
      type: String,
      default: 'Description List',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array as PropType<{ [key: string]: any }[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { title, data, columns, ...descriptionsProps } = props

    return () => (
      <NDescriptions title={title} {...descriptionsProps}>
        {columns.map((item) => {
          if (item && item.render) {
            return (
              <NDescriptionsItem
                key={item.key}
                label={item.title}
                span={item.span}
              >
                {item.render(data[item.key])}
              </NDescriptionsItem>
            )
          }
          else {
            return (
              <NDescriptionsItem
                key={item.key}
                label={item.title}
                span={item.span}
              >
                {data[item.key]}
              </NDescriptionsItem>
            )
          }
        })}
      </NDescriptions>
    )
  },
})
