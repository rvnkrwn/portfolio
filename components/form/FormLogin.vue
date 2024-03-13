<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6 max-w-80 m-auto">
        <InputGroup id="email" label="example@email.com" name="email" type="email" @value="(x) => getValueEmail(x)"/>
        <InputGroup id="password" label="********" name="password" type="password"
                    @value="(x) => getValuePassword(x)"/>
        <button :class="['btn btn-outline h-10', isLoading ? 'btn-disabled' : '']" type="submit">
          <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
          <span v-else>Login</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import InputGroup from "~/components/form/input/InputGroup.vue";
import Swal from "sweetalert2"

const email = ref()
const password = ref()
const isLoading = ref(false)

const getValueEmail = (x: string | number | null) => {
  email.value = x
}
const getValuePassword = (x: string | number | null) => {
  password.value = x
}

const handleSubmit = async () => {
  const {login, isLoggedIn} = useAuth()
  isLoading.value = true
  try {
    const response: any = await login(email.value, password.value)
    await Swal.fire({
      position: "top-end",
      icon: "success",
      title: response,
      showConfirmButton: false,
      timer: 1500
    });
    isLoading.value = false
    isLoggedIn().value = String(true)
    return navigateTo('/admin')
  } catch (error: any) {
    await Swal.fire({
      position: "top-end",
      icon: "error",
      title: error?.statusMessage,
      showConfirmButton: false,
      timer: 1500
    });
    isLoggedIn().value = String(false)
    isLoading.value = false
  }
}
</script>

<style scoped>

</style>
