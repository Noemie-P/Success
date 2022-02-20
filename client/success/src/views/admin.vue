<template>
  <div>
    <div id="admin">
      <div class="connected" v-if="log == true">
        <div class="flex-container">
          <div class="nav">
            <admin-navigation/>
          </div>
          <div class="page">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isLoggedIn } from '../utils/auth';
import AdminNavigation from '../components/AdminNavigation.vue'
export default {
    components: {AdminNavigation },
  name: 'Admin',
  created() {
    this.log = isLoggedIn();
    if (this.log == true) {
      console.log(true)
    }
    else {
      this.$router.push({name: "login"})
    }
  }
}
</script>
