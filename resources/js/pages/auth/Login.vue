<script setup>
import { Form, Head, Link, usePage } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref, reactive } from 'vue';
import AnimatedLoginIllustration from '@/components/AnimatedLoginIllustration.vue';
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthBase from '@/layouts/AuthLayout.vue';
import { home } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

const props = defineProps({
    recaptchaSiteKey: {
        type: String,
        default: null,
    },
});

const page = usePage();
const siteSetting = computed(() => page.props.siteSetting ?? null);

// Logo URL - Make sure this points to your actual Enssure logo
const logoCenterUrl = computed(() => {
    if (siteSetting.value?.logo_center_url) {
        return siteSetting.value.logo_center_url;
    }
    // Update this path to your actual Enssure logo location
    return '/images/enssure-logo.svg';
});

const status = computed(() => page.props.status ?? null);
const canResetPassword = computed(() => page.props.canResetPassword ?? false);

// Dynamic state management
const showPassword = ref(false);
const emailFocused = ref(false);
const passwordFocused = ref(false);
const rememberMeToggled = ref(false);
const logoError = ref(false);

// reCAPTCHA state
const captchaToken = ref('');
const captchaWidgetId = ref(null);

const formState = reactive({
    email: '',
    password: '',
    remember: false,
});

// Computed properties for validation
const isEmailValid = computed(() => {
    if (!formState.email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formState.email);
});

const isPasswordValid = computed(() => formState.password.length >= 6);

const isCaptchaValid = computed(() => !props.recaptchaSiteKey || !!captchaToken.value);

const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value && isCaptchaValid.value);

// Handle remember me toggle with animation
const handleRememberMeChange = () => {
    rememberMeToggled.value = !rememberMeToggled.value;
    formState.remember = !formState.remember;
};

const handleLogoError = () => {
    logoError.value = true;
    console.warn('Logo image failed to load:', logoCenterUrl.value);
};

// reCAPTCHA handlers
const onRecaptchaVerify = (token) => {
    captchaToken.value = token;
};

const onRecaptchaExpire = () => {
    captchaToken.value = '';
};

const renderRecaptcha = () => {
    if (window.grecaptcha && props.recaptchaSiteKey && captchaWidgetId.value === null) {
        captchaWidgetId.value = window.grecaptcha.render('recaptcha-container', {
            sitekey: props.recaptchaSiteKey,
            callback: onRecaptchaVerify,
            'expired-callback': onRecaptchaExpire,
        });
    }
};

onMounted(() => {
    if (!props.recaptchaSiteKey) return;

    if (window.grecaptcha) {
        renderRecaptcha();
    } else {
        window.__recaptchaOnLoad = () => renderRecaptcha();

        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
});

onUnmounted(() => {
    delete window.__recaptchaOnLoad;
});
</script>

<template>
    <AuthBase>
        <Head title="Login | Enssure" />

        <div class="fixed inset-0 flex flex-col lg:flex-row overflow-auto">
            <!-- Left Column: Illustration Section with Animation -->
            <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/20 dark:to-primary/30 items-center justify-center p-8 relative overflow-hidden">
                <!-- Animated background elements -->
                <div class="absolute inset-0 opacity-30">
                    <div class="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                    <div class="absolute bottom-20 right-10 w-40 h-40 bg-destructive/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
                </div>

                <div class="max-w-md text-center space-y-8 relative z-10">
                    <!-- Illustration ONLY on left side -->
                    <div class="flex justify-center transform transition-transform duration-300 hover:scale-105">
                        <div class="w-72 h-72">
                            <AnimatedLoginIllustration />
                        </div>
                    </div>

                    <!-- Heading with stagger animation -->
                    <div class="space-y-3 animate-fade-in">
                        <h2 class="text-3xl font-bold text-foreground">
                            Welcome Back
                        </h2>
                        <p class="text-sm text-muted-foreground leading-relaxed">
                            Access your Enssure Admin Dashboard securely. Manage and monitor your business with ease.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Right Column: Login Form Section with Dynamic Effects -->
            <div class="flex w-full lg:w-1/2 bg-background items-center justify-center overflow-y-auto">
                <div class="w-full max-w-md py-12 px-4 sm:px-6 lg:px-8">
                    <!-- Logo - SEPARATE from illustration -->
                    <div class="flex justify-center mb-8 transform transition-transform duration-300 hover:scale-105">
                        <Link :href="home().url" class="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg" style="--tw-ring-color: var(--primary);">
                            <img
                                v-if="!logoError"
                                :src="logoCenterUrl"
                                alt="Enssure Logo"
                                class="h-12 sm:h-16 w-auto object-contain"
                                @error="handleLogoError"
                            />
                            <!-- Fallback if logo fails to load -->
                            <div v-else class="h-12 sm:h-16 w-auto flex items-center justify-center text-foreground font-bold text-lg">
                                ENSSURE
                            </div>
                        </Link>
                    </div>

                    <!-- Header Text with fade-in -->
                    <div class="text-center mb-8 space-y-2 animate-fade-in">
                        <h1 class="text-2xl font-bold text-foreground">Sign in to your account</h1>
                        <p class="text-sm text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <!-- Status Message with animation -->
                    <transition
                        enter-active-class="animate-fade-in"
                        leave-active-class="animate-fade-out"
                    >
                        <div
                            v-if="status"
                            class="mb-6 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 p-4 text-sm text-green-700 dark:text-green-300 transform transition-all"
                        >
                            <div class="flex items-center space-x-2">
                                <span class="text-lg animate-bounce">✔</span>
                                <span>{{ status }}</span>
                            </div>
                        </div>
                    </transition>

                    <!-- Login Form -->
                    <Form
                        :action="store().url"
                        method="POST"
                        :reset-on-success="['password']"
                        v-slot="{ errors, processing }"
                        class="space-y-6"
                    >
                        <!-- Email Field with dynamic styling -->
                        <div class="space-y-2 transform transition-all duration-300" :class="{ 'scale-105': emailFocused }">
                            <Label for="email" class="text-sm font-semibold text-foreground flex items-center space-x-1">
                                <span>Email Address</span>
                                <span v-if="isEmailValid" class="text-xs text-green-500 ml-2">✓</span>
                            </Label>
                            <div class="relative">
                                <Input
                                    id="email"
                                    v-model="formState.email"
                                    type="email"
                                    name="email"
                                    required
                                    autofocus
                                    :tabindex="1"
                                    autocomplete="email"
                                    placeholder="you@example.com"
                                    class="w-full pr-10 transition-all duration-200"
                                    :class="{
                                        'border-green-500 dark:border-green-400': isEmailValid && formState.email,
                                        'border-destructive dark:border-destructive': errors.email
                                    }"
                                    :aria-invalid="!!errors.email"
                                    @focus="emailFocused = true"
                                    @blur="emailFocused = false"
                                />
                                <div v-if="isEmailValid && formState.email" class="absolute right-3 top-3 text-green-500">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <InputError v-if="errors.email" :message="errors.email" class="text-xs mt-1 animate-pulse" />
                        </div>

                        <!-- Password Field with show/hide toggle -->
                        <div class="space-y-2 transform transition-all duration-300" :class="{ 'scale-105': passwordFocused }">
                            <div class="flex items-center justify-between">
                                <Label for="password" class="text-sm font-semibold text-foreground flex items-center space-x-1">
                                    <span>Password</span>
                                    <span v-if="isPasswordValid && formState.password" class="text-xs text-green-500 ml-2">✓</span>
                                </Label>
                                <TextLink
                                    v-if="canResetPassword"
                                    :href="request()"
                                    class="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                                    :tabindex="5"
                                >
                                    Forgot password?
                                </TextLink>
                            </div>
                            <div class="relative">
                                <Input
                                    id="password"
                                    v-model="formState.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    name="password"
                                    required
                                    :tabindex="2"
                                    autocomplete="current-password"
                                    placeholder="••••••••"
                                    class="w-full pr-10 transition-all duration-200"
                                    :class="{
                                        'border-green-500 dark:border-green-400': isPasswordValid && formState.password,
                                        'border-destructive dark:border-destructive': errors.password
                                    }"
                                    :aria-invalid="!!errors.password"
                                    @focus="passwordFocused = true"
                                    @blur="passwordFocused = false"
                                />
                                <button
                                    type="button"
                                    class="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                    @click="showPassword = !showPassword"
                                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                >
                                    <svg v-if="!showPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                    </svg>
                                    <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                                        <path d="M15.171 13.576l1.472 1.473a10.028 10.028 0 01-4.345 2.647c-2.965.766-6.588-.146-8.94-2.498a9.947 9.947 0 01-.652-.902l1.428-1.429a7.948 7.948 0 010 .502 4 4 0 001.503 3.769l1.415-1.414a2.003 2.003 0 01-.502-1.503c0 .3.048.599.152.882z" />
                                    </svg>
                                </button>
                            </div>
                            <InputError v-if="errors.password" :message="errors.password" class="text-xs mt-1 animate-pulse" />
                        </div>

                        <!-- Remember Me with animated checkbox -->
                        <div class="flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:opacity-80" @click="handleRememberMeChange">
                            <Checkbox
                                id="remember"
                                :checked="formState.remember"
                                name="remember"
                                :tabindex="3"
                                class="transition-transform duration-200"
                                :class="{ 'scale-110': rememberMeToggled }"
                            />
                            <Label for="remember" class="text-sm text-foreground cursor-pointer font-medium">
                                Keep me signed in
                            </Label>
                        </div>

                        <!-- reCAPTCHA Widget -->
                        <div v-if="recaptchaSiteKey" class="flex flex-col items-start space-y-1">
                            <div id="recaptcha-container"></div>
                            <input type="hidden" name="g-recaptcha-response" :value="captchaToken" />
                        </div>

                        <!-- Submit Button with dynamic states -->
                        <Button
                            type="submit"
                            class="w-full h-11 font-semibold text-base transition-all duration-300 transform"
                            :class="{
                                'opacity-50 cursor-not-allowed': !isFormValid || processing,
                                'hover:scale-105': isFormValid && !processing,
                                'bg-primary/80': !isFormValid && !processing
                            }"
                            :tabindex="4"
                            :disabled="processing || !isFormValid"
                            data-test="login-button"
                        >
                            <Spinner v-if="processing" class="mr-2 animate-spin" />
                            <span class="transition-opacity duration-200">
                                {{ processing ? 'Signing in...' : 'Sign in' }}
                            </span>
                        </Button>
                    </Form>

                    <!-- Footer -->
                    <div class="mt-8 pt-6 border-t border-border text-center animate-fade-in">
                        <p class="text-xs text-muted-foreground">
                            By signing in, you agree to our
                            <a href="#" class="text-primary hover:underline transition-colors">Terms of Service</a>
                            and
                            <a href="#" class="text-primary hover:underline transition-colors">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AuthBase>
</template>

<style scoped>
/* Fade-in animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(10px);
    }
}

.animate-fade-in {
    animation: fadeIn 0.6s ease-out;
}

.animate-fade-out {
    animation: fadeOut 0.3s ease-in;
}

/* Smooth transitions for input fields */
:deep(input) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style
