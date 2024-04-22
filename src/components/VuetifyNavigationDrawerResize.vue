<template>
    <VNavigationDrawer
        :class="{ 'v-navigation-drawer--resizeable': props.resizeable }"
        :style="{ transition: isResizing ? 'none !important' : undefined }"
        :width="width"
    >
        <template v-if="$slots.prepend" #prepend>
            <slot name="prepend" />
        </template>

        <template #default>
            <div class="resizer" @mousedown.stop="onResizeStart" />
            <slot name="default" />
        </template>

        <template v-if="$slots.image" #image>
            <slot name="image" />
        </template>

        <template v-if="$slots.append" #append>
            <slot name="append" />
        </template>
    </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { VNavigationDrawer } from 'vuetify/lib/components/index.mjs'
import { useDisplay } from 'vuetify'

const props = defineProps({
    minWidth: {
        type: [Number, String],
        default: 256,
    },
    maxWidth: {
        type: [Number, String],
        default: '70%',
    },
    resizeable: {
        type: Boolean,
        default: true,
    },
    resizeColor: {
        type: String,
        default: 'rgb(var(--v-theme-primary))',
    },
})

const isResizing = ref(false)

const emit = defineEmits<{ (e: 'update:resizing', isResizing: boolean): void }>()

const { width: screenWith } = useDisplay()

const width = defineModel<number | string>('width', {
    default: 256,
    get(v) {
        return v.toString().includes('%') ? getPixel(v) : v
    },
})

const getPixel = (value?: string | number): number => {
    if (!value) {
        return 0
    }

    value = !value.toString().includes('%')
        ? value
        : Math.round((screenWith.value * Number.parseFloat(value.toString())) / 100)

    return Number.parseInt(value.toString())
}

const onResizeStart = (e: MouseEvent) => {
    isResizing.value = true
    const resizer = e.target as HTMLDivElement
    resizer.style.cursor = 'col-resize'
    document.body.style.cursor = 'col-resize'

    const xStartPoint = e.clientX
    const _width = getPixel(width.value)
    emit('update:resizing', true)

    const removeResizeMove = useEventListener(document, 'mousemove', (e: MouseEvent) => {
        const axis = e.clientX - xStartPoint
        width.value = _width + axis
        emit('update:resizing', true)
    })

    const removeResizeEnd = useEventListener(document, 'mouseup', () => {
        resizer.style.removeProperty('cursor')
        document.body.style.removeProperty('cursor')
        removeResizeMove()
        removeResizeEnd()
        emit('update:resizing', false)
        if ((width.value as number) < _width) {
            if ((width.value as number) < getPixel(props.minWidth)) {
                width.value = getPixel(props.minWidth)
            }
        } else {
            if ((width.value as number) > getPixel(props.maxWidth)) {
                width.value = getPixel(props.maxWidth)
            }
        }
        isResizing.value = false
    })
}

onMounted(() => {
    if (props.minWidth && !width.value) {
        width.value = getPixel(props.minWidth)
    }
})
</script>

<style lang="scss" scoped>
.v-navigation-drawer--resizeable {
    .resizer {
        width: 5px;
        height: 100%;
        background-color: transparent;
        position: absolute;
        right: -4px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        z-index: 1;

        &:before {
            content: '|';
            color: #fff;
            font-size: 1.5rem;
        }

        &:hover {
            background-color: v-bind(resizeColor);
            cursor: e-resize;
        }
    }
}
</style>
