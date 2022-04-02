<template>
    <div class="formCreationQuestionnaire">
        <h1>Créer un questionnaire</h1>
        <form @submit.prevent= "handleSubmitForm">
            <label for="questionnaire_name">Nom du Questionnaire</label><br>
            <input type="text" name="questionnaire_name" v-model="questionnaires.questionnaire_name"><br>
            <label for="code">Code</label><br>
            <input type="text" name="code" v-model="questionnaires.code"><hr>
            <button>Créer</button>
        </form>
    </div>
</template>
<script>
import config from "../../config/env"
    export default {
        name: "QuestionnaireForm",
        data() {
            return {
                questionnaires: {
                   questionnaire_name: "",
                   code:""
                }
            }
        },
        methods: {
            handleSubmitForm() {
                const requestOptQuestionnaire = {
                            method: "POST",
                            body: JSON.stringify({"questionnaires": this.questionnaires}),
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch(config.VUE_APP_BASE_URL + "/creerQuestionnaire", requestOptQuestionnaire)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        this.creerQuestions();
                        });

                   
            }
        }
    }
</script>