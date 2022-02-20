<template>
    <div class="QCM">
        <h1 v-bind="currQuestion">Question {{currQuestion+1}}</h1>
        <span v-bind="question">Enonce: {{ question.question_enonce }}</span>

        <div v-if="question.question_type == 'QCM'">
            <div v-bind="question" class="form-check" v-cloak v-for="(list,k) in question.question_answers" :key="k">
                <input :id="'response['+k+']'" :value="list.name" v-model="answer" class="form-check-input" type="radio" name="formCheck-1">
                <label :id="'response['+k+']'" class="form-check-label" for="formCheck-1">{{ list.name }}</label>
            </div>
        </div>
        <div v-if="question.question_type == 'reponselibre'">
                    <input type="text" id="freeResponse" v-model="answer"/>
        </div>
        <button @click="checkAnswer">Question suivante</button>
        <span hidden id="noAnswer" style="color: var(--danger)">
            Aucune réponse choisie
        </span>

    </div>
</template>

<script>
import config from "../../../config/env"
export default {
   name:"QCM",
   data() {
       return {
           answer:"",
           answers:[],
           note:null,
           noteTotal:null,
           goodAnswer:"",
           "question":this.question2,
           "currQuestion":this.currQuestion2,
           "userToPass":this.user,
           "questionnaire": this.questionnaire2,
           datePassage: new Date()
       }
   },
   props: {
       "question2":Object,
       "currQuestion2":Number,
       "questions": Array,
       "user":Object,
       "questionnaire2":Object
   },

    methods: {
        checkAnswer: function() {
            document.getElementById("noAnswer").hidden = true

            // Checking if answer is set
            if (this.answer == "") {
                console.log("Aucune réponse")
                document.getElementById("noAnswer").hidden = false
                return
            }
            if (this.question.question_type == "QCM") {
                let k =0;
                    for (k in this.question.question_answers) {
                    let check = document.getElementById('response['+k+']');
                    if (check.checked== true){
                        let value= document.getElementById('response['+k+']').value;
                        console.log(check);
                        console.log(value);
                        if (this.question.question_answers[k].isGood==true) {
                            this.note += this.question.question_note;
                            let questionNote = this.question.question_note
                            let note= this.note;
                            console.log("Bonne réponse!");
                            console.log(note);
                            console.log(questionNote);
                        }
                    }
                    else {
                        console.log("non");
                        console.log(k);
                    }
                    console.log(this.question.question_answers[k].isGood);
                    if (this.question.question_answers[k].isGood==true) {
                        let goodAnswer = this.question.question_answers[k].name;
                        this.goodAnswer =goodAnswer;
                        console.log("goodAnswer: "+goodAnswer)
                    }
                    }
                    
                    this.noteTotal += this.question.question_note;
                    let noteTotal= this.noteTotal;
                    console.log("noteTotal:"+noteTotal);
                    this.answers.push({answer:this.answer, question:this.question.question_enonce, goodAnswer:this.goodAnswer});
                let tableau = this.answers;
                console.log(tableau);
            }
            else if (this.question.question_type == "reponselibre") {
                this.noteTotal += this.question.question_note;
                this.answer = document.getElementById("freeResponse").value;
                this.answers.push({answer:this.answer, question:this.question.question_enonce});
                let tableau = this.answers;
                console.log(tableau);
                this.questionnaire.statut = "A corriger";
            }

            // Checking if survey will be ended next questio
            if (this.currQuestion+1 >= this.questions.length) {
                console.log("Terminé");
                const requestOpt = {
                method: "POST",
                body: JSON.stringify({"questionnaireID": this.questionnaire._id, "note":this.note, "noteTotal":this.noteTotal, "answers": this.answers, "userID":this.userToPass._id, "questionnaireStatut":this.questionnaire.statut, "datePassage": this.datePassage}),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            };

            fetch(config.VUE_APP_BASE_URL + "/saveAnswer", requestOpt)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => { console.log("error", error); })
                this.$router.push({name: "FinQuestionnaire"})
                return
            }

            // Saving Answer
            /*const requestOpt = {
                method: "POST",
                body: JSON.stringify({"questionnaire": this.questionnaire._id, "question":this.question, "answerID": this.answer, "userID":this.userToPass._id}),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            };

            fetch("http://localhost:3000/saveAnswer", requestOpt)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => { console.log("error", error); })
            */
           
            // +1 question
            this.currQuestion++

            // Define next question
            this.question = this.questions[this.currQuestion]
            this.answer = ""
        }
    }
}
</script>
