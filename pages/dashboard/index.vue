<script setup lang=ts>

definePageMeta({
    layout: 'dashboard',
    middleware:'auth'
});
const user = useCookie('user').value;
</script>

<template>
    {{user}}
</template>