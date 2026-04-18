<template>
  <div ref="rootEl" class="group relative w-full min-w-0">
    <button
      type="button"
      role="combobox"
      :class="triggerClass"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      aria-autocomplete="list"
      :aria-controls="isOpen ? listboxId : undefined"
      :aria-activedescendant="activeDescendantId"
      @click.stop="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <span class="block truncate text-left">{{ displayLabel }}</span>
    </button>
    <span
      class="pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center justify-center
             text-fg-muted transition-colors duration-200 ease-out
             group-hover:text-fg/85 group-focus-within:text-accent motion-safe:origin-center
             motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out
             motion-safe:group-focus-within:-rotate-180 motion-reduce:transition-none
             motion-reduce:group-focus-within:rotate-0"
      :class="chevronRightClass"
    >
      <SelectChevron />
    </span>

    <div
      v-show="isOpen"
      class="absolute left-0 right-0 top-full z-[100] mt-1 min-w-0"
      role="presentation"
    >
      <div
        class="rounded-lg border border-white/10 bg-bg-elevated shadow-card overflow-hidden
               ring-1 ring-white/[0.04]"
      >
        <ul :id="listboxId" class="max-h-60 overflow-y-auto py-1" role="listbox">
          <li v-for="(opt, idx) in options" :key="opt.value" role="presentation">
            <button
              :id="`${listboxId}-opt-${idx}`"
              type="button"
              role="option"
              :aria-selected="modelValue === opt.value"
              class="flex w-full cursor-pointer border-0 px-4 py-2.5 text-left text-base text-fg transition-colors
                     hover:bg-white/[0.06] focus:outline-none focus-visible:bg-accent/15
                     motion-reduce:transition-none"
              :class="[
                variant === 'sm' ? 'font-mono' : '',
                highlightedIndex === idx ? 'bg-accent/15' : '',
                modelValue === opt.value ? 'text-accent-bright' : '',
              ]"
              @click.stop="select(opt.value)"
              @mouseenter="highlightedIndex = idx"
            >
              {{ opt.label }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useComboboxExclusive } from '@/composables/useComboboxExclusive'
import { currencyComboboxTriggerMd, currencyComboboxTriggerSm } from '@/utils/selectFieldClasses'
import SelectChevron from '@/components/SelectChevron.vue'

const props = defineProps<{
  modelValue: string
  options: { value: string; label: string }[]
  variant: 'md' | 'sm'
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const comboboxId = `cc-${Math.random().toString(36).slice(2, 11)}`
const { isOpen, open, close, toggle } = useComboboxExclusive(comboboxId)

const listboxId = `${comboboxId}-listbox`

const triggerClass = computed(() =>
  props.variant === 'md' ? currencyComboboxTriggerMd : currencyComboboxTriggerSm,
)

const chevronRightClass = computed(() =>
  props.variant === 'md' ? 'right-3' : 'right-2.5',
)

const displayLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label ?? props.modelValue,
)

const rootEl = ref<HTMLElement | null>(null)
const highlightedIndex = ref(0)

const activeDescendantId = computed(() => {
  if (!isOpen.value || props.options.length === 0) return undefined
  return `${listboxId}-opt-${highlightedIndex.value}`
})

function syncHighlight(): void {
  const i = props.options.findIndex((o) => o.value === props.modelValue)
  highlightedIndex.value = i >= 0 ? i : 0
}

watch(
  () => props.modelValue,
  () => {
    if (isOpen.value) syncHighlight()
  },
)

watch(isOpen, (v) => {
  if (v) syncHighlight()
})

function onDocClick(e: MouseEvent): void {
  const el = rootEl.value
  if (el && !el.contains(e.target as Node)) close()
}

onMounted(() => document.addEventListener('click', onDocClick, true))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick, true))

function select(value: string): void {
  emit('update:modelValue', value)
  close()
}

function onTriggerClick(): void {
  toggle()
}

function onTriggerKeydown(e: KeyboardEvent): void {
  if (!isOpen.value) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open()
    }
    return
  }
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlightedIndex.value = Math.min(highlightedIndex.value + 1, props.options.length - 1)
    return
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
    return
  }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    const opt = props.options[highlightedIndex.value]
    if (opt) select(opt.value)
  }
}

</script>
