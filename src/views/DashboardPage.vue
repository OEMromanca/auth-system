<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <h1 class="dashboard-title">Welcome, {{ currentUser?.userName }}!</h1>
      <div v-if="currentUser" class="user-info">
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <p><strong>Username:</strong> {{ currentUser.userName }}</p>
      </div>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/useAuthStore'
const authStore = useAuthStore()
const currentUser = ref(authStore.getUserFromToken())

const initializeUser = () => {
  if (!currentUser.value) {
    router.push('/login')
  }
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

watchEffect(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})

onMounted(() => {
  initializeUser()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f0f2f5;
}

.dashboard-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.dashboard-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #001529;
}

.user-info {
  margin-bottom: 20px;
  text-align: left;
}

.user-info p {
  font-size: 1rem;
  margin-bottom: 10px;
}

.logout-button {
  background-color: #1890ff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #40a9ff;
}
</style>
