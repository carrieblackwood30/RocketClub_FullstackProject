<template>
  <section class="price-section relative text-white py-24 px-6" id="prices">
    <div class="top-shadow"></div>

    <div class="max-w-5xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-extrabold tracking-wide text-gold mb-4">Membership Plans</h2>
      <p class="text-lg text-gray-300">
        Choose the plan that fits your goals. No contracts. No excuses.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div class="price-card">
        <h3 class="text-2xl font-bold text-gold mb-2">Starter</h3>
        <p class="text-white text-xl mb-4">$29/month</p>
        <ul class="text-gray-300 text-sm leading-relaxed space-y-2">
          <li>✔ Access to gym floor</li>
          <li>✔ Locker & shower</li>
          <li>✔ Three trainer session</li>
        </ul>
        <button class="cta-btn mt-6">Join Now</button>
      </div>

      <div class="price-card">
        <h3 class="text-2xl font-bold text-gold mb-2">Pro</h3>
        <p class="text-white text-xl mb-4">$49/month</p>
        <ul class="text-gray-300 text-sm leading-relaxed space-y-2">
          <li>✔ Unlimited gym access</li>
          <li>✔ Group classes</li>
          <li>✔ Weekly trainer check-ins</li>
        </ul>
        <button class="cta-btn mt-6">Join Now</button>
      </div>

      <div class="price-card">
        <h3 class="text-2xl font-bold text-gold mb-2">Elite</h3>
        <p class="text-white text-xl mb-4">$79/month</p>
        <ul class="text-gray-300 text-sm leading-relaxed space-y-2">
          <li>✔ All Pro features</li>
          <li>✔ Personal nutrition plan</li>
          <li>✔ Unlimited trainer support</li>
        </ul>
        <button class="cta-btn mt-6">Join Now</button>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.price-section {
  position: relative;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95));
}

.top-shadow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
  z-index: 1;
}

.text-gold {
  color: #FFD700;
}

.price-card {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, background-color 0.3s ease;
  text-align: center;
}

.price-card:hover {
  transform: translateY(-6px);
  background-color: rgba(255, 255, 255, 0.08);
}

.cta-btn {
  background-color: #FFD700;
  color: black;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cta-btn:hover {
  background-color: #e6c200;
}
</style>