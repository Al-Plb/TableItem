<template v-slot:top-left="props" >
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="datas"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        @request="onRequest"
        selection="none"
        v-if='!showCard'
        :filter="filter"
      >
      
        <template v-slot:top-right>
          <q-input dense debounce="300" color="primary" v-model="filter">
            
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body="props" >
            <q-tr 
            :props="props" 
            class="cursor-pointer" 
            @click.native="selectRow(props.row)"
            >
                <q-td v-for="item in colmns" :key="item" :props="props">{{ props.row[item] }}</q-td> 
            </q-tr>
        </template> 
      </q-table>


      <template>
        <div class="q-pa-md row items-start q-gutter-md" >
            <q-card class="my-card" v-if='showCard'>
                <q-btn class="float-right" @click="switchShow">Closed</q-btn>
                <div class="text-h6 q-pa-md">Infos element</div>
                <q-card-section v-for="item in colmns">
                    {{item}}: {{selectedItem[item]}}
                </q-card-section>
            </q-card>
        </div>
     </template>
    </div>    
</template>

<script>
export default {
  name:'ApiResult',
  data: function() {
    return {
        filter: "",
        showCard: false,
        selectedItem: {},
        colmns: [
          "name",
          "type",
          "client",
          "family"
        ],
        pagination: {               
            page: 1,        
            rowsPerPage: 5,        
            rowsNumber: 0      
        },
        columns: [
            {
            name: 'name',
            required: true,
            label: 'name',
            align: 'left',
            field: row => row.name,
            sortable: true
            },
            { name: 'client', align: 'center', label: 'client', field: 'client', sortable: true },
            { name: 'family', label: 'family', field: 'family', sortable: true },
            { name: 'type', label: 'type', field: 'type', sortable: true },
        ],
        datas: []
    }
    
  },
  watch: {
    filtered: function() {
      this.filter
    }
  },
  computed: {
    offset() {      
      return this.pagination.rowsPerPage * (this.pagination.page - 1);    
    },    
    limit() {      
      return this.pagination.rowsPerPage;   
    },
  },
  mounted() {
   this.fetchData();
  }, 
  methods: {
    fetchData() {
           this.axios.get("https://api.cmdb-uat.corp.org.ebrc.local/items?limit=" + 
           this.limit + "&offset=" + this.offset+"&filter={\"info.name\":{\"$regex\":\""+ this.filter + "\",\"$options\":\"i\"}}")
          .then(response => {
            //console.log(response.data.data);
            this.datas = _.map(response.data.data, 'info');
            this.pagination.rowsNumber = response.data.total;
          });
    },
    onRequest(props) {
        this.pagination = props.pagination;
        this.fetchData();
    },
    selectRow(value) { 
        //console.log(value)
        this.selectedItem = value;
        this.switchShow();
        //console.log(this.datas)
    },
    switchShow() {
        this.showCard = !this.showCard
    }

  }
}
</script>
<style scope>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
