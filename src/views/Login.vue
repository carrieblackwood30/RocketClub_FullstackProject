<template>
  <div
    class="wrapper min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style="background-image: url('/src/assets/img/headerBg.jpeg')"
  >
    <div class="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl w-full max-w-md text-white">
      <!-- Back Link -->
      <router-link
        to="/"
        class="inline-block mb-4 text-yellow-400 hover:text-yellow-300 font-semibold transition duration-200"
      >
        ← Back to Home
      </router-link>

      <!-- Title -->
      <h2 class="text-3xl font-bold mb-6 text-center tracking-wide">
        {{ isLogin ? 'Sign In to Rocket Club' : 'Register for Rocket Club' }}
      </h2>

      <!-- Form -->
      <form @submit.prevent="submitHandler" class="space-y-4">
        <input
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="Email"
          required
          class="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="Password"
          required
          class="w-full px-4 py-2 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          type="submit"
          class="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded transition duration-200"
        >
          {{ isLogin ? 'Sign In' : 'Register' }}
        </button>

        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
      </form>

      <!-- Toggle -->
      <p class="mt-6 text-center text-sm">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <button @click="isLogin = !isLogin" class="text-yellow-400 hover:underline ml-1">
          {{ isLogin ? 'Register' : 'Sign In' }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '@/api/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const isLogin = ref(true)
const router = useRouter()

const submitHandler = async () => {
  error.value = ''
  try {
    const payload = { email: email.value.trim(), password: password.value }
    const res = isLogin.value ? await login(payload) : await register(payload)

    if (res.data?.token) {
      localStorage.setItem('token', res.data.token)
      router.push('/dashboard')
    } else {
      error.value = 'Token not received'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Authorization failed'
  }
}
</script>