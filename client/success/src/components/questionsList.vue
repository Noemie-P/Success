<template>
    <div class="questionsList">
        <h1>Questions de {{name}}</h1>
        <table>
            <tr>
                <th>Enonce</th>
                <th>Type</th>
                <th>Note</th>
                <th>Temps</th>
                <th>Réponses</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(question, k) in questions" :key="k">
                <td>
                    {{question.question_enonce}}
                </td>
                <td>
                    {{question.question_type}}
                </td>
                <td>
                    {{question.question_note}}
                </td>
                <td>
                    {{question.question_time}}
                </td>
                <td>
                    <div v-for="(answer,i) in question.question_answers" :key="i">
                        <label>{{answer.name}}&nbsp;</label>
                    </div>
                </td>
                <td>
                    <button @click="updateQuestion(k)">Modifier</button>
                    <img src="../assets/delete.png" alt="supprimer" @click="deleteQuestion(k)" height="30px" width="30px"/>
                </td>
            </tr>
        </table>
        <button @click="displayForm">Ajouter une question</button>
        <div id="addQuestion" hidden>
            <form @submit.prevent="handleSubmitForm">
                <label for="question_enonce">Enoncé de la question</label><br>
            <input type="text" name="question_enonce" v-model="question.question_enonce"><br>
            <label for="question_type">Type de question</label><br>
            <select name="question_type" id="question_type" v-model="question.question_type" v-on:click="chooseResponse">
                <option value="QCM">QCM</option> 
                <option value="reponselibre">Réponse libre</option>
            </select><br>
            <label for="question_note">Points de la question</label><br>
            <input type="number" name="question_note" v-model="question.question_note"><br>
            <label for="question_time">Temps pour répondre à la question</label><br>
            <input type="datetime" name="question_time" v-model="question.question_time"><br><hr>
            <div name="QCM" id="QCM"  hidden>
                    <div id="addResponse" v-for="(answer,i) in answers" :key="i" v-bind="answers">
                    <label>Réponse {{i+1}}</label>
                    <input type="text" class="form_control" v-model="answer.name">
                    <label>Est-elle correcte?</label><br>
                    <input type="radio" :name="'reponse['+i+']'" :id="'reponse['+i+']'" value="bonne_reponse" v-model="answer.isGood">
                    <label for="bonne_reponse">Oui</label>
                    <input type="radio" :name="'reponse['+i+']'" :id="'reponse['+i+']'" value="mauvaise_reponse" v-model="answer.isGood">
                    <label for="mauvaise_reponse">Non</label><br>
                    <span>
                        <i class="fas fa-minus-circle" @click="remove(i)" v-show="i || ( !i && answers.length > 1)"></i>
                        <i class="fas fa-plus-circle" @click="add(i)" v-show="i == answers.length-1"></i>
                    </span>
                    
                </div>
                <input type="button" name="ajouterReponse" value="Ajouter une réponse" v-on:click="addResponse"/>
                </div>
                <div name="reponseLibre" id="reponseLibre" hidden>
                    <label for="reponseLibretext">Réponse libre</label><br>
                    <textarea name="reponseLibre" id="reponseLibretext" v-model="answer"></textarea>
                </div>
                <button>Créer</button>
            </form>
        </div>
    </div>
</template>

<script>
import config from "../../config/env"
export default {
    name:"questionsList",
    data(){
        return {
            questions:[{
                question_enonce:"",

            }],
            question:{},
            answers:[],
            answer:""
        }
    },
    created() {
        this.getQuestions();
    },
    methods:{
        handleSubmitForm() {

                let i =0;
                for (i in this.answers) {
                    //let response = document.getElementById("reponse["+i+"]");
                    var getSelectedValue = document.querySelector( 'input[name="reponse['+i+']"]:checked')
                    console.log(getSelectedValue);
                    if (getSelectedValue != null) {
                        //let value = document.getElementById("reponse["+i+"]").value;
                        //console.log(value);
                        if (getSelectedValue.value == "bonne_reponse"){
                        this.answers[i].isGood = true
                        console.log(this.answers[i].isGood)
                        }
                        else if (getSelectedValue.value == "mauvaise_reponse"){
                            this.answers[i].isGood = false
                            console.log(this.answers[i].isGood)
                        }
                   }
                    
                }

                if (this.answer != "") {
                    this.answers.push({name: this.answer});
                }

                const requestOptQuestionnaire = {
                            method: "POST",
                            body: JSON.stringify({"question": this.question, "answers":this.answers, "categoryID":this.id}),
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch(config.VUE_APP_BASE_URL + "/creerQuestions", requestOptQuestionnaire)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        document.getElementById("addQuestion").hidden = true;
                        this.getQuestions();
                        });

                   
            },
        getQuestions(){
            if (this.$route.params.id && this.$route.params.name) {
                    this.id = this.$route.params.id;
                    this.name = this.$route.params.name;
                    const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };
                    let id =this.id
                    console.log(id)
                fetch("http://localhost:3000/getQuestionsFromCategory/"+id, requestOpt)
                        .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.questions=jdata
                            let questions= this.questions;
                            console.log(questions);
                            }));
                        })
                    .catch((error) => { console.log("error", error); });
            }
        },
        displayForm() {
            document.getElementById("addQuestion").hidden = false;
        },
        chooseResponse: function () {
                    let  question= this.questions
                    console.log(question)
                    const response = document.getElementById("question_type").value;
                    if (response == "QCM") {
                        //this.type.QCM =true;
                        //this.type.reponselibre=false;
                        document.getElementById("QCM").hidden = false;
                        document.getElementById("reponseLibre").hidden = true;
                    }
                    else if (response == "reponselibre") {
                        //this.type.QCM =false;
                        //this.type.reponselibre=true;
                        document.getElementById("QCM").hidden = true;
                        document.getElementById("reponseLibre").hidden = false;
                    }
        },

        updateQuestion(k) {
            let id = this.questions[k]._id;
            this.$router.push({name: "UpdateQuestion", params: {id: id}});
        },

        deleteQuestion(k) {
            let id = this.questions[k]._id 
                console.log(id);
                const requestOpt= {
                        method: "DELETE",
                        body: JSON.stringify({"id": id}),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
            
             fetch(config.VUE_APP_BASE_URL + "/deleteQuestion/"+id, requestOpt)
                    .then((response) => {
                        response.text();
                    })
                    .catch((error) => { console.log("error", error); });
                alert("Question supprimée!")
                this.getQuestions();
        },

        addResponse() {
            this.answers.push({name:''});
        }
    }
}
</script>
