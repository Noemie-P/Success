<template>
    <div class="homeAdmin">
        <h1>Accueil administrateur</h1>
        <ul class="list-group">
              <li class="list-group-item">Name : {{ user.user_name }}</li>
          </ul>
          <div class="flex-containers-cards">
            <div class="cards">
          <Card
            card-title="Accueil"
            card-text="Allez à l'Accueil"
            card-button-to="/admin/home"
            card-button-name="Accueil"
          />
            </div>
            <div class="cards">
          <Card
            card-title="Dashboard"
            card-text="Voir le Dashboard"
            card-button-to="/admin/dashboard"
            card-button-name="Dashboard"
          />
            </div>
          </div>
          <div>
          <hr>
          <span>Espace administrateur</span>
          <div class="flex-containers-cards">
            <div class="cards">
          <Card
            card-title="Création de questionnaire"
            card-text="Créer un questionnaire"
            card-button-to="/creationQuestionnaire"
            card-button-name="Questionnaire"
          />
            </div>
            <div class="cards">
          <Card
            card-title="Création de questions"
            card-text="Créer une question"
            card-button-to="/creationQuestion"
            card-button-name="Question"
          />
            </div>
            <div class="cards">
          <Card
            card-title="Création d'utilisateurs"
            card-text="Créer un utilisateur"
            card-button-to="/admin/register"
            card-button-name="Utilisateur"
          />
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Card from '../../components/Cards.vue'

//import VueJwtDecode from "vue-jwt-decode";

export default {
  components: { Card },
    name: "HomeAdmin",
    data() {
    return {
      user: {},
      token:"",
      //tokens:[],
      //lenght:null
    };
  },
  methods: {
    getUserDetails() {
      let user = JSON.parse(localStorage.getItem("user"));
      //this.token = token;
      //let decoded = VueJwtDecode.decode(token);
      console.log(user);
      this.user = user;
      //this.tokens= this.user.tokens;
    },
    logUserOut() {
      /*const requestOpt= {
                    method: "PUT",
                    body: JSON.stringify({token:this.token, tokens:this.user.tokens}),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                let id=this.user._id;
                fetch("http://localhost:3000/logOutUser/"+id, requestOpt)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                    })
                    .catch((error) => { console.log("error", error); });*/
      localStorage.removeItem("user");
      
      this.$router.push("/");
    }
  },
  created() {
    this.getUserDetails();
  }
}
</script>