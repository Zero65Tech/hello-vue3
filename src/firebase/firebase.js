import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAbO7K2w-WRd2lM1V7cXEqppo6k6_NzHfU",
  authDomain: "zero65-test.firebaseapp.com",
  projectId: "zero65-test",
  storageBucket: "zero65-test.firebasestorage.app",
  messagingSenderId: "439804487820",
  appId: "1:439804487820:web:aede560c01ec916c3033a9",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, RecaptchaVerifier }