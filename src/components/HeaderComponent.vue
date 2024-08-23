<template>
  <header class="custom-header">
    <div class="wrapper">
      <nav>
        <router-link to="/" class="nav-item" :class="{ active: currentRoute === '/' }"
          >Home</router-link
        >
        <router-link to="/login" class="nav-item" :class="{ active: currentRoute === '/login' }"
          >Login</router-link
        >
        <router-link
          to="/register"
          class="nav-item"
          :class="{ active: currentRoute === '/register' }"
          >Register</router-link
        >
        <router-link
          to="/dashboard"
          class="nav-item"
          :class="{ active: currentRoute === '/dashboard' }"
          >Dashboard</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = ref(route.path)

watchEffect(() => {
  currentRoute.value = route.path
})
</script>

<style scoped>
.custom-header {
  background: #001529;
  padding: 0 16px;
  color: #fff;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

nav {
  display: flex;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  line-height: 64px;
  padding: 0 16px;
  transition:
    color 0.3s,
    border-bottom 0.3s;
}

.nav-item.active {
  border-bottom: 2px solid #1890ff;
}

.nav-item:hover {
  color: #1890ff;
}
</style>
