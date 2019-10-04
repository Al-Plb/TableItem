<template>
    <div id="admin">
        <div v-if="!showCard" class="q-pa-md row items-start q-gutter-md">
            <q-table 
            title="Utilisateurs"
            :columns="columns"
            :data="data">

                <template v-slot:body="props" >
                    <q-tr 
                    :props="props" 
                    class="cursor-pointer" 
                    @click.native="selectRow(props.row)"
                    >
                        <q-td v-for="item in fields" :key="item" :props="props">{{ props.row[item] }}</q-td> 
                    </q-tr>
                </template> 
        </q-table>
        </div>
        <div v-if="showCard" class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card">
                <q-btn class="float-right" @click="showCard=!showCard">Closed</q-btn>
                <div class="text-h6 q-pa-md">Infos element</div>
                <q-card-section>
                    {{roleUser}}
                    Name: {{selectedItem["name"]}}
                </q-card-section>
                <q-card-section>
                    Role : 
                    <q-btn-dropdown :label="selectedRole">
                        <q-list v-if="(roleUser===('SuperAdmin'||'Admin'), selectedItem.role!='SuperAdmin')">
                            <q-item clickable v-close-popup @click="updateRole('Admin')">
                                <q-item-section>
                                    <q-item-label>Admin</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="updateRole('User')">
                                <q-item-section>
                                    <q-item-label>User</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>

                        <!-- <q-list v-if="(roleUser===('SuperAdmin'||'Admin'), selectedItem.role!='SuperAdmin')">
                            <q-item v-for="item in fields" :key="item" >{{selectedItem["role"]}}</q-item>
                        </q-list> -->
                    </q-btn-dropdown>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Admin',
    data(){
        return{
            fields:['name','role'],
            selectedItem : {},
            showCard: false,
            columns: [
                {
                name: 'name',
                required: true,
                label: 'name',
                align: 'left',
                field: row => row.name,
                sortable: true
                },
                { name: 'role', align: 'center', label: 'role', field: 'role', sortable: true },
            ],
            data: this.$store.state.users

        }
    },
    computed:{
        roleUser(){
            return this.$store.state.loggedUser.role;
        },
        selectedRole(){
            return this.$store.state.users.find(element => element.name === this.selectedItem.name).role
        }
    },
    methods: {
        selectRow(value){
            this.selectedItem = value;
            this.showCard=!this.showCard
        },
        updateRole(value){
            let user={name: this.selectedItem.name, role: value}
            this.$store.dispatch('updateUser', user);
        }
    }
}
</script>
