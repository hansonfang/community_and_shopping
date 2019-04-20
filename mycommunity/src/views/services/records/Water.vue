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
          <td class="text-xs-center">{{ props.item.date }}</td>
          <td class="text-xs-center">{{ props.item.tel }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.detail }}</td>
          <td class="text-xs-left">
            <p v-html="props.item.waterListDetail"></p>
          </td>
          <td class="text-xs-left">{{ props.item.totalPrice }}</td>
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
import { getWater } from "~/services";
export default {
  name: "recordWater",
  created() {
    getWater({ pageNum: this.$route.query.pageNum || 1 })
      .then(res => {
        const messages = res.data.data;
        if (!messages) return;
        messages.forEach(val => {
          let list = "";
          let sum = 0;
          val.detailsList.forEach(item => {
            list += `${item.waterBrand.brand}-￥${item.waterBrand.price}*${
              item.waterNums
            }</br>`;
            sum += item.waterNums * item.waterBrand.price;
          });
          this.items.push({
            address: val.address,
            tel: val.phone,
            detail: val.description,
            date: this.functions.formatTime(val.hopeTime).dayTime,
            waterDetail: val.detailsList.map(item => {
              return {
                brand: item.waterBrand.brand,
                price: item.waterBrand.price,
                count: item.waterNums,
                brandId: item.brandId
              };
            }),
            waterListDetail: list,
            totalPrice: sum
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
        getWater({ pageNum: this.pagination.page })
          .then(res => {
            this.loading = false;
            this.$router.push({ query: { pageNum: this.pagination.page } });
            const messages = res.data.data;
            this.items = [];
            if (!messages) return;
            messages.forEach(val => {
              this.items.push({
                address: val.address,
                tel: val.phone,
                detail: val.description,
                date: this.functions.formatTime(val.hopeTime).dayTime,
                waterDetail: val.detailsList.map(item => {
                  return {
                    brand: item.waterBrand.brand,
                    price: item.waterBrand.price,
                    count: item.waterNums,
                    brandId: item.brandId
                  };
                })
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
          text: "期望送水时间",
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
          value: "detail",
          width: "20%"
        },
        {
          text: "桶装水详细信息",
          align: "left",
          sortable: false,
          value: "waterListDetail",
          width: "20%"
        },
        {
          text: "总价",
          align: "left",
          sortable: false,
          value: "totalPrice",
          width: "10%"
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
<style scoped>
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
