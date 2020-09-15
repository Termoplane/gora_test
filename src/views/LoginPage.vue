<template>
  <div class="login">
    <div class="authSuccess" v-if="isAuthenticated">
      <h1>Вы уже вошли!</h1>
      <router-link to="/" class="authSuccess__link"> Обратно на главную </router-link>
    </div>
    <LoginForm v-else />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm"

export default {
  name: "LoginPage",
  components: {
    LoginForm
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['isAuthenticated']
    }
  }
};
</script>

<style lang="sass" scoped>
.login
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  .authSuccess
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    h1
      font-size: 2rem
    &__link
      margin-top: 2rem
      text-decoration: none
</style>
