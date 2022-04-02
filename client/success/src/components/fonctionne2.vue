<template>
    <div class="formCreationQuestionnaire">
        <h1>Créer un questionnaire</h1>
        <form @submit.prevent= "handleSubmitForm">
            <label for="questionnaire_name">Nom du Questionnaire</label><br>
            <input type="text" name="questionnaire_name" v-model="questionnaires.questionnaire_name"><br>
            <label for="code">Code</label><br>
            <input type="text" name="code" v-model="questionnaires.code"><hr>
            <label>Questions</label><br>
            <div id="addQuestion" v-for="(question,i) in questions" :key="i" v-bind="questions">
                <label>Question {{i}}</label>
                <label for="question_enonce">Enoncé de la question</label><br>
                <input type="text" :name="'question_enonce['+i+']'" class="form_control" v-model="question.question_enonce"><br>
                <label for="question_type">Type de question</label><br>
                <select :name="'question_type['+i+']'" :id="'question_type['+i+']'" v-model="question.question_type" v-on:change="chooseResponse">
                    <option value="QCM" id="QCM" >QCM</option> 
                    <option value="reponselibre" id="reponselibre">Réponse libre</option>
                </select><br>
                <label for="question_note">Points de la question</label><br>
                <input type="number" :name="'question_note['+i+']'" v-model="question.question_note"><br>
                <label for="question_time">Temps pour répondre à la question</label><br>
                <input type="datetime" :name="'question_time['+i+']'" v-model="question.question_time"><br>
                <input type="number" :name="'question_id_questionnaire['+i+']'" v-model="question.question_id_questionnaire"><hr> <!--Jusqu'ici ça fonctionne avec la BDD. Ne plus toucher (voir page fonctionne.vue)-->
                <label>Réponses</label><br>
                <!--<div :name="'QCM['+i+']'" id="QCM"  hidden>-->
                <div :name="'QCM['+i+']'" :id="'QCM['+i+']'" hidden>
                    <div id="addResponse" v-for="(input,k) in inputs" :key="k">
                        <label>Réponse {{k}}</label>
                        <input type="text" class="form_control" v-model="input.name">
                        <label>Est-elle correcte?</label><br>
                        <input type="radio" :name="'bonne_reponse['+k+']'" id="bonne_reponse" v-model="input.isGood">
                        <label for="bonne_reponse">Oui</label>
                        <input type="radio" :name="'bonne_reponse['+k+']'" id="mauvaise_reponse" v-model="input.isGood">
                        <label for="mauvaise_reponse">Non</label><br>
                        <span>
                            <i class="fas fa-minus-circle" @click="remove(k)" v-show="k || ( !k && inputs.length > 1)"></i>
                            <i class="fas fa-plus-circle" @click="add(k)" v-show="k == inputs.length-1"></i>
                        </span>
                    </div>
                    <input type="button" name="ajouterReponse" value="Ajouter une réponse" v-on:click="addResponse"/>
                </div>
                <div :name="'reponseLibre['+i+']'" :id="'reponseLibre['+i+']'" hidden>
                    <label>Réponse libre</label>
                </div>
                <span>
                    <i class="fas fa-minus-circle" @click="remove(i)" v-show="i || ( !i && questions.length > 1)"></i>
                    <i class="fas fa-plus-circle" @click="add(i)" v-show="i == questions.length-1"></i>
                </span>
            </div>
            <input type="button" name="ajouterQuestion" value="Ajouter une question" v-on:click="addQuestion"/>
            <!--<label>Réponses</label><br>
            <label for="réponse">Réponse</label><br>
            <input type="text" name="réponse" v-model="questions.question_answers.answer_name"><br>
            <label>Est-elle correcte?</label><br>
            <input type="radio" name="bonne_reponse" id="bonne_reponse" v-model="questions.question_answers.answer_is_good">
            <label for="bonne_reponse">Oui</label>
            <input type="radio" name="bonne_reponse" id="mauvaise_reponse" v-model="questions.question_answers.answer_is_good">
            <label for="mauvaise_reponse">Non</label><br>-->
            <button>Créer</button>
        </form>
    </div>
</template>

<script>

    export default {
        name:"CreerQuestionnaire",
        data() {
            return {
                questionnaires: {
                   questionnaire_name: '',
                   code:''
                },
                questions:[{
                    question_enonce:'',
                    question_type:'',
                    question_note:'',
                    question_time:'',
                    question_id_questionnaire:''
                }],
                inputs:[
                    {
                        name:'',
                        isGood:''
                    }
                ],
                type:[
                    {
                        QCM:"",
                        reponselibre:""
                    }
                ]
            }
        },
        methods: {
            handleSubmitForm() {
                const requestOptQuestionnaire = {
                            method: "POST",
                            body: JSON.stringify({"questionnaires": this.questionnaires,"questions":this.questions, "inputs": this.inputs}),
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch("http://localhost:3000/creerQuestionnaire", requestOptQuestionnaire)
                    .then((response) => response.text())
                    .then(response => console.log(response))
                    .then(data => (this.users = data))
                    .then(data => console.log(data));

                   /* const requestOptQuestion = {
                            method: "POST",
                            body: JSON.stringify({"questions": this.questions}),
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };

                    fetch("http://localhost:3000/creerQuestionnaire", requestOptQuestion)
                    .then((response) => response.text())
                    .then((result) => {
                        this.questions = JSON.stringify(result);
                        console.log(result)});*/
            },
            chooseResponse: function () {
               let  question= this.questions
               console.log(question)
               let i = 0;

                for (i in this.questions) {
                const response = document.getElementById("question_type["+i+"]").value;
                console.log(response);
                if (response == "QCM") {
                    //this.type.QCM =true;
                    //this.type.reponselibre=false;
                    document.getElementById("QCM["+i+"]").hidden = false;
                    document.getElementById("reponseLibre["+i+"]").hidden = true;
                }
                else if (response == "reponselibre") {
                    //this.type.QCM =false;
                    //this.type.reponselibre=true;
                    document.getElementById("QCM["+i+"]").hidden = true;
                    document.getElementById("reponseLibre["+i+"]").hidden = false;
                }
                }
                
                //const response = document.getElementById("question_type").value;
                //console.log(response);
                
                /*if (response == "QCM") {
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
                }*/
            },
            /*addResponse: function () {
                document.getElementById("addResponse").hidden = false;
            }*/
            addResponse() {
                this.inputs.push({name:''});
            },
            addQuestion() {
                this.questions.push({question_enonce:''})
            }
        }
    }
</script>