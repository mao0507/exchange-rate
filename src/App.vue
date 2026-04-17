<template>
  <div class="relative min-h-screen bg-bg-base text-fg overflow-x-hidden">
    <!-- 多層背景系統 -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <!-- Base radial gradient -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />

      <!-- Ambient blob 1: top-center indigo -->
      <div
        class="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px]
               bg-[#5E6AD2] opacity-[0.10] rounded-full blur-[150px]
               animate-float"
      />
      <!-- Ambient blob 2: top-left purple -->
      <div
        class="absolute top-20 -left-40 w-[600px] h-[500px]
               bg-[#7c3aed] opacity-[0.08] rounded-full blur-[120px]
               animate-float-slow"
        style="animation-delay: -4s"
      />
      <!-- Ambient blob 3: right indigo/blue -->
      <div
        class="absolute top-60 -right-40 w-[500px] h-[400px]
               bg-[#4f46e5] opacity-[0.07] rounded-full blur-[100px]
               animate-float"
        style="animation-delay: -2s"
      />

      <!-- Grid overlay -->
      <div
        class="absolute inset-0 opacity-[0.018]"
        style="background-image: linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px);
               background-size: 64px 64px"
      />
    </div>

    <!-- Main content -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <NavBar />
      <main class="flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
