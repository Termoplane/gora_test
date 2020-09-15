<template>
  <form @submit.prevent="login" class="loginform">
    <h1 class="loginform__title">
      Введите свои данные
    </h1>
    <div class="loginform__field">
      <label for="emailField"> Email: </label>
      <input
        required
        name="username"
        type="email"
        v-model="email"
        placeholder="Email"
        id="emailField"
        autocomplete="username"
      />
    </div>
    <div class="loginform__field">
      <label for="passwordField"> Пароль: </label>
      <input
        required
        name="password"
        type="password"
        v-model="password"
        placeholder="Пароль"
        id="PasswordField"
        autocomplete="current-password"
      />
    </div>
    <button type="submit" v-if="authStatus === '' || authStatus === 'success' || authStatus === 'error'">
      Войти
    </button>
    <img src="../assets/img/loader.gif" v-else />
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  computed: {
    authStatus() {
      return this.$store.getters['authStatus']
    }
  },
  methods: {
    // method for user to log in, if succeeded then push to root page
    // else catch an error and treat it
    login: function() {
      const email = this.email
      const password = this.password
      this.$store
        .dispatch('auth_login', { email, password })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
};
</script>

<style scoped lang="sass">
.loginform
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  &__title
    width: 70%
    font-size: 2rem
    padding-bottom: 1rem
  &__field
    display: flex
    flex-direction: column
    padding-bottom: 1rem
    label
      font-size: 1.2rem
  button
    font-size: 2rem
    margin-top: 1rem
  img
    height: 2rem
    margin-top: 1rem
</style>
