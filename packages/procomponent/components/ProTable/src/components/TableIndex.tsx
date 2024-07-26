import { defineComponent } from 'vue'
import { NEl } from 'naive-ui'

export default defineComponent({
  name: 'TableIndex',
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }

    return () => (
        <div style={style}>
            <NEl
                tag="div"
                style="display: flex; justify-content: center;align-items: center;width: 20px; height: 20px;border-radius: 50%; color: var(--text-color-1); background: var(--tag-color); transition: 0.3s var(--cubic-bezier-ease-in-out);"
            >{props.index + 1}</NEl>
        </div>
    )
  },
})
