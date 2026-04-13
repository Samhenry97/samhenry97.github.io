<template>
  <Teleport to="body">
    <div class="overlay">
      <div class="modal-card cancel-card">

        <!-- Step indicator -->
        <div class="step-indicator">
          <span
            v-for="n in 8"
            :key="n"
            class="step-dot"
            :class="{ active: state.cancelStep === n, done: state.cancelStep > n }"
          ></span>
        </div>

        <!-- Step 1: Discount -->
        <div v-if="state.cancelStep === 1" class="cancel-step">
          <div class="step-emoji">😢</div>
          <h2 class="cancel-title">Wait! Please Don't Go!</h2>
          <p class="cancel-desc">We hate to see you leave. That's why we're offering you an exclusive <strong style="color:var(--green)">20% discount</strong> for the next 6 months — just for considering cancellation!</p>
          <div class="offer-box">
            <div class="offer-badge">EXCLUSIVE RETENTION OFFER</div>
            <p style="font-weight:800;font-size:1.2rem;color:var(--dark);">Only {{ discountedPrice }}/{{ period }} for 6 months!</p>
            <p class="fine-print">Then returns to standard rate. Offer non-transferable. Void where prohibited. Not valid in 47 states.</p>
          </div>
          <button class="btn btn-green accept-btn" @click="abandonCancellation">✅ YES! Accept My 20% Discount</button>
          <div style="text-align:center;margin-top:0.5rem;">
            <button class="btn btn-ghost" @click="nextCancelStep">No thanks, I'm bad at math</button>
          </div>
        </div>

        <!-- Step 2: Loss aversion -->
        <div v-else-if="state.cancelStep === 2" class="cancel-step">
          <div class="step-emoji">😱</div>
          <h2 class="cancel-title">You'll Lose Access To...</h2>
          <ul class="loss-list">
            <li>🎲 Sam's Unsolicited Board Game Advice <span class="forever">FOREVER</span></li>
            <li>📞 Your Family Emergency Contact on file</li>
            <li>🎭 All pre-booked Intervention Sessions</li>
            <li>🪑 Your reserved Thanksgiving main-table seat</li>
            <li>😂 The <em>good</em> dad jokes</li>
            <li>🖨️ Quarterly 3D print (currently mid-job)</li>
            <li>👶 Smurf development updates</li>
          </ul>
          <p class="cancel-desc" style="margin-top:1rem;color:var(--red);font-weight:700;">Are you SURE you want to give all of this up?</p>
          <button class="btn btn-orange accept-btn" @click="abandonCancellation">🙏 Keep My Subscription</button>
          <div style="text-align:center;margin-top:0.5rem;">
            <button class="btn btn-ghost" @click="nextCancelStep">I don't need Sam's advice</button>
          </div>
        </div>

        <!-- Step 3: Gift offer -->
        <div v-else-if="state.cancelStep === 3" class="cancel-step">
          <div class="step-emoji">🎁</div>
          <h2 class="cancel-title">Our Absolute Final Offer</h2>
          <p class="cancel-desc">This is the last thing we'll throw at you. We promise.*</p>
          <div class="offer-box" style="border-color:var(--orange);">
            <div class="offer-badge" style="background:var(--orange);">FINAL OFFER — EXPIRES WHEN YOU SCROLL</div>
            <p style="font-weight:800;font-size:1rem;color:var(--dark);margin:0.5rem 0;">
              🎭 3 Bonus Intervention Sessions (valued at $0)<br/>
              🎲 Lifetime Board Game Excuse Pack<br/>
              👶 Priority Smurf Photo Access<br/>
              🏆 "I Almost Cancelled" Achievement Badge
            </p>
          </div>
          <button class="btn btn-orange accept-btn" @click="abandonCancellation">🎉 Save My Subscription + Claim Gifts</button>
          <div style="text-align:center;margin-top:0.5rem;">
            <button class="btn btn-ghost" @click="nextCancelStep" style="opacity:0.35;font-size:0.65rem;">proceed with cancellation</button>
          </div>
          <p class="fine-print" style="margin-top:0.5rem;text-align:center;">*Not actually a promise. More offers may follow via certified mail.</p>
        </div>

        <!-- Step 4: Bad survey -->
        <div v-else-if="state.cancelStep === 4" class="cancel-step">
          <div class="step-emoji">📋</div>
          <h2 class="cancel-title">Before You Go...</h2>
          <p class="cancel-desc">Help us improve by selecting your reason for cancellation. <strong>A selection is required to proceed.</strong></p>
          <div class="survey-options">
            <label v-for="opt in surveyOptions" :key="opt.value" class="survey-option" :class="{ selected: surveyAnswer === opt.value }">
              <input type="radio" :value="opt.value" v-model="surveyAnswer" />
              <span>{{ opt.label }}</span>
            </label>
          </div>
          <div v-if="surveyAnswer" class="survey-response">
            <strong>Our response:</strong> {{ surveyResponses[surveyAnswer] }}
          </div>
          <button
            class="btn btn-outline accept-btn"
            :disabled="!surveyAnswer"
            :style="!surveyAnswer ? 'opacity:0.3;cursor:not-allowed;' : ''"
            @click="nextCancelStep"
          >
            Submit Feedback & Continue
          </button>
          <div style="text-align:center;margin-top:0.5rem;">
            <button class="btn btn-ghost" @click="abandonCancellation" style="color:var(--green);">Actually, never mind</button>
          </div>
        </div>

        <!-- Step 5: Type the phrase -->
        <div v-else-if="state.cancelStep === 5" class="cancel-step">
          <div class="step-emoji">📝</div>
          <h2 class="cancel-title">Final Confirmation Required</h2>
          <p class="cancel-desc">To complete your cancellation, please type the following phrase <em>exactly</em>:</p>
          <div class="phrase-box">I HEREBY RELINQUISH MY SAM AND FAM MEMBERSHIP AND ALL ASSOCIATED BENEFITS INCLUDING PRIORITY SEATING AT THANKSGIVING</div>
          <textarea v-model="confirmText" class="confirm-textarea" placeholder="Type the phrase above..." rows="3"></textarea>
          <button
            class="btn btn-outline accept-btn"
            :disabled="!confirmMatch"
            :style="!confirmMatch ? 'opacity:0.3;cursor:not-allowed;' : ''"
            @click="nextCancelStep"
          >
            Submit Cancellation Request
          </button>
          <div style="text-align:center;margin-top:0.5rem;">
            <button class="btn btn-ghost" @click="abandonCancellation" style="color:var(--green);">Actually, I'll keep my subscription</button>
          </div>
        </div>

        <!-- Step 6: Mandatory cooling off countdown -->
        <div v-else-if="state.cancelStep === 6" class="cancel-step">
          <div class="step-emoji">⏳</div>
          <h2 class="cancel-title">Mandatory Cooling-Off Period</h2>
          <p class="cancel-desc">
            Federal Subscription Law (§ 47-B, subsection 12) requires a mandatory
            cooling-off period before cancellation can be processed.
            <strong>This cannot be skipped.</strong>
          </p>
          <div class="countdown-wrap">
            <div class="countdown-ring">
              <svg viewBox="0 0 80 80" class="countdown-svg">
                <circle cx="40" cy="40" r="34" class="ring-bg" />
                <circle cx="40" cy="40" r="34" class="ring-fill" :style="ringStyle" />
              </svg>
              <div class="countdown-num">{{ cooldownLeft }}</div>
            </div>
            <p style="font-size:0.8rem;color:var(--gray);margin-top:0.75rem;">
              Please take this time to reflect on your decision.<br/>
              <em>Sam is also reflecting. On your decision.</em>
            </p>
          </div>
          <button
            class="btn btn-outline accept-btn"
            :disabled="cooldownLeft > 0"
            :style="cooldownLeft > 0 ? 'opacity:0.3;cursor:not-allowed;' : ''"
            @click="nextCancelStep"
          >
            {{ cooldownLeft > 0 ? `Please wait ${cooldownLeft}s...` : 'Continue with Cancellation' }}
          </button>
          <p class="fine-print" style="text-align:center;margin-top:0.5rem;">
            "Federal Subscription Law § 47-B" is not a real law. The countdown is still mandatory.
          </p>
        </div>

        <!-- Step 7: Sam's farewell -->
        <div v-else-if="state.cancelStep === 7" class="cancel-step">
          <div class="step-emoji">💌</div>
          <h2 class="cancel-title">A Personal Note from Sam</h2>
          <div class="farewell-letter">
            <p>I want you to know that I don't hold this against you.</p>
            <p>You gave it a shot. You saw the dad jokes. You had priority seating — briefly. You experienced the intervention request form. That was real.</p>
            <p>I'm going to be okay. Ari said I'd be okay. She's usually right about these things, which is why she has her own column.</p>
            <p>The 3D printer is still running. Bendy Boy threw a ball this morning. Lay-Lay is being Elsa again. Life goes on.</p>
            <p>I hope you find whatever you're looking for out there. I hope it's a good board game. I hope you read the rulebook fully before playing.</p>
            <p style="margin-top:0.75rem;">Goodbye.</p>
            <p><em>— Sam</em></p>
            <p class="fine-print" style="margin-top:0.75rem;">P.S. The 3D print that was already in progress will still be mailed to you. There's no way to stop it at this point.</p>
          </div>
          <button class="btn btn-outline accept-btn" style="margin-top:1rem;" @click="nextCancelStep">
            Okay. Cancel it.
          </button>
          <div style="text-align:center;margin-top:0.5rem;">
            <button class="btn btn-ghost" @click="abandonCancellation" style="color:var(--green);font-size:0.75rem;">
              I changed my mind. I'll stay.
            </button>
          </div>
        </div>

        <!-- Step 8: Actually cancelled -->
        <div v-else-if="state.cancelStep === 8" class="cancel-step">
          <div class="step-emoji">🏳️</div>
          <h2 class="cancel-title">You Did It.</h2>
          <p class="cancel-desc">Your subscription has been cancelled. Effective immediately. We're as surprised as you are that you made it through.</p>
          <div class="offer-box" style="border-color:#94a3b8;background:#f8fafc;text-align:left;">
            <p style="font-size:0.85rem;line-height:1.8;">
              ✅ <strong>Status:</strong> Cancelled (for real this time)<br/>
              💳 <strong>Billing:</strong> Stopped<br/>
              🪑 <strong>Thanksgiving seating:</strong> Reverted to general population<br/>
              😂 <strong>Dad jokes:</strong> You're back to the bad ones<br/>
              🖨️ <strong>Pending 3D print:</strong> Still coming. Nothing can stop it.
            </p>
          </div>
          <button class="btn btn-orange accept-btn" @click="completeCancellation">Close</button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useSubscription } from '../composables/useSubscription'

const { state, price, period, nextCancelStep, abandonCancellation, completeCancellation } = useSubscription()

const discountedPrice = computed(() => state.plan === 'yearly' ? '$40/yr' : '$4/mo')

// Step 4 — survey
const surveyAnswer = ref('')
const surveyOptions = [
  { value: 'broke',     label: "I can't afford $5/month" },
  { value: 'irrelevant',label: "The content isn't relevant to me" },
  { value: 'better',    label: "I found a better subscription service" },
  { value: 'never',     label: "I never agreed to this subscription" },
  { value: 'testing',   label: "I just want to see what happens when I cancel" },
  { value: 'family',    label: "I'm related to Sam and this is embarrassing" },
]
const surveyResponses = {
  broke:      "We've noted that $5/month is outside your budget. This has been forwarded to Sam, who is concerned. Proceeding.",
  irrelevant: "Our records suggest you are, in fact, family.",
  better:     "We'd like the name of this service. For legal reasons.",
  never:      "Section 4.2.b suggests otherwise.",
  testing:    "An understandable reason. Noted. Proceeding.",
  family:     "This is our most common cancellation reason. Proceeding.",
}

// Step 5 — phrase confirmation
const confirmText = ref('')
const TARGET = 'I HEREBY RELINQUISH MY SAM AND FAM MEMBERSHIP AND ALL ASSOCIATED BENEFITS INCLUDING PRIORITY SEATING AT THANKSGIVING'
const confirmMatch = computed(() => confirmText.value.trim() === TARGET)

// Step 6 — countdown
const COOLDOWN = 10
const cooldownLeft = ref(COOLDOWN)
let cooldownInterval = null

const ringCircumference = 2 * Math.PI * 34 // r=34
const ringStyle = computed(() => {
  const progress = cooldownLeft.value / COOLDOWN
  const offset = ringCircumference * (1 - progress)
  return {
    strokeDasharray: ringCircumference,
    strokeDashoffset: offset,
    transition: 'stroke-dashoffset 1s linear',
  }
})

// Start countdown when we land on step 6
watch(() => state.cancelStep, (step) => {
  if (step === 6) {
    cooldownLeft.value = COOLDOWN
    cooldownInterval = setInterval(() => {
      cooldownLeft.value--
      if (cooldownLeft.value <= 0) {
        clearInterval(cooldownInterval)
        cooldownInterval = null
      }
    }, 1000)
  } else {
    if (cooldownInterval) { clearInterval(cooldownInterval); cooldownInterval = null }
  }
})

onUnmounted(() => { if (cooldownInterval) clearInterval(cooldownInterval) })
</script>

<style scoped>
.cancel-card { max-width: 500px; }
.cancel-step { display: flex; flex-direction: column; }

/* Step indicator */
.step-indicator {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  margin-bottom: 1.25rem;
}
.step-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--gray-light);
  transition: background 0.2s;
}
.step-dot.active { background: var(--orange); }
.step-dot.done { background: var(--green); }

.step-emoji { text-align: center; font-size: 3rem; margin-bottom: 0.5rem; }

.cancel-title {
  font-family: var(--font-display);
  font-size: 1.9rem;
  letter-spacing: 0.05em;
  text-align: center;
  color: var(--dark);
  margin-bottom: 0.75rem;
}
.cancel-desc { text-align: center; color: var(--gray); font-size: 0.95rem; margin-bottom: 1rem; }

.offer-box { border: 2px solid var(--green); border-radius: var(--radius); padding: 1rem 1.25rem; margin-bottom: 1.25rem; text-align: center; }
.offer-badge { background: var(--green); color: white; font-size: 0.65rem; font-weight: 900; padding: 0.2rem 0.6rem; border-radius: 4px; letter-spacing: 0.08em; display: inline-block; margin-bottom: 0.5rem; }
.accept-btn { width: 100%; display: block; padding: 1rem; }

.loss-list { list-style: none; font-size: 0.9rem; line-height: 1.9; }
.loss-list li { border-bottom: 1px solid var(--gray-light); padding: 0.2rem 0; }
.forever { background: var(--red); color: white; font-size: 0.6rem; font-weight: 900; padding: 0.1rem 0.35rem; border-radius: 3px; letter-spacing: 0.07em; margin-left: 0.3rem; vertical-align: middle; }

/* Survey */
.survey-options { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.75rem; }
.survey-option {
  display: flex; align-items: center; gap: 0.6rem;
  border: 1.5px solid var(--gray-light);
  border-radius: 8px; padding: 0.6rem 0.75rem;
  cursor: pointer; font-size: 0.875rem; font-weight: 600;
  transition: border-color 0.15s, background 0.15s;
}
.survey-option.selected { border-color: var(--orange); background: #fff8f5; }
.survey-option input { accent-color: var(--orange); flex-shrink: 0; }

.survey-response {
  background: #fffbeb; border: 1.5px solid var(--yellow);
  border-radius: 8px; padding: 0.75rem; font-size: 0.85rem;
  color: #78350f; margin-bottom: 0.75rem; line-height: 1.5;
}

/* Phrase */
.phrase-box { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 0.75rem; user-select: all; cursor: text; }
.confirm-textarea { width: 100%; border: 1.5px solid var(--gray-light); border-radius: 8px; padding: 0.75rem; font-family: var(--font-body); font-size: 0.85rem; resize: none; margin-bottom: 0.75rem; }
.confirm-textarea:focus { outline: none; border-color: var(--orange); }

/* Countdown */
.countdown-wrap { display: flex; flex-direction: column; align-items: center; margin-bottom: 1.25rem; }
.countdown-ring { position: relative; width: 80px; height: 80px; }
.countdown-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.ring-bg { fill: none; stroke: var(--gray-light); stroke-width: 6; }
.ring-fill { fill: none; stroke: var(--orange); stroke-width: 6; stroke-linecap: round; }
.countdown-num { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.8rem; color: var(--dark); letter-spacing: 0.02em; }

/* Farewell */
.farewell-letter {
  background: #f8fafc; border: 1.5px solid var(--gray-light);
  border-radius: var(--radius); padding: 1.25rem;
  font-size: 0.875rem; line-height: 1.9; color: #374151;
  display: flex; flex-direction: column; gap: 0.5rem;
  font-style: italic;
}
</style>
