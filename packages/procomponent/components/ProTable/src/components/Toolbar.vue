<template>
    <NSpace>
        <slot name="toolbar" />

        <NButton v-if="config?.export || config?.exportButton" type="info" ghost size="small" @click="handleExportData">
            {{ config.exportLabel || config.exportButtonText || '导出Excel' }}
            <template #icon>
                <Icon icon="ant-design:download-outlined" class="mr-4px text-16px" />
            </template>
        </NButton>
        <template v-if="config?.create || config?.createButton">
            <ModalForm v-if="config.createMode === 'modal' || config.createButtonMode === 'modal'"
                :title="(config.createLabel || config.createButtonText || '新增') + title" :columns="formColumns">
                <NButton type="primary" ghost size="small" @click="handleCreate">
                    {{ config.createLabel || config.createButtonText || '新增' }}
                    <template #icon>
                        <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />
                    </template>
                </NButton>
            </ModalForm>
            <DrawerForm v-else-if="config.createMode === 'drawer' || config.createButtonMode === 'drawer'"
                :title="(config.createLabel || config.createButtonText || '新增') + title" :columns="formColumns">
                <NButton type="primary" ghost size="small" @click="handleCreate">
                    {{ config.createLabel || config.createButtonText || '新增' }}
                    <template #icon>
                        <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />
                    </template>
                </NButton>
            </DrawerForm>
            <NButton v-else type="primary" ghost size="small" @click="handleCreate">
                {{ config.createLabel || config.createButtonText || '新增' }}
                <template #icon>
                    <Icon icon="ant-design:plus-outlined" class="mr-4px text-16px" />
                </template>
            </NButton>
        </template>

        <NButtonGroup>
            <RefreshButton v-if="config?.reload !== false || config?.reloadButton !== false"
                :label="config?.reloadLabel || config?.reloadButtonText" :loading="loading" @click="handleRefresh" />
            <DensityButton v-if="config?.density !== false || config?.densityButton !== false"
                @update:select="handleSelectForTableSize" />
            <ColumnSetting v-if="config?.columnSetting !== false" v-model:columns="settingColumns"
                :label="config?.columnSettingLabel || false" />
        </NButtonGroup>
    </NSpace>
</template>

<script lang="ts" setup>
import {
    NButton,
    NButtonGroup,
    NSpace
} from 'naive-ui'
import type { ToolbarConfig } from 'naive-ui';
import { Icon } from '@iconify/vue'
import { DrawerForm, ModalForm } from '../../../../index'
import ColumnSetting from './ColumnSetting.vue'
import { DensityButton, RefreshButton } from './index'

defineOptions({
    name: 'ToolbarComponent'
})

type TableSize = 'small' | 'medium' | 'large'

interface ToolbarProps {
    config: ToolbarConfig
    title?: string
    loading: boolean
    formColumns: any[]
    size: TableSize
}
defineProps<ToolbarProps>()

interface ToolbarEmits {
    (e: 'refresh'): void
    (e: 'create'): void
    (e: 'export'): void
    (e: 'update:size', key: TableSize): void
}

const emit = defineEmits<ToolbarEmits>()

const settingColumns = inject<any>('settingColumns')

const handleRefresh = () => {
    emit('refresh')
}

const onCreate = inject<() => void>('toolbar-create')

const handleCreate = () => {
    onCreate && onCreate()
}

const handleExportData = () => {
    emit('export')
}

const handleSelectForTableSize = (key: TableSize) => {
    emit('update:size', key)
}

</script>
