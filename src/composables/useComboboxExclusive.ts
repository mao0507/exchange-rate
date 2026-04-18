import { ref, watch, type Ref } from 'vue'

/** 同一視圖僅一個幣別下拉展開（例如幣別對兩欄互斥） */
const openComboboxId = ref<string | null>(null)

export function useComboboxExclusive(id: string): {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
} {
  const isOpen = ref(false)

  function close(): void {
    if (openComboboxId.value === id) openComboboxId.value = null
    isOpen.value = false
  }

  function open(): void {
    openComboboxId.value = id
    isOpen.value = true
  }

  function toggle(): void {
    if (isOpen.value) close()
    else open()
  }

  watch(openComboboxId, (v) => {
    if (v !== id) isOpen.value = false
  })

  return { isOpen, open, close, toggle }
}
