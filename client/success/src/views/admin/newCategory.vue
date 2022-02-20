<template>
    <div class="newCategory">
        <h1>Nouvelle catégorie</h1>
        <form @submit.prevent="addCategory">
            <label for="categoryName">Nom de la catégorie</label>
            <input type="text" name="categoryName" v-model="category.name"/>

            <button>Enregistrer</button>
        </form>
    </div>
</template>
<script>
import config from "../../../config/env";

export default {
   name:"NewCategory",
   data(){
       return {
           category: {
               name:"",
               id_questions:""
           }
       };
   },
   methods: {
    addCategory() {
        const requestOpt={
            method: "POST",
                body: JSON.stringify({"category":this.category}),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
        };
        fetch(config.VUE_APP_BASE_URL + "/creercategorie", requestOpt)
            .then((response) => response.text())
            .then(result => {
                console.log(result);
                this.alert();
                });
    },
    alert() {
        alert("Nouvelle catégorie enregistrée!");
        this.resetForm();
        
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
                return false;
            }
   }
}
</script>
