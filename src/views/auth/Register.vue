<template>
  <div>
    <TitleGuestComponent title="Register to your account"></TitleGuestComponent>
    <div>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link
          :to="{ name: 'Login' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          login
        </router-link>
      </p>
    </div>
    <form class="mt-8" @submit="register">
      <Alert
        v-if="Object.keys(errors).length"
        class="flex-col items-stretch text-sm mb-3"
      >
        <div v-if="typeof errors === 'object'">
          <div v-for="(field, i) of Object.keys(errors)" :key="i">
            <div v-for="(error, ind) of errors[field] || []" :key="ind">
              * {{ error }}
            </div>
          </div>
        </div>
        <div v-else>* {{ errors }}</div>
      </Alert>
      <div class="rounded-md shadow-sm">
        <div class="mb-2">
          <label class="sr-only">Fullname</label>
          <input
            v-model="user.name"
            name="fullname"
            type="text"
            autocomplete="off"
            class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Fullname"
          />
        </div>
        <div class="mb-2">
          <label class="sr-only">Email address</label>
          <input
            v-model="user.email"
            name="email"
            type="email"
            autocomplete="email"
            class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div class="mb-2">
          <label class="sr-only">Password</label>
          <input
            v-model="user.password"
            name="password"
            type="password"
            autocomplete="current-password"
            class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div class="mb-2">
          <label class="sr-only">Password Confirmation</label>
          <input
            v-model="user.password_confirmation"
            name="password_confirmation"
            type="password"
            autocomplete="current-password"
            class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password Confirmation"
          />
        </div>
      </div>
      <div>
        <button
          v-if="!loading"
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Register
        </button>
        <button
          v-else
          type="button"
          class="w-full justify-center inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
          disabled=""
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import TitleGuestComponent from "../../components/auth/TitleGuestComponent.vue";
import store from "../../store";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import Alert from "../../components/Alert.vue";
const route = useRouter();
const user = { name: "", email: "", password: "", password_confirmation: "" };
const loading = computed(() => store.state.isLoading);
const errors = ref({});
function register(e) {
  e.preventDefault();
  store.dispatch("register", user).then((res) => {
    if (res.status === true) {
      route.push({ name: "Dashboard" });
    } else {
      errors.value = res.error;
      route.push({ name: "Register" });
    }
  });
}
</script>
<style></style>
