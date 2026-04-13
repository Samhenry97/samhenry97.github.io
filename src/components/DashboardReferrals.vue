<template>
  <div class="referrals-wrap">

    <div class="ref-header">
      <h2 class="ref-title">👥 Referrals</h2>
      <p class="ref-sub">Invite your extended family to join Sam &amp; Fam. They will receive the same content regardless. At least this way there's a paper trail.</p>
    </div>

    <!-- Earnings summary -->
    <div class="ref-stats">
      <div class="ref-stat-card">
        <div class="ref-stat-num">{{ referrals }}</div>
        <div class="ref-stat-label">Total Referrals</div>
        <div class="ref-stat-note">People you have referred (or who joined anyway)</div>
      </div>
      <div class="ref-stat-card">
        <div class="ref-stat-num">$0.00</div>
        <div class="ref-stat-label">Your Earnings</div>
        <div class="ref-stat-note">Referral program is goodwill-based, not cash-based</div>
      </div>
      <div class="ref-stat-card">
        <div class="ref-stat-num">∞</div>
        <div class="ref-stat-label">Sam's Earnings</div>
        <div class="ref-stat-note">Sam earns goodwill. Goodwill is unlimited.</div>
      </div>
      <div class="ref-stat-card">
        <div class="ref-stat-num">0</div>
        <div class="ref-stat-label">Successful Cancellations</div>
        <div class="ref-stat-note">Among people you referred</div>
      </div>
    </div>

    <!-- Share link -->
    <div class="ref-card">
      <div class="ref-card-title">🔗 Your Referral Link</div>
      <p style="font-size: 0.82rem; color: var(--gray); margin-bottom: 0.75rem;">
        Share this link with family members you believe should also be paying for this. Sam will be notified of each signup and may send a personal thank-you text, response time 1–3 business days.
      </p>
      <div class="link-row">
        <div class="link-display">https://samhenry97.github.io/?ref=VALUED-SUBSCRIBER-4721-REFERRAL-CODE-ALPHA-TIER-DO-NOT-SHARE-EXCEPT-TO-SHARE-IT&campaign=family-outreach-q2-2026&source=dashboard&medium=referral&content=link-copy-button-primary-cta-v3</div>
        <button class="ref-btn" @click="copyLink">{{ copied ? '✅ Copied!' : 'Copy' }}</button>
      </div>
      <div class="share-btns">
        <button class="share-btn" @click="shareText">💬 Text</button>
        <button class="share-btn" @click="shareEmail">📧 Email</button>
        <button class="share-btn" @click="shareGroupChat">👨‍👩‍👧‍👦 Group Chat</button>
        <button class="share-btn" @click="shareSocial">📱 Social</button>
      </div>
    </div>

    <!-- Leaderboard -->
    <div class="ref-card">
      <div class="ref-card-title">🏆 Referral Leaderboard</div>
      <p style="font-size: 0.82rem; color: var(--gray); margin-bottom: 0.75rem;">
        Top referrers across the Sam &amp; Fam platform. You are currently ranked <strong>#4,721</strong>. This is also your subscriber number. This is not a coincidence.
      </p>
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Member</th>
            <th>Referrals</th>
            <th>Earnings</th>
            <th>Badge</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in leaderboard" :key="entry.rank" :class="{ 'my-row': entry.isMe }">
            <td>{{ entry.rank }}</td>
            <td>{{ entry.name }}</td>
            <td>{{ entry.referrals }}</td>
            <td>{{ entry.earnings }}</td>
            <td><span class="lb-badge" :style="{ background: entry.badgeBg, color: entry.badgeColor }">{{ entry.badge }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- How it works -->
    <div class="ref-card">
      <div class="ref-card-title">❓ How the Referral Program Works</div>
      <div class="how-it-works">
        <div v-for="step in steps" :key="step.num" class="step">
          <div class="step-num">{{ step.num }}</div>
          <div>
            <div class="step-title">{{ step.title }}</div>
            <div class="step-body">{{ step.body }}</div>
          </div>
        </div>
      </div>
      <p class="fine-print" style="margin-top: 1rem;">
        Sam &amp; Fam referral program terms: No cash value. Goodwill non-transferable. Sam retains the right to text any referred member directly, regardless of your relationship with them. Grandma is not eligible — she is already enrolled automatically.
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

function windowAlert(msg) { window.alert(msg) }

const referrals = ref(Math.floor(Math.random() * 3))
const copied = ref(false)

function copyLink() {
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
  window.alert('Link copied to clipboard. It is very long. We are aware.')
}
function shareText() { window.alert("Text message drafted. Sam has been CC'd. He will also text them.") }
function shareEmail() { window.alert('Email composed. Subject line: "You Should Be Paying for This Too." Sending now.') }
function shareGroupChat() { window.alert('Shared to group chat. Grandma has already clicked it. Grandma has been enrolled.') }
function shareSocial() { window.alert('Posted. Sam has liked it. Sam is the only one who liked it.') }

const leaderboard = [
  { rank: 1, name: 'sam_superfan_99', referrals: 1247, earnings: '$0.00', badge: '👑 LEGEND', badgeBg: '#fef9c3', badgeColor: '#854d0e', isMe: false },
  { rank: 2, name: 'valued_subscriber_0001', referrals: 892, earnings: '$0.00', badge: '🥈 ELITE', badgeBg: '#f1f5f9', badgeColor: '#475569', isMe: false },
  { rank: 3, name: 'samfam_fan_forever', referrals: 634, earnings: '$0.00', badge: '🥉 GOLD', badgeBg: '#fff3ed', badgeColor: '#9a3412', isMe: false },
  { rank: 4, name: 'board_game_believer', referrals: 411, earnings: '$0.00', badge: '🎲 ENTHUSIAST', badgeBg: '#eff6ff', badgeColor: '#1e40af', isMe: false },
  { rank: 5, name: 'elsa_fan_mom', referrals: 203, earnings: '$0.00', badge: '❄️ FAN', badgeBg: '#f0f9ff', badgeColor: '#0369a1', isMe: false },
  { rank: '...', name: '—', referrals: '—', earnings: '—', badge: '—', badgeBg: '#f8fafc', badgeColor: '#94a3b8', isMe: false },
  { rank: 4721, name: 'You', referrals: referrals.value, earnings: '$0.00', badge: '🌱 NEW', badgeBg: '#dcfce7', badgeColor: '#166534', isMe: true },
]

const steps = [
  { num: '1', title: 'Share your link', body: 'Copy the link above and send it to someone who should probably be paying for this. Family members are the primary target. Coworkers are also eligible.' },
  { num: '2', title: 'They sign up', body: 'Your referral clicks the link and subscribes. They will receive the same content you do, including the 3D print. They did not ask for the 3D print.' },
  { num: '3', title: 'You earn goodwill', body: 'For each successful referral, you earn Sam\'s goodwill. Goodwill is non-monetary, non-transferable, and subjectively assigned by Sam. No cash value.' },
  { num: '4', title: 'Sam sends a text', body: 'Sam may personally text your referral to welcome them. Response time: 1–3 business days. Content: board game related, probably.' },
]
</script>

<style scoped>
.referrals-wrap { display: flex; flex-direction: column; gap: 1.25rem; }

.ref-title { font-family: var(--font-display); font-size: 1.5rem; letter-spacing: 0.05em; color: var(--dark); margin-bottom: 0.25rem; }
.ref-sub { font-size: 0.82rem; color: var(--gray); }

/* ── Stats ── */
.ref-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}
.ref-stat-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 1rem;
  box-shadow: var(--shadow);
  text-align: center;
}
.ref-stat-num { font-family: var(--font-display); font-size: 2rem; letter-spacing: 0.04em; color: var(--orange); }
.ref-stat-label { font-size: 0.72rem; font-weight: 800; color: var(--dark); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.2rem 0; }
.ref-stat-note { font-size: 0.65rem; color: var(--gray); line-height: 1.4; }

/* ── Cards ── */
.ref-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 1.25rem;
  box-shadow: var(--shadow);
}
.ref-card-title { font-size: 0.85rem; font-weight: 900; color: var(--dark); margin-bottom: 0.75rem; }

/* ── Share link ── */
.link-row { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
.link-display {
  flex: 1;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  font-size: 0.68rem;
  color: var(--gray);
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ref-btn {
  background: var(--dark);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  font-family: var(--font-body);
  white-space: nowrap;
  transition: background 0.15s;
}
.ref-btn:hover { background: var(--dark2); }
.share-btns { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.share-btn {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.4rem 0.85rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  color: var(--dark);
  transition: background 0.15s;
}
.share-btn:hover { background: #f1f5f9; }

/* ── Leaderboard ── */
.leaderboard-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.leaderboard-table th { text-align: left; font-size: 0.65rem; font-weight: 900; letter-spacing: 0.07em; color: #94a3b8; text-transform: uppercase; padding: 0 0 0.5rem; border-bottom: 1px solid #e2e8f0; }
.leaderboard-table td { padding: 0.55rem 0; border-bottom: 1px solid #f8fafc; color: #374151; }
.my-row td { background: #fff7ed; font-weight: 700; }
.lb-badge { font-size: 0.65rem; font-weight: 800; padding: 0.15rem 0.4rem; border-radius: 4px; white-space: nowrap; }

/* ── How it works ── */
.how-it-works { display: flex; flex-direction: column; gap: 0.75rem; }
.step { display: flex; gap: 0.85rem; align-items: flex-start; }
.step-num { width: 24px; height: 24px; border-radius: 50%; background: var(--dark); color: white; font-size: 0.72rem; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
.step-title { font-size: 0.85rem; font-weight: 700; color: var(--dark); margin-bottom: 0.15rem; }
.step-body { font-size: 0.78rem; color: var(--gray); line-height: 1.5; }
</style>
