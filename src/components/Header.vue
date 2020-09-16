<template>
  <div class="header">
    <img src="../assets/bars-light.svg" class="mobile-toggle" @click.prevent="menuTrigger">
    <router-link to="/" style="color: #000">
      <h3 class="header__title">
        Gora Studio
      </h3>
    </router-link>
    <div class="plug" style="flex-grow: 1"></div>
    <router-link to="/user" class="header__user">
      <div class="header__user__data">
        <p> {{ userName }} </p>
        <p>{{ userSurname }}</p>
      </div>
      <img :src="imgUrl(avatarImage)"> <!-- Just an emulation that we got image from server -->
    </router-link>
    <div class="header__mobile-menu-container">
      <div :class="overlay" @click.prevent="hideMenu"></div>
      <div :class="mobileMenu">
        <img src="../assets/cross.svg" class="toggleHide" @click.prevent="hideMenu" />
        <router-link to="/" style="color: #000" @click.native="hideMenu">
          <h3 class="mobile__title">
            Главная страница
          </h3>
        </router-link>
        <router-link to="/user" class="mobile-user" @click.native="hideMenu">
          <div class="header__user__data">
            <p> {{ userName }} </p>
            <p>{{ userSurname }}</p>
          </div>
          <img :src="imgUrl(avatarImage)"> <!-- Just an emulation that we got image from server -->
        </router-link>
      </div>
    </div>
    <div class="header__logout">
      <button @click.prevent="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      mobileMenu: ['mobileMenu'],
      overlay: ['overlay', 'hide'],
    }
  },
  computed: {
    avatarImage() {
      return this.$store.getters['user_photo'] // here should be an image url that we got from server.
    },
    userName() {
      return this.$store.getters['user_name']
    },
    userSurname() {
      return this.$store.getters['user_surname']
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth_logout').then(() => {
        this.$router.push('/login')
      })
    },
    // imgUrl is just a helper function that helps us to make
    // context for an example avatar image and avoid any errors.
    // It shouldn't be in final result, because we should get an img url from backend or cloud.
    imgUrl(path) {
      let images = require.context('../assets/img', false, /\.png$|\.jpg$/)
      return images('./' + path)
    },
    menuTrigger() {
      this.mobileMenu.push('slide-in')
      this.overlay.pop()
      document.body.style = "overflow: hidden"
    },
    hideMenu() {
      this.mobileMenu.pop()
      this.overlay.push('hide')
      document.body.style = "overflow: visible"
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  position: sticky
  width: 100%
  height: 4rem
  display: flex
  align-items: center
  box-shadow: 0px 10px 21px 0px rgba(0,0,0,0.75)
  justify-content: space-around
  .plug
    @include mobile
      display: none
  &__title
    @include mobile
      display: none
    padding: 0 2rem
  &__logout
    padding: 0 2rem
  &__user
    @include mobile
      display: none
    padding: 0.2rem 1rem
    border: 1px solid black
    border-radius: 1rem
    color: #000
    display: flex
    justify-content: center
    align-items: center
    text-align: center
    img
      width: 3rem
      height: 3rem
      border-radius: 50%
      margin-left: 0.5rem
    &:hover
      background: #F5F5F5

  &__mobile-menu-container
    @include desktop
      display: none
    .hide
      display: none
    .overlay
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background:
        color: rgba(black, 0.5)
      z-index: 50
    .mobileMenu
      display: flex
      flex-direction: column
      align-items: center
      justify-content: flex-start
      width: 50vw
      height: 100vh
      position: fixed
      top: 0
      left: 0
      transform: translateX(-100vw)
      transition: transform 1000ms ease, backround 1000ms ease
      z-index: 100
      background-color: #F5F5F5
      gap: 1rem
      .toggleHide
        align-self: flex-start
        margin: 1rem 0 0 1rem
        width: 2rem
        height: 2rem
      .mobile-title
        overflow-wrap: 
      .mobile-user
        padding: 0.2rem 1rem
        border: 1px solid black
        border-radius: 1rem
        color: #000
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        img
          width: 3rem
          height: 3rem
          border-radius: 50%
          margin-left: 0.5rem
    .slide-in
      transform: translateX(0)
  .mobile-toggle
    width: 2rem
    height: 2rem
    @include desktop
      display: none
</style>