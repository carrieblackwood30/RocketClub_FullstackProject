<template>
  <header class="hero-header relative h-[100vh] text-white flex flex-col justify-between overflow-visible">
    <!-- Заголовок -->
    <div class="absolute top-10 left-1/2 transform -translate-x-1/2 z-20 text-center">
      <h1 class="text-white text-6xl font-extrabold tracking-wide rocket-title">
        Rocket Club
      </h1>
    </div>

    <!-- Навигация и панель пользователя -->
    <nav class="flex relative justify-between items-center p-6 z-[30]" v-if="!isLoading">
      <ul class="flex gap-6 nav-menu text-lg font-semibold">
        <li><a href="#about">about</a></li>
        <li><a href="#prices">prices</a></li>
        <li><a href="#products">products</a></li>
      </ul>

      <!-- Кнопка входа -->
      <button class="flex items-center gap-2 login-btn" v-if="!user">
        <img src="$/user.svg" alt="user icon" width="24" />
        <router-link to="/login">Login</router-link>
      </button>

      <!-- Кнопка пользователя -->
      <button class="flex items-center gap-2 login-btn" v-else @click="showPanel = !showPanel">
        {{ user }}
      </button>

      <!-- Выпадающая панель -->
      <div
        v-if="showPanel"
        class="absolute right-0 mt-28 w-48 bg-gray-800 text-white rounded shadow-lg z-[60]"
      >
        <ul class="flex flex-col">
          <li>
            <router-link to="/dashboard" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Dashboard</router-link>
          </li>
          <li>
            <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-700 cursor-pointer">Logout</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Цитата -->
    <div class="flex justify-center items-center h-full z-10">
      <div class="text-center px-6 max-w-3xl">
        <p class="quote text-white text-4xl font-semibold leading-snug tracking-wide">
          Push harder than yesterday<br>
          <span class="text-gold">if you want a different tomorrow.</span>
        </p>
      </div>
    </div>

    <!-- Затемнение -->
    <div class="overlay absolute inset-0"></div>
  </header>
</template>

<script setup>
import { getCurrentUser } from '@/api/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const isLoading = ref(true)
const showPanel = ref(false)
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  user.value = null
  showPanel.value = false
  router.push('/login')
}

onMounted(async () => {
  try {
    const res = await getCurrentUser()
    user.value = res.data.email
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.hero-header {
  background: url('../assets/img/headerBg.jpeg') center center / cover no-repeat;
  position: relative;
  overflow: visible;
}

.overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9));
  z-index: 0;
}

.nav-menu {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu a {
  position: relative;
  background: linear-gradient(to right, #ffd700 0%, white 100%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.5s ease, transform 0.3s ease;
}

.nav-menu a:hover {
  background-position: 0% center;
  transform: scale(1.05);
}

.login-btn {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.rocket-title {
  animation: fadeSlideDown 1s ease-out;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}

.text-gold {
  color: #FFD700;
}

.quote {
  animation: fadeSlideUp 1.2s ease-out;
  text-shadow: 0 0 12px rgba(255, 215, 0, 0.5);
}

@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>