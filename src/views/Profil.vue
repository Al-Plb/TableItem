<template>
    <div class="profil">
        <div class="q-pa-md text-center">
        <img alt="Quasar logo" src="../assets/logo.png">
        <h6>Votre profil</h6>
            <p>Username : {{userName}}</p>
            <p>Rôle: {{userRole}} </p>
        </div>
    </div>
</template>

<script>
export default {
    name:'Profil',

    computed: {
        userName() {
            return this.$store.state.loggedUser.name
        },
        userRole() {
            return this.$store.state.loggedUser.role
        }
    }
}
</script>