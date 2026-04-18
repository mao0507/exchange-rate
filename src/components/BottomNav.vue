<template>
  <nav
    class="fixed bottom-0 inset-x-0 z-40 md:hidden glass border-t border-white/[0.06] backdrop-blur-xl pb-safe"
    aria-label="主要導覽"
  >
    <div class="flex items-stretch justify-around max-w-6xl mx-auto px-2 pt-2">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.hash"
        :to="{ path: '/', hash: tab.hash }"
        class="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 rounded-lg text-xs font-semibold transition-colors
               text-fg-muted hover:text-fg min-h-[52px]"
        :class="isHashActive(tab.hash) ? 'text-accent' : ''"
      >
        {{ tab.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { hash: '#rates', label: '匯率' },
  { hash: '#converter', label: '換算' },
  { hash: '#history', label: '走勢' },
] as const

function isHashActive(hash: string): boolean {
  return route.hash === hash
}
</script>
