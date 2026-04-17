<template>
  <button
    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white
           bg-accent hover:bg-accent-bright
           shadow-glow hover:shadow-glow-hover
           transition-all duration-200 active:scale-[0.98]
           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent disabled:hover:shadow-glow"
    :disabled="loading"
    @click="$emit('refresh')"
  >
    <span :class="loading ? 'animate-spin inline-block' : 'inline-block'">↺</span>
    <span>{{ loading ? '更新中' : '刷新' }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ loading: boolean }>()
defineEmits<{ refresh: [] }>()
</script>
