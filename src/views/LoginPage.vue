<template>
  <main class="login">
    <div class="form-container">
      <h2 class="form-title">Login</h2>
      <form @submit="onSubmit" novalidate>
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" autocomplete="email" />
          <span class="error-message">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" autocomplete="current-password" />
          <span class="error-message">{{ passwordError }}</span>
        </div>

        <button type="submit" class="submit-button">Login</button>
      </form>

      <router-link to="/register">
        <button class="register-button">Don't have an account? Register</button>
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFormValidation } from '@/composables/useFormValidation'
import { useAuthStore } from '@/stores/useAuthStore'
import router from '@/router'

const { email, password, emailError, passwordError, handleSubmit, setFieldError, resetForm } =
  useFormValidation('login')
const authStore = useAuthStore()

const onSubmit = handleSubmit(async (values) => {
  const errorMessage = await authStore.loginUser(values.email, values.password)

  if (errorMessage) {
    if (errorMessage === 'Incorrect password') {
      setFieldError('password', errorMessage)
    } else {
      setFieldError('email', errorMessage)
    }
  } else {
    router.push('/dashboard')
    resetForm()
  }
})
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f0f2f5;
}

.form-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #001529;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.875rem;
}

.submit-button {
  background-color: #1890ff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #40a9ff;
}

.register-button {
  background-color: transparent;
  color: #1890ff;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  transition: color 0.3s;
}

.register-button:hover {
  color: #40a9ff;
}
</style>
