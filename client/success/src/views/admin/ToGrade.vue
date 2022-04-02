<template>
    <div class="ToGrade">
        <h1>Correction</h1>
        <form @submit.prevent= "handleSubmitForm">
        <div v-for="(answer,k) in submitAnswers.answers" :key="k">
            <h2>{{answer.question}}</h2>
            <div v-for="(question, i) in questions" :key="i">
                <div v-if="question.question_enonce == answer.question">
                    <div v-if="question.question_type == 'QCM'" >
                        <div v-for="(questionAnswer, j) in questions[i].question_answers" :key="j" class="alignCenter">
                            <span>Réponse {{j+1}}</span>
                            <div v-if="questionAnswer.name == answer.answer" class="green">
                                {{questionAnswer.name}}
                            </div>
                            <div v-else-if=" answer.answer != questionAnswer.name && answer.goodAnswer == questionAnswer.name" class="red">
                                {{questionAnswer.name}}
                            </div>
                            <div v-else class="grey">
                                {{questionAnswer.name}}
                            </div>
                        </div>
                    </div>
                    <div v-if="question.question_type == 'reponselibre'">
                        <div class="grey">{{answer.answer}}</div><br>
                        <span>Est-ce une bonne réponse?</span>
                        <input type="radio" :name="'reponse['+k+']['+i+']'" :id="'reponse['+k+']['+i+']'" value="bonne_reponse" v-model="answer.isGood">
                        <label for="bonne_reponse">Oui</label>
                        <input type="radio" :name="'reponse['+k+']['+i+']'" :id="'reponse['+k+']['+i+']'" value="mauvaise_reponse" v-model="answer.isGood">
                        <label for="mauvaise_reponse">Non</label>
                    </div>
                </div>
            </div>
        </div>
        <button>Enregistrer</button>
        </form>
    </div>
</template>

<script>
import config from "../../../config/env";

export default {
    name:"ToGrade",
    data() {
        return {
            questionAnswer:{},
            questions:[],
            submitAnswers:[],
        }
    },
    created() {
        this.submitAnswers = this.$route.params.questionnaire

        const requestOpt= {
                        method: "GET",
                        //body: JSON.stringify(this.user),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                let id =this.submitAnswers.id_questionnaire.categorie
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/getQuestionsFromCategory/"+id, requestOpt)
                    
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        let jdata= JSON.parse(result);
                            this.questions=jdata
                        })
                    .catch((error) => { console.log("error", error); });
        
    },

    methods: {
        handleSubmitForm() {
                let k =0;
                let i =0;
                for (k in this.submitAnswers.answers) {
                    for(i in this.questions) {
                                //let response = document.getElementById("reponse["+i+"]");
                            var getSelectedValue = document.querySelector( 'input[name="reponse['+k+']['+i+']"]:checked')
                            console.log(getSelectedValue);
                            if (getSelectedValue != null) {
                                //let value = document.getElementById("reponse["+i+"]").value;
                                //console.log(value);
                                if (getSelectedValue.value == "bonne_reponse"){
                                this.submitAnswers.note += this.questions[i].question_note;
                                let note = this.questions[i].question_note
                                console.log(note)
                                }
                        }
                    }                  
                }
                this.submitAnswers.statut="Terminé";
    
                
               const requestOpt = {
                            method: "PUT",
                            body: JSON.stringify({"answerID": this.submitAnswers._id, "note":this.submitAnswers.note, "questionnaireStatut":this.submitAnswers.statut}),
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch(config.VUE_APP_BASE_URL + "/GradeQuestionnaire", requestOpt)
                        .then((response) => {
                                response.text()
                                .then(result => {
                                    console.log(result);
                                })
                            });

                   
            }
    }
}
</script>
