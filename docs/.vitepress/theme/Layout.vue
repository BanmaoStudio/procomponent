<template>
    <div>Custom layout</div>
    <div v-if="page.isNotFound">
        Custom 404 page
    </div>
    <Content v-else />
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { page } = useData()
</script>