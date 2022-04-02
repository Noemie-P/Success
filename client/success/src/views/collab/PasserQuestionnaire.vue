<template>
<div type="questionnaireAPasser">
    <QCM :questions="questions" :currQuestion2="currQuestion" :question2="question" :user="user" :questionnaire2="questionnaire"/>
</div>
</template>

<script>
import QCM from '../../components/questions/QCM.vue'
export default {
    components: {QCM},
    name:"PasserQuestionnaire",
    data() {
        return {
            isQCM: false,
            isFreeAnswer: false
        }
    },
    created: function() {
        if (!this.$route.params.questions) {
                alert("Liste des questions impossible à récupérer")
                this.$router.push({name: "rejoindreQuestionnaire"})
            } else {
                this.questions = this.$route.params.questions
                this.user = this.$route.params.user
                this.questionnaire = this.$route.params.questionnaire
                let question= this.$route.params.questions
                console.log(question)
                this.currQuestion = this.$route.params.currQuestion
                this.nextQuestion = this.currQuestion + 1
                this.question = this.questions[this.currQuestion]
    
                // Define type
                this.isQCM = (this.question.question_type == "QCM") ? true : false
                this.isFreeAnswer = (this.question.question_type == "reponselibre") ? true : false
            }
    }
}
</script>