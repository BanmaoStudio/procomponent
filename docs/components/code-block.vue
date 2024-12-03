<template>
    <div class="code-card">
        <div class="code-card-header">
            <div class="code-card-title">{{ props.title }}</div>

            <div class="code-card-actions">
                <NTooltip trigger="hover">
                    <template #trigger>
                        <n-icon class="cursor-pointer hover:text-green"
                            @click="handleToggleCode"
                        :component="Code" />
                    </template>
                    <span>显示代码</span>
                </NTooltip>
            </div>
        </div>
        <slot />

        <div v-if="visible" class="code-source-panel">
            {{ previewCode }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NIcon, NTooltip } from 'naive-ui'
import { Code } from '@vicons/carbon'

const props = defineProps({
    title: String,
    source: String
})


const previewCode = computed(() => props.source)

const visible = ref(false)
const handleToggleCode = () => {
    visible.value = !visible.value
}
</script>

<style lang="scss" scoped>
.code-card {
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 16px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
    }
}
</style>