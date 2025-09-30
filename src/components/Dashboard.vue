<template>
  <div class="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-950 p-6 flex flex-col justify-between shadow-lg">
      <div>
        <h2 class="text-2xl font-bold text-yellow-400 mb-8">🚀 Rocket Club</h2>
        <nav class="space-y-4">
          <button @click="active = 'about'" class="nav-btn">📖 About</button>
          <button @click="active = 'prices'" class="nav-btn">💰 Pricing</button>
          <button @click="active = 'products'" class="nav-btn">📦 Products</button>
          <button @click="active = 'visits'" class="nav-btn">🔢 Visits</button>
          <button @click="active = 'plan'" class="nav-btn">📊 Membership Plan</button>
          <button @click="active = 'room'" class="nav-btn">🏢 Room</button>
        </nav>
      </div>
      <div class="space-y-2">
        <p class="text-sm text-gray-400">📧 {{ user?.email }}</p>
        <button @click="goHome" class="text-sm text-gray-400 hover:text-yellow-400">🏠 Main Menu</button>
        <button @click="logout" class="text-sm text-red-400 hover:text-red-500">🚪 Log Out</button>
      </div>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-10">
      <h1 class="text-3xl font-bold mb-6 text-yellow-400">Welcome, {{ user?.email || 'Guest' }}</h1>

      <div v-if="active === 'about'" class="card">
        <h3>About Rocket Club</h3>
        <p>Push harder than yesterday if you want a different tomorrow.</p>
      </div>

      <div v-else-if="active === 'prices'" class="card">
        <h3>Pricing</h3>
        <p>Membership starts at $20/month. Premium — $50/month.</p>
      </div>

      <div v-else-if="active === 'products'" class="card">
        <h3>Ordered Products</h3>
        <ul class="list-disc list-inside space-y-1 mt-2">
          <li v-for="(item, index) in user?.products || []" :key="index">{{ item }}</li>
          <li v-if="!user?.products?.length" class="text-gray-400">No products ordered</li>
        </ul>
      </div>

      <div v-else-if="active === 'visits'" class="card text-center">
        <h3>Remaining Visits</h3>
        <p class="text-3xl font-bold text-yellow-400">{{ visits }}</p>
        <div class="mt-4 flex justify-center gap-4">
          <button @click="() => handleAction(useVisit, 'Visit deduction failed')" :disabled="loading" class="action-btn bg-red-600 hover:bg-red-700">Deduct Visit</button>
          <button @click="() => handleAction(confirmPayment, 'Payment failed')" :disabled="loading" class="action-btn bg-green-600 hover:bg-green-700">Fake Payment (+$10)</button>
        </div>
        <p v-if="message" class="mt-4 text-sm font-medium" :class="messageColor">{{ message }}</p>
      </div>

      <div v-else-if="active === 'plan'" class="card">
        <h3>Membership Plan</h3>
        <p class="value">{{ user?.plan || 'Standard' }}</p>
      </div>

      <div v-else-if="active === 'room'" class="card">
        <h3>Assigned Room</h3>
        <p class="value">{{ user?.room || 'Room #1' }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser } from '@/api/auth'
import { useVisit } from '@/api/visits'
import { confirmPayment } from '@/api/payment'

const user = ref(null)
const visits = ref(0)
const message = ref('')
const messageColor = ref('')
const loading = ref(false)
const active = ref('about')
const router = useRouter()

const fetchData = async () => {
  try {
    const { data } = await getCurrentUser()
    user.value = data
    visits.value = data.visitsLeft
  } catch (err) {
    message.value = 'Failed to load user data'
    messageColor.value = 'text-red-500'
  }
}

const handleAction = async (actionFn, errorMsg) => {
  loading.value = true
  try {
    const { data } = await actionFn()
    visits.value = data.visitsLeft
    message.value = 'Successfully updated!'
    messageColor.value = 'text-green-500'
  } catch (err) {
    message.value = err.response?.data?.message || errorMsg
    messageColor.value = 'text-red-500'
  } finally {
    loading.value = false
  }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const goHome = () => {
  router.push('/')
}

onMounted(fetchData)
</script>

<style scoped>
.nav-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #d1d5db;
  background-color: #1f2937;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}
.nav-btn:hover {
  background-color: #374151;
  color: #facc15;
  transform: translateX(4px);
}

.card {
  background-color: #1f2937;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
}
.card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #facc15;
}
.value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #facc15;
}
.action-btn {
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: white;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}
.action-btn:hover {
  transform: scale(1.05);
}
</style>