<template>
  <div class="mx-4">
    <h2>{{headline}}</h2>
    <el-row
      :gutter="10"
      class="mb-1"
    >
      <el-col :span="4">
        <h3 class="text-right">主图:</h3>
      </el-col>
      <el-col :span="20">
        <el-image
          :src="mainImage"
          fit="contain"
          @click.native="pickImage('mainImage')"
          style="cursor:pointer;height:200px;"
        ></el-image>
        <input
          type="file"
          style="display: none"
          ref="mainImage"
          accept="image/*"
          @change="handleUploadMainImage($event)"
        >
      </el-col>
      <el-col :span="4">
        <h3 class="text-right">商品图:</h3>
      </el-col>
      <el-col
        :span="20"
        class="flex flex-row subimage"
      >
        <div
          class="subimage-wrapper"
          v-for="(src,index) in subImages"
          :key="index"
        >
          <el-image
            :src="src"
            fit="contain"
            style="cursor:pointer;height:250px; margin-bottom:15px;"
          ></el-image>
          <div>

            <el-button
              size="mini"
              @click.native="pickImage(index)"
            >编辑 <input
                type="file"
                style="display: none"
                :ref="`image${index}`"
                accept="image/*"
                @change="handleUpdateSubImage(index,$event)"
              ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteSubImage(index)"
            >删除</el-button>
          </div>

        </div>
        <el-button
          class="subimage-wrapper"
          style="align-items:center;justify-content:center;"
          @click="$refs.subImage.click()"
        >
          添加图片
        </el-button>
        <input
          type="file"
          style="display: none"
          ref="subImage"
          accept="image/*"
          @change="handleUploadSubImage($event)"
        >
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="10">
      <el-col :span="4">
        <h3 class="text-right">标题:</h3>
      </el-col>
      <el-col :span="20">
        <el-input
          v-model="title"
          placeholder="请输入内容"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4">
        <h3 class="text-right">副标题:</h3>
      </el-col>
      <el-col :span="20">
        <el-input
          v-model="subtitle"
          placeholder="请输入内容"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4">
        <h3 class="text-right">状态:</h3>
      </el-col>
      <el-col :span="20">
        <el-select
          v-model="status"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          >
          </el-option>
        </el-select>

      </el-col>
    </el-row>
    <el-row
      v-if="isCreate"
      :gutter="10"
    >
      <el-col :span="4">
        <h3 class="text-right">商品类别:</h3>
      </el-col>

      <el-col :span="20">
        <el-select
          v-model="cateID"
          placeholder="请选择"
        >
          <el-option
            v-for="item in cateOptions"
            :key="item.cateID"
            :label="item.label"
            :value="item.cateID"
          >
          </el-option>
        </el-select>

      </el-col>
    </el-row>
    <div class="text-center">
      <el-button
        type="primary"
        @click="submitGoods"
      >
        确认修改商品信息
      </el-button>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="10">
      <el-col :span="4">
        <h3 class="text-right">规格:</h3>
      </el-col>
      <el-col
        :span="20"
        style="padding:0 0 10px 20px;"
      >
        <el-collapse
          v-model="activeName"
          v-if="this.productSku.length"
          accordion
          style="margin-bottom:10px;"
        >
          <el-collapse-item
            v-for="(item,index) in productSku"
            :key="item.id"
            :title="item.name"
            :name="item.id"
          >
            <el-row :gutter="8">
              <el-col :span="4">
                <h4>规格:</h4>
              </el-col>

              <el-col :span="20">
                <el-input
                  v-model="item.name"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <h4>拼单价:</h4>
              </el-col>

              <el-col :span="20">
                <el-input
                  v-model="item.groupPrice"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <h4>单购价:</h4>
              </el-col>

              <el-col :span="20">
                <el-input
                  v-model="item.price"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <h4>销量:</h4>
              </el-col>

              <el-col :span="20">
                <el-input
                  v-model="item.sales"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <h4>库存:</h4>
              </el-col>

              <el-col :span="20">
                <el-input
                  v-model="item.stock"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
            </el-row>

            <el-button
              @click="updateSku(index)"
              type="success"
            >
              确认修改
            </el-button>
            <el-button
              @click="deleteSku(item.id)"
              type="danger"
            >
              删除规格
            </el-button>
          </el-collapse-item>
        </el-collapse>

        <el-button @click="addSku">
          添加规格
        </el-button>

      </el-col>
    </el-row>
    <el-row
      :gutter="10"
      v-if="commentsData.length"
    >
      <el-col :span="4">
        <h3 class="text-right">评价:</h3>
      </el-col>
      <el-col :span="20">

        <el-table
          :data="commentsData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="姓名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="skuName"
            label="购买规格"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="评价内容"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="60"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteComment(scope.$index, scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import {
  getGoodsDetail,
  uploadMainImage,
  addSkuID,
  updateSku,
  deleteSku,
  deleteComment,
  updateSubImage,
  uploadSubImage,
  editSubImage,
  updateGoods,
  getCategory,
  createGoods,
  deleteGoods
} from "@/api/shop";
export default {
  name: "shopCreate",
  async created() {
    this.cateID = this.$route.query.cateID || -1;
    this.goodsID = this.$route.query.goodsID || -1;

    if (this.cateID > 0 && this.goodsID > 0) {
      //编辑某条商品
      try {
        const data = (await getGoodsDetail(this.goodsID)).data;
        this.headline = "编辑商品";
        this.mainImage = data.mainImage || this.$store.getters.noImg;
        this.title = data.name;
        this.subtitle = data.subtitle;
        this.subImages = data.subImages ? data.subImages.split(",") : [];
        this.status = data.status;
        this.commentsNums = data.evaluationNums;
        this.productSku = data.product_skus;
        data.comments.forEach(comment => {
          this.commentsData.push({
            date: new Date(comment.commentTime).toLocaleDateString(),
            nickname: comment.nickname,
            skuName: comment.skuName,
            content: comment.content,
            id: comment.id
          });
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      //新建某条商品
      const res = await getCategory();
      res.data.forEach(item => {
        this.cateOptions.push({ cateID: item.id, label: item.name });
      });
      this.headline = "新建商品";
      this.mainImage = this.$store.getters.noImg;
      this.title = "";
      this.subtitle = "";
      this.isCreate = true;
      this.status = null;
      this.cateID = null;
      this.subImages = [];
      this.productSku = [];
      this.commentsData = [];
      this.goodsID = (await createGoods()).data.id;
    }
  },
  data() {
    return {
      cateID: null,
      goodsID: -1,
      isCreate: false,
      headline: "",
      mainImage: "",
      title: "",
      subtitle: "",
      subImages: [],
      activeName: "",
      status: -1,
      cateOptions: [],
      options: [
        {
          status: 0,
          label: "无货"
        },
        {
          status: 1,
          label: "有货"
        }
      ],
      commentsNums: 0,
      productSku: [],
      commentsData: []
    };
  },
  methods: {
    pickImage(ref) {
      const name = `image${ref}`;
      try {
        this.$refs[name].click();
      } catch (error) {
        this.$refs[ref].click();
      }
    },
    async handleUploadSubImage(e) {
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
        this.subImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("goodsID", this.goodsID);
      const res = await uploadSubImage(formData);
    },
    async handleUpdateSubImage(index, e) {
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
        this.subImages.splice(index, 1, e.target.result);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("goodsID", this.goodsID);
      formData.append("index", index);
      const res = await editSubImage(formData);
    },
    async handleUploadMainImage(e) {
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
        this.mainImage = e.target.result;
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("goodsID", this.goodsID);
      const res = await uploadMainImage(formData);
    },
    async addSku() {
      if (
        this.productSku.length === 0 ||
        this.validateSku(this.productSku.length - 1)
      ) {
        const res = await addSkuID(this.goodsID);
        this.productSku.push({
          id: res.data.id,
          groupPrice: "",
          name: "",
          price: "",
          productID: this.goodsID,
          sales: "",
          stock: ""
        });
      }
    },
    async deleteSku(id) {
      try {
        const res = await deleteSku(id);
        setTimeout(() => this.$router.go(0), 2000);
      } catch (error) {
        console.error(error);
      }
    },
    async submitGoods() {
      try {
        if (!this.cateID) return;
        const res = await updateGoods({
          id: this.goodsID,
          name: this.title,
          subtitle: this.subtitle,
          status: this.status,
          categoryID: this.cateID
        });
        setTimeout(() => this.$router.go(0), 1000);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment(index, row) {
      try {
        const res = await deleteComment(row.id);
        this.commentsData.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSubImage(index) {
      try {
        this.subImages.splice(index, 1);
        const res = await updateSubImage(
          this.goodsID,
          this.subImages.join(",")
        );
      } catch (error) {
        console.error(error);
      }
    },
    validateSku(index) {
      const lastSku = this.productSku[index];
      if (lastSku.name && lastSku.groupPrice && lastSku.price && lastSku.stock)
        return true;
      else return false;
    },
    async updateSku(index) {
      try {
        if (this.validateSku(index)) {
          const res = await updateSku(this.productSku[index]);
          console.log(res);
        } else console.log("false");
      } catch (error) {
        console.error(error);
      }
    }
  },
  async beforeDestroy() {
    try {
      await deleteGoods(this.goodsID);
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.subimage {
  flex-wrap: wrap;
}
.subimage-wrapper {
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;
  margin: 10px;
  border: 1px solid rgb(139, 139, 139, 0.7);
  border-radius: 3px;
}
</style>
