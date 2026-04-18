<template>
  <CurrencyCombobox
    :model-value="modelValue"
    :options="options"
    variant="md"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CURRENCY_NAMES, POPULAR_CURRENCIES } from '@/types'
import CurrencyCombobox from '@/components/CurrencyCombobox.vue'

defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()

const currencies = POPULAR_CURRENCIES
const names = CURRENCY_NAMES

const options = computed(() =>
  currencies.map((code) => ({
    value: code,
    label: `${code} — ${names[code] ?? code}`,
  })),
)
</script>
