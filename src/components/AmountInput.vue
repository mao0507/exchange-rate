<template>
  <div>
    <div class="group relative">
      <input
        ref="inputRef"
        :value="modelValue ?? ''"
        type="number"
        min="0"
        step="any"
        inputmode="decimal"
        placeholder="0.00"
        class="w-full py-3 pl-4 pr-[3.25rem] rounded-lg font-mono text-xl text-fg
               bg-bg-input placeholder-fg-muted/40
               border border-white/10
               focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50
               focus:ring-offset-2 focus:ring-offset-bg-base
               transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        :class="hasError ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''"
        @input="handleInput"
      />
      <div class="absolute inset-y-0 right-0 flex w-11 flex-col border-l border-white/10">
        <button
          type="button"
          class="flex flex-1 items-center justify-center rounded-tr-lg text-fg-muted
                 transition-colors duration-200 ease-out
                 hover:bg-white/[0.05] hover:text-accent
                 active:scale-[0.97] active:bg-white/[0.06]
                 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50"
          aria-label="增加金額"
          @click="nudge(stepAmount)"
        >
          <NumberStepperChevron direction="up" />
        </button>
        <button
          type="button"
          class="flex flex-1 items-center justify-center rounded-br-lg border-t border-white/10 text-fg-muted
                 transition-colors duration-200 ease-out
                 hover:bg-white/[0.05] hover:text-accent
                 active:scale-[0.97] active:bg-white/[0.06]
                 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50"
          aria-label="減少金額"
          @click="nudge(-stepAmount)"
        >
          <NumberStepperChevron direction="down" />
        </button>
      </div>
    </div>
    <p v-if="hasError" class="mt-1.5 text-sm text-red-400 font-mono">請輸入有效的數字金額</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NumberStepperChevron from '@/components/NumberStepperChevron.vue'

const props = withDefaults(
  defineProps<{
    modelValue: number | null
    /** 步進按鈕每次增減量（預設 1） */
    step?: number
  }>(),
  { step: 1 },
)

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  error: [hasError: boolean]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const hasError = ref(false)

const stepAmount = computed(() =>
  props.step > 0 && Number.isFinite(props.step) ? props.step : 1,
)

function commitNumber(num: number): void {
  hasError.value = false
  emit('error', false)
  emit('update:modelValue', num)
}

function handleInput(event: Event): void {
  const raw = (event.target as HTMLInputElement).value
  if (raw === '') {
    hasError.value = false
    emit('error', false)
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

function nudge(delta: number): void {
  const raw = inputRef.value?.value ?? ''
  const base =
    raw === '' ? 0 : parseFloat(raw)
  if (raw !== '' && isNaN(base)) {
    return
  }
  const next = Math.max(0, base + delta)
  const rounded =
    Number.isInteger(stepAmount.value) && Number.isInteger(next)
      ? next
      : Math.round(next * 1e8) / 1e8
  commitNumber(rounded)
  if (inputRef.value) {
    inputRef.value.value = String(rounded)
  }
}
</script>
