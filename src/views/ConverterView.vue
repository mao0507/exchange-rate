<template>
  <PageShell>
    <PageHeader label="貨幣換算" title="Currency Converter" />

    <div class="bg-bg-elevated rounded-xl border border-white/[0.06] shadow-card backdrop-blur-sm p-6 space-y-5 max-w-md mx-auto">
      <div>
        <label class="block text-xs font-mono tracking-widest text-fg-muted uppercase mb-2">金額</label>
        <AmountInput v-model="amount" @error="hasInputError = $event" />
      </div>

      <div class="flex items-center gap-3">
        <div class="flex-1">
          <label class="block text-xs font-mono tracking-widest text-fg-muted uppercase mb-2">來源</label>
          <CurrencySelector :model-value="fromCurrency" @update:model-value="onFromChange" />
        </div>
        <div class="pt-5">
          <SwapButton @swap="swap" />
        </div>
        <div class="flex-1">
          <label class="block text-xs font-mono tracking-widest text-fg-muted uppercase mb-2">目標</label>
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
  </PageShell>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConverter } from '@/composables/useConverter'
import PageShell from '@/components/PageShell.vue'
import PageHeader from '@/components/PageHeader.vue'
import AmountInput from '@/components/AmountInput.vue'
import CurrencySelector from '@/components/CurrencySelector.vue'
import SwapButton from '@/components/SwapButton.vue'
import ConversionResult from '@/components/ConversionResult.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const { amount, fromCurrency, toCurrency, currentRate, result, swap, store } = useConverter()
const hasInputError = ref(false)

function onFromChange(code: string): void {
  fromCurrency.value = code
  store.setBaseCurrency(code)
}

onMounted(() => store.setBaseCurrency(fromCurrency.value))
</script>
