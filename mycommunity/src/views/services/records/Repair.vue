<template>
  <v-layout v-resize="onResize" column class="mt-5">
    <v-data-table
      :headers="headers"
      :items="items"
      class="repair-table"
      disable-initial-sort
      :hide-headers="isMobile"
      :class="{mobile:isMobile}"
      :loading="loading"
      hide-actions
    >
      <template v-slot:items="props">
        <tr v-if="!isMobile">
          <td class="text-xs-center">{{ props.item.date }}</td>
          <td class="text-xs-center">{{ props.item.tel }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">fas fa-edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">fas fa-trash-alt</v-icon>
          </td>
        </tr>

        <tr v-else>
          <td>
            <ul class="flex-content">
              <li class="flex-item" data-label="日期">{{ props.item.date }}</li>
              <li class="flex-item" data-label="电话">{{ props.item.tel }}</li>
              <li class="flex-item" data-label="地址">{{ props.item.address }}</li>
              <li class="flex-item" data-label="详细信息">{{ props.item.description }}</li>
            </ul>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pagination.pages"></v-pagination>
    </div>
  </v-layout>
</template>
<script>
import { getRepair } from "~/services";
export default {
  name: "recordRepair",
  created() {
    getRepair({ pageNum: this.$route.query.pageNum || 1 })
      .then(res => {
        const messages = res.data.data;
        messages.forEach(val => {
          this.items.push({
            address: val.address,
            tel: val.telephone,
            description: val.description,
            date: this.functions.formatTime(val.hopeTime).dayTime
          });
        });
      })
      .catch(e => {
        this.$log.error(e || e.response);
      });
    this.pagination.page = this.$route.query.pageNum;
  },
  data() {
    return {
      isMobile: false,
      items: [],
      headers: [
        {
          text: "期望维修时间",
          align: "center",
          sortable: false,
          value: "date",
          width: "10%"
        },

        {
          text: "电话",
          align: "center",
          sortable: false,
          value: "tel",
          width: "10%"
        },
        {
          text: "地址",
          align: "left",
          sortable: false,
          value: "address",
          width: "20%"
        },
        {
          text: "详细信息",
          align: "left",
          sortable: false,
          value: "description",
          width: "50%"
        },
        { text: "操作", value: "name", sortable: false, width: "10%" }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5, // -1 for All
        pages: 7 //总共多少页
      },
      loading: false,
      //bug
      totalItems: 7
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    editItem(item) {
      this.$log.debug("edit", item);
    },
    deleteItem(item) {
      this.$log.debug("delete", item);
    }
  },
  watch: {
    pagination: {
      handler() {
        this.loading = true;
        getRepair({ pageNum: this.pagination.page })
          .then(res => {
            this.loading = false;
            const messages = res.data.data;
            this.items = [];
            if (!messages) return;
            messages.forEach(val => {
              this.items.push({
                address: val.address,
                tel: val.telephone,
                description: val.description,
                date: this.functions.formatTime(val.hopeTime).dayTime
              });
            });
            this.$router.push({ query: { pageNum: this.pagination.page } });
          })
          .catch(e => {
            this.$log.error(e.response || e);
          });
      },
      deep: true
    }
  }
};
</script>
<style scoped>
@import url("../../../style/table.css");
.repair-table {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  font-weight: bold;
}

table.v-table tbody td {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>
