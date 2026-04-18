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
        class="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 rounded-lg text-sm font-semibold transition-colors
               text-fg-muted hover:text-fg min-h-[52px]
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        :class="isHashActive(tab.hash) ? 'text-accent' : ''"
      >
        {{ tab.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { sectionSpyActiveKey } from '@/composables/useSectionSpy'

const route = useRoute()
const scrollSpyHash = inject(sectionSpyActiveKey, ref(''))

const tabs = [
  { hash: '#rates', label: '匯率' },
  { hash: '#converter', label: '換算' },
  { hash: '#history', label: '走勢' },
] as const

const resolvedNavHash = computed(() => scrollSpyHash.value || route.hash)

function isHashActive(hash: string): boolean {
  return resolvedNavHash.value === hash
}
</script>
