<template>
    <div class="creerQuestion">
        <h1>Créer une question</h1>
         <form @submit.prevent= "handleSubmitForm">
             <select name="questionnaire" id="questionnaire" >
                 <option value="" selected disabled>Questionnaire</option>
                 <option v-for="(questionnaire, k) in questionnaires" :value="questionnaire._id" :key="k">{{questionnaire.questionnaire_name}}</option>
             </select><br><br>
             <select name="category" id="category" >
                 <option value="" selected disabled>Catégorie</option>
                 <option v-for="(category, k) in categories" :value="category._id" :key="k">{{category.name}}</option>
             </select><br>
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
                    <input type="text" class="form_control" v-model="answer.name"><br>
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
                    <textarea name="reponseLibre" id="reponseLibretext"></textarea>
                </div>
                <button>Créer</button>
         </form>
    </div>
</template>

<script>
import config from "../../../config/env";
    export default {
        name: "CreerQuestion",
        data() {
            return {
                questionnaires:[],
                questionnaireID:"",
                question:{},
                categories:[],
                categoryID:"",
                answers:[
                    {
                        name:'',
                        isGood:''
                    }
                ]
            }
        },
        created () {
            const requestOpt = {
                            method: "GET",
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch(config.VUE_APP_BASE_URL + "/getQuestionnaire", requestOpt)
                    .then((response) => response.text())
                    .then(result => {
                        let jdata=JSON.parse(result);
                        this.questionnaires=jdata
                        console.log(jdata);
                        });
            const requestOptCategory = {
                            method: "GET",
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch(config.VUE_APP_BASE_URL + "/getCategory", requestOptCategory)
                    .then((response) => response.text())
                    .then(result => {
                        let jdata=JSON.parse(result);
                        this.categories=jdata
                        console.log(jdata);
                        });
        },
        methods: {
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
    
                this.questionnaireID = document.getElementById("questionnaire").value;
                this.categoryID = document.getElementById("category").value

               const requestOptQuestionnaire = {
                            method: "POST",
                            body: JSON.stringify({"question": this.question, "answers":this.answers, "questionnaireID":this.questionnaireID, "categoryID":this.categoryID}),
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch(config.VUE_APP_BASE_URL + "/creerQuestions", requestOptQuestionnaire)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        });

                   
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
            addResponse() {
                this.answers.push({name:''});
            },
        }

    }
</script>