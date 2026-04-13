<template>
  <div class="inbox-wrap">

    <div class="inbox-toolbar">
      <span class="inbox-count"><strong>{{ emails.length }} messages</strong> — {{ unread }} unread</span>
      <button class="toolbar-btn" @click="windowAlert('Marking all as read... done. (Nothing changed. We will continue sending.)')">Mark all read</button>
      <button class="toolbar-btn" @click="windowAlert('Unsubscribe request received. Processing time: 3–5 business years.')">Unsubscribe</button>
    </div>

    <div class="inbox-layout">

      <!-- Email list panel -->
      <div class="email-list">
        <div
          v-for="email in emails"
          :key="email.id"
          class="email-row"
          :class="{ unread: !email.read, selected: selectedId === email.id }"
          @click="open(email)"
        >
          <div class="email-row-top">
            <span class="email-from">{{ email.from }}</span>
            <span class="email-time">{{ email.time }}</span>
          </div>
          <div class="email-subject">{{ email.subject }}</div>
          <div class="email-preview">{{ email.preview }}</div>
        </div>
      </div>

      <!-- Email detail panel -->
      <div class="email-detail" v-if="selected">
        <div class="detail-header">
          <div class="detail-subject">{{ selected.subject }}</div>
          <div class="detail-meta">
            <span><strong>From:</strong> {{ selected.from }}</span>
            <span><strong>To:</strong> valued.subscriber.4721@samfam.internal</span>
            <span><strong>Date:</strong> {{ selected.time }}</span>
          </div>
        </div>
        <div class="detail-body" v-html="selected.body"></div>
        <div class="detail-actions">
          <button class="toolbar-btn" @click="windowAlert('Reply sent. Sam will respond in 1–3 business days.')">↩ Reply</button>
          <button class="toolbar-btn" @click="windowAlert('Forwarded. Grandma has been CC\'d automatically.')">→ Forward</button>
          <button class="toolbar-btn" @click="windowAlert('This email cannot be deleted per our Content Retention Policy (§12.4).')">🗑 Delete</button>
        </div>
      </div>

      <div class="email-detail empty-state" v-else>
        <div>
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📬</div>
          <p>Select an email to read it.</p>
          <p style="font-size: 0.78rem; margin-top: 0.35rem;">You have {{ unread }} unread messages. We will not stop sending.</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

function windowAlert(msg) { window.alert(msg) }

const emails = ref([
  {
    id: 1,
    from: 'Sam 🎲 <no-reply@samfam.internal>',
    subject: '🎉 Welcome to Sam & Fam — You\'re In Whether You Like It Or Not',
    time: 'Today, 12:01 AM',
    preview: 'Congratulations! Your trial has begun. Please read this entire email — there will not be a summary.',
    read: false,
    body: `<p>Dear Valued Subscriber #4,721,</p>
<br/>
<p>Welcome to <strong>Sam &amp; Fam</strong>. You are now a member. The exact nature of your membership is detailed in our Terms of Service (156 pages, updated quarterly).</p>
<br/>
<p>Here is what happens next:</p>
<ul style="margin: 0.75rem 0 0.75rem 1.25rem; line-height: 2;">
  <li>You will receive Sam's unsolicited advice on a rolling basis</li>
  <li>Lay-Lay's art drop ships digitally (image may fail to load — this is a known feature)</li>
  <li>Your emergency contact registration has been submitted to Sam's phone (allow 1–3 days for him to notice)</li>
  <li>A 3D-printed object is now in queue. You did not request this. It is coming.</li>
</ul>
<p>Your trial lasts 7 days, after which you will be charged automatically, forever, or until one of us figures out how to stop it.</p>
<br/>
<p>Thank you for your continued payments,<br/><strong>Sam</strong><br/><em>Founder, Sam &amp; Fam LLC</em></p>
<br/>
<p style="font-size: 0.65rem; color: #94a3b8;">To unsubscribe, click here. Just kidding — that link goes to a different welcome email. Please enjoy your membership.</p>`
  },
  {
    id: 2,
    from: 'Sam &amp; Fam Billing <billing@samfam.internal>',
    subject: '🧾 Your Billing Confirmation — Charge Successful',
    time: 'Yesterday, 8:44 AM',
    preview: 'Your payment of $5.00 has been processed. Please do not look too closely at the line items.',
    read: false,
    body: `<p>Hello Valued Member,</p>
<br/>
<p>Your payment has been <strong style="color: #16a34a;">successfully processed</strong>. Here is your receipt:</p>
<br/>
<table style="width:100%; font-size: 0.82rem; border-collapse: collapse;">
  <tr style="border-bottom: 1px solid #e2e8f0;">
    <td style="padding: 0.4rem 0;">Sam &amp; Fam Monthly Membership</td>
    <td style="text-align:right;">$5.00</td>
  </tr>
  <tr style="border-bottom: 1px solid #e2e8f0;">
    <td style="padding: 0.4rem 0;">Content Delivery Fee</td>
    <td style="text-align:right;">$0.00</td>
  </tr>
  <tr style="border-bottom: 1px solid #e2e8f0;">
    <td style="padding: 0.4rem 0;">3D Print Logistics Surcharge</td>
    <td style="text-align:right;">$0.00</td>
  </tr>
  <tr style="border-bottom: 1px solid #e2e8f0;">
    <td style="padding: 0.4rem 0; font-size: 0.65rem; color: #94a3b8;">Goodwill Membership Contribution (non-optional)</td>
    <td style="text-align:right; font-size: 0.65rem; color: #94a3b8;">$0.00</td>
  </tr>
  <tr style="font-weight: 800; padding-top: 0.25rem;">
    <td style="padding: 0.4rem 0;">Total</td>
    <td style="text-align:right;">$5.00</td>
  </tr>
</table>
<br/>
<p>Your next billing date is <strong>30 days from now</strong>, or sooner if we update our billing policy, whichever comes first.</p>
<br/>
<p>Questions? Contact support at support@samfam.internal. Expected response: 3–5 business years.</p>`
  },
  {
    id: 3,
    from: '🖨️ 3D Print Fulfillment Center <prints@samfam.internal>',
    subject: 'Your 3D Print Is On Its Way — Item Details: TBD',
    time: 'Mon, 9:12 AM',
    preview: 'A print has been initiated on your behalf. What it is remains to be determined.',
    read: false,
    body: `<p>Hello,</p>
<br/>
<p>Great news — <strong>a 3D print has been initiated on your behalf</strong>.</p>
<br/>
<p><strong>Item:</strong> Unknown (Sam is still deciding)<br/>
<strong>Color:</strong> Whatever filament was loaded<br/>
<strong>Estimated print time:</strong> 6–14 hours<br/>
<strong>Estimated arrival:</strong> Sometime. It will arrive.<br/>
<strong>Tracking number:</strong> Not applicable — Sam will just bring it</p>
<br/>
<p>Past prints have included: a figurine, a replacement drawer pull for a drawer that was working fine, something described as "for the kids" that is clearly too small for the kids, and a custom insert for a board game Ari has not played.</p>
<br/>
<p>Your print is equally mysterious. We look forward to its reveal.</p>
<br/>
<p style="font-size: 0.78rem; color: #94a3b8;">The printer runs at night. The sound is normal. Please do not be alarmed.</p>`
  },
  {
    id: 4,
    from: 'Erca ✍️ <erca@definitely-not-substack.internal>',
    subject: 'New Post: "On Small Moments and the Cost of Paying Attention"',
    time: 'Sun, 2:33 PM',
    preview: 'Erca\'s Substack is thoughtful, well-written, and free. This is a threat to our business model.',
    read: true,
    body: `<p><em>Note from Sam &amp; Fam: This email was not supposed to arrive in your inbox. Erca's Substack integration was enabled without authorization. We are addressing it. In the meantime, please enjoy the content below and do <strong>not</strong> subscribe to her separately.</em></p>
<br/>
<hr style="border: 1px solid #e2e8f0;"/>
<br/>
<p>Hi — it's Erca.</p>
<br/>
<p>Smurf said "Maaaama Maaaama" this morning and then immediately fell asleep in my arms. Timo was in the workshop. Val was sitting in the doorway, watching both of us in that calm, knowing way she has.</p>
<br/>
<p>I wrote this post in 40 minutes while Smurf napped. I don't know if that's fast or slow anymore. Time does something different in this season.</p>
<br/>
<p>Anyway. It's about noticing things before they pass. Read it if you want to.</p>
<br/>
<p>— Erca</p>
<br/>
<p style="font-size: 0.72rem; color: #94a3b8;">This post is free. All posts are free. If you'd like to support the work, tell someone else about it. That's genuinely all.</p>
<br/>
<hr style="border: 1px solid #e2e8f0;"/>
<br/>
<p style="font-size: 0.65rem; color: #94a3b8;"><em>Sam &amp; Fam legal note: clicking the subscribe button below will subscribe you to Erca's Substack, not this service. We have no affiliation with her newsletter and receive no revenue from it. We are, frankly, a little threatened by it.</em></p>`
  },
  {
    id: 5,
    from: 'Sam 🎲 <game-night@samfam.internal>',
    subject: '📅 Game Night — THIS SATURDAY — Sam Has Already Picked the Game',
    time: 'Sat, 11:08 AM',
    preview: 'The game has been selected. Appeals are not being accepted at this time.',
    read: true,
    body: `<p>Family,</p>
<br/>
<p>Game Night is <strong>this Saturday</strong>. Details:</p>
<br/>
<p><strong>Game:</strong> [Sam has selected it — reveal at arrival]<br/>
<strong>Time:</strong> 6:30 PM<br/>
<strong>Location:</strong> To be confirmed<br/>
<strong>Rule explanation:</strong> Will take 30–45 minutes. Clear your schedule.<br/>
<strong>Appeals:</strong> Not accepted</p>
<br/>
<p><strong>Attendance notes:</strong></p>
<ul style="margin: 0.5rem 0 0.5rem 1.25rem; line-height: 2; font-size: 0.85rem;">
  <li>Timo: Confirmed if workshop is at a stopping point (Val welcome)</li>
  <li>Erca: "My Substack won't write itself." Sam: unmoved.</li>
  <li>Juju: No response. All scenarios remain open.</li>
  <li>Boo: "Is it a pickleball-themed game?" It is not.</li>
  <li>Papa: In — post-nap</li>
  <li>Grandma: In — Winnie and Opal are staying home</li>
</ul>
<p>The game is not a pickleball game. Please do not ask again.</p>
<br/>
<p>See you Saturday,<br/><strong>Sam</strong></p>`
  },
  {
    id: 6,
    from: 'Grandma 🐱 <grandma@familychat.internal>',
    subject: 'Fwd: Fwd: Fwd: FW: You Will NOT Believe What This Doctor Found',
    time: 'Fri, 4:17 PM',
    preview: 'Grandma has forwarded something. The chain is long. Winnie and Opal are fine.',
    read: true,
    body: `<p>Hi everyone,</p>
<br/>
<p>I thought this was interesting! Wanted to share. Winnie is sitting on the keyboard right now so I hope this sends okay.</p>
<br/>
<p>Love,<br/>Grandma</p>
<br/>
<hr style="border: 1px solid #e2e8f0; margin: 1rem 0;"/>
<p style="font-size: 0.78rem; color: #64748b;"><strong>---- Forwarded Message ----</strong><br/>
<strong>From:</strong> marilynfromchurch@yahoo.com<br/>
<strong>Subject:</strong> Fwd: Fwd: FW: You Will NOT Believe What This Doctor Found<br/><br/>
Sending this along because I think it's important for everyone to know about. Please share with your loved ones.</p>
<br/>
<hr style="border: 1px solid #e2e8f0; margin: 1rem 0;"/>
<p style="font-size: 0.78rem; color: #64748b;"><strong>---- Forwarded Message ----</strong><br/>
<strong>From:</strong> newsletter-noreply@healthtips-2007.net<br/><br/>
DOCTORS HATE HIM. LOCAL MAN DISCOVERS ONE SIMPLE TRICK THAT...</p>
<br/>
<p style="font-size: 0.65rem; color: #94a3b8;">[Message continues for 47 more forwarded layers. Sam &amp; Fam has truncated this for readability. Opal has been confirmed as also fine.]</p>`
  },
  {
    id: 7,
    from: '🎭 Sam &amp; Fam Intervention Desk <interventions@samfam.internal>',
    subject: 'Intervention Request Receipt — Ticket #SF-PENDING',
    time: 'Thu, 10:00 AM',
    preview: 'Your intervention request has been received. It is in queue behind 847 others.',
    read: true,
    body: `<p>Hello,</p>
<br/>
<p>Thank you for submitting an Intervention Request through the Sam &amp; Fam Member Portal. Your ticket has been received and assigned to the queue.</p>
<br/>
<p><strong>Ticket Reference:</strong> SF-PENDING-00847<br/>
<strong>Status:</strong> Received<br/>
<strong>Priority:</strong> Standard (upgrade to CRITICAL requires Papa's nap window to align)<br/>
<strong>Expected Response:</strong> 3–5 business years<br/>
<strong>Assigned To:</strong> Sam (primary), Papa (backup, mid-project)</p>
<br/>
<p>The Intervention Coordination Team (Sam, and sometimes Ari if she's between crochet projects) will review your request and schedule the following:</p>
<ul style="margin: 0.5rem 0 0.5rem 1.25rem; line-height: 2; font-size: 0.85rem;">
  <li>An availability check (Grandma's cats, Boo's pickleball schedule, Juju's location TBD)</li>
  <li>A pre-intervention brief (15–45 minutes, depending on Sam's prep)</li>
  <li>The intervention itself</li>
  <li>A post-intervention debrief (optional but will happen)</li>
</ul>
<p>Please do not contact us to check on the status of your request. We will contact you when we are ready. Thank you for being a Sam &amp; Fam subscriber.</p>
<br/>
<p style="font-size: 0.65rem; color: #94a3b8;">Sam &amp; Fam LLC is not responsible for interventions that go sideways. Winnie and Opal are not available for emotional support during or after interventions. That is Grandma's call.</p>`
  },
])

const selectedId = ref(null)
const selected = computed(() => emails.value.find(e => e.id === selectedId.value) || null)
const unread = computed(() => emails.value.filter(e => !e.read).length)

function open(email) {
  selectedId.value = email.id
  email.read = true
}
</script>

<style scoped>
.inbox-wrap {
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 100%;
  min-height: 500px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.inbox-toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  flex-wrap: wrap;
}

.inbox-count { font-size: 0.8rem; color: var(--gray); flex: 1; }

.toolbar-btn {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  color: var(--dark);
  transition: background 0.15s;
}
.toolbar-btn:hover { background: #f1f5f9; }

.inbox-layout {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* Email list */
.email-list {
  width: 280px;
  flex-shrink: 0;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .inbox-layout { flex-direction: column; }
  .email-list { width: 100%; border-right: none; border-bottom: 1px solid #e2e8f0; max-height: 240px; }
}

.email-row {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background 0.1s;
}
.email-row:hover { background: #f8fafc; }
.email-row.selected { background: #eff6ff; border-left: 3px solid var(--dark); }
.email-row.unread .email-subject { font-weight: 800; }
.email-row.unread::before { content: ''; }

.email-row-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.15rem; }
.email-from { font-size: 0.75rem; font-weight: 700; color: var(--dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px; }
.email-time { font-size: 0.65rem; color: var(--gray); flex-shrink: 0; }
.email-subject { font-size: 0.78rem; color: #1e293b; margin-bottom: 0.2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.email-preview { font-size: 0.7rem; color: var(--gray); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Email detail */
.email-detail {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  min-width: 0;
}

.email-detail.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--gray);
  font-size: 0.85rem;
}

.detail-header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.85rem;
  margin-bottom: 1rem;
}
.detail-subject { font-size: 1rem; font-weight: 800; color: var(--dark); margin-bottom: 0.5rem; }
.detail-meta { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.75rem; color: var(--gray); }

.detail-body {
  font-size: 0.85rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1.25rem;
}

.detail-actions {
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
}
</style>
