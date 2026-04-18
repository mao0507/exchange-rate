<template>
  <div class="flex items-center gap-2.5 sm:gap-3">
    <div class="min-w-0 flex-1">
      <CurrencyCombobox
        :model-value="base"
        :options="options"
        variant="sm"
        @update:model-value="$emit('update:base', $event)"
      />
    </div>

    <span class="shrink-0 text-accent font-mono font-bold select-none" aria-hidden="true">/</span>

    <div class="min-w-0 flex-1">
      <CurrencyCombobox
        :model-value="target"
        :options="options"
        variant="sm"
        @update:model-value="$emit('update:target', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { POPULAR_CURRENCIES } from '@/types'
import CurrencyCombobox from '@/components/CurrencyCombobox.vue'

defineProps<{ base: string; target: string }>()
defineEmits<{ 'update:base': [value: string]; 'update:target': [value: string] }>()

const currencies = POPULAR_CURRENCIES

const options = computed(() => currencies.map((code) => ({ value: code, label: code })))
</script>
