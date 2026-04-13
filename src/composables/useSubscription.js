import { reactive, computed } from 'vue'

const KEY = 'sam_fam_v1'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
}
function persist() {
  localStorage.setItem(KEY, JSON.stringify({
    status: state.status,
    plan: state.plan,
    startDate: state.startDate,
  }))
}

const saved = load()

const state = reactive({
  // none | trial | active | canceling
  status: saved.status || 'none',
  plan: saved.plan || 'monthly',
  startDate: saved.startDate || null,

  // UI state
  showModal: false,
  showCancelTrialModal: false,
  showCancelFlow: false,
  showWelcomeModal: false,
  showSidebar: false,
  cancelStep: 1,
  showConfetti: false,
  selectedPlan: saved.plan || 'monthly',

  // Dashboard page routing
  currentPage: 'home', // 'home' | 'inbox' | 'billing'
})

// Module-level computed — same refs returned from every useSubscription() call,
// ensuring reactivity works correctly regardless of which component calls first.
const isNone      = computed(() => state.status === 'none')
const isTrial     = computed(() => state.status === 'trial')
const isActive    = computed(() => state.status === 'active')
const isCanceling = computed(() => state.status === 'canceling')
const isEngaged   = computed(() => state.status !== 'none')
const price       = computed(() => state.plan === 'yearly' ? '$50/year' : '$5/month')
const priceNum    = computed(() => state.plan === 'yearly' ? 50 : 5)
const period      = computed(() => state.plan === 'yearly' ? 'year' : 'month')

function openModal(plan) {
  if (plan) state.selectedPlan = plan
  state.showModal = true
}

function closeModal() {
  state.showModal = false
}

function startTrial() {
  state.status = 'trial'
  state.plan = state.selectedPlan
  state.startDate = new Date().toISOString()
  state.showModal = false
  state.showConfetti = true
  persist()
  setTimeout(() => { state.showConfetti = false }, 3500)
}

function promptCancelTrial() {
  state.showCancelTrialModal = true
}

// "Confirm Cancellation" on the trial modal actually activates the subscription
function confirmCancelTrial() {
  state.status = 'active'
  state.showCancelTrialModal = false
  state.showWelcomeModal = true
  state.showConfetti = true
  persist()
  setTimeout(() => { state.showConfetti = false }, 3500)
}

function dismissCancelTrialModal() {
  state.showCancelTrialModal = false
}

function subscribe() {
  state.plan = state.selectedPlan
  state.status = 'active'
  state.startDate = new Date().toISOString()
  state.showModal = false
  state.showConfetti = true
  persist()
  setTimeout(() => { state.showConfetti = false }, 3500)
}

function beginCancellation() {
  state.cancelStep = 1
  state.showCancelFlow = true
}

function nextCancelStep() {
  state.cancelStep++
}

function abandonCancellation() {
  state.showCancelFlow = false
  state.cancelStep = 1
}

function completeCancellation() {
  state.status = 'none'
  state.plan = 'monthly'
  state.startDate = null
  state.showCancelFlow = false
  state.cancelStep = 1
  localStorage.removeItem(KEY)
}

function resetDemo() {
  localStorage.removeItem(KEY)
  window.location.reload()
}

export function useSubscription() {
  return {
    state,
    isNone, isTrial, isActive, isCanceling, isEngaged,
    price, priceNum, period,
    openModal, closeModal,
    startTrial, promptCancelTrial, confirmCancelTrial, dismissCancelTrialModal,
    subscribe,
    beginCancellation, nextCancelStep, abandonCancellation, completeCancellation,
    resetDemo,
  }
}
