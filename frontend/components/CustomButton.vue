<template>
  <button class="text-2xl w-32 bg-[#f0dff0] hover:bg-[#fbcfe8] active:hover:bg-[#fbcfe8] p-2.5 border-2 border-[#f17575]">
    {{text}}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text:{
    type:String,
    required: true,
  }
})
</script>