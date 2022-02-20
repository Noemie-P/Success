<template>
    <div class="collabNav">
        <div>
            <img src="../assets/logout.png" alt="log out" @click="logUserOut" height="30px" width="30px"/>
        </div>
        <router-link to="/collab">Accueil</router-link><br>
        <router-link to="/collab/dashboard">Dashboard</router-link><br>
        <router-link to="/collab/rejoindreQuestionnaire">Rejoindre un questionnaire</router-link>
    </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
    name: 'CollabNavigation',
    methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      this.token = token;
      let decoded = VueJwtDecode.decode(token);
      console.log(decoded)
      this.user = decoded.user;
      this.tokens= this.user.tokens;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      
      this.$router.push("/");
    }
  },
  created() {
    this.getUserDetails();
  }
};


</script>

<style scoped>
</style>