<template>
  <div class="trust-bar">
    <div class="trust-inner">
      <span class="trust-label">AS SEEN IN</span>
      <div class="trust-logos">
        <span v-for="pub in pubs" :key="pub" class="trust-pub">{{ pub }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const pubs = [
  '📱 The Family GroupChat',
  '👵 Grandma\'s Facebook Feed',
  '🦃 The Thanksgiving Table',
  '📞 Dad\'s Texts',
  '💻 The Family Zoom Call',
  '📺 Sam\'s Living Room TV',
]
</script>

<style scoped>
.trust-bar {
  background: #f8fafc;
  border-top: 1px solid var(--gray-light);
  border-bottom: 1px solid var(--gray-light);
  padding: 1rem 1.5rem;
}
.trust-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}
.trust-label {
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #94a3b8;
  white-space: nowrap;
}
.trust-logos {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}
.trust-pub {
  font-size: 0.8rem;
  font-weight: 700;
  color: #94a3b8;
  white-space: nowrap;
  transition: color 0.15s;
}
.trust-pub:hover { color: var(--dark); }
</style>
