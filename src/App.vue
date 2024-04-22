<template>
    <VApp>
        <VNavigationDrawerResize :modelValue="true" permanent>
            <VToolbar title="Navigation drawer resize" color="primary" />
            <VList :items="items" />
        </VNavigationDrawerResize>
    </VApp>
</template>

<script setup lang="ts">
import VNavigationDrawerResize from './components/VuetifyNavigationDrawerResize.vue'

const items = [
    {
        title: 'Item #1',
        value: 1,
    },
    {
        title: 'Item #2',
        value: 2,
    },
    {
        title: 'Item #3',
        value: 3,
    },
]
</script>

<style scoped></style>
