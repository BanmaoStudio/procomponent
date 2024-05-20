<template>
    <n-tooltip trigger="hover">
        <template #trigger>
            <n-button size="small" quaternary @click="handleClick">
                <Icon
                    icon="mdi-refresh"
                    class="mr-4px lt-sm:mr-0 text-16px"
                    :class="{ 'animate-spin': loading }" />
            </n-button>
        </template>
        刷新
    </n-tooltip>
</template>

<script setup lang="ts">
    import { NTooltip, NButton } from 'naive-ui'
    import { Icon } from '@iconify/vue'

    defineOptions({ name: 'RefreshButton' })

    interface RefreshButtonEmits {
        (e: 'click'): void
    }

    const { loading } = defineProps<{
        loading?: boolean
    }>()

    const emit = defineEmits<RefreshButtonEmits>()

    const handleClick = () => {
        emit('click')
    }
</script>
