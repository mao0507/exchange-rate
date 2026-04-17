<template>
  <div class="relative">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted text-sm pointer-events-none">🔍</span>
    <input
      :value="modelValue"
      type="text"
      placeholder="搜尋貨幣代碼或名稱..."
      class="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm
             bg-bg-input text-fg placeholder-fg-muted/60
             border border-white/10
             focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
             transition-all duration-200"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
