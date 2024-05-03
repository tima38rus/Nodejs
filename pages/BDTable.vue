<template>
    <div id="employers">
    <table>
    <tr>
    <th>id</th>
    <th>Фамилия</th>
    <th>Имя</th>
    <!— Другие столбцы —>
    </tr>
    <tr v-for="(item, index) in info" :key="index">
    <td>{{ item.id }}</td>
    <td>{{ item.Фамилия }}</td>
    <td>{{ item.Имя }}</td>
    <!— Другие ячейки —>
    </tr>
    </table>
    </div>
    </template>
    
    <script>
    import db from './db'; // Импортируйте файл db.js
    
    export default {
    el: '#employers',
    data() {
    return {
    info: db.getData(), // Используйте данные из db.js
    };
    },
    };
    </script>
    
    <style scoped>
    /* Ваш стиль */
    </style>