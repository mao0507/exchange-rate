<template>
  <div class="border-b border-white/[0.04] pb-6 mb-8">
    <div :class="$slots.action ? 'flex justify-between items-start' : ''">
      <div>
        <p v-if="label" class="text-xs font-semibold uppercase tracking-widest text-accent mb-1">{{ label }}</p>
        <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-fg">{{ title }}</h1>
        <p v-if="subtitle" class="mt-1 text-sm text-fg-muted">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  title: string
  subtitle?: string
}>()
</script>
