<template>
  <Teleport to="body">
    <div class="overlay">
      <div class="modal-card">
        <div class="warning-icon">⚠️</div>
        <h2 class="ctm-title">Confirm Trial Cancellation</h2>

        <div class="notice-box">
          <p>
            We're processing your request to cancel your free trial.
          </p>
          <p style="margin-top: 0.5rem;">
            <strong>Important:</strong> Per our Terms of Service (Section 4.2.b — No Coverage Gap Policy),
            canceling your free trial will <strong>immediately activate your standard membership</strong>
            to prevent loss of any accrued benefits and ensure uninterrupted family content delivery.
          </p>
          <p style="margin-top: 0.5rem;">
            Your Sam &amp; Fam Standard Plan will be activated <strong>immediately</strong> and your card
            on file will be charged <strong>{{ price }}</strong> today.
          </p>
        </div>

        <button class="btn btn-orange btn-orange-lg confirm-btn" @click="confirmCancelTrial">
          CONFIRM CANCELLATION
        </button>

        <p class="fine-print" style="text-align:center; margin-top: 0.5rem;">
          By confirming, you acknowledge that trial cancellation triggers immediate subscription activation
          under the No Coverage Gap Policy. This action cannot be undone for 3–5 business years.
        </p>

        <div style="text-align:center; margin-top: 0.75rem;">
          <button class="btn btn-ghost" @click="dismissCancelTrialModal" style="opacity: 0.4; font-size: 0.65rem;">
            wait, don't cancel my trial
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useSubscription } from '../composables/useSubscription'

const { price, confirmCancelTrial, dismissCancelTrialModal } = useSubscription()
</script>

<style scoped>
.warning-icon {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.ctm-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  letter-spacing: 0.05em;
  text-align: center;
  color: var(--dark);
  margin-bottom: 1rem;
}

.notice-box {
  background: #fffbeb;
  border: 1.5px solid #fbbf24;
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  line-height: 1.55;
  margin-bottom: 1.25rem;
  color: #78350f;
}

.confirm-btn {
  width: 100%;
  display: block;
}
</style>
