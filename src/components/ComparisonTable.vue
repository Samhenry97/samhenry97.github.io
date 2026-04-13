<template>
  <section class="section compare-section" id="compare">
    <div class="container">
      <p class="badge badge-orange" style="display:block; text-align:center; margin-bottom:0.75rem;">PLANS</p>
      <h2 class="section-title">Free vs. Sam &amp; Fam</h2>
      <p class="section-sub">
        The choice is obvious. One of these is clearly better. We'll let you figure out which.
      </p>

      <div class="table-wrapper">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="feature-col">Feature</th>
              <th class="plan-col free-col">
                <div class="plan-head">Free</div>
                <div class="plan-price">$0</div>
              </th>
              <th class="plan-col premium-col">
                <div class="plan-badge">RECOMMENDED</div>
                <div class="plan-head">Sam &amp; Fam</div>
                <div class="plan-price">$5<span>/mo</span></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.feature">
              <td class="feature-name">{{ row.feature }}</td>
              <td class="plan-cell free-cell">
                <span v-html="row.free"></span>
              </td>
              <td class="plan-cell premium-cell">
                <span v-html="row.premium"></span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td class="foot-cell">
                <span class="foot-label">You're on your own.</span>
              </td>
              <td class="foot-cell premium-foot">
                <button class="btn btn-orange" style="width:100%; padding: 0.75rem;" @click="openModal()">
                  GET STARTED →
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSubscription } from '../composables/useSubscription'

const { openModal } = useSubscription()

const ck = '<span class="ck">✅</span>'
const xx = '<span class="xx">❌</span>'

const rows = [
  { feature: "Sam's Unsolicited Life Advice", free: xx, premium: ck },
  { feature: "Ari's Reality Check (corrects Sam's advice)", free: xx, premium: ck },
  { feature: 'Board Game Recs (Unrequested)', free: '<span class="partial">1/year (bad ones)</span>', premium: '<span class="ck">Unlimited</span>' },
  { feature: 'Family Emergency Contact', free: xx, premium: ck },
  { feature: 'Intervention Package', free: xx, premium: ck },
  { feature: 'Tag-Team Parenting Hotline (Sam + Ari)', free: xx, premium: '<span class="ck">✅ (Ari\'s answers only are accurate)</span>' },
  { feature: "Lay-Lay's Doodle Drop", free: xx, premium: ck },
  { feature: 'Bendy Boy Chaos Tracker', free: xx, premium: '<span class="ck">✅ (LIVE*)</span>' },
  { feature: 'Dad Joke Drip Campaign', free: '<span class="partial">1/month (the bad ones)</span>', premium: '<span class="ck">Daily (the GOOD ones)</span>' },
  { feature: 'Priority Seating at Family Events', free: '<span class="partial">Kids\' table</span>', premium: '<span class="ck">Main table*</span>' },
  { feature: 'Secret Family Recipes', free: xx, premium: '<span class="ck">✅ (no measurements)</span>' },
  { feature: 'Toddler Whisperer Hotline', free: xx, premium: ck },
  { feature: 'Running Accountability Texts', free: xx, premium: ck },
  { feature: 'Monthly Game Night Pick', free: xx, premium: '<span class="ck">✅ (advisory only)</span>' },
  { feature: 'Annual Smurf Development Report', free: xx, premium: ck },
  { feature: 'Group Chat Highlight Reel', free: xx, premium: ck },
  { feature: 'Video Game Recommendations', free: xx, premium: ck },
  { feature: 'Hot Takes On Demand', free: xx, premium: ck },
  { feature: 'Ability to Cancel Subscription', free: 'N/A', premium: '<span class="partial">Technically yes*</span>' },
]
</script>

<style scoped>
.compare-section { background: #f8fafc; }

.table-wrapper {
  overflow-x: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--white);
  font-size: 0.9rem;
}

th, td { padding: 0.75rem 1rem; text-align: center; }

.feature-col { text-align: left; width: 45%; }
.plan-col { width: 27.5%; }

.plan-head {
  font-family: var(--font-display);
  font-size: 1.3rem;
  letter-spacing: 0.04em;
}
.plan-price {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--dark);
}
.plan-price span { font-size: 0.85rem; font-weight: 600; color: var(--gray); }

.free-col { background: #f8fafc; }
.premium-col {
  background: linear-gradient(180deg, #eef2ff, #fff);
  position: relative;
}

.plan-badge {
  background: var(--orange);
  color: white;
  font-size: 0.6rem;
  font-weight: 900;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.08em;
  display: inline-block;
  margin-bottom: 0.25rem;
}

thead tr th {
  border-bottom: 2px solid var(--gray-light);
  padding: 1.25rem 1rem;
}

tbody tr { border-bottom: 1px solid #f1f5f9; }
tbody tr:hover { background: #fafbfc; }

.feature-name { text-align: left; font-weight: 600; color: var(--dark); }

.premium-cell { background: linear-gradient(180deg, rgba(238,242,255,0.4), transparent); }

tfoot td { padding: 1rem; }
.foot-label { font-size: 0.8rem; color: var(--gray); font-style: italic; }
.premium-foot { }

:deep(.ck) { color: var(--green); font-weight: 700; }
:deep(.xx) { color: #94a3b8; }
:deep(.partial) { color: #b45309; font-size: 0.8rem; font-weight: 600; }
</style>
