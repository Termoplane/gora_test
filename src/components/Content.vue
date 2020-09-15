<template>
  <div class="content">
    <h1 class="content__header">Поздравляю, вы вошли!</h1>
    <div class="content__images">
      <img src="../assets/img/Disco.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Content"
}
</script>

<style lang="sass" scoped>
.content
  padding: 2rem 0rem
  text-align: center
  h1
    font-size: 1.5rem
    padding: 0 2rem 2rem
  &__images
    img
      max-width: 100%
</style>
