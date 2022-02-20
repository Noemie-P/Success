<template>
  <div id="collab">
    <div class="connected" v-if="log == true">
      <div class="flex-container">
        <div class="nav">
          <collab-navigation/>
        </div>
        <div class="page">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isLoggedIn } from '../utils/auth';
import CollabNavigation from '../components/CollabNavigation.vue'
export default {
    components: { CollabNavigation},
  name: 'Collab',
  created() {
    this.log = isLoggedIn();
    if (this.log == true) {
      console.log(true)
    }
    else {
      this.$router.push({name: "login"})
      console.log(false)
    }
  }
}
</script>