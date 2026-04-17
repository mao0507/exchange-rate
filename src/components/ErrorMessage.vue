<template>
  <div class="glass rounded-2xl p-8 flex flex-col items-center text-center shadow-card max-w-md mx-auto">
    <div class="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-2xl">
      ⚠️
    </div>
    <p class="text-fg mb-1 font-medium">載入失敗</p>
    <p class="text-fg-muted text-sm mb-6">{{ message }}</p>
    <button
      class="px-4 py-2 rounded-lg text-sm font-medium text-fg-muted border border-white/[0.08]
             hover:text-fg hover:bg-white/[0.06] hover:border-white/[0.12]
             transition-all duration-200"
      @click="$emit('retry')"
    >
      重試
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
defineEmits<{ retry: [] }>()
</script>
