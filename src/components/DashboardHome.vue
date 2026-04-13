<template>
  <div class="home-grid">

    <!-- Sam's Daily Advice -->
    <div class="dash-card">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#fff3ed;">🎲</span>
          <span class="card-title">SAM'S DAILY ADVICE</span>
        </div>
        <div class="card-head-right">
          <span class="card-tag">{{ today }}</span>
          <button class="reroll-btn" @click="rerollAdvice" title="Get new advice">🔀</button>
        </div>
      </div>
      <div class="card-body">
        <div class="advice-topic">{{ currentAdvice.topic }}</div>
        <p class="advice-text">{{ currentAdvice.text }}</p>
        <div class="advice-confidence">
          Sam's Confidence Level:
          <span class="stars" style="color: var(--orange)">★★★★★</span>
          <span style="font-size:0.7rem; color: var(--gray)"> (self-reported)</span>
        </div>
      </div>
    </div>

    <!-- Dad Joke -->
    <div class="dash-card">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#fffbeb;">😂</span>
          <span class="card-title">DAD JOKE OF THE DAY</span>
        </div>
        <div class="card-head-right">
          <span class="card-tag blink">NEW!</span>
          <button class="reroll-btn" @click="rerollJoke" title="New joke">🔀</button>
        </div>
      </div>
      <div class="card-body" style="text-align: center;">
        <p class="joke-setup">{{ currentJoke.setup }}</p>
        <div v-if="jokeRevealed">
          <p class="joke-punchline">{{ currentJoke.punchline }}</p>
          <p style="font-size:0.75rem; color: var(--gray); margin-top:0.5rem;">
            Tested on Lay-Lay: <span v-html="currentJoke.layLayReaction"></span><br/>
            Tested on Bendy Boy: <span v-html="currentJoke.bendyReaction"></span>
          </p>
        </div>
        <button v-if="!jokeRevealed" class="btn btn-orange"
          style="margin-top: 1rem; padding: 0.5rem 1.25rem; font-size: 0.85rem;"
          @click="jokeRevealed = true">
          🥁 Reveal Punchline
        </button>
      </div>
    </div>

    <!-- Bendy Boy Status -->
    <div class="dash-card">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#eff6ff;">🚗</span>
          <span class="card-title">BENDY BOY STATUS</span>
        </div>
        <div class="card-head-right">
          <span class="card-tag" style="background:#dcfce7; color: #166534;">LIVE*</span>
          <button class="reroll-btn" @click="rerollBendy" title="Refresh status">🔀</button>
        </div>
      </div>
      <div class="card-body">
        <div class="bendy-status">
          <span class="bendy-dot"></span>
          <span class="bendy-status-text">{{ currentBendy.label }}</span>
        </div>
        <p class="bendy-desc">{{ currentBendy.desc }}</p>
        <div class="bendy-vitals">
          <div class="vital"><span>😴 Nap:</span> <strong>{{ currentBendy.nap }}</strong></div>
          <div class="vital"><span>🍌 Snacks:</span> <strong>{{ currentBendy.snacks }}</strong></div>
          <div class="vital"><span>🌀 Chaos:</span> <strong>{{ currentBendy.chaos }}</strong></div>
        </div>
        <p class="fine-print" style="margin-top: 0.5rem;">*"Live" means Sam checks occasionally and updates this manually.</p>
      </div>
    </div>

    <!-- Lay-Lay Art Drop -->
    <div class="dash-card">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#faf5ff;">🎨</span>
          <span class="card-title">LAY-LAY'S ART DROP</span>
        </div>
        <div class="card-head-right">
          <span class="card-tag" style="background:#f3e8ff; color: #6d28d9;">EXCLUSIVE</span>
          <button class="reroll-btn" @click="rerollArt" title="Next piece">🔀</button>
        </div>
      </div>
      <div class="card-body art-body">
        <div class="art-frame">
          <div class="art-broken">
            🖼️<br/>
            <small>Image failed to load.<br/>This is the art experience.</small>
          </div>
        </div>
        <div class="art-meta">
          <p><strong>"{{ currentArt.title }}"</strong> — Lay-Lay, Age ~3</p>
          <p style="font-size:0.8rem; color: var(--gray); margin-top: 0.4rem; line-height: 1.6;">
            Medium: {{ currentArt.medium }}<br/>
            Ari's Assessment: <em>"{{ currentArt.ariTake }}"</em><br/>
            Sam's Assessment: <em>"{{ currentArt.samTake }}"</em>
          </p>
        </div>
      </div>
    </div>

    <!-- Family Status Board — full width -->
    <div class="dash-card full-width">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#f0fdf4;">👨‍👩‍👧‍👦</span>
          <span class="card-title">FAMILY STATUS BOARD</span>
        </div>
        <span class="card-tag" style="background:#fef9c3; color: #854d0e;">LIVE-ISH</span>
      </div>
      <div class="card-body">
        <div class="status-board">
          <div v-for="member in familyStatuses" :key="member.name" class="status-row">
            <div class="status-member">
              <span class="status-avatar">{{ member.avatar }}</span>
              <span class="status-name">{{ member.name }}</span>
            </div>
            <div class="status-indicator" :class="member.statusClass">{{ member.status }}</div>
            <div class="status-note">{{ member.note }}</div>
          </div>
        </div>
        <p class="fine-print" style="margin-top: 0.75rem;">Statuses updated manually by Sam, subject to his current awareness. Not a real-time system.</p>
      </div>
    </div>

    <!-- Family News Feed — full width -->
    <div class="dash-card full-width">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#eff6ff;">📰</span>
          <span class="card-title">FAMILY NEWS FEED</span>
        </div>
        <span class="card-tag">CURATED BY SAM</span>
      </div>
      <div class="card-body">
        <ul class="news-list">
          <li v-for="item in newsItems" :key="item.headline" class="news-item">
            <span class="news-time">{{ item.time }}</span>
            <div>
              <strong>{{ item.headline }}</strong>
              <p>{{ item.body }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Premium Upsell — full width -->
    <div class="dash-card full-width">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#fff7ed;">🔒</span>
          <span class="card-title">PREMIUM PLUS CONTENT</span>
        </div>
        <span class="card-tag" style="background:#fef3c7; color: #b45309;">LOCKED</span>
      </div>
      <div class="card-body upsell-body">
        <div class="upsell-blur-wrap">
          <div class="upsell-preview">
            <p>🎭 Full Intervention Video Archives</p>
            <p>🎲 Sam's Complete Board Game Tier List (47 games, 3,200 words)</p>
            <p>👨‍👩‍👧‍👦 Raw, unedited Family Zoom call footage</p>
            <p>🍳 Grandma's recipes WITH measurements (estimated)</p>
            <p>📞 Sam's actual cell phone number (for emergencies)</p>
          </div>
          <div class="upsell-overlay">
            <p style="font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">
              Upgrade to Sam &amp; Fam <span style="color: var(--yellow)">ULTRA</span>
            </p>
            <p style="font-size: 0.85rem; margin-bottom: 1rem;">Only $15/month (billed in addition to your current plan)</p>
            <button class="btn btn-orange" style="padding: 0.6rem 1.5rem;"
              @click="windowAlert('Thank you for your interest in Sam & Fam Ultra! Your upgrade request has been received. Please allow 3–5 business years for processing.')">
              UPGRADE NOW
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Intervention Request Form — full width -->
    <div class="dash-card full-width">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#f0fdf4;">🎭</span>
          <span class="card-title">REQUEST AN INTERVENTION</span>
        </div>
        <span class="card-tag" style="background:#dcfce7; color: #166534;">MEMBER BENEFIT</span>
      </div>
      <div class="card-body">
        <p style="font-size: 0.85rem; color: var(--gray); margin-bottom: 1rem;">
          As a Sam &amp; Fam subscriber, you are entitled to <strong>1 intervention per calendar decade</strong>.
          Please complete the form below. Fields marked with * are required. Fields marked with ** are also required but we didn't have room for the asterisk.
        </p>
        <div class="janky-form">
          <div class="form-row">
            <label>Who Needs Intervening?* <span style="font-size:0.65rem; color:#94a3b8;">(first name only, for privacy)</span></label>
            <input v-model="interventionForm.who" type="text" placeholder="e.g. Juju" class="form-input" />
          </div>
          <div class="form-row">
            <label>Intervention Type** <span style="font-size:0.65rem; color: var(--orange);">Required</span></label>
            <select v-model="interventionForm.type" class="form-input">
              <option value="">— Select —</option>
              <option>Too Many Board Games (Purchaser)</option>
              <option>Too Many Board Games (Non-Purchaser, But Has Opinions About Others' Purchases)</option>
              <option>Refusing to Try New Games at Game Night (Ongoing)</option>
              <option>Video Game Hours — Honkai: Star Rail Division (Timo / Juju / Both)</option>
              <option>Excessive Woodworking Without Sharing Blueprints (Timo)</option>
              <option>Smart Home Project Has Exceeded Agreed Scope (Papa)</option>
              <option>Too Many Cats Referenced In Conversation (Grandma — Winnie & Opal)</option>
              <option>Refusing to Run With Sam (Papa Exempted — Different Category)</option>
              <option>Substack Post Quality Making Others Feel Inadequate (Erca)</option>
              <option>Playing Pickleball Without Inviting Anyone (Boo)</option>
              <option>7 Brew Order Too Complex for Group Chat Poll (Boo)</option>
              <option>Requesting Frozen Soundtrack at Family Gathering (Lay-Lay — Recurring)</option>
              <option>Throwing Ball Indoors (Bendy Boy — Jurisdiction Unclear)</option>
              <option>Going Off the Grid Without Notice (Juju — Chronic)</option>
              <option>Watching k-Drama Without Providing Recommendations (Juju)</option>
              <option>Went to Japan / Planning Trip Without Group Invite (Timo)</option>
              <option>3D Printing Something No One Asked For (Sam)</option>
              <option>Crocheting During Family Meeting (Ari — Disputed as Multitasking)</option>
              <option>Refusing to Read Erca's Substack</option>
              <option>General Chaos (Toddler Division — All Three)</option>
              <option>Other (please specify in Comments)**</option>
            </select>
          </div>
          <div class="form-row">
            <label>Urgency Level</label>
            <div class="radio-group">
              <label><input type="radio" v-model="interventionForm.urgency" value="low" /> Low (can wait until next family dinner)</label>
              <label><input type="radio" v-model="interventionForm.urgency" value="medium" /> Medium (before the holidays)</label>
              <label><input type="radio" v-model="interventionForm.urgency" value="high" /> High (Papa's nap permitting)</label>
              <label><input type="radio" v-model="interventionForm.urgency" value="critical" /> CRITICAL (Sam will text immediately)</label>
            </div>
          </div>
          <div class="form-row">
            <label>Additional Comments (max 10,000 characters)</label>
            <textarea v-model="interventionForm.comments" class="form-input form-textarea"
              placeholder="Please be specific. Vague requests are deprioritized." rows="3"></textarea>
          </div>
          <label class="form-check">
            <input type="checkbox" v-model="interventionForm.agree" />
            I confirm that this person needs an intervention and I am not just using this form to complain about Sam.
          </label>
          <button class="btn btn-green" style="width: 100%; margin-top: 0.75rem; padding: 0.75rem;" @click="submitIntervention">
            📬 Submit Intervention Request
          </button>
        </div>
      </div>
    </div>

    <!-- Fake video player — full width -->
    <div class="dash-card full-width">
      <div class="card-head">
        <div class="card-head-left">
          <span class="card-icon" style="background:#f8fafc;">🎬</span>
          <span class="card-title">THIS WEEK'S FEATURED CONTENT</span>
        </div>
        <span class="card-tag">HD*</span>
      </div>
      <div class="card-body">
        <div class="fake-video">
          <div class="fake-video-inner">
            <div class="spinner"></div>
            <p>Buffering... {{ bufferPercent }}%</p>
            <p style="font-size:0.7rem; color: rgba(255,255,255,0.5); margin-top:0.25rem;">
              "Sam Explains Wingspan for 45 Minutes (Full Uncut) — featuring Timo asking one (1) question"
            </p>
          </div>
          <div class="fake-controls">
            <span>⏮</span>
            <span>⏯</span>
            <span>⏭</span>
            <div class="fake-progress-bar"><div class="fake-progress-fill" :style="{ width: bufferPercent + '%' }"></div></div>
            <span>🔊</span>
            <span style="font-size: 0.7rem;">0:00 / ∞</span>
          </div>
        </div>
        <p class="fine-print" style="margin-top: 0.5rem; text-align:center;">
          *HD subject to your internet connection and whether Sam remembered to export at the right resolution.
          Content availability not guaranteed. Sam may have deleted the file.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

// ── Pools ──────────────────────────────────────────────────────────────────
const samAdvicePool = [
  { topic: '🎲 Board Gaming Tip', text: 'Always explain the rules for at least 45 minutes before starting. If anyone seems confused, restart from the top. Do not skip the iconography section. The iconography section is critical.' },
  { topic: '🎮 Video Gaming Tip', text: 'Before starting any new game: watch a 3-hour review, optimize all settings, map your controls. The game itself can wait. Settings are content. There are people who just press start and figure it out. We don\'t talk about them.' },
  { topic: '🏃 Running Tip', text: 'The secret to running is genuine, sincere intention. Some people run without announcing it, without a playlist, without any fanfare at all. This approach is valid but offers zero accountability content. Text someone first.' },
  { topic: '👶 Toddler Tip', text: 'If Bendy Boy is melting down: missing car, hunger, or tiredness — in that order. If Smurf says "Maaaama Maaaama," that is snacks. Always snacks. Lay-Lay wants to be Elsa. Stop fighting it. Lean in.' },
  { topic: '🖨️ 3D Printing Tip', text: 'The correct response to any problem — logistical, emotional, architectural — is to determine whether it can be solved with a printed part. In most cases: yes. In all cases: worth attempting.' },
  { topic: '🎮 Video Gaming Tip', text: 'Always wait for the Game of the Year Edition. The base release is essentially a funded beta test you paid full price for. Some people play games on release day without optimizing anything first. Juju and Timo do this. They seem fine. The advice still stands.' },
  { topic: '🎲 Board Gaming Tip', text: 'The correct number of board games to own is always one more than you currently have. This is not a want. It is a mathematical property of the hobby. Ari has reviewed this claim. She disagrees. The math is unaffected.' },
  { topic: '🏡 Home Tip', text: 'If something in your house is not yet voice-controlled, motion-activated, and app-connected, that is a gap. Papa has a protocol for this. It begins with a needs assessment and ends with a new hub. The family has been through this. It usually works out.' },
  { topic: '🍳 Cooking Tip', text: 'A recipe with no measurements is a living document. "A handful," "Grandma\'s amount," and "you\'ll know" are not vague — they are calibrated to a specific person\'s instincts. You are not that person. Make it anyway. Adjust from there.' },
]

const dadJokePool = [
  { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything.", layLayReaction: '🤣 Thought it was very funny (may not have understood it)', bendyReaction: '🍌 Threw a banana' },
  { setup: "I told Ari she was drawing her eyebrows too high.", punchline: "She looked surprised.", layLayReaction: '😐 Did not react', bendyReaction: '😂 Laughed (unrelated)' },
  { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese.", layLayReaction: '🧀 Requested cheese immediately after', bendyReaction: '👉 Pointed at the fridge' },
  { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field.", layLayReaction: '⭐ Gave Sam a high five', bendyReaction: '😴 Was asleep' },
  { setup: "I used to hate facial hair...", punchline: "But then it grew on me.", layLayReaction: '🤔 Asked what facial hair is', bendyReaction: '🤣 Possibly laughed, hard to tell' },
  { setup: "What do you call a fake noodle?", punchline: "An impasta.", layLayReaction: '🍝 Immediately requested pasta for dinner', bendyReaction: '🍝 Also requested pasta' },
  { setup: "Why can't you give Elsa a balloon?", punchline: "Because she'll let it go.", layLayReaction: '❄️ Started singing Frozen', bendyReaction: '🎈 Pointed at a balloon' },
  { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear.", layLayReaction: '🐻 Requested gummy bears', bendyReaction: '🐻 Also now aware gummy bears exist' },
  { setup: "Why did the bicycle fall over?", punchline: "Because it was two-tired.", layLayReaction: '🚲 Did not get it but laughed anyway', bendyReaction: '🚗 Brought Sam a car instead' },
  { setup: "How do you organize a space party?", punchline: "You planet.", layLayReaction: '🌙 Said "I want to go to space" for three days', bendyReaction: '🌙 Pointed at the ceiling' },
]

const bendyStatuses = [
  { label: 'NAPPING (Confirmed)', desc: 'Bendy Boy is asleep. All balls have been secured. All cars have been parked in a designated area. Lay-Lay has been asked to keep the Frozen soundtrack to a reasonable volume. Household: calm.', nap: 'Active', snacks: '3 consumed (pre-nap)', chaos: 'Dormant' },
  { label: 'STUDYING CARS — DO NOT DISTURB', desc: 'Bendy Boy has located the cars and is conducting a thorough wheel-by-wheel inspection. This process is methodical, focused, and cannot be interrupted. An additional car was acquired mid-session.', nap: 'Overdue', snacks: '2 consumed', chaos: 'Focused' },
  { label: 'EATING SOMETHING SUSPICIOUS', desc: 'An unidentified object is in Bendy Boy\'s hand and possibly his mouth. It may be a cracker. It may be a car part. It may be something from under the couch. Ari is handling it. Sam is watching from across the room.', nap: 'Unknown', snacks: 'Unconfirmed', chaos: 'Elevated' },
  { label: 'THROWING BALLS — CLEAR THE AREA', desc: 'Bendy Boy is throwing balls. Direction: unpredictable. Distance: further than expected. Sam\'s 3D-printed items are at elevated risk. All valuables should be relocated. Lay-Lay is also throwing things now.', nap: 'Rejected', snacks: '7 consumed (disputed)', chaos: 'Maximum' },
  { label: 'HAPPY — NO DISCERNIBLE REASON', desc: 'Bendy Boy is in an excellent mood and laughing at something only he can perceive. Lay-Lay is also laughing. They may be sharing a joke in a language no one else speaks. No one is questioning it.', nap: 'Completed', snacks: '4 consumed (voluntary)', chaos: 'Low' },
{ label: 'UNKNOWN — WE LOST HIM FOR A SEC', desc: 'Bendy Boy\'s location is temporarily uncertain. A ball was thrown. A car is unaccounted for. His last known position was near the snack cabinet. Ari is on it. He is fine. Probably fine.', nap: 'N/A', snacks: 'Untracked', chaos: 'Classified' },
  { label: 'DEMANDING A SPECIFIC CAR', desc: 'Bendy Boy needs a car. Not that car. Not that one either. That one. The exact one. Location unknown. Search ongoing. Ari is calm. Sam is less calm. The car will be found.', nap: 'Scheduled (contested)', snacks: '1 consumed (as bribe)', chaos: 'High' },
]

const artPool = [
  { title: 'Untitled Study in Blue and Possibly Purple', medium: 'Finger paint on printer paper (the back of Sam\'s agenda)', ariTake: 'It\'s beautiful.', samTake: 'I see a bird. Or Elsa. Possibly both.' },
  { title: 'Elsa, Again', medium: 'Crayon on construction paper', ariTake: 'She\'s really capturing something here.', samTake: 'It\'s Elsa. I think it\'s Elsa. I\'m 80% confident.' },
  { title: 'The Park (Evening)', medium: 'Marker on receipt paper', ariTake: 'The sense of movement is remarkable.', samTake: 'There are six suns in this. I am asking no questions.' },
  { title: 'Portrait of Bendy Boy (He Moved)', medium: 'Washable paint on whatever this paper is', ariTake: 'You can really feel the energy of the subject.', samTake: 'One of these circles is him. The others are artistic decisions.' },
  { title: 'Abstract #7 (She Titled It)', medium: 'Finger paint, glitter glue, and some tape', ariTake: 'She worked on this for forty-five minutes straight.', samTake: 'I have a lot of thoughts. I am keeping them.' },
  { title: 'Dogs (Winnie and Opal Are Cats)', medium: 'Crayon on the back of a bill', ariTake: 'She knows they\'re cats. This is artistic interpretation.', samTake: 'These are clearly dogs. We talked about it. She is unmoved.' },
]

// ── Reactive state ─────────────────────────────────────────────────────────
function pick(pool) { return pool[Math.floor(Math.random() * pool.length)] }

const dayOfWeek = new Date().getDay()
const currentAdvice = ref(samAdvicePool[dayOfWeek % samAdvicePool.length])
const currentJoke   = ref(dadJokePool[dayOfWeek % dadJokePool.length])
const currentBendy  = ref(bendyStatuses[dayOfWeek % bendyStatuses.length])
const currentArt    = ref(artPool[dayOfWeek % artPool.length])
const jokeRevealed  = ref(false)

function rerollAdvice() { currentAdvice.value = pick(samAdvicePool) }
function rerollJoke()   { currentJoke.value = pick(dadJokePool); jokeRevealed.value = false }
function rerollBendy()  { currentBendy.value = pick(bendyStatuses) }
function rerollArt()    { currentArt.value = pick(artPool) }

// ── Family status board ────────────────────────────────────────────────────
const familyStatuses = [
  { avatar: '🧔', name: 'Sam', status: 'Online', statusClass: 'dot-green', note: 'Thinking about a board game. Or running. Likely both.' },
  { avatar: '👩', name: 'Ari', status: 'Busy', statusClass: 'dot-yellow', note: 'Mid-crochet project. Can be reached between rows.' },
  { avatar: '👧', name: 'Lay-Lay', status: 'Active', statusClass: 'dot-green', note: 'Frozen is on. She has requested it three more times.' },
  { avatar: '👶', name: 'Bendy Boy', status: 'Chaotic', statusClass: 'dot-orange', note: 'Whereabouts fluid. A car is involved.' },
  { avatar: '👨‍🦳', name: 'Papa', status: 'Automating', statusClass: 'dot-yellow', note: 'The hallway is now app-controlled. This is the last one.' },
  { avatar: '👩‍🦳', name: 'Grandma', status: 'Online', statusClass: 'dot-green', note: 'Winnie and Opal are confirmed fine. Email forwarded.' },
  { avatar: '🧑', name: 'Timo', status: 'In the Workshop', statusClass: 'dot-yellow', note: 'Building something. Will not say what yet. Val is nearby.' },
  { avatar: '👩‍💻', name: 'Erca', status: 'Writing', statusClass: 'dot-green', note: 'Substack. Please do not subscribe to her instead.' },
  { avatar: '👶', name: 'Smurf', status: 'Requesting Snacks', statusClass: 'dot-orange', note: '"Maaaama Maaaama" — snack confirmed incoming.' },
  { avatar: '👩‍⚕️', name: 'Boo', status: 'Pickleball', statusClass: 'dot-yellow', note: 'Greenville SC. 7 Brew order pending group vote.' },
  { avatar: '🧑‍💻', name: 'Juju', status: 'Unknown', statusClass: 'dot-gray', note: 'Last seen: possibly Japan. All theories remain open.' },
]

// ── News feed ──────────────────────────────────────────────────────────────
const newsItems = [
  { time: '06:52', headline: 'Papa Automates Another Light Switch', body: 'The front hallway is now voice-controlled, motion-activated, and app-connected. Papa reports this is "the last one." The family has heard this before. The congregation has been informed of the upgrade.' },
  { time: '08:14', headline: 'Papa Completes Morning Run', body: 'Duration: undisclosed. Distance: not announced. No playlist prepared. No text sent beforehand. No debrief. Papa simply ran and moved on. Sam has been made aware and is processing the information.' },
  { time: '09:31', headline: 'Grandma Forwards Email to Group Chat', body: 'The chain originated in 2009. It concerns either a Facebook scam, a health tip, or an inspirational quote — still being determined. Winnie and Opal are unaffected. The family has been alerted.' },
  { time: '10:48', headline: 'Erca Publishes New Substack Post', body: 'It is well-written, thoughtful, and free. We acknowledge this is a competitive threat to our business model. Please do not subscribe to her instead of us. Smurf approved the title by mashing the keyboard.' },
  { time: '11:47', headline: 'Smurf Snack Request Confirmed', body: '"Maaaama Maaaama" was heard from the kitchen at 11:43 AM. Snacks were provided. Val was also in the area and appeared supportive of the decision.' },
  { time: '13:05', headline: 'Timo Completes Woodworking Project', body: 'A new piece of furniture has been completed. Structurally sound. Aesthetically appropriate. Erca reports it is better than anything Sam has printed. Sam notes the printer is doing something different entirely. The dresser cannot print itself. Sam noted this.' },
  { time: '14:22', headline: 'Juju Status: Unresolved', body: 'No response in 36 hours. Equally likely explanations: at work, several episodes deep, Honkai session, somewhere over the Pacific. All options remain on the table.' },
  { time: '15:23', headline: 'Boo Files Pickleball Inquiry', body: 'Boo has asked whether pickleball injuries qualify under the Family Emergency Contact benefit. They do not. She has requested reconsideration. The request is behind 847 cancellation tickets. Her 7 Brew order remains uncovered under all current plans.' },
  { time: '16:50', headline: 'Sam Has a New Board Game Opinion', body: 'Sam played something 4 days ago and has now fully formed his thoughts. The opinion is structured in three parts. Ari has received a preview and has prepared a response. The response is ready. Sam is still drafting the opinion.' },
]

// ── Fake video buffer ──────────────────────────────────────────────────────
const bufferPercent = ref(12)
let bufferInterval
onMounted(() => {
  bufferInterval = setInterval(() => {
    if (bufferPercent.value < 94) {
      bufferPercent.value += Math.random() > 0.7 ? 1 : 0
    } else {
      bufferPercent.value = 12
    }
  }, 800)
})
onUnmounted(() => clearInterval(bufferInterval))

// ── Intervention form ──────────────────────────────────────────────────────
const interventionForm = ref({ who: '', type: '', urgency: 'low', comments: '', agree: false })

function submitIntervention() {
  if (!interventionForm.value.who || !interventionForm.value.type) {
    window.alert('Please complete all required fields (*) and all also-required fields (**).')
    return
  }
  if (!interventionForm.value.agree) {
    window.alert('You must confirm that this person genuinely needs an intervention and that you are not using this form to complain about Sam.')
    return
  }
  window.alert(`Your intervention request for "${interventionForm.value.who}" has been submitted.\n\nTicket #SF-${Math.floor(Math.random()*900000+100000)}\nExpected response: 3–5 business years\nPapa's nap schedule: pending confirmation\n\nThank you for being a Sam & Fam subscriber.`)
  interventionForm.value = { who: '', type: '', urgency: 'low', comments: '', agree: false }
}

function windowAlert(msg) { window.alert(msg) }
</script>

<style scoped>
/* ── Grid layout ── */
.home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-content: start;
}

.full-width { grid-column: 1 / -1; }

@media (max-width: 700px) {
  .home-grid { grid-template-columns: 1fr; }
  .full-width { grid-column: 1; }
}

/* ── Card base ── */
.dash-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

/* ── Card header — clean, consistent ── */
.card-head {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.card-head-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.card-head-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.card-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.card-title {
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: var(--dark);
  text-transform: uppercase;
}

.card-tag {
  background: #f1f5f9;
  color: var(--gray);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.reroll-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  flex-shrink: 0;
}
.reroll-btn:hover { background: #e2e8f0; }

.card-body { padding: 1rem; }

/* ── Advice ── */
.advice-topic { font-size: 0.72rem; font-weight: 800; color: var(--orange); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.4rem; }
.advice-text { font-size: 0.875rem; color: #374151; line-height: 1.6; margin-bottom: 0.75rem; }
.advice-confidence { font-size: 0.75rem; color: var(--gray); }

/* ── Dad joke ── */
.joke-setup { font-size: 1rem; font-weight: 700; color: var(--dark); margin-bottom: 0.25rem; }
.joke-punchline { font-size: 1.1rem; font-weight: 900; color: var(--orange); font-family: var(--font-display); letter-spacing: 0.04em; margin-top: 0.75rem; }

.blink {
  animation: blink-anim 1s step-end infinite;
  background: var(--red) !important;
  color: white !important;
}
@keyframes blink-anim { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* ── Bendy ── */
.bendy-status { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
.bendy-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--green-light); animation: pulse-dot 1.5s infinite; flex-shrink: 0; }
@keyframes pulse-dot { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.4); } }
.bendy-status-text { font-weight: 800; font-size: 0.85rem; color: var(--dark); }
.bendy-desc { font-size: 0.82rem; color: var(--gray); line-height: 1.5; margin-bottom: 0.75rem; }
.bendy-vitals { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.vital { font-size: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.3rem 0.6rem; border-radius: 6px; }
.vital span { color: var(--gray); }

/* ── Art drop ── */
.art-body { display: flex; gap: 1rem; align-items: flex-start; }
.art-frame {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  background: #f8fafc;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.art-broken { text-align: center; font-size: 2rem; color: #94a3b8; line-height: 1.4; }
.art-broken small { font-size: 0.65rem; display: block; margin-top: 0.3rem; }
.art-meta { font-size: 0.85rem; }

/* ── Family status board ── */
.status-board { display: flex; flex-direction: column; gap: 0.5rem; }
.status-row {
  display: grid;
  grid-template-columns: 140px 100px 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 0.82rem;
}
@media (max-width: 500px) {
  .status-row { grid-template-columns: 100px 80px 1fr; }
}
.status-member { display: flex; align-items: center; gap: 0.4rem; font-weight: 700; }
.status-avatar { font-size: 1.1rem; }
.status-name { font-size: 0.82rem; color: var(--dark); }
.status-indicator {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  text-align: center;
  white-space: nowrap;
}
.dot-green { background: #dcfce7; color: #166534; }
.dot-yellow { background: #fef9c3; color: #854d0e; }
.dot-orange { background: #ffedd5; color: #9a3412; }
.dot-gray { background: #f1f5f9; color: #475569; }
.status-note { font-size: 0.75rem; color: var(--gray); }

/* ── News feed ── */
.news-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
.news-item { display: flex; gap: 0.75rem; font-size: 0.85rem; }
.news-time { font-size: 0.7rem; font-weight: 800; color: var(--gray); white-space: nowrap; padding-top: 2px; }
.news-item p { font-size: 0.78rem; color: var(--gray); margin-top: 0.2rem; line-height: 1.5; }

/* ── Upsell ── */
.upsell-body { padding: 0; }
.upsell-blur-wrap { position: relative; }
.upsell-preview {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.88rem;
  filter: blur(4px);
  user-select: none;
  pointer-events: none;
}
.upsell-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(2px);
  padding: 1rem;
}

/* ── Intervention form ── */
.janky-form { display: flex; flex-direction: column; gap: 0.85rem; }
.form-row { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.82rem; font-weight: 700; }
.form-input {
  width: 100%;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  background: #f8fafc;
}
.form-input:focus { outline: none; border-color: var(--orange); background: white; }
.form-textarea { resize: vertical; }
.radio-group { display: flex; flex-direction: column; gap: 0.3rem; font-weight: 400; font-size: 0.82rem; }
.form-check { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.8rem; cursor: pointer; }

/* ── Fake video ── */
.fake-video {
  background: #111;
  border-radius: 8px;
  overflow: hidden;
}
.fake-video-inner {
  padding: 2rem;
  text-align: center;
  color: white;
  font-size: 0.85rem;
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255,255,255,0.2);
  border-top-color: var(--orange);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 0.75rem;
}
@keyframes spin { to { transform: rotate(360deg); } }
.fake-controls {
  background: #1a1a1a;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
}
.fake-progress-bar {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
  overflow: hidden;
}
.fake-progress-fill {
  height: 100%;
  background: var(--orange);
  border-radius: 2px;
  transition: width 0.5s;
}
</style>
