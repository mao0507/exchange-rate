<template>
  <svg
    class="h-3 w-3 shrink-0"
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      v-if="direction === 'up'"
      d="M4 10.5L8 6.5L12 10.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-else
      d="M4 6.5L8 10.5L12 6.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  direction: 'up' | 'down'
}>()
</script>
