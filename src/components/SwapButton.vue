<template>
  <button
    class="flex items-center justify-center w-10 h-10 rounded-full
           bg-white/[0.05] border border-white/[0.08]
           hover:bg-white/[0.10] hover:border-white/[0.15]
           text-accent hover:text-accent-bright
           transition-all duration-200 active:scale-[0.98]"
    title="交換貨幣"
    @click="$emit('swap')"
  >
    <span class="text-base leading-none md:hidden" aria-hidden="true">↕</span>
    <span class="text-base leading-none hidden md:inline" aria-hidden="true">⇄</span>
  </button>
</template>

<script setup lang="ts">
defineEmits<{ swap: [] }>()
</script>
