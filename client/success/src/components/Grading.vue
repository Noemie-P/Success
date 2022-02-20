<template>
    <div class="grading">
        <h1>{{answer.id_questionnaire.questionnaire_name}}</h1>
        <div v-for="(answer, k) in answer.answers" :key="k">
            <label>Question: {{answer.question}}</label><br>
            <label>Réponse: {{answer.answer}}&nbsp;&nbsp;</label>
            <label>Bonne réponse: {{answer.goodAnswer}}</label>
        </div>
    </div>
</template>
<script>

export default {
    name:"Grading",
    props:{
        answer:Object
    },
    methods:{
        getGrading() {
            if (this.$route.params.answer) {
                this.answer = this.$route.params.answer
            }
        }
    },
    created(){
        this.getGrading();
    }
}

</script>
