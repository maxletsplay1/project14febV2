<template>
  <div class="h-full w-full flex flex-col justify-center items-center text-[#f17575]">
    <div v-if="data" v-show="page === 1" class="flex flex-col items-center" id="page-1">
      <p class="text-2xl">Приветик, {{ data.name }}!!!</p>
<!--      <p class="text-2xl text-center">Тут хотят, чтобы ты ответил(а) на пару вопросов)</p>-->
    </div>
    <div v-show="page === 2" id="page-2">
      <p class="text-2xl">Ебать тя в очко</p>
    </div>
    <div v-show="page === 3" id="page-3">
      <p class="text-2xl">Дура блять</p>
    </div>
    <div class="flex gap-2 absolute bottom-1">
      <CustomButton
          text="Назад"
          @click="clickBackButton"
          v-if="page > 1"
      />
      <CustomButton
          text="Вперед"
          @click="clickNextButton"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useApiFetch } from '~/composables/useApiFetch'
import type {UnwrapRef} from "vue";
import anime from "animejs";
const id: string | string[] = useRoute().params.id;
const page: Ref<UnwrapRef<number>, UnwrapRef<number> | number> = ref(1);

interface SurveyData {
  name: string;
}

const { data, error } = await useApiFetch<SurveyData>(`/survey/${id}`)

if (error.value) {
  console.error('Error fetching data:', error.value);
}

const clickNextButton =()=>{
  anime({
    targets: `#page-${page.value}`,
    opacity: [1, 0],
    translateY: [0,400],
    duration: 1500,
    easing: 'easeOutElastic(1, .6)',
  });
  setTimeout(()=> {
    page.value++;
    anime({
      targets: `#page-${page.value}`,
      opacity: [0, 1],
      translateY: [400, 0],
      duration: 1500,
      easing: 'easeOutElastic(1, .6)',
    });
    },500)
}
const clickBackButton =()=>{
  anime({
    targets: `#page-${page.value}`,
    opacity: [1, 0],
    translateY: [0,400],
    duration: 1500,
    easing: 'easeOutElastic(1, .6)',
  });
  setTimeout(()=> {
    page.value--;
    anime({
      targets: `#page-${page.value}`,
      opacity: [0, 1],
      translateY: [400, 0],
      duration: 1500,
      easing: 'easeOutElastic(1, .6)',
    });
    },500)
}
</script>
