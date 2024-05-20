<template>
    <n-button type="info" size="small" secondary @click="handleClick">
        <template #icon>
            <Icon icon="ant-design:plus-outlined" />
        </template>
        {{ label }}
    </n-button>
</template>

<script setup lang="ts">
    import { withDefaults } from 'vue';
    import { NButton } from 'naive-ui'
    import { Icon } from '@iconify/vue'

    defineOptions({ name: 'CreateButton' })

    interface CreateProps {
        label?: string
    }

    const { label } = withDefaults(defineProps<CreateProps>(), {
        label: '新增'
    })
    const emits = defineEmits(['click'])

    const handleClick = () => {
        emits('click')
    }
</script>
