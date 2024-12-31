<template>
    <button type='button' class="btn" :class="{
        'btn-primary': type === 'primary'
    }">
        颜色
    </button>
</template>

<script lang="ts" setup>
defineProps({
    type: {
        type: String,
        default: 'primary'
    }
})
</script>

<style scoped>
.btn {
    padding: 10px 20px;
    border-radius: 4px;
    color: #fff;
}

.btn-primary {
    background-color: #409eff;
}
.btn-primary:hover {
    background-color: #66b1ff;
}
</style>
