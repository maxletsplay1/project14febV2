<template>
<div class="footer w-full flex gap-4 justify-center text-xl mb-2">
  <a
      class="underline underline-offset-4 hover:no-underline"
      href="https://github.com/maxletsplay1"
      target="_blank"
  >
    github
  </a>
  <router-link to=""
      class="underline underline-offset-4 hover:no-underline"
  >
    правовая информация
  </router-link>
</div>
</template>

<script setup lang="ts">
const { $anime } = useNuxtApp()

onMounted(() => {
  $anime({
    targets: '.footer',
    duration: 1000,
    translateY: [200, 0],
    opacity: [0, 1],
    easing: 'easeOutElastic(1, .6)'
  })
})
</script>


