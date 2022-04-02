<template>
  <div class="login2FA">
      <h1>Login 2FA</h1>
      <form @submit.prevent= "handleSubmitForm">
        <br><br>{{code}}
        <div class="mb-3">
          <label for="code" class="form-label">Code</label>
          <input type="text" class="form-control" id="code" name="code" v-model="code">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  </div>
</template>
<script>
import config from "../../../config/env"
export default {
    name:"Login2FA",
    data() {
        return {
            user:{}
        }
    },
    mounted: function() {
        this.user = this.$route.params.user;
    },
    methods: {
      handleSubmitForm() {
          const requestOptQuestionnaire = {
                      method: "POST",
                      body: JSON.stringify({"code": this.code, "userName":this.user.user_name, "mail": this.user.mail, "secret": this.user.secret}),
                      headers: { 'Content-type': 'application/json; charset=UTF-8' }
                  };
                  fetch(config.VUE_APP_BASE_URL + "/login-2FA", requestOptQuestionnaire)
                  .then((response) => response.text())
                  .then(result => {
                      var jdata = JSON.parse(result);
                      console.log(jdata);
                        localStorage.setItem("user", result);
                        console.log("Success", "Login2 Successful", "success");
                        if (jdata.type == "collaborateur"){
                          this.$router.push("/collab");
                        }
                        else if (jdata.type == "correcteur"){
                          this.$router.push("/admin");
                        }
                        else {
                          console.log("aucun type d'utilisateur")
                        }
                  });             
      },
    }
}
</script>