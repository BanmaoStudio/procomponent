<template>
    <n-form inline label-placement="left">
        <n-form-item label="柱状图宽度">
            <n-input-number v-model:value="barWitdth" :min="5" :max="50" :step="5" />
        </n-form-item>
        <n-form-item label="是否垂直">
            <n-switch v-model:value="vertical" />
        </n-form-item>
    </n-form>
    <div class="h-300px">
        <BaseChart title="排序" :data="data" legend-text="销量" :bar-width="barWitdth" :vertical="vertical" />
    </div>
</template>
<script setup lang="ts">
import { BaseChart } from '@banmao/datav'
import { NForm, NFormItem, NInputNumber, NSwitch } from 'naive-ui';
import { sortBy } from 'lodash'

const barWitdth = ref(30)
const vertical = ref(true)

const data = ref<any[]>([
    // {
    //     name: '衬衫',
    //     value: 100
    // },
    // {
    //     name: '羊毛衫',
    //     value: 150
    // },
    // {
    //     name: '雪纺衫',
    //     value: 200
    // },
    // {
    //     name: '裤子',
    //     value: 250
    // },
    // {
    //     name: '高跟鞋',
    //     value: 300
    // },
])

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    name: '衬衫',
                    value: 100
                },
                {
                    name: '羊毛衫',
                    value: 150
                },
                {
                    name: '雪纺衫',
                    value: 200
                },
                {
                    name: '裤子',
                    value: 120
                }
            ])
        }, 1000)
    })
}

onMounted(() => {
    fetchData().then((res) => {
        console.log({ res })
        data.value = sortBy(res as any[], 'value')
    })
})

</script>