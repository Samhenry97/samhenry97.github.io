<template>
  <Teleport to="body">
    <div class="confetti-container" aria-hidden="true">
      <div
        v-for="piece in pieces"
        :key="piece.id"
        class="confetti-piece"
        :style="piece.style"
      ></div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const COLORS = ['#ff6b2b', '#fbbf24', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#ff8c00']
const pieces = ref([])

onMounted(() => {
  pieces.value = Array.from({ length: 80 }, (_, i) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const x = Math.random() * 100
    const delay = Math.random() * 0.6
    const size = Math.random() * 8 + 6
    const rotation = Math.random() * 720 - 360
    const duration = Math.random() * 1.5 + 2
    return {
      id: i,
      style: {
        left: `${x}vw`,
        top: '-20px',
        width: `${size}px`,
        height: `${size * (Math.random() > 0.5 ? 1 : 2.5)}px`,
        background: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        '--rot': `${rotation}deg`,
      }
    }
  })
})
</script>

<style scoped>
.confetti-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  animation: confetti-fall linear forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(var(--rot));
    opacity: 0;
  }
}
</style>
