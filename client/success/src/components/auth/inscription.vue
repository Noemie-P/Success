<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <h1>S'inscrire</h1>
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUser"
        >
          <input
            type="text"
            id="user_name"
            placeholder="user_name"
            v-model="register.user_name"
            required
          />
          <select name="type" id="type" v-model="register.type" v-on:change="getType">
            <option value="" selected disabled>Type</option>
            <option value="correcteur">correcteur</option>
            <option value="collaborateur">collaborateur</option>
          </select>
          <select id="groupe">
                <option v-for="(group, k) in groups" :value="group._id" :key="k" >{{group.name}}</option>
            </select>
          <input
            type="mail"
            id="mail"
            class="form-control mb-5"
            placeholder="mail"
            v-model="register.mail"
            required
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="register.password"
          />
          <p>
            <!-- Sign in button -->
            <center>
              <button>
                Sign in
              </button>
            </center>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
//import AdminNavigation from '../AdminNavigation.vue';
import config from "../../../config/env"
export default {
  //components: { AdminNavigation },
  name:"inscription",
  data() {
    return {
      register: {
        user_name: "",
        type:"",
        password: "",
        mail:""
      },
      groups:[],
    }
  },
  props: {
    "groupe2":String
  },
  created() {
        this.getGroups();
    },
  methods: {
      getType() {
         if(document.getElementById('type').value == "correcteur") {
             document.getElementById('groupe').hidden = true;
             document.getElementById('groupe').value = "623b4e077f2253b260fd9aa2";
         }
         else {
             document.getElementById('groupe').hidden = false;
         }
      },
      getGroups () {
                const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };

                fetch(config.VUE_APP_BASE_URL + "/getGroups", requestOpt)
                        .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.groups=jdata
                            let groups= this.groups;
                            console.log(groups);
                            }));
                        })
                    .catch((error) => { console.log("error", error); });
            },
    async registerUser() {
    let groupID = document.getElementById("groupe").value;
    
      const requestOpt = {
            method: "POST",
            body: JSON.stringify({"user_name":this.register.user_name, "type":this.register.type, "mail":this.register.mail, "password": this.register.password, "groupe": groupID}),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        };
        fetch(config.VUE_APP_BASE_URL + "/register", requestOpt)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          var jdata = JSON.parse(result);
          //let token = result.data.token;
          //console.log(token)
          //if (token) {
            localStorage.setItem("register", result);
            this.$router.push({name:"Verify2FA", params: {user: jdata.data, url: jdata.url, secret: jdata.secret, qr: jdata.user}});
            //this.$router.push("/");
            //console.log("Success", "Registration Was successful", "success");
          //} else {
            //console.log("Error", "Something Went Wrong", "error");
          //}
        }). catch ((err) =>{
        let error = err.response;
        if (error.status == 409) {
          console.log("Error", error.data.message, "error");
        } else {
          console.log("Error", error.data.err.message, "error");
        }
      })
    }
  }
};
</script>