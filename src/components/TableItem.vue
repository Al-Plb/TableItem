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
      >
        <template v-slot:body="props" >
            <q-tr 
            :props="props" 
            class="cursor-pointer" 
            @click.native="selectRow(props.row.__index)"
            >
                <q-td key="name" :props="props">{{ props.row.name }}</q-td> 
                <q-td key="client" :props="props">{{ props.row.client }}</q-td> 
                <q-td key="family" :props="props">{{ props.row.family }}</q-td> 
                <q-td key="type" :props="props">{{ props.row.type }}</q-td> 
            </q-tr>
        </template> 
      </q-table>


      <template>
        <div class="q-pa-md row items-start q-gutter-md" >
            <q-card class="my-card" v-if='showCard'>
                <q-btn class="float-right" @click="switchShow">Closed</q-btn>
                <div class="text-h6 q-pa-md">Infos element</div>
                <q-card-section>
                    Name: {{datas[idSelected].name}}
                </q-card-section>
                <q-card-section>
                    Client: {{datas[idSelected].client}}
                </q-card-section>
                <q-card-section>
                    Family: {{datas[idSelected].family}}
                </q-card-section>
                <q-card-section>
                    Type: {{datas[idSelected].type}}
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
        showCard: false,
        idSelected: 0,
        lorem: "lorem lorem lorem lorem lorem lorem lorem",
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
            format: val => `${val}`,
            sortable: true
            },
            { name: 'client', align: 'center', label: 'client', field: 'client', sortable: true },
            { name: 'family', label: 'family', field: 'family', sortable: true },
            { name: 'type', label: 'type', field: 'type' },
        ],
        datas: []
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
          this.axios.get("https://api.cmdb-uat.corp.org.ebrc.local/items?limit=" + this.limit + "&offset=" + this.offset)
          .then(response => {
            console.log(response.data.data);
            this.datas = _.map(response.data.data, 'info');
            this.pagination.rowsNumber = response.data.total;
          });
    },
    onRequest(props) {
        this.pagination = props.pagination;
        //console.log(this.limit)
        //console.log(this.offset)
        this.fetchData();
    },
    selectRow(value) { 
        console.log(value)
        this.idSelected = value;
        this.switchShow();
        //console.log(this.showCard)
        console.log(this.datas)
    },
    switchShow() {
        this.showCard = !this.showCard
    },
  }
}

</script>
