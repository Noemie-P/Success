<template>
    <div class="updateUser">
        <div class="loading" v-if="loading">
            Loading
        </div>
        <div class="page" v-if="page">
            <button><router-link to="/groupsList">Retour</router-link></button>
            <form @submit.prevent= "handleSubmitForm"> 
            <label for="groupName">Nom du groupe</label>
            <input type="text" class="userName" v-bind="group.name" v-model="group.name"/>
            <button>Valider</button>
            </form>
        </div>
    </div>
</template>
<script>
import config from "../../../config/env";
    export default {
        name:"UpdateGroup",
 
        data() {
            return {
                id:"",
                loading:false,
                page:false,
                group:{}
            }
        },
        created() {
            this.getGroup();
        },
        methods: {
            getGroup() {
                this.loading=true;
                this.group={};
                if (this.$route.params.id) {
                    this.id = this.$route.params.id
                    const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };
                    let id =this.id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/getOneGroup/"+ id, requestOpt)
                        .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.group=jdata
                            let group= this.group;
                            console.log(group);
                            this.loading = false;
                            this.page=true
                            }));

                        })
                    .catch((error) => { console.log("error", error); });
                }
            },
            handleSubmitForm() {
                const requestOpt= {
                        method: "PUT",
                        body: JSON.stringify(this.group),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                let id =this.id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/updateGroup/"+id, requestOpt)
                    
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        this.alert();
                        })
                    .catch((error) => { console.log("error", error); });
            },
            alert() {
                alert("Groupe modifié!");
                this.$router.push({name: "groupsList"})

            }
        }
    }
</script>