import { ref, computed, type ComputedRef, type Ref } from 'vue'

/** 滑鼠追蹤 spotlight 之 CSS 變數樣式（hover 關閉時僅透明度） */
export type SpotlightStyle =
  | { '--spotlight-opacity': string }
  | {
      '--mouse-x': string
      '--mouse-y': string
      '--spotlight-opacity': string
    }

/** `useSpotlight` 回傳之樣式與事件處理 */
export interface UseSpotlightReturn {
  spotlightStyle: ComputedRef<SpotlightStyle>
  onMouseMove: (e: MouseEvent) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

/**
 * 在容器內依游標位置更新 CSS 變數，供 radial gradient spotlight 使用。
 * @param containerRef 要計算相對座標之容器元素
 * @returns 計算樣式與滑鼠事件 handler
 */
export const useSpotlight = (containerRef: Ref<HTMLElement | null>): UseSpotlightReturn => {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const isHovered = ref(false)

  const spotlightStyle = computed<SpotlightStyle>(() => {
    if (!isHovered.value) return { '--spotlight-opacity': '0' }
    return {
      '--mouse-x': `${mouseX.value}px`,
      '--mouse-y': `${mouseY.value}px`,
      '--spotlight-opacity': '1',
    }
  })

  const onMouseMove = (e: MouseEvent): void => {
    const el = containerRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.value = e.clientX - rect.left
    mouseY.value = e.clientY - rect.top
  }

  const onMouseEnter = (): void => {
    isHovered.value = true
  }

  const onMouseLeave = (): void => {
    isHovered.value = false
  }

  return { spotlightStyle, onMouseMove, onMouseEnter, onMouseLeave }
}
