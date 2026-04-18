<template>
  <PageShell>
    <IntroHero />

    <!-- 全寬跑馬燈（與先前掛在 App 時同寬；自 PageShell 橫向 breakout） -->
    <div class="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
      <RateMarquee />
    </div>

    <section
      id="rates"
      class="scroll-mt-24 md:scroll-mt-28 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-20"
      aria-labelledby="rates-heading"
    >
      <h2 id="rates-heading" class="sr-only">即時匯率</h2>
      <RatesSection />
    </section>

    <section
      id="converter"
      class="scroll-mt-24 md:scroll-mt-28 border-t border-white/[0.06] pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-20"
      aria-labelledby="converter-heading"
    >
      <h2 id="converter-heading" class="sr-only">貨幣換算</h2>
      <ConverterSection />
    </section>

    <section
      id="history"
      class="scroll-mt-24 md:scroll-mt-28 border-t border-white/[0.06] pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16"
      aria-labelledby="history-heading"
    >
      <h2 id="history-heading" class="sr-only">歷史走勢</h2>
      <HistorySection />
    </section>
  </PageShell>
</template>

<script setup lang="ts">
import PageShell from '@/components/PageShell.vue'
import IntroHero from '@/components/IntroHero.vue'
import RateMarquee from '@/components/RateMarquee.vue'
import RatesSection from '@/components/RatesSection.vue'
import ConverterSection from '@/components/ConverterSection.vue'
import HistorySection from '@/components/HistorySection.vue'
</script>
