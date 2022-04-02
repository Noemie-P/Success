<template>
  <div
    class="card"
  >
    <img
      src="#"
      class="card-img"
      alt=""
    >
    <div class="card-body">
      <h5 class="card-title">
        {{ cardTitle }}
      </h5>
      <p class="card-text">
        {{ cardText }}
      </p>
      <router-link
        :to="cardButtonTo"
        class="card-button"
      >
        {{ cardButtonName }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cardTitle: {
      type: String,
      default: ''
    },
    cardText: {
      type: String,
      default: ''
    },
    cardButtonTo: {
      type: String,
      default: ''
    },
    cardButtonName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>