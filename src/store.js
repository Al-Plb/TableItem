import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        loggedUser: {
            name: "",
            role: ""
        },
        users: [
            {name: "Robert", password: "bouh", role: "SuperAdmin"},
            {name: "Albert", password: "a", role: "Admin"},
            {name: "Bob", password: "bibouh", role: "User"},
            {name: "Michel", password: "aaaa", role: "User"},
        ]
    },
    getters: {
        connected : state => {
            if(state.loggedUser.name&&state.loggedUser.role){
                return true;
            }else{
                return false
            }
        }

    },
    mutations:{
        change(state, user){
            state.loggedUser.name = user.name;
            state.loggedUser.role = user.role;         
        },
        addUser(state, user){
            state.users.push({name: user.username, password: user.password, role: "User"});
        },
        updateUser(state, user){
            let idRecognizedUser = state.users.find(element => element.name === user.name).__index;
            state.users[idRecognizedUser].role = user.role;
        }
    },
    actions: {
        change(context, user){
            context.commit('change', user);
        },
        addUser(context, user){
            context.commit('addUser', user);
        },
        updateUser(context,user){
            context.commit('updateUser', user);
            if(user.name === this.state.loggedUser.name){
                context.commit('change', user);
            }
        }
    }
});