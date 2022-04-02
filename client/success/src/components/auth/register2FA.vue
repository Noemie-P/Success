<template>
  <div class="verify2FA">
      <h1>Validation de l'enregistrement</h1>
      <form @submit.prevent= "handleSubmitForm">
        <p>Scanner le QRcode puis entrer le code.</p>
        <br>
        <qrcode-vue v-bind:value="url" size="200" level="H"/>
        <br><br>
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
import QrcodeVue from 'qrcode.vue'
export default {
    name:"register2FA",
    components: {
      QrcodeVue,
    },
    data() {
        return {
            user:{},
            qr:"",
            url:"",
            code:""
        }
    },
    mounted: function() {
        this.url = this.$route.params.url;
        this.qr = this.$route.params.qr;
        this.user = this.$route.params.user;
        this.secret = this.$route.params.secret;
        console.log(this.user);
        console.log(this.qr);
        console.log(this.url);

    },
    methods: {
      handleSubmitForm() {
          const requestOptQuestionnaire = {
                      method: "POST",
                      body: JSON.stringify({"code": this.code, "userName":this.user.user_name, "mail": this.user.mail, "secret": this.secret}),
                      headers: { 'Content-type': 'application/json; charset=UTF-8' }
                  };
                  fetch(config.VUE_APP_BASE_URL + "/verify-2FA", requestOptQuestionnaire)
                  .then((response) => response.text())
                  .then(result => {
                      var jdata = JSON.parse(result);
                      console.log(jdata);
                        localStorage.setItem("user", result);
                        console.log("Success", "Login2 Successful", "success");
                        this.$router.push("/admin/groupsList");
                  });             
      },
    }
}
</script>