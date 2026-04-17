<template>
  <div>
    <input
      :value="modelValue ?? ''"
      type="number"
      min="0"
      step="any"
      placeholder="0.00"
      class="w-full px-4 py-3 rounded-lg font-mono text-xl text-fg
             bg-bg-input placeholder-fg-muted/40
             border border-white/10
             focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
             transition-all duration-200"
      :class="hasError ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''"
      @input="handleInput"
    />
    <p v-if="hasError" class="mt-1.5 text-xs text-red-400 font-mono">請輸入有效的數字金額</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ modelValue: number | null }>()
const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  'error': [hasError: boolean]
}>()

const hasError = ref(false)

function handleInput(event: Event): void {
  const raw = (event.target as HTMLInputElement).value
  if (raw === '') {
    hasError.value = false
    emit('update:modelValue', null)
    return
  }
  const num = parseFloat(raw)
  if (isNaN(num)) {
    hasError.value = true
    emit('error', true)
    emit('update:modelValue', null)
  } else {
    hasError.value = false
    emit('error', false)
    emit('update:modelValue', num)
  }
}
</script>
