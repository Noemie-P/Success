<template>
    <div class="userList">
        <div v-if="loading" class="loading">
            Loading...
        </div>
        <div v-if ="users" class="users">
            <h1>Liste des utilisateurs</h1>
            <table id="userTable">
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>type</th>
                    <th>Actions</th>
                </tr>

                <tr v-for="(user,k) in users" :key="k">
                    <td>
                        <span>
                            {{user._id}}
                        </span>
                    </td>
                    <td>
                        <span>
                            {{user.user_name}}
                        </span>
                    </td>
                    <td>
                        <span>
                            {{user.type}}
                        </span>
                    </td>
                    <td>
                        <button @click="updateUser(k)">Modifier</button>
                        <img src="../../assets/delete.png" alt="supprimer" @click="deleteUser(k)" height="30px" width="30px"/>
                        <!--<button @click="deleteUser(k)">Supprimer</button>-->
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import config from "../../../config/env";
export default {
    name: "UserList",
    
    data(){
        return {
            loading: false,
            users:[ 
                {
                    _id:"",
                    user_name:"",
                    type:""
                }
            ]
        }
    },
    created (){
        this.getUsers();
    },
    methods:{
        getUsers() {
            this.loading = true;
            this.users = [];
            const requestOpt= {
                    method: "GET",
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };

                fetch(config.VUE_APP_BASE_URL + "/getUsers", requestOpt)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        let jdata= JSON.parse(result);
                        let i=0;
                        for (i in jdata) {
                            this.users[i] = jdata[i];
                            console.log(jdata[i]);
                        }
                        let users= this.users;
                        console.log(users);
                        this.loading = false;
                    })
                    .catch((error) => { console.log("error", error); });

        },
        deleteUser(k) {
            let id = this.users[k]._id 
            console.log(id);
            const requestOpt= {
                    method: "DELETE",
                    body: JSON.stringify({"id": id}),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
            
             fetch(config.VUE_APP_BASE_URL + "/deleteUser/"+id, requestOpt)
                    .then((response) => {
                        response.text();
                    })
                    .catch((error) => { console.log("error", error); });

        },
        updateUser(k) {
            let id = this.users[k]._id 
            this.$router.push({name: "UpdateUser", params: {id: id}})
        }
    }   
}
</script>
