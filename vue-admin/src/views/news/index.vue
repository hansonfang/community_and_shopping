<template>
  <div class="mx-4 mb-5">
    <el-button
      @click="deleteSelected"
      type="danger"
      size="small"
      plain
    >删除所选项</el-button>
    <el-table
      ref="multipleTable"
      :data="newsData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="100"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        label="主图"
        width="180"
      >
        <template slot-scope="scope">
          <el-image
            :src="scope.row.image"
            fit="contain"
            @click.native="pickImage(scope.row.id)"
            style="cursor:pointer"
          ></el-image>
          <input
            type="file"
            style="display: none"
            :ref="`image${scope.row.id}`"
            accept="image/*"
            @change="handleUploadImage(scope.$index,scope.row.id,$event)"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="desc"
        label="内容概述"
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
</template>
<script>
import { getAllNews, deleteNews, uploadHeadlineImage } from "@/api/news";
export default {
  name: "news",
  async created() {
    this.communityID = this.$store.getters.communityID;
    await this.fetchNewsList();
  },
  data() {
    return { communityID: 0, multipleSelection: [], newsData: [] };
  },
  methods: {
    async fetchNewsList() {
      try {
        const res = await getAllNews(this.communityID);
        this.newsData = [];
        res.data.forEach(item => {
          this.newsData.push({
            id: item.id,
            title: item.title,
            author: item.author || "佚名",
            desc: item.description,
            image:
              item.images ||
              "http://hansonoss.oss-cn-beijing.aliyuncs.com/no-image-available2.jpg",
            date: new Date(item.publishTime).toLocaleDateString()
          });
        });
      } catch (error) {
        console.error(error);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.$router.push({name:"newsCreate",query:{newsID:row.id}})
    },
    pickImage(id) {
      const name = `image${id}`;
      this.$refs[name].click();
    },
    async handleDelete(index, row) {
      try {
        await deleteNews([row.id]);
        await this.fetchNewsList();
      } catch (error) {
        console.log(error);
      }
    },
    async handleUploadImage(index, newsID, e) {
      try {
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        const imageType = /^image\//;
        //是否是图片
        if (!imageType.test(file.type)) {
          alert("请选择图片！");
          return;
        }
        //读取完成
        reader.onload = e => {
          //图片路径设置为读取的图片
          this.newsData[index].image = e.target.result;
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("newsID", newsID);
        const res = await uploadHeadlineImage(formData);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSelected() {
      const IDs = this.multipleSelection.map(sel => sel.id);
      try {
        await deleteNews(IDs);
        await this.fetchNewsList();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
