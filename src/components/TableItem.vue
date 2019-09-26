<template>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="datas"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        @request="onRequest"
      ></q-table>
      <template>
          
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card">
                <q-btn class="float-right" v-close-popup>Closed</q-btn>
            <div class="text-h6 q-pa-md">Infos element</div>
            <q-card-section>
                {{lorem}}
            </q-card-section>
            <q-card-section>
                {{lorem}}
            </q-card-section>
            <q-card-section>
                {{lorem}}
            </q-card-section>
            <q-card-section>
                {{lorem}}
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
          field: 'name',
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
    console.log(this.limit)
    console.log(this.offset)
    this.fetchData();
    }
  }
}

</script>