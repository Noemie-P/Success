<template>
    <div class="homeCollab">
        <h1>Accueil collaborateur</h1><ul class="list-group">
              <li class="list-group-item">Name : {{ user.user_name }}</li>
              <li class="list-group-item">type : {{ user.type }}</li>
        </ul>

    </div>
</template>

<script>

import VueJwtDecode from "vue-jwt-decode";

export default {
    name: "HomeCollab",
    data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      console.log(decoded)
      this.user = decoded.user;
      let user= this.user;
      console.log(user);
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  },
  created() {
    this.getUserDetails();
  }
}
</script>