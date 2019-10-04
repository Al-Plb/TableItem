<template>
    <div id="login">
        <div v-show="!connected&&!showSignin">
            <h5>Login</h5>
            <p>Username: <q-input filled bg-color="blue-grey-4" type="text" name="username" v-model="input.username" placeholder="Username" /></p>
            <p>Password <q-input filled bg-color="blue-grey-4" type="password" name="password" v-model="input.password" placeholder="Password" /></p>
            <q-btn type="button" v-on:click="login(input.username, input.password)">Login</q-btn>
            <q-btn type="button" color="light-blue" v-on:click="showSignin=!showSignin">Signin</q-btn>
        </div>
        <div v-show="!connected&&showSignin">
            <h5>Signin</h5>
            <p>Username: <q-input filled bg-color="blue-grey-4" type="text" name="username" v-model="input.new.username" placeholder="Username" /></p>
            <p>Password: <q-input filled bg-color="blue-grey-4" type="password" name="password" v-model="input.new.password" placeholder="Password" /></p>
            <p>Confirm password: <q-input filled bg-color="blue-grey-4" type="password" name="password" v-model="input.new.confirmPassword" placeholder="Confirm password" /></p>
            <q-btn type="button" v-on:click="showSignin=!showSignin">Login</q-btn>
            <q-btn type="button" color="light-blue" v-on:click="signin()">Signin</q-btn>
        </div>
        <div v-show="connected">
            <h5>Tu es connecté(e)</h5>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            showSignin: false,
            input: {
                username: "",
                password: "",
                new : {
                    username: "",
                    password: "",
                    confirmPassword: ""
                }
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.loggedUser.name
        },
        connected() {
            return this.$store.getters.connected;
        }
    },
    methods: {
        login(username, password){
            if(username&&password){
                let recognizedUser = this.$store.state.users.find(element => element.name === username && element.password === password);
                if(recognizedUser){
                    this.$store.dispatch('change', recognizedUser);
                    this.$router.push('/')
                }else{
                    this.$q.dialog({
                        title: 'Problème d\'identification',
                        message: 'Utilisateur non enregistré'
                    });
                }

            }
        },
        signin(){
            if(this.input.new.username&&this.input.new.password&&this.input.new.confirmPassword){
                let recognizedUser = this.$store.state.users.find(element => element.name === this.input.new.username);
                if(recognizedUser){
                    this.$q.dialog({
                        title: 'Problème d\'identification',
                        message: 'Ce nom est déjà utilisé'
                    });
                }else if(this.input.new.password!=this.input.new.confirmPassword){
                    this.$q.dialog({
                        title: 'Problème d\'identification',
                        message: 'Les mots de passe ne sont pas identiques'
                    });
                }else{
                    this.$store.dispatch('addUser',this.input.new);
                    this.login(this.input.new.username,this.input.new.password);
                }

            }else{
                this.$q.dialog({
                        title: 'Problème d\'identification',
                        message: 'Veuillez renseigner tous les champs'
                    })
            }
        }

    }

}
    
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>