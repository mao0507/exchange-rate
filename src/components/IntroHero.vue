<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-elevated/80 shadow-card backdrop-blur-sm px-6 py-16 sm:px-10 sm:py-20 mb-12 sm:mb-16"
    aria-labelledby="hero-heading"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.35]"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(94,106,210,0.25), transparent 55%)"
    />
    <div
      class="relative max-w-2xl mx-auto text-center will-change-transform"
      :style="heroMotionStyle"
    >
      <p class="text-xs font-semibold uppercase tracking-widest text-accent mb-3 font-mono">即時匯率 · 換算 · 走勢</p>
      <h1
        id="hero-heading"
        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 leading-tight"
      >
        <span class="text-gradient">ExRate</span>
      </h1>
      <p class="text-fg-muted text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
        以深色介面集中查看美元基準匯率、快速換算，並追蹤貨幣對歷史走勢。向下捲動即可使用全部功能。
      </p>
      <RouterLink
        :to="{ path: '/', hash: '#rates' }"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
               bg-accent text-white hover:bg-accent-bright transition-all duration-200
               shadow-glow hover:shadow-glow-hover active:scale-[0.98]"
      >
        查看匯率列表
        <span aria-hidden="true" class="text-base">↓</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)
const reduceMotion = ref(false)

function onScroll(): void {
  scrollY.value = window.scrollY
}

const heroMotionStyle = computed(() => {
  if (reduceMotion.value) return {}
  const p = Math.min(1, scrollY.value / 360)
  return {
    opacity: String(Math.max(0, 1 - p * 0.9)),
    transform: `translateY(${p * 64}px) scale(${1 - p * 0.05})`,
    transition: 'none',
  }
})

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
