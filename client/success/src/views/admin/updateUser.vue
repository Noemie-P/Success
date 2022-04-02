<template>
    <div class="updateUser">
        <div class="loading" v-if="loading">
            Loading
        </div>
        <div class="user" v-if="page">
            <button><router-link to="/admin/UserList">Retour</router-link></button>
            <form @submit.prevent= "handleSubmitForm"> 
            <label for="userName">Nom de l'utilisateur</label>
            <input type="text" class="userName" v-bind="user.user_name" v-model="user.user_name"/><br>
            <label for="type">Type de l'utilisateur</label>
            <input type="text" class="type" v-bind="user.type" v-model="user.type"/>
            <button>Valider</button>
            </form>
        </div>
    </div>
</template>
<script>
import config from "../../../config/env";
    export default {
        name:"UpdateUser",
 
        data() {
            return {
                id:"",
                loading:false,
                page:false,
                user:{
                    user_name:"",
                    type:""
                },
            }
        },
        created() {
            this.getUser();
        },
        methods: {
            getUser() {
                this.loading=true;
                this.user={};
                if (this.$route.params.id) {
                    this.id = this.$route.params.id
                    const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };
                    let id =this.id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/getOneUser/"+ id, requestOpt)
                        .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.user=jdata
                            let user= this.user;
                            console.log(user);
                            this.loading = false;
                            this.page=true
                            }));
                            //console.log(response);
                        })
                        /* .then((result) => {
                        console.log(result);
                        let jdata= result;
                        let i=0;
                        for (i in jdata) {
                            this.users[i] = jdata[i];
                            console.log(jdata[i]);
                        }
                        let users= this.users;
                        console.log(users);
                        this.loading = false;
                    })*/
                    .catch((error) => { console.log("error", error); });
                }
            },
            handleSubmitForm() {
                
                const requestOpt= {
                        method: "PUT",
                        body: JSON.stringify(this.user),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                let id =this.id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/updateUser/"+id, requestOpt)
                    
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        })
                    .catch((error) => { console.log("error", error); });
            }
        }
    }
</script>