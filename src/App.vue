<template>
  <div>
    <NavBar />
    <SubscribedBanner />

    <DashboardSection v-if="state.status !== 'none'" />
    <main v-else>
      <HeroSection />
      <TrustBar />
      <FeaturesSection />
      <ComparisonTable />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
    </main>

    <FooterSection />

    <!-- Modals (always on top) -->
    <SubscriptionModal v-if="state.showModal" />
    <CancelTrialModal v-if="state.showCancelTrialModal" />
    <CancelFlow v-if="state.showCancelFlow" />
    <Confetti v-if="state.showConfetti" />
  </div>
</template>

<script setup>
import { useSubscription } from './composables/useSubscription'

import NavBar from './components/NavBar.vue'
import SubscribedBanner from './components/SubscribedBanner.vue'
import HeroSection from './components/HeroSection.vue'
import TrustBar from './components/TrustBar.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ComparisonTable from './components/ComparisonTable.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import PricingSection from './components/PricingSection.vue'
import FaqSection from './components/FaqSection.vue'
import FooterSection from './components/FooterSection.vue'
import DashboardSection from './components/DashboardSection.vue'
import SubscriptionModal from './components/SubscriptionModal.vue'
import CancelTrialModal from './components/CancelTrialModal.vue'
import CancelFlow from './components/CancelFlow.vue'
import Confetti from './components/Confetti.vue'

const { state, isNone, openModal } = useSubscription()

// Modal only opens when user clicks a button — no auto-popup
</script>
