<template>
  <div class="relative">
    <select
      :value="modelValue"
      class="w-full appearance-none px-4 py-3 pr-9 rounded-lg text-sm text-fg
             bg-bg-input border border-white/10
             focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
             transition-all duration-200 cursor-pointer"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="code in currencies"
        :key="code"
        :value="code"
        class="bg-bg-elevated text-fg"
      >
        {{ code }} — {{ names[code] ?? code }}
      </option>
    </select>
    <!-- Custom arrow -->
    <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted text-xs">▾</span>
  </div>
</template>

<script setup lang="ts">
import { CURRENCY_NAMES, POPULAR_CURRENCIES } from '@/types'

defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()

const currencies = POPULAR_CURRENCIES
const names = CURRENCY_NAMES
</script>
