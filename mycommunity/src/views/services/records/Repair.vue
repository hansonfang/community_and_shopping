<template>
  <v-layout v-resize="onResize" column>
    <v-data-table
      :headers="headers"
      :items="items"
      class="repair-table"
      disable-initial-sort
      :hide-headers="isMobile"
      :class="{mobile:isMobile}"
      :pagination.sync="pagination"
      hide-actions
    >
      <template v-slot:items="props">
        <tr v-if="!isMobile">
          <td class="text-xs-center">{{ props.item.date }}</td>
          <td class="text-xs-center">{{ props.item.tel }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
        </tr>

        <tr v-else>
          <td>
            <ul class="flex-content">
              <li
                class="flex-item"
                data-label="日期"
              >{{ props.item.date }}</li>
              <li
                class="flex-item"
                data-label="电话"
              >{{ props.item.tel }}</li>
              <li
                class="flex-item"
                data-label="地址"
              >{{ props.item.address }}</li>
              <li
                class="flex-item"
                data-label="详细信息"
              >{{ props.item.description }}</li>

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
export default {
  name: "recordRepair",
  data() {
    return {
      isMobile: false,
      items: [
        {
          address: "北京市中关村",
          tel: "17864195273",
          description: "需要整修",
          nickname: "hanson18",
          avatar: "",
          date: "2018/09/12"
        },
        {
          tel: "17864195729",
          address: "济南市历城区华山街道中北路社区",
          description:
            "家里的煤气管道坏了，请速来整修家里的煤气管道坏了，请速来整修家里的煤气管道坏了，请速来整修家里的煤气管道坏了，请速来整修家里的煤气管道坏了，请速来整修家里的煤气管道坏了，请速来整修",
          nickname: "hanson18",
          avatar: "",
          date: "2018/10/21"
        },
        {
          tel: "17864195273",
          address: "北京市中关村",
          description: "需要整修",
          nickname: "hanson18",
          avatar: "",
          date: "2018/09/12"
        }
      ],
      headers: [
        {
          text: "提交时间",
          align: "center",
          sortable: false,
          value: "date"
        },

        {
          text: "电话",
          align: "center",
          sortable: false,
          value: "tel"
        },
        {
          text: "地址",
          align: "left",
          sortable: false,
          value: "address"
        },
        {
          text: "详细信息",
          align: "left",
          sortable: false,
          value: "description"
        }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 3, // -1 for All
        pages:7 //总共多少页
      }
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  }
};
</script>
<style scoped>
@import url("../../../style/table.css");
.repair-table {
  max-width: 1200px;
  margin: 20px auto;
  padding:0 20px;
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
</style>
