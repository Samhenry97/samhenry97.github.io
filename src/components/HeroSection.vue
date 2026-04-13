<template>
  <section class="hero">
    <div class="hero-bg-dots"></div>
    <div class="container hero-inner">

      <div class="hero-badge">
        <span class="badge badge-orange">🏆 #1 FAMILY CONTENT PLATFORM — {{ year }}</span>
      </div>

      <h1 class="hero-title">
        Your Family.<br/>
        <span class="hero-title-accent">Amplified.</span><br/>
        Monetized.
      </h1>

      <p class="hero-sub">
        For just <strong>$5/month</strong>, get unlimited access to Sam's unsolicited opinions,
        exclusive family content, emergency contact services, and priority support
        at all family gatherings. <em>Whether you want it or not.</em>
      </p>

      <div class="hero-social-proof">
        <div class="stars">★★★★★</div>
        <span>Rated <strong>5/5</strong> by people who weren't given a choice</span>
        <span class="divider">•</span>
        <span>
          <span class="pulse-dot"></span>
          <strong>{{ viewers }}</strong> people viewing this right now
        </span>
      </div>

      <div class="hero-cta-group">
        <button class="btn btn-orange btn-orange-lg hero-main-cta" @click="openModal()">
          🚀 START YOUR FREE TRIAL
        </button>
        <div class="hero-cta-sub">
          <span>✅ No credit card required*</span>
          <span>✅ Cancel anytime*</span>
          <span>✅ Risk-free*</span>
        </div>
      </div>

      <div class="hero-counter-row">
        <div class="counter-item">
          <span class="counter-num">1,247</span>
          <span class="counter-label">Happy Subscribers</span>
        </div>
        <div class="counter-divider"></div>
        <div class="counter-item">
          <span class="counter-num">∞</span>
          <span class="counter-label">Unsolicited Opinions</span>
        </div>
        <div class="counter-divider"></div>
        <div class="counter-item">
          <span class="counter-num">0</span>
          <span class="counter-label">Successful Cancellations</span>
        </div>
      </div>

      <p class="hero-fine-print">
        *"No credit card required" refers to the sign-up process only. Card will be requested during
        trial activation per our Standard Onboarding Protocol. *"Cancel anytime" refers to your right to
        <em>attempt</em> cancellation. Processing times may vary (3–5 business years).
        *"Risk-free" is defined solely by Sam's assessment of risk.
        Sam &amp; Fam LLC is not responsible for unsolicited advice given during or after subscription termination.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSubscription } from '../composables/useSubscription'

const { openModal } = useSubscription()

const year = new Date().getFullYear()
const viewers = ref(Math.floor(Math.random() * 15) + 40)

let interval
onMounted(() => {
  interval = setInterval(() => {
    viewers.value = Math.max(38, viewers.value + (Math.random() > 0.5 ? 1 : -1))
  }, 4000)
})
onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.hero {
  background: linear-gradient(150deg, var(--dark) 0%, var(--dark2) 55%, var(--dark3) 100%);
  color: white;
  padding: 5rem 1.5rem 4rem;
  position: relative;
  overflow: hidden;
}

.hero-bg-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

.hero-inner {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.hero-badge { }

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 6rem);
  letter-spacing: 0.04em;
  line-height: 1.05;
}
.hero-title-accent { color: var(--orange); }

.hero-sub {
  max-width: 600px;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.65;
}

.hero-social-proof {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.75);
}
.hero-social-proof .stars { font-size: 1rem; color: var(--yellow); }
.divider { opacity: 0.3; }

.pulse-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green-light);
  margin-right: 4px;
  animation: pulse-dot 1.5s infinite;
  vertical-align: middle;
}
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.7; }
}

.hero-main-cta {
  font-size: 1.2rem;
  padding: 1.1rem 3rem;
  animation: cta-pulse 2.5s infinite;
}
@keyframes cta-pulse {
  0%, 100% { box-shadow: var(--shadow-orange); }
  50% { box-shadow: 0 0 40px var(--orange-glow), 0 0 80px var(--orange-glow); }
}

.hero-cta-sub {
  display: flex;
  gap: 1rem;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.6);
  justify-content: center;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.hero-counter-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-lg);
  padding: 1.25rem 2rem;
  width: 100%;
  max-width: 520px;
}
@media (max-width: 480px) {
  .hero-counter-row {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .counter-divider { display: none; }
}
.counter-item { text-align: center; }
.counter-num {
  display: block;
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: 0.04em;
  color: var(--orange);
}
.counter-label { font-size: 0.75rem; color: rgba(255,255,255,0.55); }
.counter-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.15); }

.hero-fine-print {
  max-width: 650px;
  font-size: 0.62rem;
  color: rgba(255,255,255,0.3);
  line-height: 1.5;
  text-align: center;
}
</style>
