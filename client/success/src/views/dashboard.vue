<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <span>Nom: {{user.user_name}}</span>
        <!--<ul v-for="(questionnaire, k) in questionnaires" :key="k">Questionnaires: {{questionnaire}}
          <li>note: {{questionnaire.note}}</li>
          <li>passé le : {{questionnaire.date_passage}}</li>
        </ul>
        <div v-if="user.type =='collaborateur'">
          <ul v-for="(answer, k) in answers" :key="k" >Questionnaire: {{answer.id_questionnaire.questionnaire_name}}
            <li>note: {{answer.note}}/{{answer.noteTotal}}</li>
            <button @click="goToGrading(k)">Correction</button>
          </ul>
        </div>-->
        <div v-if="user.type =='collaborateur'">
          <dashboard-collab :user="user" />
        </div>
        <div v-if="user.type =='correcteur'">
          <dashboard-admin :user="user" />
        </div>
    </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import config from "../../config/env";
import DashboardAdmin from '../components/dashboardAdmin.vue';
import DashboardCollab from '../components/dashboardCollab.vue';
    export default {
  components: { DashboardAdmin, DashboardCollab },
        name: "Dashboard",
        data() {
            return{
                user:{},
                //questionnaires:[],
                answers:[]
            }
        },
        methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      console.log(decoded)
      this.user = decoded.user;
      //this.questionnaires= this.user.questionnaires;
      let user= this.user;
      console.log(user);
    },
    getAnswers() {
      const requestOpt= {
                    method: "GET",
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                let id=this.user._id;
                fetch(config.VUE_APP_BASE_URL + "/getAnswers/"+id, requestOpt)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        let jdata= JSON.parse(result);
                        this.answers =jdata
                        let answers= this.answers;
                        console.log(answers);
                    })
                    .catch((error) => { console.log("error", error); });
    },
      goToGrading(k) {
      let answer = this.answers[k];
      this.$router.push({name: "Grading", params: {answer: answer}});
    }
  },
  created() {
    this.getUserDetails();
    this.getAnswers();
  }
    }
</script>
