<template v-slot:top-left="props" >
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data.info"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        @request="onRequest"
        v-if='!showSelectedElmt'
      >
        <template v-slot:top-right>
          <q-select borderless v-model="searchField" :options="fields" label="Search on" @input="fetchData" style="width: 150px" bg-color="blue-grey-11" class="q-pb-md"/>
          <q-input dense debounce="300" color="primary" v-model="filter" @input="fetchData">
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
                <q-td v-for="item in fields" :key="item" :props="props">{{ props.row[item] }}</q-td> 
            </q-tr>
        </template> 
      </q-table>

      <template v-if='showSelectedElmt'>
        <div class="q-pa-md row items-start q-gutter-md" >
            <q-card class="my-card">
                <q-btn class="float-right" @click="switchShow">Closed</q-btn>
                <div class="text-h6 q-pa-md">Infos element</div>
                <q-card-section v-for="item in fields" :key="item">
                    {{item}}: {{selectedItem[item]}}
                </q-card-section>
            </q-card>
        </div>
        <div class="q-pa-md row items-start q-gutter-md" >
        <column-chart :data="[['Dependencies', dataChart]]"></column-chart>
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
      showSelectedElmt: false,
      selectedItem: {},
      selectedId: "",
      searchField: "name",
      fields: [
        "name",
        "client",
        "family",
        "type"
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
      data: {
        info : [],
        id : [],
      },
      dataChart : ""
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
           this.limit + "&offset=" + this.offset+"&filter={\"info." + this.searchField +"\":{\"$regex\":\""+ this.filter + "\",\"$options\":\"i\"}}")
          .then(response => {
            this.data.info = _.map(response.data.data, 'info');
            this.pagination.rowsNumber = response.data.total;
            this.data.id = _.map(response.data.data,'_id.$oid');
            //console.log(this.searchField)
          });
    },
    fetchId(value) {
        this.axios.get("https://api.cmdb-uat.corp.org.ebrc.local/items/" + this.data.id[value.__index])
        .then(response => {
          this.dataChart = response.data.dependencies.length
        } );
    },
    onRequest(props) {  
        this.pagination = props.pagination;
        this.fetchData();
    },
    selectRow(value) {
        this.selectedItem = value;
        this.switchShow();
        this.fetchId(value);
    },
    switchShow() {
        this.showSelectedElmt = !this.showSelectedElmt
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