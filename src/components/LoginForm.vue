<template>
  <form @submit.prevent="login" class="loginform">
    <h1 class="loginform__title">
      Введите свои данные
    </h1>
    <div class="loginform__errorBox" ref="errorBox">
      <p>{{ errorMessage }}</p>
    </div>
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
        ref="email"
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
        ref="password"
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
      password: "",
      errorMessage: ""
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
      const re = /\S+@\S+\.\S+/ // regexp for email validation if browser doesn't support input email validation
      const email = this.email
      const password = this.password
      if (!re.test(email)) {
        this.errorMessage = "Неверный Email"
        this.$refs.errorBox.style = "display: block"
        this.$refs.email.style = "outline: #dd2c00 2px solid"
        this.$refs.password.style = "outline: none"
        return;
      }
      this.$store
        .dispatch('auth_login', { email, password })
        .then(() => {
          this.$router.push("/"); // Push user to home page if authorization was succesful
        })
        .catch(err => {
          if (err === "Wrong email") {
            this.errorMessage = "Неверный Email"
            this.$refs.errorBox.style = "display: block"
            this.$refs.email.style = "outline: #dd2c00 2px solid"
            this.$refs.password.style = "outline: none"
          } else if (err === "Wrong password") {
            this.errorMessage = "Неверный пароль"
            this.$refs.errorBox.style = "display: block"
            this.$refs.email.style = "outline: none"
            this.$refs.password.style = "outline: #dd2c00 2px solid"
          }
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
  &__errorBox
    margin: 1rem 0
    display: none
    background: #dd2c00
    color: #ffffff
    text-align: center
    padding: 1rem
    p
      font-size: 1.4rem
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
