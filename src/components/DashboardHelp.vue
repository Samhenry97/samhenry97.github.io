<template>
  <div class="help-wrap">

    <div class="help-header">
      <h2 class="help-title">❓ Help Center</h2>
      <p class="help-sub">Answers to your questions, whether they're good questions or not.</p>
      <div class="help-search-row">
        <input class="help-search" placeholder="Search help articles..." v-model="searchQuery" />
        <button class="help-search-btn" @click="doSearch">Search</button>
      </div>
    </div>

    <!-- Live chat status -->
    <div class="chat-bar">
      <span class="chat-status-dot offline"></span>
      <span class="chat-text">
        <strong>Live Chat:</strong> Sam is currently unavailable.
        <span class="chat-reason">{{ chatReason }}</span>
      </span>
      <button class="chat-btn" @click="windowAlert('Message sent. Sam will respond when available.\n\nEstimated response: 1–3 business days.\n\nIf this is a board game question, response may be significantly longer.')">Leave a Message</button>
    </div>

    <!-- FAQ -->
    <div class="help-section">
      <div class="help-section-title">FREQUENTLY ASKED QUESTIONS</div>
      <div class="faq-list">
        <div v-for="faq in filteredFaqs" :key="faq.q" class="faq-item">
          <div class="faq-question" @click="faq.open = !faq.open">
            <span>{{ faq.q }}</span>
            <span class="faq-chevron">{{ faq.open ? '▴' : '▾' }}</span>
          </div>
          <div v-if="faq.open" class="faq-answer" v-html="faq.a"></div>
        </div>
        <div v-if="filteredFaqs.length === 0" class="faq-empty">
          No results found. Try a different search, or submit a support ticket (response: 3–5 business years).
        </div>
      </div>
    </div>

    <!-- Support ticket -->
    <div class="help-section">
      <div class="help-section-title">CONTACT SUPPORT</div>
      <div class="support-body">
        <p style="font-size: 0.85rem; color: var(--gray); margin-bottom: 1rem;">
          Can't find what you're looking for? Our support team (Sam, when available) is here to help. Average response time: <strong>1–3 business days</strong> for general questions, <strong>3–5 business years</strong> for billing disputes.
        </p>
        <div class="support-form">
          <select class="support-input" v-model="ticketCategory">
            <option value="">— Select a category —</option>
            <option>Billing Question</option>
            <option>Content Not Loading</option>
            <option>3D Print Not Arrived</option>
            <option>Emergency Contact — Sam Not Responding</option>
            <option>Cancellation Request (Good luck)</option>
            <option>Erca Substack Integration (Unauthorized)</option>
            <option>Priority Seating Dispute (Grandma Override)</option>
            <option>Bendy Boy Status Inaccurate</option>
            <option>Lay-Lay Art Drop — Image Still Not Loading</option>
            <option>General — Sam Has Too Many Opinions</option>
            <option>Other</option>
          </select>
          <textarea class="support-input support-textarea" v-model="ticketBody" rows="3" placeholder="Describe your issue. Please be specific. Vague tickets are deprioritized."></textarea>
          <button class="support-submit" @click="submitTicket">Submit Ticket</button>
        </div>
        <div class="support-stats">
          <div class="support-stat"><span class="stat-num">847</span><span class="stat-label">Open tickets</span></div>
          <div class="support-stat"><span class="stat-num">0</span><span class="stat-label">Resolved this year</span></div>
          <div class="support-stat"><span class="stat-num">3–5 yrs</span><span class="stat-label">Avg. response</span></div>
        </div>
      </div>
    </div>

    <!-- Resource links -->
    <div class="help-section">
      <div class="help-section-title">HELPFUL RESOURCES</div>
      <div class="resource-grid">
        <div v-for="res in resources" :key="res.title" class="resource-card" @click="windowAlert(res.alert)">
          <span class="res-icon">{{ res.icon }}</span>
          <div>
            <div class="res-title">{{ res.title }}</div>
            <div class="res-sub">{{ res.sub }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

function windowAlert(msg) { window.alert(msg) }

const searchQuery = ref('')
const ticketCategory = ref('')
const ticketBody = ref('')

const chatReasons = [
  'currently explaining a board game',
  'mid-3D print job (cannot be interrupted)',
  'on a run (announced, not yet completed)',
  'watching something with Ari',
  'Lay-Lay is requesting Frozen',
  'playing Honkai Star Rail',
  'reviewing his board game tier list',
  'unavailable — Bendy Boy situation',
  'thinking about running',
]
const chatReason = chatReasons[Math.floor(Math.random() * chatReasons.length)]

function doSearch() {
  if (!searchQuery.value.trim()) return
  // filtering happens via computed, no alert needed
}

const faqs = reactive([
  { q: "How do I cancel my subscription?", a: "Navigate to <strong>Billing → Account Management</strong> and locate the Cancel Membership option. You will then be guided through our cancellation process, which has several steps. We appreciate your patience with the process. We worked hard on it.", open: false },
  { q: "When will my 3D print arrive?", a: "Your 3D print is currently in queue. Sam has not confirmed what it is yet. Arrival time is estimated as 'sometime.' The printer runs at night. Do not be alarmed by the sound. It is normal.", open: false },
  { q: "Why can't I update my email address?", a: "Email addresses are assigned at account creation and cannot be changed, as we are already sending to yours and have established a rhythm. If you believe your email is incorrect, please submit a support ticket. Response time: 3–5 business years.", open: false },
  { q: "What does Sam's 5-star confidence rating mean?", a: "Sam rates his own advice on a 5-star scale. The scale is self-reported and has never received fewer than 5 stars. Ari has noted that a self-reported 5-star rating is not technically a rating. Sam disagrees. The scale remains.", open: false },
  { q: "Lay-Lay's art drop image won't load.", a: "This is a known issue and is also intentional. The image failing to load <em>is</em> the art experience, per Ari's assessment. If you feel you are missing something, you are correct. This is fine.", open: false },
  { q: "Why does the content library say 'buffering'?", a: "Most content is still processing. Sam records things and then the files exist in various states of completion. Some files may have been deleted. The buffering state accurately reflects the content's current status.", open: false },
  { q: "Is the Bendy Boy Status actually live?", a: "'Live' means Sam checks in and updates this when he is aware of the situation. It is live in a spiritual sense. It is not a sensor array. Sam is a person, not infrastructure.", open: false },
  { q: "Can I change my subscription plan?", a: "Plan changes require approval from the billing committee. The committee meets quarterly. The next meeting is in approximately 3 months. In the meantime, your current plan will continue at its current rate.", open: false },
  { q: "What is 'Sam & Fam Ultra'?", a: "Sam &amp; Fam Ultra is an additional tier at $15/month (billed in addition to your current plan) that includes premium content such as Sam's unfiltered tier list, raw family Zoom footage, Grandma's recipes with measurements, and Sam's actual cell number. Upgrade requests are processed in 3–5 business years.", open: false },
  { q: "Why do my notification settings keep resetting?", a: "Our system detected these may have been changed accidentally and restored them to their default state (all enabled). If this was not an accident, we apologize for the inconvenience and will restore them again shortly.", open: false },
  { q: "Juju is listed as 'Unknown' on the Family Status Board. Is that accurate?", a: "Yes. Juju's location and availability are genuinely uncertain at most times. The 'Unknown' status reflects our best current information. If you have more accurate data, please contact support.", open: false },
  { q: "Papa's status says 'Automating' — is he okay?", a: "Yes. Papa is fine. He is working on a smart home project. This is routine. The congregation has been informed.", open: false },
  { q: "How many board games does Sam own?", a: "47, as of last count. The count has not decreased. Ari has confirmed this is accurate. Sam has a wishlist of 9 more.", open: false },
  { q: "Is Erca's Substack authorized content on this platform?", a: "No. The Substack integration appeared without authorization. We are working to address it. In the meantime, please enjoy the content but do not subscribe to her separately. We cannot stress this enough.", open: false },
  { q: "Can I request a specific 3D print?", a: "No. The 3D print is Sam's decision. You will receive what arrives. Past prints include a figurine, a drawer pull, and 'something for the kids' that is too small for the kids.", open: false },
])

const filteredFaqs = computed(() => {
  if (!searchQuery.value.trim()) return faqs
  const q = searchQuery.value.toLowerCase()
  return faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
})

const resources = [
  { icon: '📄', title: 'Terms of Service', sub: '156 pages — updated quarterly', alert: 'The Terms of Service document is 156 pages. We have chosen not to display it here. You agreed to it.' },
  { icon: '🔒', title: 'Privacy Policy', sub: 'We share your data with Sam (directly)', alert: 'Privacy Policy: Your data is shared with Sam directly. This is the full policy. Sam does not share it further, mostly because he hasn\'t gotten around to it.' },
  { icon: '📞', title: 'Emergency Contact Info', sub: 'Sam — response 1–3 business days', alert: 'Emergency Contact: Sam is on file. Average response time: 1–3 business days. Not available during board game campaigns, 3D print jobs, or if he\'s watching something.' },
  { icon: '🎲', title: 'Board Game Glossary', sub: 'Terms you will encounter', alert: 'Board Game Glossary document is loading. Estimated availability: 3–5 business years. In the meantime: iconography is important. Please read the iconography section.' },
  { icon: '📋', title: 'Cancellation Guide', sub: 'A guide to the cancellation process', alert: 'Cancellation Guide: Go to Billing → Account Management → Cancel Membership. Then follow 8 steps. They are reasonable steps. We put a lot of thought into them.' },
  { icon: '🖨️', title: '3D Print FAQ', sub: 'Answers to print-related questions', alert: '3D Print FAQ:\n\nQ: What is it?\nA: Unknown.\n\nQ: Did I ask for it?\nA: No.\n\nQ: Is it coming?\nA: Yes.' },
]

function submitTicket() {
  if (!ticketCategory.value) {
    window.alert('Please select a category. All categories result in the same response time, but we like the data.')
    return
  }
  const ticket = Math.floor(Math.random() * 900000 + 100000)
  window.alert(`Support ticket submitted!\n\nTicket #SF-${ticket}\nCategory: ${ticketCategory.value}\nStatus: Received\nExpected response: 3–5 business years\n\nThank you for reaching out. Sam has been notified and will respond when available.\n\nNote: if this concerns billing, Sam is also the billing department.`)
  ticketCategory.value = ''
  ticketBody.value = ''
}
</script>

<style scoped>
.help-wrap { display: flex; flex-direction: column; gap: 1.25rem; }

.help-title { font-family: var(--font-display); font-size: 1.5rem; letter-spacing: 0.05em; color: var(--dark); margin-bottom: 0.25rem; }
.help-sub { font-size: 0.82rem; color: var(--gray); margin-bottom: 0.75rem; }
.help-search-row { display: flex; gap: 0.5rem; max-width: 400px; }
.help-search {
  flex: 1;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.45rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  background: white;
}
.help-search:focus { outline: none; border-color: var(--orange); }
.help-search-btn {
  background: var(--dark);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.45rem 1rem;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  white-space: nowrap;
}

/* ── Chat bar ── */
.chat-bar {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  box-shadow: var(--shadow);
}
.chat-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.chat-status-dot.offline { background: #94a3b8; }
.chat-text { flex: 1; font-size: 0.82rem; color: var(--dark); }
.chat-reason { color: var(--gray); margin-left: 0.25rem; }
.chat-btn {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.35rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  color: var(--dark);
  white-space: nowrap;
}
.chat-btn:hover { background: #f1f5f9; }

/* ── Section ── */
.help-section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}
.help-section-title {
  padding: 0.65rem 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: #94a3b8;
}

/* ── FAQ ── */
.faq-list { }
.faq-item { border-bottom: 1px solid #f8fafc; }
.faq-item:last-child { border-bottom: none; }
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--dark);
  cursor: pointer;
  user-select: none;
  transition: background 0.1s;
}
.faq-question:hover { background: #f8fafc; }
.faq-chevron { font-size: 0.7rem; color: var(--gray); flex-shrink: 0; }
.faq-answer {
  padding: 0 1.25rem 0.85rem;
  font-size: 0.82rem;
  color: var(--gray);
  line-height: 1.65;
  border-top: 1px solid #f1f5f9;
  padding-top: 0.65rem;
}
.faq-empty { padding: 1.25rem; font-size: 0.82rem; color: var(--gray); }

/* ── Support form ── */
.support-body { padding: 1.25rem; }
.support-form { display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1rem; }
.support-input {
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.45rem 0.7rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  background: #f8fafc;
  width: 100%;
}
.support-input:focus { outline: none; border-color: var(--orange); background: white; }
.support-textarea { resize: vertical; }
.support-submit {
  background: var(--dark);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  font-family: var(--font-body);
  width: fit-content;
  transition: background 0.15s;
}
.support-submit:hover { background: var(--dark2); }

.support-stats { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.support-stat { text-align: center; }
.stat-num { display: block; font-family: var(--font-display); font-size: 1.5rem; letter-spacing: 0.04em; color: var(--orange); }
.stat-label { font-size: 0.65rem; color: var(--gray); text-transform: uppercase; letter-spacing: 0.07em; }

/* ── Resources ── */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0;
}
.resource-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid #f8fafc;
  border-right: 1px solid #f8fafc;
  cursor: pointer;
  transition: background 0.1s;
}
.resource-card:hover { background: #f8fafc; }
.res-icon { font-size: 1.4rem; flex-shrink: 0; }
.res-title { font-size: 0.82rem; font-weight: 700; color: var(--dark); }
.res-sub { font-size: 0.7rem; color: var(--gray); margin-top: 0.1rem; }
</style>
