import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, RecaptchaVerifier } from '@/firebase/firebase'
import {
    signInWithPhoneNumber,
    signOut,
    onAuthStateChanged,
    PhoneAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()

    const user = ref(null)
    const phoneNumber = ref('')
    const verificationId = ref('')
    const otp = ref('')
    const isOTPSent = ref(false)
    const isLoading = ref(false)
    const recaptchaVerifier = ref(null)
    const phoneNumberError = ref(null)
    const otpError = ref(null)
    const isRecaptchaVerified = ref(false)

    const setupRecaptcha = async () => {
        try {
            if (recaptchaVerifier.value)
                resetRecaptcha()

            recaptchaVerifier.value = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    isRecaptchaVerified.value = true
                },
                'expired-callback': () => {
                    isRecaptchaVerified.value = false
                    resetRecaptcha()
                },
                'error-callback': () => {
                    isRecaptchaVerified.value = false
                    resetRecaptcha()
                }
            })
            document.getElementById('recaptcha-container').innerHTML = ''
            recaptchaVerifier.value.render().then(() => {
                recaptchaVerifier.value.verify().then(() => {
                    console.log('Auto verification started')
                })
            })
            return true
        } catch {
            isRecaptchaVerified.value = false
            phoneNumberError.value = 'Failed to initialize security check'
            return false
        }
    }

    const sendOTP = async () => {
        try {
            isLoading.value = true
            phoneNumberError.value = null
            if (!phoneNumber.value) {
                phoneNumberError.value = 'Phone number is required'
                return false
            }
            if (phoneNumber.value.length !== 10) {
                phoneNumberError.value = 'Phone number must be 10 digits'
                return false
            }
            if (!recaptchaVerifier.value || !isRecaptchaVerified.value) {
                const recaptchaReady = await setupRecaptcha()
                if (!recaptchaReady) {
                    phoneNumberError.value = 'Please complete the security check'
                    return false
                }
                phoneNumberError.value = 'Please complete the reCAPTCHA verification'
                return false
            }

            const phone = `+91${phoneNumber.value}`
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier.value)
            verificationId.value = confirmation.verificationId
            isOTPSent.value = true
            return true
        } catch (error) {
            phoneNumberError.value = error.message || 'Failed to send OTP'
            resetRecaptcha()
            return false
        } finally {
            isLoading.value = false
        }
    }

    const verifyOTP = async () => {
        try {
            isLoading.value = true
            otpError.value = null

            if (!otp.value || otp.value.length !== 6) {
                otpError.value = 'Please enter a valid 6-digit OTP'
                return false
            }

            const creds = PhoneAuthProvider.credential(
                verificationId.value,
                otp.value
            )

            const userCredential = await signInWithCredential(auth, creds)
            user.value = userCredential.user
            isOTPSent.value = false
            return true
        } catch {
            otpError.value = 'Invalid OTP'
            return false
        } finally {
            isLoading.value = false
        }
    }

    const checkAuthState = () => {
        onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser
        })
    }

    const signOutUser = async () => {
        try {
            await signOut(auth)
            user.value = null
            resetState()
            router.push('/')
        } catch (error) {
            console.error('Sign out failed:', error)
            throw error
        }
    }

    const resetRecaptcha = () => {
        if (recaptchaVerifier.value) {
            recaptchaVerifier.value.clear()
            recaptchaVerifier.value = null
        }
    }

    const resetState = () => {
        phoneNumber.value = ''
        otp.value = ''
        verificationId.value = ''
        isOTPSent.value = false
        phoneNumberError.value = null
        otpError.value = null
        resetRecaptcha()
    }

    return {
        user,
        phoneNumber,
        phoneNumberError,
        otp,
        otpError,
        isOTPSent,
        isLoading,
        setupRecaptcha,
        sendOTP,
        verifyOTP,
        checkAuthState,
        signOutUser
    }
})