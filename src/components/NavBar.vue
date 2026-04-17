<template>
  <nav
    class="sticky top-0 z-50 backdrop-blur-xl bg-bg-base/80 transition-all duration-300"
    :class="scrolled ? 'border-b border-white/[0.06]' : 'border-b border-transparent'"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <!-- Brand -->
      <span class="text-lg font-semibold tracking-tight">
        <span class="text-gradient-accent">ExRate</span>
      </span>

      <!-- Nav links -->
      <div class="flex gap-1">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 text-fg-muted hover:text-fg hover:bg-white/[0.05]"
          :class="isActive(link.to) ? 'text-fg bg-white/[0.06]' : ''"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)

function handleScroll(): void {
  scrolled.value = window.scrollY > 10
}

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const links = [
  { to: '/',          label: '匯率列表' },
  { to: '/converter', label: '貨幣換算' },
  { to: '/history',   label: '歷史走勢' },
]
</script>
