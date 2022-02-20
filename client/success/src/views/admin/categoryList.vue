<template>
    <div class="categoryList">
        <h1>Liste des catégories</h1>
        <div class="flex-container">
        <div class="flex-column">
        <table id="categoryTable" class="bigTable">
                <tr>
                    <th>Nom</th>
                    <th>Nombre de questions</th>
                    <th>Liste questions</th>
                    <th>Actions</th>
                </tr>

                <tr v-for="(category,k) in categories" :key="k">
                    <td>
                        <span>
                            {{category.name}}
                        </span>
                    </td>
                    <td>
                        <span>
                            {{lengthAll[k]}}
                        </span>
                    </td>
                    <td>
                        <span>
                            <button @click="goToQuestionsList(k)">Liste questions</button>
                        </span>
                    </td>
                    <td>
                        <button @click="updateCategory(k)">Modifier</button>
                        <img src="../../assets/delete.png" alt="supprimer" @click="deleteCategory(k)" height="30px" width="30px"/>
                        <!--<button @click="deleteCategory(k)">Supprimer</button>-->
                    </td>
                </tr>
            </table>
        </div>
        <div class="flex-column">
            <div class="changeCategory" v-if="changeCategory" >
                <form @submit.prevent= "handleSubmitForm"> 
                    <label for="name">Nom de la catégorie</label>
                    <input type="text" class="name" v-bind="category.name" v-model="category.name"/><br>
                    <button>Valider</button>
                </form>
                {{category}}
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import config from "../../../config/env"
    export default {
        name:"CategoryList",
        data(){
            return {
                categories: [],
                changeCategory:false,
                category:{
                    name:""
                },
                length:{},
                lengthAll:[]
            }
        },
        created() {
            this.getCategories();
        },
        methods: {
            getCategories() {
                const requestOpt = {
                            method: "GET",
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch(config.VUE_APP_BASE_URL + "/getCategory", requestOpt)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        this.categories = JSON.parse(result);
                        this.getNumberOfQuestions();
                        });
            },

            getNumberOfQuestions() {
                
                for (let i = 0; i < this.categories.length; i++) {
                    let id= this.categories[i]._id 
                    const requestOpt = {
                                method: "GET",
                                headers: { 'Content-type': 'application/json; charset=UTF-8' }
                            };
                            fetch(config.VUE_APP_BASE_URL + "/getQuestionsFromCategory/" +id, requestOpt)
                        .then((response) => response.text())
                        .then(result => {
                            console.log(result);
                            let category = JSON.parse(result);
                            console.log(category);
                            this.length[i] = category.length;
                            console.log(category.length);
                            this.lengthAll.push(this.length[i]);
                            console.log(this.lengthAll)
                            });
                } 
            },

            deleteCategory(k) {
                let id = this.categories[k]._id 
                console.log(id);
                const requestOpt= {
                        method: "DELETE",
                        body: JSON.stringify({"id": id}),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
            
             fetch(config.VUE_APP_BASE_URL + "/deleteCategory/"+id, requestOpt)
                    .then((response) => {
                        response.text();
                    })
                    .catch((error) => { console.log("error", error); });
            },
            updateCategory(k) {
                let id = this.categories[k]._id 
               // console.log(id);
                const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
            
             fetch(config.VUE_APP_BASE_URL + "/getCategory/"+id, requestOpt)
                    .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.category=jdata
                            let category= this.category;
                            console.log(category);
                            this.changeCategory = true;
                            }));
                        })
                    .catch((error) => { console.log("error", error); });
                    
            },
            goToQuestionsList(k){
                let id = this.categories[k]._id;
                let name = this.categories[k].name;
                this.$router.push({name:"questionsList", params: {id: id, name: name}})
            },
            handleSubmitForm() {
                const requestOpt= {
                        method: "PUT",
                        body: JSON.stringify(this.category),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                let id =this.category._id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/updateCategory/"+id, requestOpt)
                    
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        this.getCategories();
                        this.changeCategory = false;
                        })
                    .catch((error) => { console.log("error", error); });
            }
        }
    }
</script>