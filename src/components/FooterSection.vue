<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="footer-logo">Sam &amp; Fam</div>
        <p class="footer-tagline">
          Your family. Our revenue stream. Your problem.
        </p>
        <p class="footer-legal-name">
          Sam &amp; Fam LLC — A subsidiary of Sam Industries International, Inc.<br/>
          A portfolio company of Henry Family Holdings Group, Ltd.
        </p>
      </div>

      <div class="footer-links-group">
        <h4>Company</h4>
        <a href="#" @click.prevent>About Sam</a>
        <a href="#" @click.prevent>Our Mission</a>
        <a href="#" @click.prevent>Careers (2 positions: Sam, Ari)</a>
        <a href="#" @click.prevent>Press Kit</a>
        <a href="#" @click.prevent>Investor Relations</a>
      </div>

      <div class="footer-links-group">
        <h4>Support</h4>
        <a href="#" @click.prevent>Help Center (Under Construction)</a>
        <a href="#" @click.prevent>Contact Us (Response: 3–5 Business Years)</a>
        <a href="#faq">FAQ</a>
        <a href="#" @click.prevent>Cancellation Queue Status</a>
        <a href="#" @click.prevent>Report an Issue (Goes to Sam)</a>
      </div>

      <div class="footer-links-group">
        <h4>Legal</h4>
        <a href="#" @click.prevent>Terms of Service</a>
        <a href="#" @click.prevent>Privacy Policy</a>
        <a href="#" @click.prevent>Cancellation Policy (Section 4.2.b)</a>
        <a href="#" @click.prevent>Arbitration Agreement</a>
        <a href="#" @click.prevent>Cookie Policy (We Use Cookies)</a>
        <a href="#" @click.prevent>Cookie Policy (The Edible Kind, See Recipe Vault)</a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p class="footer-copyright">
          © {{ year }} Sam &amp; Fam LLC. All rights reserved. Especially the right to keep charging you.
          "Sam &amp; Fam", "The #1 Family Content Platform", "Cancel Anytime*", and "Unsolicited Advice You Can Trust"
          are trademarks of Sam Industries International, Inc. in territories where Sam has been.
        </p>
        <p class="footer-disclaimer">
          Sam &amp; Fam is a parody website. No real payments are processed. No real subscriptions exist.
          Any resemblance to actual subscription dark patterns is intentional and for comedic purposes only.
          Please do not attempt to cancel. There is no refund. <span class="footer-reset" @click="resetDemo">🔧</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSubscription } from '../composables/useSubscription'

const { resetDemo } = useSubscription()
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--dark);
  color: rgba(255,255,255,0.65);
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  padding: 3rem 1.5rem 2rem;
}

@media (max-width: 768px) {
  .footer-inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .footer-inner { grid-template-columns: 1fr; }
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--white);
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.footer-tagline {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  font-style: italic;
}

.footer-legal-name {
  font-size: 0.65rem;
  opacity: 0.45;
  line-height: 1.5;
}

.footer-links-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-links-group h4 {
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--white);
  margin-bottom: 0.25rem;
}

.footer-links-group a {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.15s;
}
.footer-links-group a:hover { color: rgba(255,255,255,0.85); }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 1.25rem 1.5rem;
}

.footer-bottom-inner {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-copyright {
  font-size: 0.68rem;
  opacity: 0.4;
  line-height: 1.5;
}

.footer-disclaimer {
  font-size: 0.68rem;
  opacity: 0.35;
  line-height: 1.5;
}

.footer-reset {
  cursor: pointer;
  opacity: 0.3;
  font-size: 0.75rem;
  transition: opacity 0.2s;
}
.footer-reset:hover { opacity: 0.8; }
</style>
