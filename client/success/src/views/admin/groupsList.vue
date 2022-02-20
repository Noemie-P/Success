<template>
    <div class="groupsList">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div class="page" v-if="page">
            <h1>Liste des Groupes</h1>
            <table id="groupTable">
                    <tr>
                        <th>Nom</th>
                        <th>Nombre de personnes</th>
                        <th>Liste des groupes</th>
                        <th>Actions</th>
                    </tr>
                    

                    <tr v-for="(group,k) in groups" :key="k">
                        <td>
                            <span>
                                {{group.name}}
                            </span>
                        </td>
                        <td>
                            <span>
                                {{lengthAll[k]}}
                            </span>
                        </td>
                        <td>
                            <button @click="goToUsersList(k)">Liste groupes</button>
                        </td>
                        <td>
                            <button @click="updateGroup(k)">Modifier</button>
                            <img src="../../assets/delete.png" alt="supprimer" @click="deleteGroup(k)" height="30px" width="30px"/>
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
    name:"groupsList",
    data(){
        return {
            loading:true,
            page:false,
            groups:[],
            length:{},
            lengthAll:[]
        }
    },
        created (){
        this.getGroups();
    },
    methods:{
        getGroups() {
            //this.loading = true;
            //this.users = [];
            const requestOpt= {
                    method: "GET",
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };

                fetch(config.VUE_APP_BASE_URL + "/getGroups", requestOpt)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        let jdata= JSON.parse(result);
                        let i=0;
                        for (i in jdata) {
                            this.groups[i] = jdata[i];
                            console.log(jdata[i]);
                        }
                        let groups= this.groups;
                        console.log(groups);
                        this.page = true;
                        this.loading = false;
                        this.getNumberOfUsers();
                    })
                    .catch((error) => { console.log("error", error); });

        },

        getNumberOfUsers() {
                
                for (let i = 0; i < this.groups.length; i++) {
                    let id= this.groups[i]._id 
                    const requestOpt = {
                                method: "GET",
                                headers: { 'Content-type': 'application/json; charset=UTF-8' }
                            };
                            fetch(config.VUE_APP_BASE_URL + "/getUsersFromGroup/" +id, requestOpt)
                        .then((response) => response.text())
                        .then(result => {
                            console.log(result);
                            let group = JSON.parse(result);
                            console.log(group);
                            this.length[i] = group.length;
                            console.log(group.length);
                            this.lengthAll.push(this.length[i]);
                            console.log(this.lengthAll)
                            });
                } 
        },

        deleteGroup(k) {
            let id = this.groups[k]._id 
            console.log(id);
            const requestOpt= {
                    method: "DELETE",
                    body: JSON.stringify({"id": id}),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
            
             fetch(config.VUE_APP_BASE_URL + "/deleteGroup/"+id, requestOpt)
                    .then((response) => {
                        console.log("supprimé")
                        this.alert();
                        response.text();
                        
                    })
                    .catch((error) => { console.log("error", error); });

        },
        alert(){
            alert("Groupe supprimé");
            this.getGroups();
        },
        updateGroup(k) {
            let id = this.groups[k]._id 
            this.$router.push({name: "UpdateGroup", params: {id: id}})
        },
        goToUsersList(k){
            let id = this.groups[k]._id;
            let name = this.groups[k].name;
            console.log(name);
            this.$router.push({name:"groupListToUsers", params: {id: id, name: name}})
        }
    }   
}

</script>
