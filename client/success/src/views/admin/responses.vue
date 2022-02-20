<template>
    <div class="responses">
        <h1>Réponses de {{questionnaire.questionnaire_name}}</h1>

        <table class="bigTable">
            <tr>
                <th>Collaborateurs</th>
                <th>Note</th>
                <th>Statut</th>
                <th>Correction</th>
            </tr>
            <tr v-for="(result,k) in questionnaireResult" :key="k">
                <td>{{result.id_user.user_name}}</td>
                <td>{{result.note}}/{{result.noteTotal}}</td>
                <td v-if="result.statut=='A corriger'">{{result.statut}}</td>
                <td v-else>Terminé</td>
                <td><button @click="seeGrading(k)">Correction</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import config from "../../../config/env";
    export default {
        name:"Response",
        data() {
            return {
                questionnaire:{},
                questionnaireResult:[]
            }
        },
        created() {
            this.questionnaire = this.$route.params.questionnaire
            this.getPassedUsers();
        },
        methods:{
            getPassedUsers() {
                const requestOpt= {
                        method: "GET",
                        //body: JSON.stringify(this.user),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                let id =this.questionnaire._id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/getUsersFromAnswers/"+id, requestOpt)
                    
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        let jdata= JSON.parse(result);
                            this.questionnaireResult=jdata
                        })
                    .catch((error) => { console.log("error", error); });
            },

            seeGrading(k) {
                let questionnaire = this.questionnaireResult[k];
                this.$router.push({name:"ToGrade", params: {questionnaire: questionnaire}})
            }
        }
    }

</script>
