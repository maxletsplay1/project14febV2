<script setup lang="ts">

import AppFooter from "~/components/AppFooter.vue";
</script>

<template>
<div class="main min-h-screen min-w-screen max-w-screen bg-pink-200 flex flex-col overflow-hidden select-none">
  <slot/>
  <AppFooter/>
</div>
</template>
<style scoped>
 .main{
    font-family: 'CustomFont';
 }
</style>
