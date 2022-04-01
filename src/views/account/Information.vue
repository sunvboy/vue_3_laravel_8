<template>
  <SidebarComponent title="User Information">
    <div class="container mx-auto">
      <h2 class="font-normal text-2xl py-5">User Information</h2>
      <div class="shadow-lg p-5">
        <form action="">
          <div class="mb-5">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Họ và tên</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="fullname"
                class="w-full sm:w-72 lg:w-72 md:w-72 focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder=""
              />
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="email"
                class="w-full sm:w-72 lg:w-72 md:w-72 focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder=""
              />
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div class="mt-1">
              <input
                type="text"
                name="phone"
                class="w-full sm:w-72 lg:w-72 md:w-72 focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder=""
              />
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <div class="mt-1">
              <textarea
                type="text"
                name="phone"
                class="w-full sm:w-72 lg:w-72 md:w-72 focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder=""
              ></textarea>
            </div>
          </div>
          <div class="mb-5">
            <a href="" class="font-semibold text-pink text-base">
              Change password
            </a>
          </div>
          <div>
            <button
              type="submit"
              class="tracking-wide bg-pink text-white text-lg font-medium focus:ring-indigo-500 focus:border-indigo-500 blockborder-gray-300 rounded-md uppercase py-2 px-11"
            >
              save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </SidebarComponent>
</template>

<script setup>
import SidebarComponent from "../../components/auth/SidebarComponent.vue";
</script>
