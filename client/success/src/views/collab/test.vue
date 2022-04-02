<template>
       <div class="test">
        <h1>Créer un utilisateur</h1>
        <form @submit.prevent= "handleSubmitForm">
            <label for="user_name">Nom de l'utilisateur</label><br>
            <input type="text" name="user_name" v-model="users.user_name"><br>
            <label for="type">Type d'utilisateur</label><br>
            <input type="text" name="type" v-model="users.type"><br>
            <label for="password">Mot de passer</label><br>
            <input type="password" name="password" v-model="users.password"><br>
            <button>Créer</button>
        </form>
    </div>
</template>

<script>

//import axios from "axios"
    export default {
        name:"test",
        data() {
            return {
                users: {
                   user_name: '',
                   type: '',
                   password:''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                const requestOpt = {
                            method: "POST",
                            body: JSON.stringify({"users": this.users}),
                            headers: { 'Content-type': 'application/json; charset=UTF-8' }
                        };
                        fetch("http://localhost:3000/getUser", requestOpt)
                    .then((response) => response.text())
                    .then(response => console.log(response))
                    .then(data => (this.users = data))
                    .then(data => console.log(data));
            }
             /*handleSubmitForm() {
                axios.post('http://localhost:3000/getUser',{"users":this.users})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }*/
        }
    }
</script>