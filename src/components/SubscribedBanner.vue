<template>
  <!-- Trial banner -->
  <div v-if="isTrial" class="sub-banner banner-trial">
    <div class="banner-inner">
      <span>🎉 <strong>FREE TRIAL ACTIVE</strong> — 7 days remaining before you're charged {{ price }}</span>
      <div class="banner-actions">
        <button class="banner-btn banner-btn-view" @click="state.currentPage = 'home'">
          View Benefits →
        </button>
      </div>
    </div>
  </div>

  <!-- Active subscription banner -->
  <div v-else-if="isActive" class="sub-banner banner-active">
    <div class="banner-inner">
      <span>✅ <strong>SAM &amp; FAM MEMBER</strong> — {{ price }} — Thanks for your continued loyalty!</span>
      <div class="banner-actions">
        <button class="banner-btn banner-btn-view" @click="state.currentPage = 'home'">
          View Benefits →
        </button>
        <button class="banner-btn banner-btn-manage" @click="state.currentPage = 'billing'">
          Manage Subscription
        </button>
      </div>
    </div>
  </div>

  <!-- "Canceling" banner — still charging -->
  <div v-else-if="isCanceling" class="sub-banner banner-canceling">
    <div class="banner-inner">
      <span>
        ⏳ <strong>CANCELLATION PENDING</strong> — Processing (3–5 business years) — Billing continues in the meantime!
      </span>
      <div class="banner-actions">
        <button class="banner-btn banner-btn-manage" @click="state.currentPage = 'billing'">
          Check Status
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSubscription } from '../composables/useSubscription'

const { state, isTrial, isActive, isCanceling, price } = useSubscription()
</script>

<style scoped>
.sub-banner {
  position: sticky;
  top: 64px; /* below nav */
  z-index: 80;
  font-size: 0.85rem;
  font-weight: 600;
}

.banner-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.6rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.banner-trial { background: linear-gradient(90deg, #166534, #16a34a); color: white; }
.banner-active { background: linear-gradient(90deg, var(--dark), var(--dark2)); color: white; }
.banner-canceling { background: linear-gradient(90deg, #92400e, #b45309); color: white; }

.banner-actions { display: flex; align-items: center; gap: 0.75rem; }

.banner-btn {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: 0.75rem;
  padding: 0.4rem 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: opacity 0.15s;
}
.banner-btn:hover { opacity: 0.85; }

.banner-btn-view { background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); }
.banner-btn-manage { background: white; color: var(--dark); }
</style>
