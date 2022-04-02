<template>
  <div class="login">
    <div >
      <div>
        <h1>Se connecter</h1>
        <form
          @submit.prevent="loginUser"
        >
        <br>
          <input
            type="text"
            id="user_name"
            class="form-control mb-5"
            placeholder="user_name"
            v-model="login.user_name"
          />
          <input
            type="mail"
            id="mail"
            class="form-control mb-5"
            placeholder="mail"
            v-model="login.mail"
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
            <br>
            <button type="submit">
              Se connecter
            </button><br><br>
            <label>Pas encore de compte? Vous pouvez vous inscrire <router-link to="/inscription">ici</router-link></label>
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
            body: JSON.stringify({"user_name":this.login.user_name, "mail": this.login.mail, "password": this.login.password}),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        };
        fetch(config.VUE_APP_BASE_URL+ "/login", requestOpt)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            let jdata = JSON.parse(result);
            console.log(jdata);
            console.log(jdata.url);
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
            console.log( "name " + jdata.user.user_name );
            console.log("password " + jdata.user.password );
            //if (userName==jdata.user.user_name && password==jdata.user.password) {
              localStorage.setItem("user", result);
              console.log("Success", "Login Successful", "success");
              this.$router.push({name:"Login2FA", params: {user: jdata.user}});
            //}
             /* if (jdata.type == "collaborateur"){
                    this.$router.push("/collab");
                  }
                  else if (jdata.type == "correcteur"){
                    this.$router.push("/admin");
                  }
                  else {
                    console.log("aucun type d'utilisateur")
                  }*/
          })
      .catch ((err) =>{
        console.log("Error", "Something Went Wrong", "error");
        console.log(err.response);
     });
        }
    }
  };
</script>