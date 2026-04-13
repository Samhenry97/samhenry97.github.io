<template>
  <div class="library-wrap">

    <div class="library-header">
      <h2 class="library-title">📚 Content Library</h2>
      <p class="library-sub">{{ available }} of {{ items.length }} pieces of content available. The rest are loading. Please wait.</p>
      <div class="library-search">
        <input v-model="query" class="search-input" placeholder="Search content..." />
        <button class="search-btn" @click="windowAlert('Search results take 3–5 business years to process.')">🔍</button>
      </div>
    </div>

    <div class="library-filters">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-btn"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>

    <div class="library-grid">
      <div v-for="item in filteredItems" :key="item.title" class="lib-card" @click="openItem(item)">
        <div class="lib-thumb" :style="{ background: item.thumbBg }">
          <span class="lib-thumb-icon">{{ item.icon }}</span>
          <div v-if="item.locked" class="lib-locked-overlay">🔒</div>
          <div v-else-if="item.buffering" class="lib-buffering-overlay">
            <div class="mini-spinner"></div>
          </div>
          <div v-else-if="item.corrupt" class="lib-corrupt-overlay">⚠️</div>
        </div>
        <div class="lib-meta">
          <div class="lib-item-title">{{ item.title }}</div>
          <div class="lib-item-sub">{{ item.sub }}</div>
          <div class="lib-badges">
            <span v-if="item.locked" class="lib-badge locked">PREMIUM+</span>
            <span v-else-if="item.buffering" class="lib-badge buffering">LOADING</span>
            <span v-else-if="item.corrupt" class="lib-badge corrupt">FILE ERROR</span>
            <span v-else class="lib-badge available">AVAILABLE</span>
            <span class="lib-duration">{{ item.duration }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredItems.length === 0" class="library-empty">
      <p>No content found. Try a different category.<br/><small>Or wait 3–5 business years.</small></p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

function windowAlert(msg) { window.alert(msg) }

const query = ref('')
const activeCategory = ref('All')
const categories = ['All', 'Board Games', 'Running', 'Toddlers', 'Family', '3D Printing', 'Exclusive']

const items = [
  { icon: '🎲', title: "Sam Explains Wingspan for 45 Minutes", sub: "Full uncut. Timo asks one question.", duration: "45:12", category: 'Board Games', thumbBg: '#fff3ed', buffering: true, locked: false, corrupt: false },
  { icon: '🎲', title: "Is Catan Still Good? A Deep Dive", sub: "Sam has thoughts. Many thoughts.", duration: "1:02:44", category: 'Board Games', thumbBg: '#fef9c3', buffering: false, locked: false, corrupt: false },
  { icon: '🎲', title: "The Iconography Problem: Why No One Reads the Rules", sub: "They should read the rules.", duration: "38:50", category: 'Board Games', thumbBg: '#fff3ed', buffering: true, locked: false, corrupt: false },
  { icon: '🎲', title: "Top 47 Board Games Ranked — Live Reaction", sub: "Ari is present. She has a different list.", duration: "2:14:03", category: 'Board Games', thumbBg: '#ffedd5', buffering: false, locked: true, corrupt: false },
  { icon: '🏃', title: "Running Intention: A Masterclass", sub: "How to think about running. Step one: text someone.", duration: "12:00", category: 'Running', thumbBg: '#f0fdf4', buffering: false, locked: false, corrupt: false },
  { icon: '🏃', title: "Papa vs. Sam: Running Styles Compared", sub: "Papa runs. Sam announces. These are different things.", duration: "18:33", category: 'Running', thumbBg: '#dcfce7', buffering: false, locked: false, corrupt: true },
  { icon: '🏃', title: "Couch to 5K: Weeks 1–3", sub: "Filmed last April. Sam did not finish the program.", duration: "22:17", category: 'Running', thumbBg: '#f0fdf4', buffering: true, locked: false, corrupt: false },
  { icon: '👶', title: "Bendy Boy Car Inspection: Full Session", sub: "37 minutes. Uninterrupted. Very focused.", duration: "37:04", category: 'Toddlers', thumbBg: '#eff6ff', buffering: false, locked: false, corrupt: false },
  { icon: '👶', title: "Lay-Lay Explains Frozen (Her Version)", sub: "Significantly different from the film.", duration: "8:41", category: 'Toddlers', thumbBg: '#faf5ff', buffering: false, locked: false, corrupt: false },
  { icon: '👶', title: "Smurf Says 'Maaaama Maaaama': Compilation", sub: "Always snacks. Without exception.", duration: "4:12", category: 'Toddlers', thumbBg: '#fff7ed', buffering: false, locked: false, corrupt: false },
  { icon: '👶', title: "Toddler Containment Strategies: What Works", sub: "Field research. Mixed results.", duration: "29:55", category: 'Toddlers', thumbBg: '#eff6ff', buffering: true, locked: false, corrupt: false },
  { icon: '👨‍👩‍👧‍👦', title: "Family Zoom Call — Holidays 2024", sub: "Raw, unedited. Winnie appears at 22:14.", duration: "1:47:09", category: 'Family', thumbBg: '#f8fafc', buffering: false, locked: true, corrupt: false },
  { icon: '👨‍👩‍👧‍👦', title: "Grandma's Recipe Vault: Vol. 1", sub: "Units: 'a handful,' 'Grandma's amount,' 'you'll know.'", duration: "55:00", category: 'Family', thumbBg: '#fef9c3', buffering: false, locked: true, corrupt: false },
  { icon: '👨‍👩‍👧‍👦', title: "The Intervention: Episode 1", sub: "Redacted for legal reasons. Very good though.", duration: "??:??", category: 'Family', thumbBg: '#fef2f2', buffering: false, locked: true, corrupt: false },
  { icon: '👨‍👩‍👧‍👦', title: "Game Night 2025 — Highlights", sub: "No vetoes. Sam picked. It went fine.", duration: "1:03:22", category: 'Family', thumbBg: '#f8fafc', buffering: true, locked: false, corrupt: false },
  { icon: '🖨️', title: "3D Printing for the Home: Series 1", sub: "You already have this. The printer is running now.", duration: "6-part series", category: '3D Printing', thumbBg: '#f0fdf4', buffering: false, locked: false, corrupt: false },
  { icon: '🖨️', title: "The Drawer Pull That Was Fine: A Post-Mortem", sub: "The drawer was working. Sam printed a new pull anyway.", duration: "14:02", category: '3D Printing', thumbBg: '#fff3ed', buffering: false, locked: false, corrupt: false },
  { icon: '🖨️', title: "Printing 'Something For the Kids' — Full Process", sub: "It is too small for the kids. Sam is aware.", duration: "11:30", category: '3D Printing', thumbBg: '#f0fdf4', buffering: true, locked: false, corrupt: false },
  { icon: '🌟', title: "Sam's Unfiltered Board Game Tier List (3,200 Words)", sub: "Premium exclusive. Ari has a rebuttal.", duration: "read: ~18 min", category: 'Exclusive', thumbBg: '#fffbeb', buffering: false, locked: true, corrupt: false },
  { icon: '🌟', title: "Full Family Group Chat Archive: 2021–Present", sub: "Grandma's forwards. Papa's projects. Juju's appearances.", duration: "∞", category: 'Exclusive', thumbBg: '#faf5ff', buffering: false, locked: true, corrupt: false },
  { icon: '🌟', title: "Sam's Actual Cell Number", sub: "For emergencies. Sam defines 'emergency.'", duration: "1 contact card", category: 'Exclusive', thumbBg: '#fef2f2', buffering: false, locked: true, corrupt: false },
]

const available = computed(() => items.filter(i => !i.locked && !i.buffering && !i.corrupt).length)

const filteredItems = computed(() => {
  let list = activeCategory.value === 'All' ? items : items.filter(i => i.category === activeCategory.value)
  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    list = list.filter(i => i.title.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q))
  }
  return list
})

function openItem(item) {
  if (item.locked) {
    window.alert('This content requires Sam & Fam Ultra ($15/month, billed in addition to your current plan). Upgrade request processing time: 3–5 business years.')
  } else if (item.buffering) {
    window.alert('This content is still loading. Estimated completion: 3–5 business years. Thank you for your patience.')
  } else if (item.corrupt) {
    window.alert('File error: This content could not be retrieved. Error code: SF-' + Math.floor(Math.random()*9000+1000) + '. Sam may have deleted it. Support ticket auto-generated.')
  } else {
    window.alert(`Now playing: "${item.title}"\n\nBuffering... 12%\n\n(Content playback is not yet implemented. Sam is aware. The printer is running.)\n\nEstimated fix: 3–5 business years.`)
  }
}
</script>

<style scoped>
.library-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.library-header { }
.library-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  color: var(--dark);
  margin-bottom: 0.25rem;
}
.library-sub { font-size: 0.82rem; color: var(--gray); margin-bottom: 0.75rem; }

.library-search {
  display: flex;
  gap: 0.5rem;
  max-width: 380px;
}
.search-input {
  flex: 1;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.45rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  background: white;
}
.search-input:focus { outline: none; border-color: var(--orange); }
.search-btn {
  background: var(--orange);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  padding: 0 0.75rem;
  cursor: pointer;
}

.library-filters {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.filter-btn {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 20px;
  padding: 0.3rem 0.85rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-body);
  color: var(--gray);
  transition: all 0.15s;
}
.filter-btn:hover { border-color: var(--orange); color: var(--orange); }
.filter-btn.active { background: var(--orange); border-color: var(--orange); color: white; }

.library-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.lib-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: var(--shadow);
}
.lib-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }

.lib-thumb {
  aspect-ratio: 16/9;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.lib-thumb-icon { opacity: 0.5; }

.lib-locked-overlay, .lib-buffering-overlay, .lib-corrupt-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  background: rgba(0,0,0,0.35);
}

.mini-spinner {
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.lib-meta { padding: 0.65rem 0.75rem; }
.lib-item-title { font-size: 0.78rem; font-weight: 700; color: var(--dark); line-height: 1.3; margin-bottom: 0.2rem; }
.lib-item-sub { font-size: 0.68rem; color: var(--gray); line-height: 1.3; margin-bottom: 0.4rem; }
.lib-badges { display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; }
.lib-badge { font-size: 0.58rem; font-weight: 900; padding: 0.1rem 0.35rem; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.05em; }
.lib-badge.locked { background: #fef9c3; color: #854d0e; }
.lib-badge.buffering { background: #dbeafe; color: #1e40af; }
.lib-badge.corrupt { background: #fee2e2; color: #991b1b; }
.lib-badge.available { background: #dcfce7; color: #166534; }
.lib-duration { font-size: 0.65rem; color: #94a3b8; margin-left: auto; }

.library-empty {
  text-align: center;
  color: var(--gray);
  font-size: 0.85rem;
  padding: 2rem;
}
</style>
