<template>
  <div class="login">
    <div >
      <div>
        <form
          @submit.prevent="loginUser"
        >
        
        <span>collaborateur sans groupe: userName = collab ; password = collab</span><br>
        <span>collaborateur groupe SIO: userName = sio ; password = sio</span><br>
        <span>administrateur: userName = correcteur ; password = correcteur</span><br>
        <br>
          <input
            type="text"
            id="user_name"
            class="form-control mb-5"
            placeholder="user_name"
            v-model="login.user_name"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
          />
          <!--<p>
            Dont have an account??<router-link to="/register"
              >click here</router-link
            >
          </p>-->
          <!-- Sign in button -->
          <center>
            <button type="submit">
              Sign in
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../../config/env"
import { isLoggedIn } from '../../utils/auth';

export default {
  data() {
    return {
      login: {
        user_name: "",
        password: "",
      }
    };
  },
  created() {
    this.log = isLoggedIn();
    if (this.log == true) {
      console.log(true)
    }
    else {
      console.log(false)
    }
  },
  methods: {
    async loginUser() {
        let userName = this.login.user_name;
        let password = this.login.password;
        console.log(userName);
        console.log(password);
        const requestOpt = {
            method: "POST",
            body: JSON.stringify({"user_name":this.login.user_name, "password": this.login.password}),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        };
        fetch(config.VUE_APP_BASE_URL+ "/login", requestOpt)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            let jdata = JSON.parse(result);
            let token = jdata.token;
            console.log(jdata);
           /* if (token) {
              if (userName==jdata.user.user_name && password==jdata.user.password) {
                  console.log("Success", "Login Successful", "success");
                  if (jdata.user.type == "collaborateur"){
                    this.$router.push("collab/home");
                  }
                  else if (jdata.user.type == "correcteur"){
                    this.$router.push("admin/home");
                  }
                  else {
                    console.log("aucun type d'utilisateur")
                  }
              }
              else {
                console.log("cela ne correspond pas")
              }
            }*/
            localStorage.setItem("jwt", token);
            if (token) {
              console.log("Success", "Login Successful", "success");
              if (jdata.user.type == "collaborateur"){
                    this.$router.push("/collab");
                  }
                  else if (jdata.user.type == "correcteur"){
                    this.$router.push("/admin");
                  }
                  else {
                    console.log("aucun type d'utilisateur")
                  }
            }
          })
      .catch ((err) =>{
        console.log("Error", "Something Went Wrong", "error");
        console.log(err.response);
     });
        }
    }
  };
</script>