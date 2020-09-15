<template>
  <div class="user">
    <div class="user__photo">
      <h2>Ваше фото: </h2>
      <img :src="imgUrl(avatarImage)" /> <!-- Just an emulation that we got image from server -->
    </div>
    <div class="user__description">
      <h1 class="user__description__name">{{ userName + " " + userSurname }}</h1>
      <p>Информация о вас:</p>
      {{ this.$store.getters['user_about'] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  methods: {
    imgUrl(path) {
      let images = require.context('../assets/img', false, /\.png$|\.jpg$/)
      return images('./' + path)
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
  }
}
</script>

<style lang="sass" scoped>
.user
  padding: 3rem 0
  min-height: 80vh
  height: 100%
  width: 100%
  display: grid
  grid-template-columns: 1fr 1fr
  justify-content: center
  align-items: center
  gap: 3rem
  @include mobile
    grid-template-columns: 1fr
  &__photo
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    img
      margin-top: 1rem
      height: 15rem
      width: 15rem
      border-radius: 5rem
  &__description
    padding: 0 3rem
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    &__name
      margin-bottom: 2rem
      font-size: 1.4rem
    p
      text-align: center
      font-family: 'Press Start 2P', cursive
      font-size: 1rem
      margin: 1rem 0
</style>