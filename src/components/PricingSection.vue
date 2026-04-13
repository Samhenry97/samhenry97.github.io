<template>
  <section class="section pricing-section" id="pricing">
    <div class="container">
      <p class="badge badge-orange" style="display:block; text-align:center; margin-bottom:0.75rem;">PRICING</p>
      <h2 class="section-title">Simple, Transparent Pricing</h2>
      <p class="section-sub">One plan. No confusion. Just your wallet and Sam.</p>

      <!-- Toggle -->
      <div class="billing-toggle">
        <span :class="['toggle-label', selectedPlan === 'monthly' ? 'active' : '']">Monthly</span>
        <button class="toggle-switch" @click="togglePlan" :aria-pressed="selectedPlan === 'yearly'">
          <span class="toggle-knob" :class="{ right: selectedPlan === 'yearly' }"></span>
        </button>
        <span :class="['toggle-label', selectedPlan === 'yearly' ? 'active' : '']">
          Yearly
          <span class="save-badge">SAVE 17%</span>
        </span>
      </div>

      <div class="pricing-card-wrap">
        <div class="pricing-card">
          <!-- Urgency -->
          <div class="pricing-urgency">
            ⚡ {{ viewers }} people subscribed this week · Offer expires in {{ timer }}
          </div>

          <div class="pricing-header">
            <div class="pricing-name">Sam &amp; Fam Standard</div>
            <div class="pricing-price">
              <span class="price-amount">{{ selectedPlan === 'yearly' ? '$50' : '$5' }}</span>
              <span class="price-period">/ {{ selectedPlan === 'yearly' ? 'year' : 'month' }}</span>
            </div>
            <div v-if="selectedPlan === 'yearly'" class="price-breakdown">
              That's just $4.17/month! Billed annually.
            </div>
          </div>

          <ul class="pricing-features">
            <li v-for="f in features" :key="f">✅ {{ f }}</li>
          </ul>

          <!-- Dark-pattern checkbox row -->
          <div class="pricing-options">
            <label class="pricing-check">
              <input type="checkbox" v-model="autoRenew" />
              <span>Auto-renew <em>(strongly recommended)</em></span>
            </label>
            <label class="pricing-check">
              <input type="checkbox" v-model="agreeMarketing" />
              <span>Keep me updated with exclusive offers and family news</span>
            </label>
            <label class="pricing-check hard-to-see">
              <input type="checkbox" v-model="agreeArbitration" />
              <span>I agree to binding arbitration and waive my right to a class-action lawsuit against Sam &amp; Fam LLC</span>
            </label>
          </div>

          <button class="btn btn-orange pricing-cta" @click="openModal()">
            🚀 START FREE TRIAL — {{ selectedPlan === 'yearly' ? '$50/yr' : '$5/mo' }} AFTER 7 DAYS
          </button>

          <p class="fine-print" style="text-align:center; margin-top: 0.75rem;">
            By clicking, you agree to our Terms, Privacy Policy, Cancellation Policy, Arbitration Agreement,
            and Sam's personal Code of Conduct for Subscribers. Auto-renews unless canceled.
            Cancel anytime* (*see Cancellation Policy, Section 4.2.b through 4.2.zz).
            "Free trial" subject to card authorization for identity verification purposes.
            Sam &amp; Fam LLC reserves the right to reclassify your subscription tier at any time.
          </p>

          <div class="trust-row">
            <span>🔒 256-bit SSL</span>
            <span>🏆 Award-Winning</span>
            <span>✅ Cancel Anytime*</span>
            <span>💯 Satisfaction Guaranteed**</span>
          </div>
          <p class="fine-print" style="text-align:center;">
            **Guarantee valid for subscribers who are satisfied. Non-satisfied subscribers may submit a written complaint via certified mail to an address we will provide in 3–5 business years.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSubscription } from '../composables/useSubscription'

const { state, openModal } = useSubscription()

const selectedPlan = ref(state.selectedPlan || 'monthly')
const autoRenew = ref(true)
const agreeMarketing = ref(true)
const agreeArbitration = ref(true)

const viewers = ref(Math.floor(Math.random() * 30) + 120)
const timer = ref('09:59')

let timerInterval
onMounted(() => {
  let secs = 9 * 60 + 59
  timerInterval = setInterval(() => {
    secs--
    if (secs < 0) secs = 9 * 60 + 59
    const m = Math.floor(secs / 60)
    const s = secs % 60
    timer.value = `${m}:${s.toString().padStart(2, '0')}`
  }, 1000)
})
onUnmounted(() => clearInterval(timerInterval))

function togglePlan() {
  selectedPlan.value = selectedPlan.value === 'monthly' ? 'yearly' : 'monthly'
  state.selectedPlan = selectedPlan.value
}

const features = [
  "Sam's Unsolicited Life Advice (Board Gaming, Video Games, Running & More)",
  'Family Emergency Contact on File',
  'Full Intervention Package (Scheduling Required)',
  'Daily Dad Joke Delivery — The Good Ones',
  'Priority Seating at All Family Gatherings*',
  'Secret Family Recipe Vault (No Measurements Included)',
  'Toddler Whisperer Hotline (Response Time: 1–3 Days)',
  'Running Accountability Texts (Irregular Frequency)',
  'Monthly Game Night Pick (Sam Decides, No Vetoes)',
  'Annual Smurf Development Report',
  'Group Chat Highlight Reel',
  'Hot Takes on Any Topic (5–7 Business Day Delivery)',
  'The Right to Request Cancellation',
]
</script>

<style scoped>
.pricing-section {
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
}

.billing-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.toggle-label {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--gray);
  transition: color 0.15s;
}
.toggle-label.active { color: var(--dark); }

.save-badge {
  background: var(--green);
  color: white;
  font-size: 0.6rem;
  font-weight: 900;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  letter-spacing: 0.07em;
  margin-left: 0.3rem;
}

.toggle-switch {
  width: 48px;
  height: 26px;
  border-radius: 13px;
  background: #e2e8f0;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}
.toggle-switch:has(.right) { background: var(--green); }

.toggle-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: left 0.2s;
}
.toggle-knob.right { left: 25px; }

.pricing-card-wrap {
  max-width: 560px;
  margin: 0 auto;
}

.pricing-card {
  background: var(--white);
  border: 2px solid var(--dark2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.pricing-urgency {
  background: linear-gradient(135deg, var(--dark), var(--dark2));
  color: rgba(255,255,255,0.9);
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  padding: 0.5rem;
}

.pricing-header {
  padding: 1.75rem 2rem 1.25rem;
  border-bottom: 1.5px solid var(--gray-light);
  text-align: center;
}

.pricing-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  color: var(--dark);
  margin-bottom: 0.5rem;
}

.pricing-price { display: flex; align-items: baseline; justify-content: center; gap: 0.25rem; }
.price-amount { font-size: 3rem; font-weight: 900; color: var(--dark); font-family: var(--font-display); letter-spacing: 0.02em; }
.price-period { font-size: 1rem; color: var(--gray); }

.price-breakdown { font-size: 0.8rem; color: var(--green); font-weight: 700; margin-top: 0.25rem; }

.pricing-features {
  list-style: none;
  padding: 1.25rem 2rem;
  border-bottom: 1.5px solid var(--gray-light);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.pricing-features li { font-size: 0.875rem; color: #374151; }

.pricing-options {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1.5px solid var(--gray-light);
}

.pricing-check {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--gray);
  cursor: pointer;
}
.pricing-check input { accent-color: var(--green); margin-top: 2px; flex-shrink: 0; }

.hard-to-see {
  opacity: 0.45;
  font-size: 0.65rem !important;
}
.hard-to-see span { color: #94a3b8 !important; }

.pricing-cta {
  display: block;
  width: calc(100% - 4rem);
  margin: 1.25rem 2rem 0;
  padding: 1rem;
  font-size: 1rem;
}

.trust-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 0.72rem;
  color: var(--gray);
  font-weight: 700;
  padding: 0.75rem 2rem 0;
}
</style>
