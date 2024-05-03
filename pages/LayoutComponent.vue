<template>
<div>
<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
<div class="container">
<router-link class="navbar-brand" to="/">Межгалактическая гостиница</router-link>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav me-auto">
<li class="nav-item">
<router-link class="nav-link" to="/contact">Контакты</router-link>
</li>
<li class="nav-item">
<router-link class="nav-link" to="/about">О Нас</router-link>
</li>
<li class="nav-item">
<router-link class="nav-link" to="/massiv">Массив студентов</router-link>
</li>
<li class="nav-item">
<router-link class="nav-link" to="/bdtable">Посетители БД</router-link>
</li>
</ul>
</div>
</div>
</nav>
</div>
</template>

<script>
export default {
name: 'LayoutComponent'
}
</script>

<style scoped>
/* Ваши стили */
</style>