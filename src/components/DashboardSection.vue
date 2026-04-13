<template>
  <div class="dashboard">

    <!-- "Marquee" news ticker -->
    <div class="ticker-wrap">
      <div class="ticker-track">
        <span v-for="i in 4" :key="i" class="ticker-items">
          🔴 BREAKING: Your card has been charged &nbsp;•&nbsp;
          🎲 Sam has a new board game opinion — full analysis forthcoming &nbsp;•&nbsp;
          🍌 Bendy Boy status update: a ball has been thrown &nbsp;•&nbsp;
          ❄️ Lay-Lay has requested Frozen for the fourth time today &nbsp;•&nbsp;
          📝 Erca's new Substack post is out — please do not subscribe to her instead &nbsp;•&nbsp;
          🐕 Val (Timo's samoyed) has been confirmed fluffy &nbsp;•&nbsp;
          ⚠️ Papa has automated something — family monitoring situation &nbsp;•&nbsp;
          ☕ Boo's 7 Brew order not covered under any current plan &nbsp;•&nbsp;
          🇯🇵 Juju status: unknown — possibly Japan &nbsp;•&nbsp;
          🖨️ Sam is printing something — details TBD &nbsp;•&nbsp;
          😸 Winnie and Opal (Grandma's cats) are fine. This is a status update. &nbsp;•&nbsp;
          ⭐ You are Valued Member #4,721. Thank you for your continued payments. &nbsp;•&nbsp;
        </span>
      </div>
    </div>

    <!-- Dashboard header -->
    <div class="dash-header">
      <div class="dash-header-inner">
        <div>
          <h1 class="dash-title">MEMBER DASHBOARD</h1>
          <p class="dash-welcome">
            Welcome back, <strong>Valued Subscriber #4,721</strong>!
            &nbsp;|&nbsp; Plan: <span style="color: var(--yellow)">Sam &amp; Fam Standard</span>
            &nbsp;|&nbsp; Status:
            <span style="color: var(--green-light)">✅ ACTIVE</span>
          </p>
          <p class="dash-meta">
            Account created: January 1, 1970 &nbsp;|&nbsp;
            Last login: {{ today }} (also your first login, technically) &nbsp;|&nbsp;
            <span style="color: #fbbf24">🌟 Loyalty Tier: Gold (Self-Assigned)</span>
          </p>
        </div>
        <div class="dash-header-actions">
          <button class="dash-action-btn" @click="state.currentPage = 'billing'">
            💳 Billing
          </button>
          <button class="dash-action-btn" @click="windowAlert('Your account details are being processed. Please allow 3–5 business years.')">
            👤 Account
          </button>
        </div>
      </div>
    </div>

    <div class="dash-body">

      <!-- Sidebar -->
      <aside class="dash-sidebar">
        <nav class="dash-nav">
          <div class="dash-nav-label">NAVIGATION</div>
          <a class="dash-nav-item" :class="{ active: state.currentPage === 'home' }"
             href="#" @click.prevent="state.currentPage = 'home'">📊 Dashboard</a>
          <a class="dash-nav-item" :class="{ active: state.currentPage === 'inbox' }"
             href="#" @click.prevent="state.currentPage = 'inbox'">
            📬 My Inbox <span class="nav-badge">99+</span>
          </a>
          <a class="dash-nav-item" :class="{ active: state.currentPage === 'library' }"
             href="#" @click.prevent="state.currentPage = 'library'">📚 Content Library</a>
          <a class="dash-nav-item" :class="{ active: state.currentPage === 'billing' }"
             href="#" @click.prevent="state.currentPage = 'billing'">💳 Billing</a>
          <a class="dash-nav-item" :class="{ active: state.currentPage === 'settings' }"
             href="#" @click.prevent="state.currentPage = 'settings'">⚙️ Settings</a>
          <a class="dash-nav-item" :class="{ active: state.currentPage === 'referrals' }"
             href="#" @click.prevent="state.currentPage = 'referrals'">👥 Referrals</a>
          <a class="dash-nav-item" :class="{ active: state.currentPage === 'help' }"
             href="#" @click.prevent="state.currentPage = 'help'">❓ Help</a>
        </nav>

        <div class="sidebar-stat-box">
          <div class="sidebar-stat-label">CONTENT LOADING</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar" style="width: 73%"></div>
          </div>
          <div class="sidebar-stat-sub">73% — please wait</div>
        </div>

        <div class="sidebar-stat-box" style="margin-top: 0.75rem;">
          <div class="sidebar-stat-label">ONLINE NOW</div>
          <div class="sidebar-stat-num">{{ onlineCount }}</div>
          <div class="sidebar-stat-sub">family members (estimated)</div>
        </div>

        <div class="sidebar-update-box">
          <b>⚠️ SYSTEM NOTICE</b><br/>
          Best viewed in Internet Explorer 8 or higher.<br/>
          <small>Last updated: March 3, 2009</small>
        </div>
      </aside>

      <!-- Main content -->
      <main class="dash-main">
        <DashboardHome v-if="state.currentPage === 'home'" />
        <DashboardInbox v-else-if="state.currentPage === 'inbox'" />
        <DashboardBilling v-else-if="state.currentPage === 'billing'" />
        <DashboardLibrary v-else-if="state.currentPage === 'library'" />
        <DashboardSettings v-else-if="state.currentPage === 'settings'" />
        <DashboardReferrals v-else-if="state.currentPage === 'referrals'" />
        <DashboardHelp v-else-if="state.currentPage === 'help'" />
      </main>

    </div>

    <!-- Dashboard footer -->
    <div class="dash-footer">
      © {{ new Date().getFullYear() }} Sam &amp; Fam LLC &nbsp;|&nbsp;
      Member Since: January 1, 1970 &nbsp;|&nbsp;
      Next Billing: Sooner Than You Think &nbsp;|&nbsp;
      <span style="color: rgba(255,255,255,0.4); font-size: 0.65rem;">
        Site optimized for 800×600 resolution. Disable pop-up blocker for full experience.
      </span>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSubscription } from '../composables/useSubscription'
import DashboardHome from './DashboardHome.vue'
import DashboardInbox from './DashboardInbox.vue'
import DashboardBilling from './DashboardBilling.vue'
import DashboardLibrary from './DashboardLibrary.vue'
import DashboardSettings from './DashboardSettings.vue'
import DashboardReferrals from './DashboardReferrals.vue'
import DashboardHelp from './DashboardHelp.vue'

const { state } = useSubscription()

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
const onlineCount = ref(Math.floor(Math.random() * 4) + 2)

function windowAlert(msg) { window.alert(msg) }
</script>

<style scoped>
/* ── Ticker ── */
.ticker-wrap {
  background: var(--red);
  overflow: hidden;
  height: 28px;
  display: flex;
  align-items: center;
}
.ticker-track {
  display: flex;
  white-space: nowrap;
  animation: ticker-scroll 60s linear infinite;
  font-size: 0.72rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.03em;
}
.ticker-items { padding-right: 4rem; }
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ── Dashboard header ── */
.dash-header {
  background: linear-gradient(135deg, var(--dark), var(--dark2));
  color: white;
  padding: 1.25rem 1.5rem;
  border-bottom: 3px solid var(--orange);
}
.dash-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}
.dash-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  letter-spacing: 0.08em;
  color: var(--orange);
}
.dash-welcome { font-size: 0.85rem; color: rgba(255,255,255,0.85); margin-top: 0.15rem; }
.dash-meta { font-size: 0.7rem; color: rgba(255,255,255,0.45); margin-top: 0.25rem; }
.dash-header-actions { display: flex; gap: 0.5rem; flex-shrink: 0; flex-wrap: wrap; }
.dash-action-btn {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  transition: background 0.15s;
}
.dash-action-btn:hover { background: rgba(255,255,255,0.2); }

/* ── Body layout ── */
.dash-body {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 0;
  min-height: 600px;
}

/* ── Sidebar ── */
.dash-sidebar {
  width: 210px;
  flex-shrink: 0;
  background: #f1f5f9;
  border-right: 2px solid #e2e8f0;
  padding: 1rem;
}

@media (max-width: 640px) {
  .dash-sidebar { display: none; }
}

.dash-nav { display: flex; flex-direction: column; gap: 2px; margin-bottom: 1.25rem; }

.dash-nav-label {
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #94a3b8;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;
}

.dash-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.6rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.1s;
}
.dash-nav-item:hover, .dash-nav-item.active {
  background: white;
  color: var(--dark);
}
.dash-nav-item.active { font-weight: 800; border-left: 3px solid var(--orange); }

.nav-badge {
  background: var(--red);
  color: white;
  font-size: 0.6rem;
  font-weight: 900;
  padding: 0.1rem 0.35rem;
  border-radius: 10px;
}
.nav-lock { font-size: 0.75rem; }

.sidebar-stat-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem;
}
.sidebar-stat-label { font-size: 0.6rem; font-weight: 900; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 0.35rem; }
.sidebar-stat-num { font-family: var(--font-display); font-size: 1.8rem; color: var(--dark); letter-spacing: 0.04em; }
.sidebar-stat-sub { font-size: 0.68rem; color: var(--gray); }

.progress-bar-wrap {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.3rem;
}
.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--orange), #fbbf24);
  border-radius: 4px;
}

.sidebar-update-box {
  margin-top: 0.75rem;
  background: #fffbeb;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  padding: 0.6rem;
  font-size: 0.68rem;
  color: #78350f;
  line-height: 1.5;
}

/* ── Main content area ── */
.dash-main {
  flex: 1;
  padding: 1.25rem;
  background: #f8fafc;
  min-width: 0;
}

/* ── Footer ── */
.dash-footer {
  background: var(--dark);
  color: rgba(255,255,255,0.5);
  font-size: 0.72rem;
  text-align: center;
  padding: 0.75rem 1.5rem;
}
</style>
