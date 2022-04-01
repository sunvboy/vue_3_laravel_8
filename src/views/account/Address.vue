<template>
  <SidebarComponent title="Address Book">
    <div class="container mx-auto">
      <h2 class="font-normal text-2xl py-5 tracking-wide">Address Book</h2>

      <div
        class="shadow-lg p-5 mb-6"
        v-for="item in listAddress"
        :key="item.name"
      >
        <h3 class="font-semibold text-xl tracking-wide">
          {{ item.title }}
        </h3>
        <div class="mt-2">
          <p>{{ item.name }}</p>
          <p>{{ item.address }}</p>
          <p>{{ item.phone }}</p>
        </div>
        <div class="flex justify-end">
          <a
            href=""
            @click.prevent="handleEditAddress(item.id)"
            class="text-pink px-10"
          >
            Sửa
          </a>
          <a href="" @click.prevent="open = true" class="text-pink"> Xóa </a>
        </div>
      </div>

      <div>
        <a
          href=""
          @click.prevent="openCreateAddress = true"
          class="tracking-wide float-left bg-pink text-white text-lg font-medium focus:ring-indigo-500 focus:border-indigo-500 blockborder-gray-300 rounded-md uppercase py-2 px-11"
          >Thêm địa chỉ mới</a
        >
      </div>
    </div>
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="open = false"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <XIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Xóa địa chỉ
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Bạn có chắc chắn muốn xóa địa chỉ không? Tất cả dữ liệu
                        của bạn sẽ bị xóa vĩnh viễn. Hành động này không thể
                        được hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="handleDeleteAddress()"
                >
                  Xóa
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="open = false"
                  ref="cancelButtonRef"
                >
                  Hủy
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <TransitionRoot as="template" :show="openCreateAddress">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="handleCloseModalAddress"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg md:max-w-lg lg:max-w-lg w-full"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <PencilIcon
                      class="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      v-if="dataAddressEdit.id"
                      as="h3"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Cập nhập địa chỉ
                    </DialogTitle>
                    <DialogTitle
                      v-else
                      as="h3"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Thêm địa chỉ mới
                    </DialogTitle>
                  </div>
                </div>
                <div class="mt-8">
                  <form action="">
                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Tiêu đề</label
                      >
                      <div class="mt-1">
                        <input
                          :value="dataAddressEdit.title"
                          type="text"
                          name="fullname"
                          class="w-full focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Họ và tên</label
                      >
                      <div class="mt-1">
                        <input
                          :value="dataAddressEdit.name"
                          type="text"
                          name="fullname"
                          class="w-full focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Email</label
                      >
                      <div class="mt-1">
                        <input
                          :value="dataAddressEdit.email"
                          type="email"
                          name="email"
                          class="w-full focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Số điện thoại
                      </label>
                      <div class="mt-1">
                        <input
                          :value="dataAddressEdit.phone"
                          type="text"
                          name="phone"
                          class="w-full focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Địa chỉ
                      </label>
                      <div class="mt-1">
                        <textarea
                          :value="dataAddressEdit.address"
                          type="text"
                          name="phone"
                          class="w-full focus:ring-indigo-500 focus:border-indigo-500 block pl-5 pr-12 sm:text-sm border-gray-300 rounded-md"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  v-if="dataAddressEdit.id"
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cập nhập
                </button>
                <button
                  v-else
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Thêm mới
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="handleCloseModalAddress"
                  ref="cancelButtonRef"
                >
                  Hủy
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </SidebarComponent>
</template>

<script setup>
import SidebarComponent from "../../components/auth/SidebarComponent.vue";
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon, PencilIcon } from "@heroicons/vue/outline";
import { v4 as uuidv4 } from "uuid";
const open = ref(false);
const openCreateAddress = ref(false);
const dataAddressEdit = ref({});
function handleEditAddress(id) {
  const address = listAddress.find((element) => element.id == id);
  console.log(address);
  dataAddressEdit.value = address;
  openCreateAddress.value = true;
}
function handleDeleteAddress(id) {
  const address = listAddress.filter((element) => element.id != id);
  log(address);
}
function handleCloseModalAddress() {
  openCreateAddress.value = false;
  dataAddressEdit.value = {};
}
const listAddress = [
  {
    id: uuidv4(),
    title: "Default Shipping Address 1",
    name: "Nguyễn Văn Quyền",
    email: "nguyenquyen571995@gmail.com",
    address: "Số 33 - ngách 12 - ngõ 629 Kim Mã",
    phone: "0348464081",
  },
  {
    id: uuidv4(),
    title: "Default Shipping Address 2",
    name: "Nguyễn Nhật Chi",
    email: "quannguyen@gmail.com",
    address: "Số 33 - ngách 12 - ngõ 629 Kim Mã",
    phone: "0348464081",
  },
];
</script>
