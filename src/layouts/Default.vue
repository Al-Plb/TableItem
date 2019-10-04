<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="eva-menu-outline"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        
          <div v-show="connected">
           <i class="material-icons">
            person</i> Logged as {{userName}} ({{userRole}})
          <q-btn-dropdown label="">
            <q-list>
              <q-item clickable v-close-popup @click="viewProfil">
                <q-item-section>
                  <q-item-label>Infos profil</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logOut">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="eva-home-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/about" exact>
          <q-item-section avatar>
            <q-icon name="eva-info-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/tableItem" exact>
          <q-item-section avatar>
            <q-icon name="eva-info-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Table</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/login" exact>
          <q-item-section avatar>
            <q-icon name="eva-info-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/admin" exact v-if="showAdmin">
          <q-item-section avatar>
            <q-icon name="eva-info-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Admin</q-item-label>
          </q-item-section>
        </q-item>

       
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
    name: 'LayoutDefault',
    data() {
        return {
          leftDrawerOpen: this.$q.platform.is.desktop,
          showAdmin: false
        }
    },
    computed: {
        userName() {
            return this.$store.state.loggedUser.name
        },
        userRole() {
            return this.$store.state.loggedUser.role
        },
        connected() {
            return this.$store.getters.connected;
        },
        roleUser(){
            return this.$store.state.loggedUser.role;
        },
        selectedRole(){
            return this.$store.state.users.find(element => element.name === this.selectedItem.name).role
        }
    
    },
    methods: {
    viewProfil() {
      this.$router.push('/profil')
    },
    logOut () {
      let noUser = {name: "", role: ""};
      this.$store.dispatch('change', noUser);
      this.$router.push('/').catch(err => {});
    },
    updateRole(value){
            let user={name: this.selectedItem.name, role: value}
            this.$store.dispatch('updateUser', user);
        
    },
    admin() {
      if(roleUser === ('SuperAdmin && Admin')) {
        this.showAdmin = !showAdmin;
      }
    }
   }
}
</script>

<style>
.material-icons {
  font-size: 18px;
}
</style>
