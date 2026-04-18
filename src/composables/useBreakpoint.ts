import { ref, onMounted, onUnmounted, type Ref } from 'vue'

const QUERY = '(max-width: 767px)'

/** `useBreakpoint` 回傳之響應式斷點狀態 */
export interface UseBreakpointReturn {
  isMobile: Ref<boolean>
}

/**
 * 監聽 `max-width: 767px` 媒體查詢，供行動／桌面版面切換。
 * @returns `isMobile` 反應式布林值
 */
export const useBreakpoint = (): UseBreakpointReturn => {
  const isMobile = ref(
    typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  let mql: MediaQueryList | null = null

  const sync = (): void => {
    isMobile.value = mql ? mql.matches : false
  }

  onMounted(() => {
    mql = window.matchMedia(QUERY)
    sync()
    mql.addEventListener('change', sync)
  })

  onUnmounted(() => {
    mql?.removeEventListener('change', sync)
  })

  return { isMobile }
}
