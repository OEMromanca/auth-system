<template>
  <main class="register">
    <div class="form-container">
      <h2 class="form-title">Register</h2>
      <form @submit="onSubmit" novalidate>
        <div class="form-group">
          <label for="userName">Username:</label>
          <input id="userName" v-model="userName" type="text" />
          <span class="error-message">{{ userNameError }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" autocomplete="email" />
          <span class="error-message">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" autocomplete="new-password" />
          <span class="error-message">{{ passwordError }}</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            autocomplete="new-password"
          />
          <span class="error-message">{{ confirmPasswordError }}</span>
        </div>

        <button type="submit" class="submit-button">Register</button>
      </form>

      <router-link to="/login">
        <button class="login-button">Already have an account? Login</button>
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFormValidation } from '@/composables/useFormValidation'
import { useAuthStore } from '@/stores/useAuthStore'
import router from '@/router'

const {
  email,
  password,
  userName,
  confirmPassword,
  emailError,
  passwordError,
  userNameError,
  confirmPasswordError,
  handleSubmit,
  setFieldError,
  resetForm
} = useFormValidation('register')

const authStore = useAuthStore()

const onSubmit = handleSubmit(async (values) => {
  const result = await authStore.registerUser(values.userName, values.email, values.password)

  if (result) {
    if (result.emailError) {
      setFieldError('email', result.emailError)
    }
    if (result.userNameError) {
      setFieldError('userName', result.userNameError)
    }
  } else {
    router.push('/login')
    resetForm()
  }
})
</script>

<style scoped>
.register {
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

.login-button {
  background-color: transparent;
  color: #1890ff;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  transition: color 0.3s;
}

.login-button:hover {
  color: #40a9ff;
}
</style>
