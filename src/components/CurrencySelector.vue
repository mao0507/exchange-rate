<template>
  <div class="group relative">
    <select
      :value="modelValue"
      :class="selectFieldMd"
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
    <span
      class="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center
             text-fg-muted transition-colors duration-200 ease-out
             group-hover:text-fg/85 group-focus-within:text-accent motion-safe:origin-center
             motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out
             motion-safe:group-focus-within:-rotate-180 motion-reduce:group-focus-within:rotate-0"
    >
      <SelectChevron />
    </span>
  </div>
</template>

<script setup lang="ts">
import { CURRENCY_NAMES, POPULAR_CURRENCIES } from '@/types'
import { selectFieldMd } from '@/utils/selectFieldClasses'
import SelectChevron from '@/components/SelectChevron.vue'

defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()

const currencies = POPULAR_CURRENCIES
const names = CURRENCY_NAMES
</script>
