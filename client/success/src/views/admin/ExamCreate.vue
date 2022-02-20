<template>
    <div class="createExam">
        <h1>Créer une évaluation</h1>
        <form @submit.prevent="handleSubmitForm">
            <label for="questionnaire">Nom du questionnaire</label>
            <input type="text" id="questionnaire" v-model="questionnaire.questionnaire_name"/>
            <label for="code">Code</label>
            <input type="text" id="code" v-model="questionnaire.code"/>
            <label for="groupe">Groupe</label>
            <select id="groupe">
                <option value="" selected disabled>Groupes</option>
                <option v-for="(group, k) in groups" :value="group._id" :key="k" >{{group.name}}</option>
            </select>
            <label for="categorie">Catégorie</label>
            <select id="categorie">
                <option value="" selected disabled>Catégories</option>
                <option v-for="(category, k) in categories" :value="category._id" :key="k">{{category.name}}</option>
            </select>
            <button>Créer</button>
        </form>
        <div id="success" hidden>
            Evaluation enregistrée!
        </div>
    </div>
</template>

<script>
import config from "../../../config/env";
    export default {
        name:"createExam",
        data() {
            return {
                questionnaire:{},
                categories:[],
                groups:[],
                date: ""
            }
        },
        created() {
            let date = new Date();
            this.date = date.getDate() +"/" + date.getMonth() + "/" +date.getFullYear()
            this.getCategories();
            this.getGroups();
        },
        methods: {
            getCategories() {
                const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };

                fetch(config.VUE_APP_BASE_URL + "/getCategory", requestOpt)
                        .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.categories=jdata
                            let categories= this.categories;
                            console.log(categories);
                            }));
                        })
                    .catch((error) => { console.log("error", error); });
            },
            getGroups () {
                const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };

                fetch(config.VUE_APP_BASE_URL + "/getGroups", requestOpt)
                        .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.groups=jdata
                            let groups= this.groups;
                            console.log(groups);
                            }));
                        })
                    .catch((error) => { console.log("error", error); });
            },
            handleSubmitForm () {
                let groupID = document.getElementById("groupe").value;
                let categoryID = document.getElementById("categorie").value;
                console.log(groupID);
                console.log(categoryID);

                const requestOptQuestionnaire = {
                            method: "POST",
                            body: JSON.stringify({
                                "questionnaires": this.questionnaire, 
                                "dateCreation": this.date, 
                                "categoryID": categoryID, 
                                "groupID": groupID }),
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                fetch(config.VUE_APP_BASE_URL + "/createExam", requestOptQuestionnaire)
                    .then((response) => {
                        response.text();
                        document.getElementById("success").hidden = false;
                        this.resetForm();
                    })
                    .then(result => {
                        console.log(result);
                    });
                

            },
            resetForm() {
                // clearing inputs
                var inputs = document.getElementsByTagName('input');
                for (var i = 0; i<inputs.length; i++) {
                    switch (inputs[i].type) {
                        // case 'hidden':
                        case 'text':
                            inputs[i].value = '';
                            break;
                        case 'radio':
                        case 'checkbox':
                            inputs[i].checked = false;   
                    }
                }

                // clearing selects
                var selects = document.getElementsByTagName('select');
                for (var k = 0; k<selects.length; k++)
                    selects[k].selectedIndex = 0;

                // clearing textarea
                var text= document.getElementsByTagName('textarea');
                for (var j = 0; j<text.length; j++)
                    text[j].innerHTML= '';

                return false;
            }
        }
    }
</script>