<template>
  <div>
    <PageHeader label="貨幣換算" title="Currency Converter" />

    <div
      ref="cardRef"
      class="relative bg-bg-elevated rounded-2xl border border-white/[0.06] shadow-card backdrop-blur-sm p-6 space-y-5 max-w-md mx-auto
             transition-shadow duration-300 hover:shadow-card-hover"
      :style="!isMobile ? { ...spotlightStyle } : {}"
      @mousemove="onMouseMoveWrapped"
      @mouseenter="onMouseEnterWrapped"
      @mouseleave="onMouseLeaveWrapped"
    >
      <div
        v-if="!isMobile"
        class="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
        style="background: radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(94,106,210,0.08), transparent 70%);
               opacity: var(--spotlight-opacity, 0)"
      />

      <div class="relative z-10 space-y-5">
        <div>
          <label class="block text-sm font-mono tracking-widest text-fg-muted uppercase mb-2 md:text-xs">金額</label>
          <AmountInput v-model="amount" />
        </div>

        <div class="flex flex-col gap-3 md:flex-row md:items-end">
          <div class="w-full md:flex-1">
            <label class="block text-sm font-mono tracking-widest text-fg-muted uppercase mb-2 md:text-xs">來源</label>
            <CurrencySelector :model-value="fromCurrency" @update:model-value="onFromChange" />
          </div>
          <div class="flex justify-center md:justify-start shrink-0 md:pt-5">
            <SwapButton @swap="swap" />
          </div>
          <div class="w-full md:flex-1">
            <label class="block text-sm font-mono tracking-widest text-fg-muted uppercase mb-2 md:text-xs">目標</label>
            <CurrencySelector v-model="toCurrency" />
          </div>
        </div>

        <LoadingSpinner v-if="store.isLoading" />
        <ErrorMessage
          v-else-if="store.error"
          :message="store.error"
          @retry="store.fetchRates(true)"
        />
        <ConversionResult
          v-else
          :result="result"
          :rate="currentRate"
          :from-currency="fromCurrency"
          :to-currency="toCurrency"
          :last-updated="store.currentRates?.lastUpdated ?? null"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConverter } from '@/composables/useConverter'
import { useSpotlight } from '@/composables/useSpotlight'
import { useBreakpoint } from '@/composables/useBreakpoint'
import PageHeader from '@/components/PageHeader.vue'
import AmountInput from '@/components/AmountInput.vue'
import CurrencySelector from '@/components/CurrencySelector.vue'
import SwapButton from '@/components/SwapButton.vue'
import ConversionResult from '@/components/ConversionResult.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const { amount, fromCurrency, toCurrency, currentRate, result, swap, store } = useConverter()

const { isMobile } = useBreakpoint()
const cardRef = ref<HTMLElement | null>(null)
const { spotlightStyle, onMouseMove, onMouseEnter, onMouseLeave } = useSpotlight(cardRef)

function onMouseMoveWrapped(e: MouseEvent): void {
  if (!isMobile.value) onMouseMove(e)
}
function onMouseEnterWrapped(): void {
  if (!isMobile.value) onMouseEnter()
}
function onMouseLeaveWrapped(): void {
  if (!isMobile.value) onMouseLeave()
}

function onFromChange(code: string): void {
  fromCurrency.value = code
  store.setBaseCurrency(code)
}

onMounted(() => store.setBaseCurrency(fromCurrency.value))
</script>
