<template>
  <div class="flex items-center gap-2.5 sm:gap-3">
    <div class="group relative min-w-0">
      <select
        :value="base"
        :class="selectFieldSm"
        @change="$emit('update:base', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="code in currencies" :key="code" :value="code" class="bg-bg-elevated text-fg">
          {{ code }}
        </option>
      </select>
      <span
        class="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center
               text-fg-muted transition-colors duration-200 ease-out
               group-hover:text-fg/85 group-focus-within:text-accent motion-safe:origin-center
               motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out
               motion-safe:group-focus-within:-rotate-180 motion-reduce:group-focus-within:rotate-0"
      >
        <SelectChevron />
      </span>
    </div>

    <span class="shrink-0 text-accent font-mono font-bold select-none" aria-hidden="true">/</span>

    <div class="group relative min-w-0">
      <select
        :value="target"
        :class="selectFieldSm"
        @change="$emit('update:target', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="code in currencies" :key="code" :value="code" class="bg-bg-elevated text-fg">
          {{ code }}
        </option>
      </select>
      <span
        class="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center
               text-fg-muted transition-colors duration-200 ease-out
               group-hover:text-fg/85 group-focus-within:text-accent motion-safe:origin-center
               motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out
               motion-safe:group-focus-within:-rotate-180 motion-reduce:group-focus-within:rotate-0"
      >
        <SelectChevron />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { POPULAR_CURRENCIES } from '@/types'
import { selectFieldSm } from '@/utils/selectFieldClasses'
import SelectChevron from '@/components/SelectChevron.vue'

defineProps<{ base: string; target: string }>()
defineEmits<{ 'update:base': [value: string]; 'update:target': [value: string] }>()

const currencies = POPULAR_CURRENCIES
</script>
