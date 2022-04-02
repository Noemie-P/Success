<template>
    <div class="updateQuestion">
        <h1>Modifier une question</h1>
        <form @submit.prevent="handleSubmitForm">
                <label for="question_enonce">Enoncé de la question</label><br>
            <input type="text" name="question_enonce" v-model="question.question_enonce" v-bind="question.question_enonce"><br>
            <label for="question_type">Type de question</label><br>
            <select name="question_type" id="question_type" v-model="question.question_type" v-bind="question.question_type" v-on:click="chooseResponse" selected>
                <option value="QCM">QCM</option> 
                <option value="reponselibre">Réponse libre</option>
            </select><br>
            <label for="question_note">Points de la question</label><br>
            <input type="number" name="question_note" v-model="question.question_note" v-bind="question.question_note"><br>
            <label for="question_time">Temps pour répondre à la question</label><br>
            <input type="datetime" name="question_time" v-model="question.question_time" v-bind="question.question_time"><br><hr>
            <div name="QCM" id="QCM"  hidden>
                    <div id="addResponse" v-for="(answer,i) in answers" :key="i" v-bind="answers">
                    <label>Réponse {{i+1}}</label>
                    <input type="text" class="form_control" v-model="answer.name" v-bind="question.question_answers[i].name">
                    <label>Est-elle correcte?</label><br>
                    <input type="radio" :name="'reponse['+i+']'" :id="'reponse['+i+']'" value="bonne_reponse" v-model="answer.isGood" v-bind="question.question_answers[i].isGood">
                    <label for="bonne_reponse">Oui</label>
                    <input type="radio" :name="'reponse['+i+']'" :id="'reponse['+i+']'" value="mauvaise_reponse" v-model="answer.isGood" v-bind="question.question_answers[i].isGood">
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
                    <textarea name="reponseLibre" id="reponseLibretext" v-model="answer.name" v-bind="question.question_answers"></textarea>
                </div>
                <button>Modifier</button>
            </form>
    </div>
</template>

<script>
import config from "../../config/env"
    export default {
        name:"updateQuestion",

        data() {
            return {
                question:{},
                answers:[{
                    name:"",
                    isGood:""
                }],
                answer:{
                    name:"",
                    isGood:""
                },
            }
        },

        created() {
            this.getQuestion();
        },

        methods: {
            getQuestion() {
                //this.loading=true;
                this.user={};
                if (this.$route.params.id) {
                    this.id = this.$route.params.id
                    const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };
                    let id =this.id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/getQuestion/"+ id, requestOpt)
                        .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.question=jdata
                            let question= this.question;
                            console.log(question);
                            //this.loading = false;
                            //this.page=true
                            }));
                        })
                    .catch((error) => { console.log("error", error); });
                }
            },
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
                console.log(this.response);
                if (this.response == "reponselibre") {
                    this.answers.push(this.answer);
                    console.log(this.answers)
                }

                const requestOpt= {
                        method: "PUT",
                        body: JSON.stringify({"question":this.question, "answers":this.answers}),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                let id =this.id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/updateQuestion/"+id, requestOpt)
                    
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        })
                    .catch((error) => { console.log("error", error); });
            },

           addResponse() {
                this.answers.push({name:''});
            },
            
            chooseResponse: function () {
                    let  question= this.questions
                    console.log(question)
                    const response = document.getElementById("question_type").value;
                    this.response = response;
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
        }
    }

</script>