<template>
  <Teleport to="body">
    <div class="overlay">
      <div class="modal-card welcome-card">
        <div class="welcome-icon">🎉</div>

        <h2 class="welcome-title">Trial Successfully Canceled!</h2>
        <p class="welcome-sub">Your free trial has been canceled per your request.</p>

        <div class="welcome-box">
          <p>
            Per the <strong>No Coverage Gap Policy (§4.2.b)</strong>, your trial cancellation has been
            processed and your <strong>Sam &amp; Fam Standard Membership</strong> has been
            <strong style="color: var(--green);">immediately activated</strong> to ensure
            zero interruption to your family content experience.
          </p>
          <p style="margin-top: 0.65rem;">
            Your card has been charged <strong>{{ price }}</strong>. Welcome to the full experience.
            You are now a member. This is great news.
          </p>
        </div>

        <div class="welcome-perks">
          <div class="perk"><span>✅</span> Full dashboard access — unlocked</div>
          <div class="perk"><span>✅</span> Emergency contact — Sam is on file</div>
          <div class="perk"><span>✅</span> 3D print — queued (item TBD)</div>
          <div class="perk"><span>✅</span> Trial status — successfully canceled</div>
        </div>

        <button class="btn btn-orange btn-orange-lg welcome-btn" @click="close">
          🚀 ENTER THE FULL EXPERIENCE
        </button>

        <p class="fine-print" style="text-align: center; margin-top: 0.75rem;">
          Membership renews automatically at {{ price }}. To cancel, visit Billing and locate the
          cancellation option. Processing time: 3–5 business years. Thank you for canceling your trial.
          You are now a subscriber.
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useSubscription } from '../composables/useSubscription'

const { state, price } = useSubscription()

function close() {
  state.showWelcomeModal = false
}
</script>

<style scoped>
.welcome-card {
  max-width: 460px;
  text-align: center;
}

.welcome-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.welcome-title {
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: 0.05em;
  color: var(--dark);
  margin-bottom: 0.25rem;
}

.welcome-sub {
  font-size: 0.85rem;
  color: var(--gray);
  margin-bottom: 1rem;
}

.welcome-box {
  background: #f0fdf4;
  border: 1.5px solid #86efac;
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #166534;
  text-align: left;
  margin-bottom: 1rem;
}

.welcome-perks {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
  text-align: left;
}
.perk {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--dark);
}
.perk span { font-size: 1rem; }

.welcome-btn {
  width: 100%;
  display: block;
}
</style>
