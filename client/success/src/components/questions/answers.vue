<template>
    <div class="passedSurveys">
      <table class="bigTable">
        <tr>
            <th>Questionnaire</th>
            <th>Note</th>
            <th>Statut</th>
            <th>Passé le</th>
            <th>Actions</th>
        </tr>
        <tr v-for="(answer, k) in answers" :key="k">
            <td>{{answer.id_questionnaire.questionnaire_name}}</td>
            <td>{{answer.note}}/{{answer.noteTotal}}</td>
            <td v-if="answer.statut">{{answer.statut}}</td>
            <td v-else>Terminé</td>
            <td>{{dates[k]}}</td>
            <td><button @click="goToGrading(k)">Correction</button></td>
        </tr>
      </table>
    </div>
</template>

<script>
import config from "../../../config/env"
//import VueJwtDecode from "vue-jwt-decode";
    export default {
        name: "PassedSurveys",
        data() {
            return{
                user:{},
                //questionnaires:[],
                answers:[],
                dates: []
            }
        },
        methods: {
    getUserDetails() {
      let user = JSON.parse(localStorage.getItem("user"));
      //let decoded = VueJwtDecode.decode(token);
      //console.log(decoded)
      this.user = user.user;
      //this.questionnaires= this.user.questionnaires;
      //let user= this.user;
      console.log(user);
    },
    logUserOut() {
      localStorage.removeItem("user");
      this.$router.push("/");
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
                        for ( let i=0; i < answers.length; i++) {
                          if (this.answers[i].datePassage) {
                            let answerDate = this.answers[i].datePassage
                            let date = answerDate.getDate(); +"/" + answerDate.getMonth(); + "/" + answerDate.getFullYear();
                            this.dates.push(date)
                          }
                          else {
                            let date = 0;
                            this.dates.push(date)
                          }
                          
                          console.log(this.dates);
                        }
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