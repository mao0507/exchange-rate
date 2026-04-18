<template>
  <nav
    class="sticky top-0 z-50 backdrop-blur-xl bg-bg-base/80 transition-all duration-300"
    :class="scrolled ? 'border-b border-white/[0.06]' : 'border-b border-transparent'"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
      <RouterLink
        to="/"
        class="text-lg font-semibold tracking-tight shrink-0 hover:opacity-90 transition-opacity rounded-lg
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      >
        <span class="text-gradient-accent">ExRate</span>
      </RouterLink>

      <!-- 桌面：錨點導覽 -->
      <div class="hidden md:flex gap-1">
        <RouterLink
          v-for="link in links"
          :key="link.hash"
          :to="{ path: '/', hash: link.hash }"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 text-fg-muted hover:text-fg hover:bg-white/[0.05]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          :class="isHashActive(link.hash) ? 'text-fg bg-white/[0.06]' : ''"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <!-- 手機：漢堡 -->
      <button
        type="button"
        class="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] transition-colors
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-nav-panel"
        aria-label="開啟選單"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="sr-only">選單</span>
        <span class="block h-0.5 w-5 mx-auto rounded-full bg-fg-muted" />
        <span class="block h-0.5 w-5 mx-auto rounded-full bg-fg-muted" />
        <span class="block h-0.5 w-5 mx-auto rounded-full bg-fg-muted" />
      </button>
    </div>

    <Transition name="nav-slide">
      <div
        v-if="isMenuOpen"
        id="mobile-nav-panel"
        class="md:hidden border-b border-white/[0.06] bg-bg-base/95 backdrop-blur-xl overflow-hidden"
      >
        <div class="max-w-6xl mx-auto px-4 sm:px-6 pb-4 flex flex-col gap-1">
          <RouterLink
            v-for="link in links"
            :key="`m-${link.hash}`"
            :to="{ path: '/', hash: link.hash }"
            class="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                   text-fg-muted hover:text-fg hover:bg-white/[0.05]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-inset"
            :class="isHashActive(link.hash) ? 'text-fg bg-white/[0.06]' : ''"
            @click="closeMenu"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, computed, inject, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { sectionSpyActiveKey } from '@/composables/useSectionSpy'

const route = useRoute()
const scrolled = ref(false)
const isMenuOpen = ref(false)

const scrollSpyHash = inject(sectionSpyActiveKey, ref(''))

const links = [
  { hash: '#rates', label: '匯率列表' },
  { hash: '#converter', label: '貨幣換算' },
  { hash: '#history', label: '歷史走勢' },
] as const

/** 捲動偵測優先，否則退回 URL hash（點擊導覽或深連結） */
const resolvedNavHash = computed(() => scrollSpyHash.value || route.hash)

function handleScroll(): void {
  scrolled.value = window.scrollY > 10
}

function isHashActive(hash: string): boolean {
  return resolvedNavHash.value === hash
}

function closeMenu(): void {
  isMenuOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.nav-slide-enter-active,
.nav-slide-leave-active {
  transition: max-height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out;
}
.nav-slide-enter-from,
.nav-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.nav-slide-enter-to,
.nav-slide-leave-from {
  max-height: 280px;
  opacity: 1;
}
</style>
