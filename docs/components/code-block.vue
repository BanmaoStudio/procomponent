<script setup lang="ts">
import { Code } from '@vicons/carbon'
import { NIcon, NTooltip } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  title: String,
  source: String,
})

const previewCode = computed(() => props.source)

const visible = ref(false)
function handleToggleCode() {
  visible.value = !visible.value
}
</script>

<template>
  <div class="code-card">
    <div class="code-card-header">
      <div class="code-card-title">
        {{ props.title }}
      </div>

      <div class="code-card-actions">
        <NTooltip trigger="hover">
          <template #trigger>
            <NIcon
              class="cursor-pointer hover:text-green"
              :component="Code"
              @click="handleToggleCode"
            />
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
