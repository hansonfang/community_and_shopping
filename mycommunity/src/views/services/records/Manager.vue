<template>
  <v-layout column class="mt-5">
    <v-data-table
      :headers="headers"
      :items="items"
      class="repair-table"
      disable-initial-sort
      :loading="loading"
      hide-actions
    >
      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center">{{ props.item.tel }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.detail }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">fas fa-edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">fas fa-trash-alt</v-icon>
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
import { getTellManager } from "~/services";
export default {
  name: "recordManager",
  created() {
    getTellManager({ pageNum: this.$route.query.pageNum || 1 })
      .then(res => {
        const messages = res.data.data;
        if (!messages) return;
        messages.forEach(val => {
          this.items.push({
            tel: val.phone,
            email: val.email,
            detail: val.description
          });
        });
      })
      .catch(e => {
        this.$log.error(e || e.response);
      });
    this.pagination.page = Number(this.$route.query.pageNum) || 1;
    this.$watch(
      "pagination",
      () => {
        this.loading = true;
        getTellManager({ pageNum: this.pagination.page })
          .then(res => {
            this.loading = false;
            this.$router.push({ query: { pageNum: this.pagination.page } });
            const messages = res.data.data;
            this.items = [];
            if (!messages) return;
            messages.forEach(val => {
              this.items.push({
                tel: val.phone,
                email: val.email,
                detail: val.description
              });
            });
          })
          .catch(e => {
            this.$log.error(e.response || e);
          });
      },
      { deep: true }
    );
  },
  data() {
    return {
      items: [],
      headers: [
        {
          text: "电话",
          align: "center",
          sortable: false,
          value: "tel",
          width: "20%"
        },
        {
          text: "邮箱",
          align: "center",
          sortable: false,
          value: "email",
          width: "20%"
        },
        {
          text: "详细信息",
          align: "left",
          sortable: false,
          value: "detail",
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
    editItem(item) {
      this.$log.debug("edit", item);
    },
    deleteItem(item) {
      this.$log.debug("delete", item);
    }
  }
};
</script>
<style>
table.v-table tbody td {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>
