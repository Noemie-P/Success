<template>
    <div class="infoQuestionnaire" id="InfoQuestionnaire">
        <h1>{{this.questionnaire.questionnaire_name}}</h1>
        <span> {{ this.questions ? (this.questions).length : "0"}} question(s) </span><br>
        <span>Catégorie: {{questionnaire.categorie.name}}</span><br>
        <span>Groupe: {{questionnaire.groupe.name}}</span><br>
        <button @click="chercherQuestions" >Rejoindre</button>
    </div>
</template>
<script>
//import VueJwtDecode from "vue-jwt-decode";
import config from "../../../config/env";
export default{
    name:"InfoQuestionnaire",
    data: function(){
        return  {
            questionnaire: Object,
            questions:[]
        }
    },

    mounted: function() {
        this.questionnaire = this.$route.params.questionnaireData;
        this.user = this.$route.params.user;
        let questionnaire =this.questionnaire;
        console.log(questionnaire.categorie);
        let id= this.questionnaire.categorie._id;
        const requestOpt = {
                    method: "GET",
                    //body: JSON.stringify({"questionnaireID": this.questionnaire.questions}),
                    //body: JSON.stringify({"categorieID": this.questionnaire.categorie._id}),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
            
                fetch(config.VUE_APP_BASE_URL + "/getQuestionsFromCategory/"+id, requestOpt)
                    .then((response) => response.text())
                    .then((result) => {
                        var jResult = JSON.parse(result)
                        this.questions = jResult
                        console.log(jResult)
                    })
                    .catch((error) => { console.log("error", error); })
    },

    created (){

    },
    methods:{
        chercherQuestions: function () {
            const requestOpt = {
                    method: "POST",
                    //body: JSON.stringify({"questionnaireID": this.questionnaire.questions}),
                    body: JSON.stringify({"categorieID": this.questionnaire.categorie}),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
            
                fetch(config.VUE_APP_BASE_URL + "/faireQuestionnaire", requestOpt)
                    .then((response) => response.text())
                    .then((result) => {
                        var jResult = JSON.parse(result)
                        this.questionnaire.questionsList = jResult
                        console.log(jResult)
                        if (jResult.length > 0) {
                            this.goToQuestions();
                        } else {
                            console.log("Erreur... Aucune questions trouvées")
                        }
                    })
                    .catch((error) => { console.log("error", error); })
        },

        goToQuestions: function() {
                this.questionnaire.shuffledQuestionsList = shuffle(this.questionnaire.questionsList);

                this.$router.push({name: "PasserQuestionnaire", params: {questions: this.questionnaire.shuffledQuestionsList, currQuestion: 0, user:this.user, questionnaire:this.questionnaire}})
        }/*,
        getUserDetails() {
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            console.log(decoded)
            this.user = decoded.user;
            this.questionnaires= this.user.questionnaires;
            let user= this.user;
            console.log(user);
        }*/
    }
}

function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            console.log(array);
            console.log(randomIndex);

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }


</script>
