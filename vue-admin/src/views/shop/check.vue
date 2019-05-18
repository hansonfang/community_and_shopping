<template>
  <div class="mx-4">
    <el-select
      v-model="cateID"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.cateID"
        :label="item.label"
        :value="item.cateID"
      >
      </el-option>
    </el-select>

    <div class="mx-4 mb-5">
      <el-table
        :data="goodsData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        >
        <el-table-column
          label="主图"
          width="180"
        >
          <template slot-scope="scope">
            <el-image
              :src="scope.row.image"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="subtitle"
          label="副标题"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="evaluation"
          label="评价数"
          width="80"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getCategory, getGoodsList, deleteGoods } from "@/api/shop";
export default {
  name: "shopCheck",
  async created() {
    const res = await getCategory();
    res.data.forEach(item => {
      this.options.push({ cateID: item.id, label: item.name });
    });
    this.fetchGoodsList(this.cateID);
  },
  data() {
    return {
      options: [],
      cateID: 1,
      goodsData: []
    };
  },
  methods: {
    async fetchGoodsList(cateID) {
      const res = await getGoodsList(cateID);
      this.goodsData = [];
      res.data.forEach(item => {
        this.goodsData.push({
          id: item.id,
          image: item.mainImage || this.$store.getters.noImg,
          title: item.name,
          subtitle: item.subtitle,
          status: item.status === 1 ? "有货" : "无货",
          evaluation: item.evaluationNums
        });
      });
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "shopCreate",
        query: {
          cateID: this.cateID,
          goodsID: row.id
        }
      });
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteGoods(row.id);
        await this.fetchGoodsList(this.cateID);
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    cateID(val) {
      this.fetchGoodsList(val);
    }
  }
};
</script>
