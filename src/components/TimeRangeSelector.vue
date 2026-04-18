<template>
  <div class="flex gap-1.5">
    <button
      v-for="range in ranges"
      :key="range.value"
      class="min-h-[44px] min-w-[3rem] px-3 py-2 rounded-full text-sm font-mono font-medium transition-all duration-200 md:min-h-0 md:min-w-0 md:py-1.5 md:text-xs"
      :class="modelValue === range.value
        ? 'bg-accent text-white shadow-glow'
        : 'bg-white/[0.04] text-fg-muted border border-white/[0.08] hover:bg-white/[0.08] hover:text-fg hover:border-white/[0.15]'"
      @click="$emit('update:modelValue', range.value)"
    >
      {{ range.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TimeRange } from '@/types'

defineProps<{ modelValue: TimeRange }>()
defineEmits<{ 'update:modelValue': [value: TimeRange] }>()

const ranges: { label: string; value: TimeRange }[] = [
  { label: '7D',  value: 7  },
  { label: '30D', value: 30 },
  { label: '90D', value: 90 },
]
</script>
