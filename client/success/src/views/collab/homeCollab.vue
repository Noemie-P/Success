<template>
    <div class="homeCollab">
        <h1>Accueil collaborateur</h1><ul class="list-group">
              <li class="list-group-item">Name : {{ user.user_name }}</li>
              <li class="list-group-item">type : {{ user.type }}</li>
        </ul>

    </div>
</template>

<script>

//import VueJwtDecode from "vue-jwt-decode";

export default {
    name: "HomeCollab",
    data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      let user = JSON.parse(localStorage.getItem("user"));
      //let decoded = VueJwtDecode.decode(token);
      //console.log(decoded)
      this.user = user;
      //let user= this.user;
      console.log(this.user.user_name);
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