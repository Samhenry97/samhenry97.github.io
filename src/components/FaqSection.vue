<template>
  <section class="section faq-section" id="faq">
    <div class="container">
      <p class="badge badge-orange" style="display:block; text-align:center; margin-bottom:0.75rem;">FAQ</p>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-sub">We've heard all of these questions before. Some of them from lawyers.</p>

      <div class="faq-list">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ open: openIndex === i }"
        >
          <button class="faq-question" @click="toggle(i)">
            <span>{{ item.q }}</span>
            <span class="faq-chevron">{{ openIndex === i ? '▲' : '▼' }}</span>
          </button>
          <div class="faq-answer" v-show="openIndex === i">
            <p v-html="item.a"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(0)
function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely! You have the <em>right to initiate</em> a cancellation at any time. Cancellation requests are processed within 3–5 business years on a first-come, first-served basis. Billing continues during the processing period to ensure uninterrupted access to your benefits. We appreciate your patience and ongoing financial support.',
  },
  {
    q: 'What happens if I cancel my free trial?',
    a: 'Great news — canceling your free trial is easy! Per our No Coverage Gap Policy (Terms of Service, Section 4.2.b), canceling your free trial activates your standard Sam & Fam membership immediately, ensuring you never lose access to any accrued benefits. Your card will be charged the standard rate on the day of cancellation. This is a feature, not a bug.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'We use industry-standard 256-bit SSL encryption. We only share your data with trusted third parties, including Sam, Ari, assorted family members, and whichever board game manufacturer Sam is currently enthusiastic about. Your card details are stored using the highest standards available to a family LLC.',
  },
  {
    q: 'What if I miss a payment?',
    a: 'No problem! If a payment fails, your subscription will automatically upgrade to our Premium Tier at $15/month for enhanced stability. After three failed payments, you will be enrolled in our Family Outreach Program, which is just Sam texting you about it.',
  },
  {
    q: 'How does the Emergency Contact service work?',
    a: 'Upon subscribing, Sam\'s name and number will be listed as your emergency contact in all the forms you submit yourself. Sam will attempt to respond within 1–3 business days. Response quality may vary depending on whether Sam is in a board game campaign, at game night, mid-run, or advising another subscriber.',
  },
  {
    q: 'Can I share my subscription with family members?',
    a: 'Each family member requires their own subscription. Family discounts are not available at this time, though Sam may informally sign family members up without their knowledge, which is a separate but related service.',
  },
  {
    q: 'What are "the good dad jokes" vs. the free ones?',
    a: 'Free subscribers receive Sam\'s Tier-3 dad joke rotation, which is available freely on the internet. Sam & Fam Premium subscribers receive the Tier-1 jokes, which Sam made up himself and has tested on his kids. Bendy Boy laughed at one (it may have been unrelated). Results not guaranteed.',
  },
  {
    q: 'What counts as "priority seating" at family events?',
    a: 'Priority seating means your name will be verbally noted as wanting a main-table seat. Final seating authority rests with Grandma, who will arrange things how she wants regardless of this service. Sam & Fam LLC is not responsible for seating outcomes at events managed by Grandma.',
  },
  {
    q: 'I already tried to cancel. Why am I still being charged?',
    a: 'Your cancellation request is in queue! Processing times are 3–5 business years. You can check your status by initiating a new cancellation request, which will reset your position in the queue. We recommend staying subscribed during this period to avoid a gap in coverage.',
  },
  {
    q: 'Is Sam & Fam a real company?',
    a: 'Sam & Fam LLC is a registered limited liability company in Sam\'s imagination, incorporated in the Great State of Family. We operate with full legal authority under the jurisdiction of whoever is currently in charge at family dinner. Consult a lawyer before making financial decisions based on this website.',
  },
]
</script>

<style scoped>
.faq-section { background: var(--white); }

.faq-list {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-item {
  border: 1.5px solid var(--gray-light);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.15s;
}
.faq-item.open { border-color: var(--orange); }

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--dark);
  text-align: left;
  transition: background 0.15s;
}
.faq-question:hover { background: #f8fafc; }

.faq-chevron { flex-shrink: 0; font-size: 0.7rem; color: var(--gray); }

.faq-answer {
  padding: 0 1.25rem 1rem;
  font-size: 0.875rem;
  color: var(--gray);
  line-height: 1.7;
  border-top: 1px solid var(--gray-light);
}
</style>
