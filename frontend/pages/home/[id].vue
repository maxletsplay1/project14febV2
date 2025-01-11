<template>
  <div class="h-full w-full flex flex-col justify-center items-center text-[#f17575] px-6">
    <div
        v-if="data"
        v-show="page === 1"
        class="flex flex-col items-center"
        id="page-1"
    >
      <p class="text-2xl">Приветик, {{ data.name }}!!!</p>
      <p class="text-2xl text-center mb-2">Cтанешь ли ты валентинкой человека, который это скинул?</p>
      <div class="flex gap-2">
        <CustomButton
            text="Нет"
            id="no"
            class="z-50"
            v-if="counter < 7"
            @click="clickNoButton"
        />
        <CustomButton
            text="Да"
            @click="clickNextButton"
        />
      </div>
    </div>
    <div
        v-show="page === 2"
        id="page-2"
    >
      <p class="text-2xl mb-2">Что мы будем кушать?</p>
      <div class="grid grid-cols-2 gap-2">
        <div
            v-for="dish in food"
            :key="dish.id"
        >
          <RadioButton
              v-model="selectedDish"
              :inputId="'dish-'+dish.id.toString()"
              name="dynamic"
              :value="dish.id"
              v-show="false"
          />
          <label :for="'dish-'+dish.id.toString()">
            <img
                :src="dish.url"
                alt=""
                :class="['h-36 w-36 object-cover', { 'border-4 border-[#f17575]': selectedDish === dish.id }]"
            />
          </label>
        </div>
      </div>
    </div>
    <div
        v-show="page === 3"
        id="page-3"
    >
      <p class="text-2xl mb-2">Чем будем заниматься?</p>
      <div class="grid grid-cols-2 gap-2">
        <div
            v-for="activity in activities"
            :key="activity.id"
        >
          <RadioButton
              v-model="selectedActivity"
              :inputId="'activity-'+activity.id.toString()"
              name="dynamic"
              :value="activity.id"
              v-show="false"
          />
          <label :for="'activity-'+activity.id.toString()">
            <img
                :src="activity.url"
                alt=""
                :class="['h-36 w-36 object-cover', { 'border-4 border-[#f17575]': selectedActivity === activity.id }]"
            />
          </label>
        </div>
      </div>
    </div>
    <div
        class="flex gap-2 absolute bottom-1"
        v-if="page !==1"
    >
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
    <img
        src="../../assets/animations/explosion.gif"
        alt="explosion.gif"
        class="absolute w-20 z-100 hidden"
        id="explosion"
    >
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useApiFetch } from '~/composables/useApiFetch'
import type {UnwrapRef} from "vue";
import anime from "animejs";
import {randomizePosition} from "~/composables/randomizePosition";
import explosionAudio from '@/assets/sounds/explosion.mp3';

const id: string | string[] = useRoute().params.id;
const audio = new Audio(explosionAudio);
const page: Ref<UnwrapRef<number>, UnwrapRef<number> | number> = ref(1);
const counter: Ref<UnwrapRef<number>, UnwrapRef<number> | number> = ref(1);
const selectedDish: Ref<UnwrapRef<number>, UnwrapRef<number> | number> = ref(1)
const selectedActivity: Ref<UnwrapRef<number>, UnwrapRef<number> | number> = ref(1)
const value: Ref<UnwrapRef<string>, UnwrapRef<string> | string> = ref('')

const food: ({ name: string; id: number; url: string })[] = [
  {
    id: 1,
    name: 'Пицца',
    url: 'https://cdn.pixabay.com/photo/2021/10/06/17/11/pizza-6686275_960_720.png'
  },
  {
    id: 2,
    name: 'Шаурма',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRawW0N80zonu-_81ZiCWcXU5z3J4Z9RlBb5A&s'
  },
  {
    id: 3,
    name: 'Паста',
    url: 'https://cdna.artstation.com/p/assets/images/images/064/407/116/large/artfritz-untitled-artwork.jpg?1687865341'
  },
  {
    id: 4,
    name: 'Бургер',
    url: 'https://media.istockphoto.com/id/996850808/nl/vector/pixel-art-hamburger-ge%C3%AFsoleerd-op-een-witte-achtergrond.jpg?s=612x612&w=0&k=20&c=zDH_-tSdXY8spod6KG7-w8dm6c4pojVkl1qDyGgeoO8='
  },
]

const activities: ({ name: string; id: number; url: string })[] = [
  {
    id: 1,
    name: 'поиграть',
    url: 'https://i.ibb.co/Rbtk30F/pspix.png'
  },
  {
    id: 2,
    name: 'посмотреть фильмы',
    url:'https://i.ibb.co/nrYdwyH/tvpix.png'
  },
  {
    id: 3,
    name: 'выпить',
    url: 'https://i.ibb.co/N2Hj1wQ/barpix.png'
  },
  {
    id: 4,
    name: 'тебя',
    url:'https://i.ibb.co/Nt9rFbZ/18.jpg'
  },
]

interface SurveyData {
  name: string;
}

const { data } = await useApiFetch<SurveyData>(`/survey/${id}`);

const clickNoButton = (): void => {

  counter.value++;

  if (counter.value === 7) {
    const button = document.getElementById('no');
    const explosion = document.getElementById('explosion');
    const buttonRect = button?.getBoundingClientRect();
    const buttonLeft = buttonRect?.left;
    const buttonTop = buttonRect?.top;
    explosion?.classList.remove('hidden');
    explosion.style.position = 'fixed';
    explosion.style.left = `${buttonLeft}px`;
    explosion.style.top = `${buttonTop}px`;

    setTimeout(() => {
      explosion?.remove()
    }, 500)

    audio.play()
  }

  randomizePosition('no');
};


const clickNextButton = (): void => {

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
const clickBackButton = (): void => {

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
