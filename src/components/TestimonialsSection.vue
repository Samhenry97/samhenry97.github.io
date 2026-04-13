<template>
  <section class="section testimonials-section" id="testimonials">
    <div class="container">
      <p class="badge badge-orange" style="display:block; text-align:center; margin-bottom:0.75rem;">REVIEWS</p>
      <h2 class="section-title">What Our Members Are Saying</h2>
      <p class="section-sub">Real reviews from real people. Definitely not from family members. Unrelated individuals.</p>

      <div class="testimonials-grid">
        <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
          <div class="t-stars">{{ '★'.repeat(t.stars) }}{{ '☆'.repeat(5 - t.stars) }}</div>
          <p class="t-quote">"{{ t.quote }}"</p>
          <div class="t-author">
            <div class="t-avatar">{{ t.initials }}</div>
            <div>
              <div class="t-name">{{ t.name }}</div>
              <div class="t-meta">{{ t.meta }}</div>
            </div>
          </div>
          <div class="t-verified">✅ Verified Subscriber</div>
        </div>
      </div>

      <p class="testimonials-disclaimer">
        * Reviews provided by verified subscribers. Sam &amp; Fam does not compensate reviewers,
        pressure reviewers, or sign reviewers up for the subscription before asking for reviews.
        Any resemblance to family members is purely coincidental and legally defensible.
      </p>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    stars: 5,
    quote: "Sam answered my 2am call. He could not help with the actual problem but he did recommend a board game that 'thematically applies to the situation.' He then 3D-printed me something related to the game. I did not ask for it. It's actually kind of cool.",
    name: 'S.H.',
    initials: 'SH',
    meta: 'Software Engineer · Board Game Enthusiast · SLC, UT',
  },
  {
    stars: 5,
    quote: "I am writing this review while crocheting and watching Taskmaster. Sam's advice is almost always wrong, which is why my Reality Check column exists. I do not receive additional compensation for this. Someone should look into that.",
    name: 'A.H.',
    initials: 'AH',
    meta: 'SAHM · Crafter · Taskmaster Enjoyer · SLC, UT',
  },
  {
    stars: 5,
    quote: "We've survived Epic go-lives. This subscription's cancellation process is, comparatively, manageable. Val gives it 5 stars. The Smurf Report is accurate — Erca wrote it. Sam added pie charts.",
    name: 'T. & E.R.',
    initials: 'TR',
    meta: 'Verified Members · Owners of Val',
  },
  {
    stars: 5,
    quote: "I am either at work, watching something, or somewhere in the Pacific. Hard to say most of the time. The group chat highlights keep me informed during off-grid periods. I did not cancel. I may be unable to.",
    name: 'J.S.',
    initials: 'JS',
    meta: 'Verified Member · Location: Unknown',
  },
  {
    stars: 3,
    quote: "I deal with actual emergencies. Sam took 2 days to respond to mine because of a board game. I gave 3 stars because my pickleball injury inquiry was at least logged. Still open. Still subscribed. Still waiting for my main-table seat.",
    name: 'Boo',
    initials: 'B',
    meta: 'Greenville, SC · Joined Involuntarily',
  },
  {
    stars: 5,
    quote: "We support this because we support Sam. The recipes in the Vault are ours and have no measurements because that is simply how cooking works. Winnie and Opal reviewed the content and are neutral. The smart home stuff is going very well, thank you for asking.",
    name: 'P. & G.',
    initials: 'PG',
    meta: 'Bloomsburg, PA · Original Content Creators',
  },
]
</script>

<style scoped>
.testimonials-section { background: var(--white); }

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.testimonial-card {
  border: 1.5px solid var(--gray-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  transition: box-shadow 0.2s;
}
.testimonial-card:hover { box-shadow: var(--shadow-lg); }

.t-stars { color: var(--yellow); font-size: 1.1rem; letter-spacing: -1px; }

.t-quote {
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.65;
  flex: 1;
  font-style: italic;
}

.t-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-top: 1px solid var(--gray-light);
  padding-top: 0.75rem;
}

.t-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--dark), var(--dark2));
  color: white;
  font-weight: 800;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.t-name { font-weight: 800; font-size: 0.9rem; color: var(--dark); }
.t-meta { font-size: 0.72rem; color: var(--gray); }

.t-verified {
  font-size: 0.68rem;
  color: var(--green);
  font-weight: 700;
}

.testimonials-disclaimer {
  font-size: 0.68rem;
  color: #94a3b8;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}
</style>
