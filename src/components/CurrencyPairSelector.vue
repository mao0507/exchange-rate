<template>
  <div class="flex items-center gap-2">
    <div class="relative">
      <select
        :value="base"
        class="appearance-none pl-3 pr-7 py-2 rounded-lg text-sm font-mono text-fg
               bg-bg-input border border-white/10
               focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
               transition-all duration-200 cursor-pointer"
        @change="$emit('update:base', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="code in currencies" :key="code" :value="code" class="bg-bg-elevated">{{ code }}</option>
      </select>
      <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-fg-muted text-xs">▾</span>
    </div>

    <span class="text-accent font-mono font-bold">/</span>

    <div class="relative">
      <select
        :value="target"
        class="appearance-none pl-3 pr-7 py-2 rounded-lg text-sm font-mono text-fg
               bg-bg-input border border-white/10
               focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
               transition-all duration-200 cursor-pointer"
        @change="$emit('update:target', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="code in currencies" :key="code" :value="code" class="bg-bg-elevated">{{ code }}</option>
      </select>
      <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-fg-muted text-xs">▾</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { POPULAR_CURRENCIES } from '@/types'

defineProps<{ base: string; target: string }>()
defineEmits<{ 'update:base': [value: string]; 'update:target': [value: string] }>()

const currencies = POPULAR_CURRENCIES
</script>
