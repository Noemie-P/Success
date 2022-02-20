<template>
    <div class="groupListToUsers">
        <h1>Liste des utilisateurs de {{name}}</h1>
        <table>
            <tr>
                <th>Nom</th>
                <th>Type</th>
            </tr>
            <tr v-for="(user,k) in users" :key="k">
                <td>{{user.user_name}}</td>
                <td>{{user.type}}</td>
            </tr>
        </table>
        <button @click="displayForm">Ajouter un utilisateur</button>
        <div id="addUser" hidden>
            <register :groupe2="this.id"/>
        </div>
    </div>
</template>
<script>
import register from '../../components/auth/register.vue';
import config from "../../../config/env";
export default {
  components: { register },
    name:"groupListToUsers",
    data() {
        return {
            users:[]
        }
    },
    created() {
        this.getUsers();
    },
    methods:{
        getUsers(){
            if (this.$route.params.id && this.$route.params.name) {
                    this.id = this.$route.params.id
                    this.name = this.$route.params.name 
                    const requestOpt= {
                        method: "GET",
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    };
                    let id =this.id
                    console.log(id)
                fetch(config.VUE_APP_BASE_URL + "/getUsersFromGroup/"+id, requestOpt)
                        .then((response) => {
                            response.text().then((result =>{
                                console.log(result);
                            let jdata= JSON.parse(result);
                            this.users=jdata
                            let users= this.users;
                            console.log(users);
                            }));
                        })
                    .catch((error) => { console.log("error", error); });
            }
        },
        displayForm() {
        document.getElementById("addUser").hidden=false;
        }
    }
}
</script>