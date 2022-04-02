<template>
    <div class="dashboardAdmin">
        <div class="flex-container">
            <div class="flex-column">
                <h2>Moyenne des évaluations</h2>
                <span>{{moyenne}}/20</span>
            </div>
            <div class="flex-column">
                <h2>Meilleure note</h2>
                <span>{{bestAnswer.note}}/{{bestAnswer.noteTotal}}</span><br>
                <span>{{bestAnswer.id_user.user_name}}</span>
            </div>
        </div>
    </div>
</template>

<script>

import config from "../../config/env";
export default {
    name:"dashboardAdmin",
    data() {
        return {
            answers:[],
            tableMoyenne : [],
            moyenne : null,
            bestAnswer: {}
        }
    },

    props: {
       "user":Object
   },

   created() {
       this.getAnswers();
   },

   methods: {
        getAnswers() {  
           const requestOpt = {
                method: "GET",
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            };
            fetch(config.VUE_APP_BASE_URL + "/getAllAnswers", requestOpt)
        .then((response) => response.text())
        .then(result => {
            console.log(result);
            let jdata = JSON.parse(result);
            console.log(jdata);
            this.answers = jdata;
            let sortAnswers = jdata.sort((a, b) => b.note - a.note);
            this.bestAnswer = sortAnswers[0]
            this.noteSurVingt();
            });
       },
       noteSurVingt() {
           for (let i = 0; i < this.answers.length; i++){
               let result = this.answers[i].note * 20 / this.answers[i].noteTotal;
               console.log(result);
               this.tableMoyenne.push({result: result})
           }
            this.moyenne= this.calculMoyenne(this.tableMoyenne);
       },
       calculMoyenne: function(table) {
           var length = table.length,
           somme = 0,i;
           for(i = 0; i < length; i++) {
               somme += table[i].result;
           }
            return somme.toFixed(1)/length;
       }
   }
}
</script>