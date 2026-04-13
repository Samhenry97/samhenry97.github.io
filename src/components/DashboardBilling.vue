<template>
  <div class="billing-wrap">

    <!-- Plan info -->
    <div class="billing-card">
      <div class="billing-card-head">
        <span class="bh-icon" style="background:#fff3ed;">💳</span>
        <span class="bh-title">CURRENT PLAN</span>
      </div>
      <div class="billing-card-body plan-body">
        <div class="plan-info">
          <div class="plan-name">Sam &amp; Fam Standard</div>
          <div class="plan-price">${{ priceNum }} <span class="plan-cycle">/ {{ period }}</span></div>
          <div class="plan-status">
            <span class="status-pill">✅ Active</span>
            <span class="plan-since">Member since January 1, 1970</span>
          </div>
        </div>
        <div class="plan-details">
          <div class="plan-detail-row"><span>Next billing date</span><strong>30 days from now (approximate)</strong></div>
          <div class="plan-detail-row"><span>Payment method</span><strong>•••• •••• •••• 4721</strong></div>
          <div class="plan-detail-row"><span>Billing cycle</span><strong>{{ period === 'year' ? 'Annual' : 'Monthly' }}, auto-renewing</strong></div>
          <div class="plan-detail-row"><span>Auto-renewal</span><strong style="color: var(--green);">Enabled (cannot be disabled)</strong></div>
        </div>
        <div style="margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="billing-btn" @click="windowAlert('Your payment method cannot be updated at this time. Please try again in 3–5 business years.')">Update Payment</button>
          <button class="billing-btn" @click="windowAlert('Switching plans requires approval from the billing committee. The committee meets quarterly.')">Change Plan</button>
        </div>
      </div>
    </div>

    <!-- Invoice history -->
    <div class="billing-card">
      <div class="billing-card-head">
        <span class="bh-icon" style="background:#f0fdf4;">🧾</span>
        <span class="bh-title">INVOICE HISTORY</span>
      </div>
      <div class="billing-card-body">
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in invoices" :key="inv.date">
              <td>{{ inv.date }}</td>
              <td>{{ inv.desc }}</td>
              <td>{{ inv.amount }}</td>
              <td><span class="inv-status" :class="inv.statusClass">{{ inv.status }}</span></td>
              <td>
                <button class="inv-link" @click="windowAlert('Receipt download initiated. File will arrive in 3–5 business years.')">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="fine-print" style="margin-top: 0.75rem;">
          Invoices are generated automatically and may contain line items that are difficult to explain. All charges are final.
          Disputes are reviewed by Sam personally, which is also the appeals process.
        </p>
      </div>
    </div>

    <!-- What you get -->
    <div class="billing-card">
      <div class="billing-card-head">
        <span class="bh-icon" style="background:#eff6ff;">🎁</span>
        <span class="bh-title">INCLUDED WITH YOUR PLAN</span>
      </div>
      <div class="billing-card-body">
        <div class="benefits-grid">
          <div v-for="benefit in benefits" :key="benefit.label" class="benefit-item">
            <span class="benefit-icon">{{ benefit.icon }}</span>
            <div>
              <div class="benefit-label">{{ benefit.label }}</div>
              <div class="benefit-note">{{ benefit.note }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Danger zone — but hard to find -->
    <div class="billing-card">
      <div class="billing-card-head">
        <span class="bh-icon" style="background:#fef2f2;">⚙️</span>
        <span class="bh-title">ACCOUNT MANAGEMENT</span>
      </div>
      <div class="billing-card-body">
        <div class="mgmt-row">
          <div>
            <div class="mgmt-label">Export Account Data</div>
            <div class="mgmt-note">Download a copy of your data (estimated size: very large)</div>
          </div>
          <button class="billing-btn" @click="windowAlert('Export initiated. Delivery: 3–5 business years.')">Request Export</button>
        </div>
        <div class="mgmt-row">
          <div>
            <div class="mgmt-label">Pause Membership</div>
            <div class="mgmt-note">Pause billing for up to 30 days (billing continues during pause)</div>
          </div>
          <button class="billing-btn" @click="windowAlert('Pause request received. Note: pausing does not affect billing. Your card will continue to be charged as normal.')">Pause</button>
        </div>
        <div class="mgmt-row">
          <div>
            <div class="mgmt-label">Contact Support</div>
            <div class="mgmt-note">For account questions and billing issues</div>
          </div>
          <button class="billing-btn" @click="windowAlert('Support ticket created. Ticket #' + Math.floor(Math.random()*900000+100000) + '\nExpected response: 3–5 business years.')">Open Ticket</button>
        </div>

        <!-- The cancel button. A little easier to find now. Still small. -->
        <div class="cancel-section">
          <p class="cancel-intro">
            Looking to cancel? We understand. We don't agree, but we understand.
          </p>
          <button class="cancel-link" @click="beginCancellation">
            Cancel Membership
          </button>
          <span class="cancel-note"> — processing time 3–5 business years</span>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { useSubscription } from '../composables/useSubscription'

const { priceNum, period, beginCancellation } = useSubscription()

function windowAlert(msg) { window.alert(msg) }

const isYearly = period.value === 'year'

// Build invoice list — yearly plan: one invoice for this year; monthly: rolling history
const now = new Date()
const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function firstOfMonth(offsetMonths) {
  const d = new Date(now.getFullYear(), now.getMonth() - offsetMonths, 1)
  return fmt(d)
}
function firstOfYear(offsetYears) {
  return `Jan 1, ${now.getFullYear() - offsetYears}`
}

const invoices = isYearly ? [
  { date: `Jan 1, ${now.getFullYear()}`, desc: 'Sam & Fam Standard — Annual', amount: '$50.00', status: 'Paid', statusClass: 'paid' },
  { date: 'Jan 1, 2025', desc: 'Content Delivery Optimization Fee', amount: '$0.00', status: 'Waived', statusClass: 'waived' },
] : [
  { date: firstOfMonth(0), desc: 'Sam & Fam Standard — Monthly', amount: '$5.00', status: 'Paid', statusClass: 'paid' },
  { date: firstOfMonth(1), desc: 'Sam & Fam Standard — Monthly', amount: '$5.00', status: 'Paid', statusClass: 'paid' },
  { date: firstOfMonth(2), desc: 'Sam & Fam Standard — Monthly', amount: '$5.00', status: 'Paid', statusClass: 'paid' },
  { date: firstOfMonth(3), desc: 'Sam & Fam Standard — Monthly', amount: '$5.00', status: 'Paid', statusClass: 'paid' },
  { date: firstOfMonth(4), desc: 'Sam & Fam Standard — Monthly', amount: '$5.00', status: 'Paid', statusClass: 'paid' },
  { date: firstOfMonth(5), desc: 'Content Delivery Optimization Fee', amount: '$0.00', status: 'Waived', statusClass: 'waived' },
  { date: firstOfMonth(5), desc: 'Sam & Fam Standard — Monthly', amount: '$5.00', status: 'Paid', statusClass: 'paid' },
]

const benefits = [
  { icon: '🎲', label: "Sam's Unsolicited Life Advice", note: 'Daily. Rolling basis. Cannot be paused.' },
  { icon: '🎨', label: "Lay-Lay's Art Drop", note: 'Weekly. Images may fail to load. That is the experience.' },
  { icon: '🚗', label: 'Bendy Boy Chaos Tracker', note: 'Live-ish. Updated when Sam is aware.' },
  { icon: '📞', label: 'Family Emergency Contact', note: 'Sam is on file. Response: 1–3 business days.' },
  { icon: '😂', label: 'Dad Joke Drip Campaign', note: 'Tested on Lay-Lay (ruthless) and Bendy Boy (indifferent).' },
  { icon: '🖨️', label: '3D Print of the Month', note: 'You did not request it. It is coming.' },
  { icon: '🎭', label: 'Intervention Access', note: '1 per calendar decade. Form on the Dashboard tab.' },
  { icon: '🪑', label: 'Priority Seating', note: 'Subject to Grandma\'s final seating authority.' },
]
</script>

<style scoped>
.billing-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Billing card ── */
.billing-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.billing-card-head {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bh-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.bh-title {
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: var(--dark);
  text-transform: uppercase;
}

.billing-card-body { padding: 1.25rem; }

/* ── Plan ── */
.plan-body { display: flex; flex-direction: column; gap: 1rem; }
.plan-name { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 0.04em; color: var(--dark); }
.plan-price { font-size: 1.8rem; font-weight: 900; color: var(--orange); }
.plan-cycle { font-size: 0.9rem; font-weight: 600; color: var(--gray); }
.plan-status { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.status-pill { background: #dcfce7; color: #166534; font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 12px; }
.plan-since { font-size: 0.75rem; color: var(--gray); }

.plan-details { display: flex; flex-direction: column; gap: 0.5rem; }
.plan-detail-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; padding: 0.4rem 0; border-bottom: 1px solid #f8fafc; gap: 1rem; flex-wrap: wrap; }
.plan-detail-row span { color: var(--gray); }

.billing-btn {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  color: var(--dark);
  transition: background 0.15s, border-color 0.15s;
  white-space: nowrap;
}
.billing-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }

/* ── Invoice table ── */
.invoice-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.invoice-table th { text-align: left; font-size: 0.68rem; font-weight: 900; letter-spacing: 0.07em; color: #94a3b8; text-transform: uppercase; padding: 0 0 0.5rem; border-bottom: 1px solid #e2e8f0; }
.invoice-table td { padding: 0.6rem 0; border-bottom: 1px solid #f8fafc; color: #374151; }
.inv-status { font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 4px; }
.inv-status.paid { background: #dcfce7; color: #166534; }
.inv-status.waived { background: #f1f5f9; color: #64748b; }
.inv-link { background: none; border: none; color: var(--dark); font-size: 0.75rem; font-weight: 700; cursor: pointer; text-decoration: underline; font-family: var(--font-body); }

/* ── Benefits ── */
.benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
@media (max-width: 500px) { .benefits-grid { grid-template-columns: 1fr; } }
.benefit-item { display: flex; gap: 0.6rem; align-items: flex-start; font-size: 0.82rem; }
.benefit-icon { font-size: 1.1rem; flex-shrink: 0; }
.benefit-label { font-weight: 700; color: var(--dark); }
.benefit-note { font-size: 0.72rem; color: var(--gray); margin-top: 0.1rem; }

/* ── Account management ── */
.mgmt-row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid #f8fafc; flex-wrap: wrap; }
.mgmt-label { font-size: 0.85rem; font-weight: 700; color: var(--dark); }
.mgmt-note { font-size: 0.75rem; color: var(--gray); margin-top: 0.1rem; }

/* ── Cancel section ── */
.cancel-section {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
}

.cancel-intro {
  font-size: 0.78rem;
  color: #94a3b8;
  margin-bottom: 0.4rem;
}

.cancel-link {
  background: none;
  border: none;
  font-size: 0.78rem;
  color: #94a3b8;
  cursor: pointer;
  font-family: var(--font-body);
  font-weight: 700;
  text-decoration: underline;
  padding: 0;
}
.cancel-link:hover { color: var(--red); }

.cancel-note {
  font-size: 0.7rem;
  color: #cbd5e1;
}
</style>
