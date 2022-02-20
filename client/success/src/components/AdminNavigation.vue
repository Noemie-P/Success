<template>
    <div class="adminNav">
        <div>
            <img src="../assets/logout.png" alt="log out" @click="logUserOut" height="30px" width="30px"/>
        </div>
        <router-link to="/admin">Accueil</router-link><br>
        <router-link to="/admin/dashboard">Dashboard</router-link><br>
        <router-link to="/admin/register">Créer un utilisateur</router-link><br>
        <router-link to="/admin/createGroup">Créer un groupe</router-link><br>
        <router-link to="/admin/creationQuestionnaire">Créer un questionnaire</router-link><br>
        <router-link to="/admin/creationQuestion">Créer une question</router-link><br>
        <router-link to="/admin/newCategory">Créer une catégorie</router-link><br>
        <router-link to="/admin/UserList">Liste des utilisateurs</router-link><br>
        <router-link to="/admin/categoryList">Liste des catégories</router-link><br>
        <router-link to="/admin/questionnaireList">Liste des questionnaires</router-link><br>
        <router-link to="/admin/groupsList">Liste des groupes</router-link><br>
        <router-link to="/admin/createExam">Créer une évaluation</router-link>
    </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
    name: 'AdminNavigation',
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