<template>
  <main class="home">
    <div class="content">
      <h1 class="title">This is a Home page for tutorial login register user</h1>
      <div class="button-container">
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <router-link to="/register" class="btn btn-secondary">Register</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f0f2f5;
}

.content {
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #001529;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 4px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.btn-primary {
  background-color: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

.btn-secondary {
  background-color: #fff;
  color: #001529;
  border: 1px solid #d9d9d9;
}

.btn-secondary:hover {
  background-color: #f5f5f5;
}
</style>
