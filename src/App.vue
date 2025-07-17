<template>
  <div class="app-container">
    <header>
      <div>
        <div class="auth-card">
          <div v-if="!authStore.user">
            <h2>{{ authStore.isOTPSent ? 'Verify OTP' : 'Login with Phone' }}</h2>

            <div class="auth-form">
              <div class="input-box">
                <div v-if="!authStore.isOTPSent" class="phone-input">
                  <span class="country-code">+91</span>
                  <input v-model="authStore.phoneNumber" type="tel" placeholder="Enter 10-digit number" maxlength="10"
                    @input="authStore.phoneNumberError = null" />
                </div>

                <div v-else class="otp-input">
                  <input v-model="authStore.otp" type="text" placeholder="Enter 6-digit OTP" maxlength="6"
                    @input="authStore.otpError = null" />
                </div>

                <p v-if="authStore.phoneNumberError" class="error-message">
                  {{ authStore.phoneNumberError }}
                </p>
                <p v-if="authStore.otpError" class="error-message">
                  {{ authStore.otpError }}
                </p>
              </div>

              <div v-if="!authStore.isOTPSent" id="recaptcha-container"></div>

              <button class="auth-button" @click="handleAuthAction" :disabled="authStore.isLoading">
                <span v-if="authStore.isLoading">
                  <span class="spinner"></span> Processing...
                </span>
                <span v-else>
                  {{ authStore.isOTPSent ? 'Verify OTP' : 'Send OTP' }}
                </span>
              </button>
            </div>
          </div>

          <div v-else class="user-info">
            <p>Logged in as: {{ authStore.user.phoneNumber }}</p>
            <button class="auth-button sign-out" @click="authStore.signOutUser">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.store'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuthState()
  authStore.setupRecaptcha()
})

const handleAuthAction = async () => {
  if (!authStore.isOTPSent) {
    await authStore.sendOTP()
  } else {
    await authStore.verifyOTP()
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.phone-input,
.otp-input {
  display: flex;
  width: 100%;
}

.country-code {
  padding: 0.75rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 8px 0 0 8px;
  font-weight: 500;
}

input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.phone-input input {
  border-radius: 0 8px 8px 0;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.auth-button {
  width: 100%;
  padding: 0.75rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.auth-button:hover {
  background: #3a7bc8;
}

.auth-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.sign-out {
  background: #e74c3c;
}

.sign-out:hover {
  background: #c0392b;
}

.resend-otp {
  text-align: center;
  font-size: 0.875rem;
}

.resend-otp a {
  color: #4a90e2;
  cursor: pointer;
  text-decoration: underline;
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>