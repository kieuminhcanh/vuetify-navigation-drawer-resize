# Use

```vue
<template>
  <VNavigationDrawerResize :modelValue="true" permanent>
    <!-- Navigation Content -->
  </VNavigationDrawerResize>
</template>

<script setup>
import { VNavigationDrawerResize } from 'vuetify-navigation-drawer-resize'
</script>
```

## Model Extend

- v-model:width

## Props extend

- minWidth: string | number - default (256)
- maxWidth: string | number - default (70%)
- resizeable: boolean - default (true)
- resizeColor: string - default (primary)

## Event extend

- @update:resizing: boolean

## Support all props from source

[Navigation Drawer API](https://vuetifyjs.com/en/components/navigation-drawers/)
