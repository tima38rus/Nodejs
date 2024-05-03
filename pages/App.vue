<template>
<div id="app">
<LayoutComponent />
<router-view/>
</div>
</template>

<script>
import LayoutComponent from './LayoutComponent.vue';
export default {
name: 'App',
components: {
LayoutComponent
}
}
</script>

<style scoped>
/* Ваши стили */
</style>