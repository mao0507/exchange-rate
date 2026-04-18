<template>
  <div class="relative rounded-2xl overflow-hidden p-6 text-center
              border border-accent/20 bg-accent/[0.04]
              shadow-[0_0_0_1px_rgba(94,106,210,0.2),0_4px_24px_rgba(94,106,210,0.1)]">
    <!-- Subtle glow bg -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,106,210,0.08)_0%,transparent_70%)] pointer-events-none" />

    <div class="relative">
      <p class="text-xs font-mono tracking-widest text-fg-muted uppercase mb-3">換算結果</p>
      <div class="text-4xl sm:text-3xl font-mono font-semibold text-gradient mb-3">
        {{ formattedResult }}
      </div>
      <div class="text-sm text-fg-muted">
        1 <span class="text-accent font-mono">{{ fromCurrency }}</span>
        =
        <span class="text-fg font-mono">{{ formattedRate }}</span>
        <span class="text-accent font-mono"> {{ toCurrency }}</span>
      </div>
      <div v-if="lastUpdated" class="text-xs text-fg-muted/50 mt-2 font-mono">
        {{ lastUpdatedText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  result: number | null
  rate: number | null
  fromCurrency: string
  toCurrency: string
  lastUpdated: number | null
}>()

const formattedResult = computed(() => {
  if (props.result === null) return '—'
  return props.result.toLocaleString('zh-TW', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
})

const formattedRate = computed(() => {
  if (props.rate === null) return '—'
  if (props.rate >= 100) return props.rate.toFixed(2)
  if (props.rate >= 1)   return props.rate.toFixed(4)
  return props.rate.toFixed(6)
})

const lastUpdatedText = computed(() =>
  props.lastUpdated ? new Date(props.lastUpdated).toLocaleString('zh-TW') : ''
)
</script>
