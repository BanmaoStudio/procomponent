<template>
    <n-dropdown @select="handleSelect" trigger="click" :options="options">
        <n-tooltip trigger="hover">
            <template #trigger>
                <n-button size="small" quaternary>
                    <template #icon>
                        <Icon
                            icon="ant-design:column-height-outlined"
                            class="text-18px" />
                    </template>
                </n-button>
            </template>
            密度
        </n-tooltip>
    </n-dropdown>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { NButton, NDropdown, NTooltip } from 'naive-ui'
    import { Icon } from '@iconify/vue'

    defineOptions({ name: 'DensityButton' })

    const defaultOpt = ref('large')

    const options = computed(() => {
        return [
            {
                label: '默认',
                key: 'large',
                props: { class: { active: defaultOpt.value === 'large' } },
            },
            {
                label: '中等',
                key: 'medium',
                props: { class: { active: defaultOpt.value === 'medium' } },
            },
            {
                label: '紧凑',
                key: 'small',
                props: { class: { active: defaultOpt.value === 'small' } },
            },
        ]
    })

    const emits = defineEmits(['update:select'])

    const handleSelect = (key: string) => {
        defaultOpt.value = key
        emits('update:select', key)
    }
</script>

<style lang="scss">
    .n-dropdown-option-body.active {
        color: var(--n-option-text-color-active) !important;
        background-color: rgba(
            var(--n-option-text-color-active),
            0.5
        ) !important;
    }
</style>
