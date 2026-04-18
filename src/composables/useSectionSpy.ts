import {
  ref,
  watch,
  nextTick,
  onUnmounted,
  type InjectionKey,
  type Ref,
} from 'vue'
import { useRoute } from 'vue-router'

/** 供 NavBar／BottomNav inject：目前捲動對應之錨點（如 `#converter`），非首頁或尚未偵測時為 `''` */
export const sectionSpyActiveKey: InjectionKey<Ref<string>> = Symbol('sectionSpyActive')

const DEFAULT_HASHES = ['#rates', '#converter', '#history'] as const

/** 與 `router/index.ts` 之 `NAV_SCROLL_OFFSET` 對齊（sticky nav + scroll-mt） */
const DEFAULT_NAV_OFFSET_PX = 80

/**
 * 僅在首頁（`route.name === 'home'`）監聽各 section，以 IntersectionObserver 更新 `activeHash`。
 * 應於 `App.vue` 呼叫並 `provide(sectionSpyActiveKey, activeHash)`。
 */
export function useHomeSectionSpy(
  hashes: readonly string[] = DEFAULT_HASHES,
  navOffsetPx: number = DEFAULT_NAV_OFFSET_PX,
): Ref<string> {
  const route = useRoute()
  const activeHash = ref('')
  let observer: IntersectionObserver | null = null

  const disconnect = (): void => {
    observer?.disconnect()
    observer = null
  }

  const connect = (): void => {
    disconnect()
    const ids = hashes.map(h => h.replace(/^#/, ''))
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    observer = new IntersectionObserver(
      entries => {
        const intersecting = entries
          .filter(e => e.isIntersecting && e.intersectionRatio > 0)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (intersecting.length === 0) return
        const id = intersecting[0].target.id
        activeHash.value = `#${id}`
      },
      {
        root: null,
        rootMargin: `-${navOffsetPx}px 0px -40% 0px`,
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    )

    for (const el of elements) {
      observer.observe(el)
    }
  }

  const validHashes = new Set(hashes as string[])

  watch(
    () => [route.name, route.path] as const,
    async () => {
      await nextTick()
      if (route.name !== 'home') {
        activeHash.value = ''
        disconnect()
        return
      }

      if (validHashes.has(route.hash)) {
        activeHash.value = route.hash
      }

      await nextTick()
      requestAnimationFrame(() => {
        if (route.name !== 'home') return
        connect()
      })
    },
    { immediate: true, flush: 'post' },
  )

  watch(
    () => route.hash,
    h => {
      if (route.name !== 'home') return
      if (validHashes.has(h)) {
        activeHash.value = h
      }
    },
  )

  onUnmounted(disconnect)

  return activeHash
}
