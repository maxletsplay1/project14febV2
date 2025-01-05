<template>
  <NuxtLayout>
      <NuxtPage class="grow page"/>
  </NuxtLayout>
</template>
<script setup lang="ts">
import anime from 'animejs';

const router = useRouter();
const route = useRoute();

router.beforeEach((to, from, next) => {
  anime({
    targets: '.page',
    opacity: [1, 0],
    duration: 800,
    easing: 'easeOutElastic(1, .6)',
    complete: () => {
      next();
    },
  });
});


watch(
    () => route.fullPath,
    () => {
        anime({
          targets: '.page',
          opacity: [0, 1],
          translateY: [400, 0],
          duration: 1500,
          easing: 'easeOutElastic(1, .6)',
        });
    }
);
onMounted(() => {
  anime({
    targets: '.page',
    opacity: [0, 1],
    translateY: [400, 0],
    duration: 2000,
    easing: 'easeOutElastic(1, .6)',
  });
});
</script>