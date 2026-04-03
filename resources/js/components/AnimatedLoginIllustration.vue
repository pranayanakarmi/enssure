<template>
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-full"
  >
    <!-- Background circle -->
    <circle cx="100" cy="100" r="90" fill="url(#gradient)" />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" :stop-color="colors.primary" />
        <stop offset="100%" :stop-color="colors.destructive" />
      </linearGradient>
    </defs>

    <!-- Fingerprint loops -->
    <path
      d="M100 70 Q85 75 85 90 Q85 105 100 110 Q115 105 115 90 Q115 75 100 70"
      :stroke="colors.foreground"
      stroke-width="3"
      fill="none"
      class="loop loop-1"
    />
    <path
      d="M100 75 Q80 82 80 95 Q80 110 100 115 Q120 110 120 95 Q120 82 100 75"
      :stroke="colors.foreground"
      stroke-width="3"
      fill="none"
      class="loop loop-2"
    />
    <path
      d="M100 80 Q75 90 75 100 Q75 115 100 120 Q125 115 125 100 Q125 90 100 80"
      :stroke="colors.foreground"
      stroke-width="3"
      fill="none"
      class="loop loop-3"
    />

    <!-- Center dot -->
    <circle cx="100" cy="100" r="4" :fill="colors.foreground" class="dot" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage();

const colors = computed(() => {
  const root = document.documentElement;
  const style = getComputedStyle(root);

  return {
    primary: style.getPropertyValue('--primary').trim() || '#000000',
    foreground: style.getPropertyValue('--foreground').trim() || '#FFFFFF',
    destructive: style.getPropertyValue('--destructive').trim() || '#EF4444',
  };
});
</script>

<style scoped>
.loop {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: drawLoop 1.5s ease-out forwards;
}

.loop-1 { animation-delay: 0s; }
.loop-2 { animation-delay: 0.3s; }
.loop-3 { animation-delay: 0.6s; }

.dot {
  opacity: 0;
  animation: pulse 1s ease-in-out 1.5s forwards;
}

@keyframes drawLoop {
  0% {
    stroke-dashoffset: 80;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0;
    r: 4;
  }
  50% {
    opacity: 1;
    r: 6;
  }
}
</style>
