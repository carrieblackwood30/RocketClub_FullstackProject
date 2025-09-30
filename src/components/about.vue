<template>
  <section class="about-section relative text-white py-24 px-6" id="about">
    <div class="top-shadow"></div>

    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-4xl font-extrabold mb-6 tracking-wide text-gold">About Rocket Club</h2>
      <p class="text-lg leading-relaxed text-gray-200 mb-12">
        Rocket Club isn’t just a gym — it’s a movement. We believe in pushing limits, building strength, and creating a space where every member feels empowered to grow. Whether you’re a beginner or a seasoned athlete, our mission is to fuel your journey.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
      <div class="feature-card">
        <h3 class="text-xl font-bold mb-2 text-gold">Elite Equipment</h3>
        <p class="text-gray-300">Top-tier machines and free weights for every training style.</p>
      </div>
      <div class="feature-card">
        <h3 class="text-xl font-bold mb-2 text-gold">Expert Trainers</h3>
        <p class="text-gray-300">Certified coaches who personalize your progress and push you forward.</p>
      </div>
      <div class="feature-card">
        <h3 class="text-xl font-bold mb-2 text-gold">Community Energy</h3>
        <p class="text-gray-300">A supportive atmosphere that drives results and builds confidence.</p>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
.about-section {
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

.feature-card {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.feature-card:hover {
  transform: translateY(-5px);
  background-color: rgba(255, 255, 255, 0.1);
}
</style>