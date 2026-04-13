<template>
  <section class="section features-section" id="features">
    <div class="container">
      <p class="section-badge badge badge-orange" style="display:block; text-align:center; margin-bottom:0.75rem;">WHAT YOU GET</p>
      <h2 class="section-title">Premium Benefits,<br/>Questionable Value</h2>
      <p class="section-sub">Every Sam &amp; Fam subscriber gets access to our full suite of exclusive services. Results may vary.</p>

      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
          <div class="feature-tag" v-if="feature.tag">{{ feature.tag }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '🎲',
    title: "Sam's Unsolicited Life Advice",
    desc: 'Board game deep-dives, video game strategy for games you don\'t own, running motivation from someone who thinks about running quite a bit, toddler tips, and a quarterly 3D-printed object mailed to your address. You did not request the object. It is coming anyway.',
    tag: 'MOST POPULAR',
  },
  {
    icon: '✅',
    title: "Ari's Reality Check",
    desc: 'Every piece of Sam\'s advice is reviewed and corrected by Ari — delivered between crochet projects and Taskmaster episodes. Accuracy rate: significantly higher than Sam\'s. Ari does this voluntarily and would like a separate subscription fee for it.',
    tag: '⭐ FAN FAVORITE',
  },
  {
    icon: '🎨',
    title: "Lay-Lay's Certified Doodle Drop",
    desc: 'Weekly original artwork. Pieces are primarily Elsa-adjacent, occasionally a park, sometimes a figurine. Ari approves releases.',
    tag: null,
  },
  {
    icon: '🚗',
    title: "Bendy Boy Chaos Tracker",
    desc: 'Live-ish updates on what Bendy Boy is currently throwing, inspecting, or driving across the floor. Status options: Studying Cars, Throwing Balls, Napping, Eating Something Suspicious, and the always-popular "Unknown — We Lost Him For A Sec."',
    tag: 'LIVE*',
  },
  {
    icon: '📞',
    title: 'Family Emergency Contact',
    desc: 'Sam is on file as your emergency contact. Average response time: 1–3 business days. Not available during board game campaigns, 3D print jobs, or if he\'s watching something. Papa is a backup but he\'s mid-project.',
    tag: null,
  },
  {
    icon: '🎭',
    title: 'The Intervention Package',
    desc: 'The whole family mobilizes on your behalf. Scheduling subject to Papa\'s current project, Grandma\'s cat obligations, Boo\'s pickleball schedule, Juju\'s unknowable location, and whether Bendy Boy is napping.',
    tag: '⭐ FAN FAVORITE',
  },
  {
    icon: '😂',
    title: 'Dad Joke Drip Campaign',
    desc: 'Daily premium dad jokes, tested on Lay-Lay and Bendy Boy. Lay-Lay evaluates with ruthless 3-year-old honesty. Bendy Boy has laughed at two of them — probably. Free tier only gets the ones that didn\'t land.',
    tag: null,
  },
  {
    icon: '🪑',
    title: 'Priority Seating at Family Events',
    desc: 'A guaranteed spot at the main table — subject to Grandma\'s final seating authority, which overrides this service completely. Note: Winnie and Opal have standing reservations that cannot be disputed.',
    tag: 'SEASONAL',
  },
  {
    icon: '🍳',
    title: 'Secret Family Recipe Vault',
    desc: 'Recipes originating primarily from Papa and Grandma, transcribed by Sam with no measurements. "A handful," "Grandma\'s amount," and "you\'ll know when it\'s right" are the official units. Results: variable but usually pretty good.',
    tag: null,
  },
  {
    icon: '🏃',
    title: 'Running Accountability Partner',
    desc: 'Sam texts you when he thinks about running. Papa also runs — independently, on his own schedule, with no text. You\'re getting Sam\'s texts. Frequency: spiritually regular, physically irregular.',
    tag: null,
  },
  {
    icon: '🎮',
    title: 'Monthly Game Night Pick',
    desc: 'Sam selects the game. No appeals. Tip: if Juju is reachable and Timo is free, attendance is strong. Erca has noted that her Substack will not write itself during game night. Sam is unmoved.',
    tag: 'NO VETOES',
  },
  {
    icon: '👶',
    title: 'Toddler Whisperer Hotline',
    desc: 'Field-tested advice from people currently in it. Smurf says "Maaaama Maaaama" for snacks. Bendy Boy throws cars. Lay-Lay wants to be Elsa. We have seen things. We can help.',
    tag: null,
  },
  {
    icon: '📊',
    title: 'Annual Smurf Development Report',
    desc: 'A comprehensive update on Smurf\'s growth and milestones, written by Erca and fact-checked by Ari. Val appears in at least one photo. This is non-negotiable.',
    tag: '🔒 EXCLUSIVE',
  },
  {
    icon: '💬',
    title: 'Group Chat Highlight Reel',
    desc: 'Monthly curated best-of from the group chat. Grandma\'s forwarded emails, Boo\'s 7 Brew takes, Juju\'s rare sightings, woodworking updates, and Papa\'s latest project. Context is rarely provided. That\'s intentional.',
    tag: null,
  },
  {
    icon: '🖨️',
    title: '3D Print of the Month',
    desc: 'Sam will print you something. You do not choose what. It arrives slowly, smells faintly of melted plastic, and is definitely something. Past prints include: a figurine, a drawer pull, and something "for the kids" that is too small for the kids.',
    tag: 'NEW',
  },
]
</script>

<style scoped>
.features-section { background: var(--white); }

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.feature-card {
  border: 1.5px solid var(--gray-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.feature-card:hover {
  border-color: var(--orange);
  box-shadow: var(--shadow-orange);
  transform: translateY(-3px);
}

.feature-icon { font-size: 2rem; margin-bottom: 0.75rem; }

.feature-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--gray);
  line-height: 1.6;
}

.feature-tag {
  position: absolute;
  top: -1px;
  right: 1rem;
  background: var(--orange);
  color: white;
  font-size: 0.6rem;
  font-weight: 900;
  padding: 0.2rem 0.5rem;
  border-radius: 0 0 6px 6px;
  letter-spacing: 0.07em;
}
</style>
