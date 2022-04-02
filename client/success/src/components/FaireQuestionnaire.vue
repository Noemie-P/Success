<template>
  <div class="questionnaire">
    <!--<qcm: :questions="questions" :currQuestion2="currQuestion" :question2="question" v-if="isQCM"/>-->
            <span v-bind="questions" style="color: var(--gray);">{{ this.question[1].question_enonce }}</span>
            <hr>

    <div v-bind="questions" class="form-check" v-cloak v-for="v in questions.question_answers" :key="v.id">
                        <input :value="v.id" v-model="answer" class="form-check-input" type="radio" name="formCheck-1">
                        <label :value="v.id" class="form-check-label" for="formCheck-1">{{ v.answer_name }}</label>
    </div>


  </div>
</template>

<script>
    import config from "../../config/env";
    export default {
        name: "FaireQuestionnaire",
        data: function() {
            return {
                questions:{
                    _id:"",
                    question_enonce: "",
                    question_type:"",
                    question_note:"",
                    question_time:"",
                    question_id_questionnaire:"",
                    question_answers:{
                        answer_name:"",
                        answer_is_good:""
                    }
                },
                answer:{
                    answer_name:""
                }
                 }
        },
               /*created() {
                    const headers = { "Content-Type": "application/json" };
                    // Simple GET request using fetch
                    fetch("http://localhost:3000/faireQuestionnaire", {headers})
                        .then((response) => response.json())
                        .then(data => (this.questions = data))
                },*/

                /*loadAxiosTransactions(){
                    fetch( 'http://localhost:3000/faireQuestionnaire')
                        .then( function( response ){
                            if( response.status != 200 ){
                                console.log( response.status );
                            }else{
                                response.json().then( function( data ){
                                    this.response = data;
                                    console.log(this);
                                }.bind(this));
                            }
                        }.bind(this))*/

                    created(){
                        const requestOpt = {
                            method: "GET",
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch(config.VUE_APP_BASE_URL + "/faireQuestionnaire", requestOpt)
                    .then((response) => response.text())
                    .then((result) => {
                        this.questions = JSON.parse(result);
                        console.log(result)
                    });
                }
        }
</script>