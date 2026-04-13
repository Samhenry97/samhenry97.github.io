<template>
  <nav class="navbar">
    <div class="nav-inner">
      <a href="#" class="nav-logo">Sam &amp; Fam</a>

      <div class="nav-links">
        <a href="#features">Benefits</a>
        <a href="#compare">Plans</a>
        <a href="#testimonials">Reviews</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>

      <button
        class="btn btn-orange nav-cta"
        @click="openModal()"
        v-if="!isEngaged"
      >
        FREE TRIAL
      </button>

      <div v-else class="nav-account">
        <span class="nav-account-badge">
          {{ isActive ? '✅ Member' : isTrial ? '🎉 Trial' : '⏳ Pending' }}
        </span>
        <button class="hamburger" @click="state.showSidebar = true" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSubscription } from '../composables/useSubscription'

const { state, isEngaged, isActive, isTrial, openModal } = useSubscription()
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--dark);
  box-shadow: 0 2px 20px rgba(0,0,0,0.3);
  height: 64px;
  display: flex;
  align-items: center;
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--white);
  text-decoration: none;
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
}
.nav-logo span { color: var(--orange); }

.nav-links {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}
.nav-links a {
  color: rgba(255,255,255,0.75);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.15s;
}
.nav-links a:hover { color: white; }

.nav-cta { padding: 0.55rem 1.25rem; font-size: 0.85rem; flex-shrink: 0; }

.nav-account { margin-left: auto; }

.nav-account-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .nav-links { display: none; }
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px;
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  margin-left: 0.5rem;
}
.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: white;
  border-radius: 2px;
}
@media (max-width: 640px) {
  .hamburger { display: flex; }
}
</style>
