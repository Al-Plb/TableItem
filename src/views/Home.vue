<template>
  <q-page class="flex flex-center">
    <p>Bievenue sur le site de test</p>
    <img alt="Quasar logo" src="../assets/logo.png">
    <q-btn v-show="!connected" @click="$router.push('/login')">
      Login
    </q-btn>
    <q-btn v-show="connected" @click="$router.push('/tableItem')">
      Aller voir les tables
    </q-btn>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageHome',
  computed : {
    connected() {
      return this.$store.getters.connected;
    }
  }
  
}
</script>


<style>
</style>

<script>
export default {
  name: 'PageHome',
  computed: {
    connected() {
      return this.$store.getters.connected;
    }
  }
}
</script>
