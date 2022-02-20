<template>
    <div class="newGroup">
        <h1>Nouveau groupe</h1>
        <form @submit.prevent="addGroup">
            <label for="groupName">Nom du groupe</label>
            <input type="text" name="groupeName" v-model="group.name"/>
            <button>Enregistrer</button>
        </form>
    </div>
</template>

<script>
import config from "../../../config/env";
    export default {
        name:"NewGroup",
        data() {
            return {
                group:{}
            }
        },
        methods: {
            addGroup() {
                const requestOpt={
                    method: "POST",
                        body: JSON.stringify({"group":this.group}),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                };
                fetch(config.VUE_APP_BASE_URL + "/createGroup", requestOpt)
                    .then((response) => response.text())
                    .then(result => {
                        console.log(result);
                        this.alert();
                        });
            },

            alert() {
                alert("Nouveau groupe enregistré!");
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