<template>
    <div class="questionnaireList">
        <div v-if="loading" class="loading">
            Loading...
        </div>
        <div v-if ="questionnaires" class="questionnaires">
            <h1>Liste des questionnaires</h1>
            <table id="questionnaireTable">
                <tr>
                    <th>Nom</th>
                    <!--<th>Nombre Questions</th>-->
                    <th>Date création</th>
                    <th>Réponses</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="(questionnaire,k) in questionnaires" :key="k">
                    <td>
                        <span>
                            {{questionnaire.questionnaire_name}}
                        </span>
                    </td>
                    <!--<td>
                        {{lengthAll[k]}}
                    </td>-->
                    <td>
                        {{questionnaire.dateCreation}}
                    </td>
                    <td>
                        <input type="button" value="Voir réponses" @click="SeeResponse(k)"/>
                    </td>
                    <td>
                        <button>Modifier</button>
                        <img src="../assets/delete.png" alt="supprimer" @click="deleteQuestionnaire(k)" height="30px" width="30px"/>
                        <!--<button @click="deleteUser(k)">Supprimer</button>-->
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import config from "../../config/env"
    export default {
        name:"QuestionnaireList",
        data() {
            return {
                questionnaires:[
                    {
                        questionnaire_name:"",
                        code:"",
                        questions:[]
                    }
                ],
                length:{},
                lengthAll:[]
            }
        },
        created() {
            this.getQuestionnaire();
        },
        methods: {
            getQuestionnaire() {
                this.loading = true;
                this.questionnaires = [];
                const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };

                    fetch(config.VUE_APP_BASE_URL + "/getQuestionnaire", requestOpt)
                        .then((response) => response.text())
                        .then(result => {
                            console.log(result);
                            let jdata= JSON.parse(result);
                            let i=0;
                            for (i in jdata) {
                                this.questionnaires[i] = jdata[i];
                                console.log(jdata[i]);
                            }
                            this.questionnaires =jdata
                            let questionnaires= this.questionnaires;
                            console.log(questionnaires);
                            this.loading = false;
                            //this.getNumberOfQuestions();
                        })
                        .catch((error) => { console.log("error", error); });
            },

            getNumberOfQuestions(){
                console.log(this.questionnaires.length);
                for (let i = 0; i < this.questionnaires.length; i++) {
                    let id= this.questionnaires[i].categorie
                    const requestOpt = {
                                method: "GET",
                                headers: { 'Content-type': 'application/json; charset=UTF-8' }
                            };
                            fetch(config.VUE_APP_BASE_URL + "/getQuestionsFromCategory/" +id, requestOpt)
                        .then((response) => response.text())
                        .then(result => {
                            console.log(result);
                            let questionnaire = JSON.parse(result);
                            console.log(questionnaire);
                            this.length[i] = questionnaire.length;
                            console.log(questionnaire.length);
                            this.lengthAll.push(this.length[i]);
                            console.log(this.lengthAll)
                            });
                }
            },

            deleteQuestionnaire(k) {
                let id = this.questionnaires[k]._id 
                console.log(id);
                const requestOpt= {
                    method: "DELETE",
                    body: JSON.stringify({"id": id}),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
            
             fetch(config.VUE_APP_BASE_URL + "/deleteQuestionnaire/"+id, requestOpt)
                    .then((response) => {
                        response.text();
                    })
                    .catch((error) => { console.log("error", error); });
            },

            SeeResponse(k) {
                let questionnaire = this.questionnaires[k] 
                this.$router.push({name:"Response", params: {questionnaire: questionnaire}})
            }
        }
    }
</script>