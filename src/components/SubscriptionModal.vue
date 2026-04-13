<template>
  <Teleport to="body">
    <div class="overlay" @click.self="noop">
      <div class="modal-card sub-modal">
        <!-- Urgency ribbon -->
        <div class="urgency-ribbon">🔥 LIMITED TIME OFFER — EXPIRES IN {{ timer }}</div>

        <div class="modal-badge badge badge-green">YOU'VE BEEN PRE-SELECTED!</div>
        <h2 class="modal-title">Your FREE Trial<br/>is Waiting</h2>
        <p class="modal-desc">
          Get <strong>7 days of unlimited Sam &amp; Fam access</strong> — absolutely free!*
          No commitment. Cancel anytime.*
        </p>

        <!-- Fake viewer count -->
        <div class="viewer-count">
          <span class="pulse-dot"></span>
          <strong>{{ viewers }}</strong> people are currently viewing this offer
        </div>

        <!-- Plan toggle -->
        <div class="plan-toggle">
          <button
            :class="['plan-btn', state.selectedPlan === 'monthly' ? 'active' : '']"
            @click="state.selectedPlan = 'monthly'"
          >Monthly<br/><span>$5/mo</span></button>
          <button
            :class="['plan-btn', state.selectedPlan === 'yearly' ? 'active' : '']"
            @click="state.selectedPlan = 'yearly'"
          >
            Yearly<br/><span>$50/yr</span>
            <div class="best-value-tag">BEST VALUE</div>
          </button>
        </div>

        <!-- Pre-checked checkbox (hard to uncheck without noticing) -->
        <label class="autorenew-label">
          <input type="checkbox" v-model="autoRenew" />
          <span>Auto-renew enabled <em>(strongly recommended)</em></span>
        </label>

        <button class="btn btn-green btn-lg trial-cta" @click="startTrial">
          🚀 START FREE TRIAL — {{ state.selectedPlan === 'yearly' ? '$50/yr' : '$5/mo' }} AFTER 7 DAYS
        </button>

        <p class="fine-print" style="margin-top: 0.75rem; text-align:center;">
          *By clicking "Start Free Trial" you agree to our
          <a href="#" @click.prevent class="fine-link">Terms of Service</a>,
          <a href="#" @click.prevent class="fine-link">Privacy Policy</a>, Cancellation Policy,
          Auto-Renewal Policy, Family Arbitration Agreement, and the Sam &amp; Fam Code of Conduct.
          After your 7-day trial, you will be billed {{ state.selectedPlan === 'yearly' ? '$50.00 per year' : '$5.00 per month' }}
          until you cancel. Canceling your free trial will immediately activate your standard subscription
          to prevent loss of accrued benefits (see Section 4.2.b). Your card will be charged upon
          trial cancellation per our no-gap-in-coverage policy. "Cancel anytime" refers to the ability to initiate
          a cancellation request, not to the immediate termination of your subscription.
          Allow 3–5 business years for cancellation processing. Sam &amp; Fam LLC is not responsible
          for any emotional distress caused by unsolicited life advice.
        </p>

        <div style="text-align:center; margin-top: 0.5rem;">
          <button class="btn btn-ghost" @click="maybeLater">
            No thanks, I prefer bad advice for free
          </button>
        </div>

        <div class="trust-badges">
          <span>🔒 Secure</span>
          <span>✅ Cancel Anytime*</span>
          <span>⭐ 5-Star Rated</span>
          <span>🏆 Award-Winning</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSubscription } from '../composables/useSubscription'

const { state, startTrial, closeModal } = useSubscription()

const autoRenew = ref(true)
const viewers = ref(Math.floor(Math.random() * 20) + 38)
const timer = ref('14:59')

let timerInterval, viewerInterval

onMounted(() => {
  let secs = 14 * 60 + 59
  timerInterval = setInterval(() => {
    secs--
    if (secs <= 0) secs = 14 * 60 + 59 // resets — always urgent
    const m = Math.floor(secs / 60)
    const s = secs % 60
    timer.value = `${m}:${s.toString().padStart(2, '0')}`
  }, 1000)

  viewerInterval = setInterval(() => {
    viewers.value = Math.max(35, viewers.value + (Math.random() > 0.5 ? 1 : -1))
  }, 3000)
})

onUnmounted(() => {
  clearInterval(timerInterval)
  clearInterval(viewerInterval)
})

function maybeLater() {
  closeModal()
}

function noop() {} // prevent close on overlay click — they're trapped
</script>

<style scoped>
.sub-modal {
  max-width: 520px;
  padding: 0;
  overflow: hidden;
}

.urgency-ribbon {
  background: linear-gradient(135deg, var(--red), #b91c1c);
  color: white;
  text-align: center;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 0.5rem;
  letter-spacing: 0.05em;
  animation: pulse-bg 1.5s infinite;
}

@keyframes pulse-bg {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

.modal-badge {
  display: block;
  margin: 1.5rem auto 0.75rem;
  text-align: center;
  width: fit-content;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 2.4rem;
  letter-spacing: 0.05em;
  text-align: center;
  color: var(--dark);
  line-height: 1.1;
  margin-bottom: 0.75rem;
  padding: 0 1.5rem;
}

.modal-desc {
  text-align: center;
  color: var(--gray);
  font-size: 0.95rem;
  padding: 0 2rem;
  margin-bottom: 1rem;
}

.viewer-count {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--gray);
  margin-bottom: 1rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green-light);
  animation: pulse-dot 1.5s infinite;
  flex-shrink: 0;
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.7; }
}

.plan-toggle {
  display: flex;
  gap: 0.5rem;
  margin: 0 1.5rem 1rem;
}

.plan-btn {
  flex: 1;
  border: 2px solid var(--gray-light);
  border-radius: var(--radius);
  padding: 0.75rem;
  cursor: pointer;
  background: var(--light);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.15s;
  position: relative;
}
.plan-btn span { font-size: 0.75rem; font-weight: 600; color: var(--gray); display: block; }
.plan-btn.active {
  border-color: var(--green);
  background: #f0fdf4;
  color: var(--green);
}
.plan-btn.active span { color: var(--green); }

.best-value-tag {
  position: absolute;
  top: -10px;
  right: -6px;
  background: var(--orange);
  color: white;
  font-size: 0.6rem;
  font-weight: 900;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  letter-spacing: 0.06em;
}

.autorenew-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1.5rem 1rem;
  font-size: 0.8rem;
  color: var(--gray);
  cursor: pointer;
}
.autorenew-label input { accent-color: var(--green); }
.autorenew-label em { font-size: 0.72rem; }

.trial-cta {
  width: calc(100% - 3rem);
  margin: 0 1.5rem;
  padding: 1rem;
  font-size: 1rem;
  display: block;
}

.fine-link {
  color: #94a3b8;
  font-size: 0.65rem;
}

.trust-badges {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-size: 0.72rem;
  color: var(--gray);
  font-weight: 700;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid var(--gray-light);
  margin-top: 0.75rem;
}
</style>
