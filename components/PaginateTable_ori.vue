<template>
  <div>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :pagination.sync="pagination"
        :total-items="totalDesserts"
        :loading="loading"
        class="elevation-1"
      >
        <!--
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </template>
        -->
        <template slot="items" slot-scope="props">
           <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.lastupdate }}</td>
        
     
        </template>
        
      </v-data-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {},
      
      //custom
      inputdata: [],
      
      /*
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ]
      */
        headers: [
        { text: 'Id', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Last Update', value: 'lastupdate', sortable: false },
     
        
      ]
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi()
          .then(data => {
            this.desserts = data.items
            this.totalDesserts = data.total
          })
      },
      deep: true
    }
  },
  mounted () {
    this.getDataFromApi()
      .then(data => {
        this.desserts = data.items
        this.totalDesserts = data.total
      })
  },
  methods: {
    getDataFromApi () {
      this.loading = true
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination

        //let items = this.getDesserts()
        let items = this.inputdata
        const total = items.length

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy]
            const sortB = b[sortBy]

            if (descending) {
              if (sortA < sortB) return 1
              if (sortA > sortB) return -1
              return 0
            } else {
              if (sortA < sortB) return -1
              if (sortA > sortB) return 1
              return 0
            }
          })
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }

        setTimeout(() => {
          this.loading = false
          resolve({
            items,
            total
          })
        }, 1000)
      })
    },
    
    getDesserts () {
      return [/*
        {
          id: 2,
          name: 'A',
          lastupdate: 'xxx'
        },
         {
          id: 1,
          name: 'B',
          lastupdate: 'xxx'
        }
        */
      ]
    }
  },
  asyncData(context){
    
     this.inputdata =[
        {
          id: 2,
          name: 'A',
          lastupdate: 'xxx'
        },
         {
          id: 1,
          name: 'B',
          lastupdate: 'xxx'
        }
        
      ];
   
      /*
      return 
      { desserts: [
        {
          id: 2,
          name: 'A',
          lastupdate: 'xxx'
        },
         {
          id: 1,
          name: 'B',
          lastupdate: 'xxx'
        }
        
      ]}*/
    
    //.catch(e => context.error(e));

  }
}
</script>>
