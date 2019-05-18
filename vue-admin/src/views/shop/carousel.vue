<template>
  <div class="mx-4">
    <el-select
      v-model="cateID"
      placeholder="请选择"
      @change="fetchCarousels()"
    >
      <el-option
        v-for="item in options"
        :key="item.cateID"
        :label="item.label"
        :value="item.cateID"
      >
      </el-option>
    </el-select>

    <el-tabs
      v-model="activeName"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="(item,index) in carousels"
        :key="index"
        :label="`图片${index+1}`"
        :name="index.toString()"
      >
        <div class="text-center">
          <el-image
            style="width: 300px; height: 150px;cursor:pointer;"
            :src="item.url"
            fit="contain"
            @click.native="handleClick(index)"
          ></el-image>
          <input
            type="file"
            style="display: none"
            :ref="`image${index}`"
            accept="image/*"
            @change="handleUploadCarouselImage(index,$event)"
          >
        </div>
        <div style="padding-top:10px;">
          <el-row :gutter="10">
            <el-col :span=4>
              关键词：
            </el-col>
            <el-col :span=16>
              <el-input
                v-model="item.keyword"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
            <el-col :span=4>
              <el-button
                type="success"
                @click="submitKeyword(index)"
              >
                确认修改
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import {
  getCategory,
  getCarousels,
  uploadCarouselImage,
  updateKeyword
} from "@/api/shop";
export default {
  name: "shopCarousel",
  async created() {
    const res = await getCategory();
    res.data.forEach(item => {
      this.options.push({ cateID: item.id, label: item.name });
    });

    await this.fetchCarousels();
  },
  data() {
    return {
      options: [],
      activeName: "0",
      cateID: 1,
      carousels: []
    };
  },
  methods: {
    handleTabClick(tab) {},
    async fetchCarousels() {
      this.carousels = [];
      for (let i = 0; i < 4; i++) {
        this.$set(this.carousels, i, {
          url: this.$store.getters.noImg,
          keyword: "",
          id: 0
        });
      }
      (await getCarousels(this.cateID)).data
        .slice(0, 4)
        .forEach((item, index) => {
          this.$set(this.carousels, index, item);
        });
    },
    handleClick(index) {
      const name = `image${index}`;
      try {
        this.$refs[name].click();
      } catch (e) {
        this.$refs[name][0].click();
      }
    },
    async submitKeyword(index) {
      try {
        if (!this.carousels[index].id) {
          console.log("更完成本类目上传图片后并刷新后，再回来更新关键字");
          return;
        }
        await updateKeyword(
          this.carousels[index].id,
          this.carousels[index].keyword
        );
      } catch (e) {
        console.error(e);
      }
    },
    async handleUploadCarouselImage(index, e) {
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
        this.$set(this.carousels, index, { url: e.target.result });
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", this.carousels[index].id);
      formData.append("cateID", this.cateID);
      const res = await uploadCarouselImage(formData);
    }
  }
};
</script>
