<template>
  <div class="settings-wrap">

    <div class="settings-header">
      <h2 class="settings-title">⚙️ Settings</h2>
      <p class="settings-sub">Manage your account preferences. Some settings have been pre-configured for your protection and cannot be changed.</p>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">ACCOUNT</div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Display Name</div>
          <div class="setting-note">How you appear across the platform</div>
        </div>
        <div class="setting-control">
          <input class="setting-input" value="Valued Subscriber #4,721" disabled />
          <div class="setting-hint">Name is assigned by Sam. Changes require written request (processing: 3–5 business years).</div>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Email Address</div>
          <div class="setting-note">Where we send your content (and invoices)</div>
        </div>
        <div class="setting-control">
          <input class="setting-input" value="v●●●●●●●●@●●●●●●.com" disabled />
          <div class="setting-hint">Email cannot be changed. We are already sending to it.</div>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Password</div>
          <div class="setting-note">Your account security</div>
        </div>
        <div class="setting-control">
          <button class="setting-btn" @click="windowAlert('Password reset initiated. A reset link will arrive in 3–5 business years. In the meantime, your current password is secure. We don\'t know what it is.')">Change Password</button>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">NOTIFICATIONS</div>
      <p class="settings-section-note">All notifications are enabled by default. Disabling them does not affect delivery — it only affects how guilty you feel about not reading them.</p>

      <div v-for="notif in notifications" :key="notif.label" class="notif-row">
        <div class="notif-info">
          <div class="setting-label">{{ notif.label }}</div>
          <div class="setting-note">{{ notif.note }}</div>
          <div v-if="notif.locked" class="setting-hint" style="margin-top: 0.2rem;">Required by your membership agreement.</div>
        </div>
        <label class="toggle" :class="{ disabled: notif.locked }">
          <input type="checkbox" v-model="notif.enabled" :disabled="notif.locked" @change="notif.locked ? null : handleToggle(notif)" />
          <span class="toggle-track"></span>
        </label>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">APPEARANCE</div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Theme</div>
          <div class="setting-note">Visual style of your dashboard</div>
        </div>
        <div class="setting-control">
          <select class="setting-input" @change="windowAlert('Only one theme is available. This is it. We appreciate your taste.')">
            <option>Sam & Fam Brand Colors (Required)</option>
          </select>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Language</div>
          <div class="setting-note">Content delivery language</div>
        </div>
        <div class="setting-control">
          <select class="setting-input" @change="windowAlert('This service is only available in English. Sam speaks one language. We appreciate the question.')">
            <option>English</option>
            <option>English (UK)</option>
            <option>English (Sam)</option>
          </select>
          <div class="setting-hint">English (Sam) is English with additional board game terminology and occasional runner vocabulary.</div>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Ticker Speed</div>
          <div class="setting-note">How fast the breaking news scrolls</div>
        </div>
        <div class="setting-control">
          <select class="setting-input" @change="windowAlert('Ticker speed is fixed at the rate Sam types. This cannot be changed.')">
            <option>Normal (Sam Types This Fast)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-section-title">PRIVACY</div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Data Sharing</div>
          <div class="setting-note">Who receives your account information</div>
        </div>
        <div class="setting-control">
          <div class="setting-readonly">Sam (directly)</div>
          <div class="setting-hint">Your data is shared with Sam. This is the entire data sharing policy. Sam does not share it further, mostly because he hasn't gotten around to it.</div>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Cookie Preferences</div>
          <div class="setting-note">We use cookies</div>
        </div>
        <div class="setting-control">
          <button class="setting-btn" @click="windowAlert('Cookie preferences saved: All Accepted.\n\nNote: this was already the setting. Thank you for confirming.')">Manage Cookies</button>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-label">Delete Account</div>
          <div class="setting-note">Permanently remove your account and data</div>
        </div>
        <div class="setting-control">
          <button class="setting-btn danger" @click="windowAlert('Account deletion request submitted.\n\nNote: your account cannot be deleted while an active subscription is present. Please cancel your subscription first.\n\nCancellation processing time: 3–5 business years.\n\nThank you for your patience.')">Delete Account</button>
        </div>
      </div>
    </div>

    <div class="settings-save-bar">
      <button class="save-btn" @click="windowAlert('Settings saved. Note: most settings were already set this way. Your preferences have been noted and filed.')">Save Changes</button>
      <span class="save-note">Last saved: January 1, 1970 at 12:00:00 AM</span>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'

function windowAlert(msg) { window.alert(msg) }

const notifications = reactive([
  { label: 'Sam\'s Daily Advice', note: 'Receive advice whether you asked for it or not', enabled: true, locked: true },
  { label: 'Billing Notifications', note: 'Charges, invoices, and new fees', enabled: true, locked: true },
  { label: 'Lay-Lay Art Drop Alerts', note: 'New artwork available (image may not load)', enabled: true, locked: false },
  { label: 'Bendy Boy Status Updates', note: 'Live-ish chaos notifications', enabled: true, locked: false },
  { label: 'Game Night Reminders', note: 'Sam has picked a game. Attendance expected.', enabled: true, locked: false },
  { label: 'Erca\'s Substack Notifications', note: 'Unauthorized integration — working on removing', enabled: true, locked: true },
  { label: 'Grandma\'s Forwarded Emails', note: 'Auto-forwarded from group chat', enabled: true, locked: false },
  { label: 'Juju Sighting Alerts', note: 'Triggered when Juju responds in the group chat', enabled: true, locked: false },
  { label: 'Marketing Emails', note: 'You are already subscribed to a subscription. This is more.', enabled: true, locked: true },
  { label: 'Papa Project Updates', note: 'Smart home automation milestones', enabled: true, locked: false },
  { label: '3D Print Shipping Notifications', note: 'When your unsolicited print ships', enabled: true, locked: true },
])

function handleToggle(notif) {
  if (!notif.enabled) {
    setTimeout(() => {
      window.alert(`"${notif.label}" has been re-enabled. Our system detected this was disabled accidentally. If this was not an accident, please contact support (response: 3–5 business years).`)
      notif.enabled = true
    }, 400)
  }
}
</script>

<style scoped>
.settings-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-header { }
.settings-title { font-family: var(--font-display); font-size: 1.5rem; letter-spacing: 0.05em; color: var(--dark); margin-bottom: 0.25rem; }
.settings-sub { font-size: 0.82rem; color: var(--gray); }

.settings-section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.settings-section-title {
  padding: 0.65rem 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: #94a3b8;
}

.settings-section-note {
  padding: 0.6rem 1.25rem 0;
  font-size: 0.75rem;
  color: #94a3b8;
}

.setting-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid #f8fafc;
  flex-wrap: wrap;
}
.setting-row:last-child { border-bottom: none; }

.notif-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid #f8fafc;
}
.notif-row:last-child { border-bottom: none; }
.notif-info { flex: 1; min-width: 0; }

.setting-info { flex: 1; min-width: 160px; }
.setting-label { font-size: 0.85rem; font-weight: 700; color: var(--dark); }
.setting-note { font-size: 0.72rem; color: var(--gray); margin-top: 0.1rem; }

.setting-control { display: flex; flex-direction: column; gap: 0.3rem; min-width: 200px; }

.setting-input {
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  background: #f8fafc;
  color: #374151;
  width: 100%;
}
.setting-input:disabled { color: #94a3b8; cursor: not-allowed; }
.setting-input:not(:disabled):focus { outline: none; border-color: var(--orange); background: white; }

.setting-hint { font-size: 0.65rem; color: #94a3b8; line-height: 1.4; }
.setting-readonly { font-size: 0.82rem; font-weight: 700; color: #374151; }

.setting-btn {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  color: var(--dark);
  width: fit-content;
  transition: background 0.15s;
}
.setting-btn:hover { background: #f1f5f9; }
.setting-btn.danger { color: var(--red); border-color: #fecaca; }
.setting-btn.danger:hover { background: #fef2f2; }

/* ── Toggle ── */
.toggle { display: flex; align-items: center; cursor: pointer; width: fit-content; }
.toggle.disabled { cursor: not-allowed; opacity: 0.7; }
.toggle input { display: none; }
.toggle-track {
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: #e2e8f0;
  position: relative;
  transition: background 0.2s;
}
.toggle-track::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle input:checked ~ .toggle-track { background: var(--orange); }
.toggle input:checked ~ .toggle-track::after { transform: translateX(16px); }

/* ── Save bar ── */
.settings-save-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.save-btn {
  background: var(--dark);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  font-family: var(--font-body);
  transition: background 0.15s;
}
.save-btn:hover { background: var(--dark2); }
.save-note { font-size: 0.72rem; color: #94a3b8; }
</style>
