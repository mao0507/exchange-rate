import { ref, computed, type Ref } from 'vue'

export function useSpotlight(containerRef: Ref<HTMLElement | null>) {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const isHovered = ref(false)

  const spotlightStyle = computed(() => {
    if (!isHovered.value) return { '--spotlight-opacity': '0' }
    return {
      '--mouse-x': `${mouseX.value}px`,
      '--mouse-y': `${mouseY.value}px`,
      '--spotlight-opacity': '1',
    }
  })

  function onMouseMove(e: MouseEvent): void {
    const el = containerRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.value = e.clientX - rect.left
    mouseY.value = e.clientY - rect.top
  }

  function onMouseEnter(): void { isHovered.value = true }
  function onMouseLeave(): void { isHovered.value = false }

  return { spotlightStyle, onMouseMove, onMouseEnter, onMouseLeave }
}
