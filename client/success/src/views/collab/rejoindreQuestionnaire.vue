<template>
    <div class="rejoindreQuestionnaire">
        <form>
            <label for="code">Entrer le code du Questionnaire</label>
            <input type="number" name="code" v-model="questionnaireCode" >
            <button @click="sendCode">Valider</button>
        </form>
        <br>
        <hr>
        <br>
        <div class="passedSurveys">
            <passed-surveys/>
        </div>
    </div>
</template>

<script>
import PassedSurveys from "../../components/questions/answers.vue";
//import VueJwtDecode from "vue-jwt-decode";
import config from "../../../config/env";
    export default {
        name:"rejoindreQuestionnaire",
        components:{PassedSurveys},
        data() {
            return{
                questionnaireCode:'',
                user:{}
            }
        },
        created() {
                let user = JSON.parse(localStorage.getItem("user"));
                //let decoded = VueJwtDecode.decode(token);
                //console.log(decoded)
                this.user = user.user;
                //this.questionnaires= this.user.questionnaires;
                //let user= this.user;
                console.log(user);
        },
        methods: {
            sendCode: function(event){
                const requestOpt= {
                    method: "POST",
                    body: JSON.stringify({"questionnaireCode": this.questionnaireCode}),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                event.preventDefault();
                fetch(config.VUE_APP_BASE_URL + "/validerCode", requestOpt)
                    .then((response) => response.text())
                    .then(response => {
                        console.log(response)
                        //console.log(data)
                        var jdata= JSON.parse(response)
                        this.isCodeGood = jdata.isCodeGood
                        this.questionnaireData = jdata.questionnaireData
                        console.log(jdata.isCodeGood)
                        console.log(jdata.questionnaireData.questions)
                        if (this.questionnaireData.groupe._id==this.user.groupe){
                            this.goToSurvey()
                        }
                        else {
                            alert("Vous n'êtes pas autorisé à passer ce questionnaire")
                        }
                        
                    })
                   // .then((data)=> {
                        //console.log(data)
                       // var jdata = JSON.parse(data)
                        
                    //})
                    .catch((error) => { console.log("error", error); })
            },
            goToSurvey: function() {
                    this.$router.push({name:"InfoQuestionnaire", params: {questionnaireData: this.questionnaireData, user:this.user}})
            }
        }
    }
</script>
