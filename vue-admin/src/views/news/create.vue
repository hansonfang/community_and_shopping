<template>
  <div class="mx-4">
    <el-row :gutter="10" class="mb-1">
      <el-col :span="4">
        <h3 class="text-right">主题图:</h3>
      </el-col>
      <el-col :span="16">
        <el-image
          v-if="headlineImage"
          :src="headlineImage"
          fit="contain"
          @click.native="pickImage('h')"
          style="cursor:pointer;height:200px;"
        ></el-image>
        <input
          type="file"
          style="display: none"
          ref="imageh"
          accept="image/*"
          @change="handleUploadImage($event)"
        >
      </el-col>
      <el-col :span="4" class="flex flex-column align-center">
        <div class="mb-1">
          <el-radio v-model="carouselID" label="1">1</el-radio>
          <el-radio v-model="carouselID" label="2">2</el-radio>
          <el-radio v-model="carouselID" label="3">3</el-radio>
          <el-radio v-model="carouselID" label="4">4</el-radio>
        </div>

        <el-button type="success" @click="setCarousel">设为首页轮播图</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4">
        <h3 class="text-right">标题:</h3>
      </el-col>
      <el-col :span="20">
        <el-input v-model="title" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4">
        <h3 class="text-right">描述:</h3>
      </el-col>
      <el-col :span="20">
        <el-input v-model="desc" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4">
        <h3 class="text-right">作者:</h3>
      </el-col>
      <el-col :span="20">
        <el-input v-model="author" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" v-for="(section,index) in sections" :key="section.id">
      <el-col :span="4">
        <h3 class="text-right">段落{{index+1}}:</h3>
      </el-col>
      <el-col :span="15">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="sections[index].content"
          class="mb-1"
        ></el-input>
      </el-col>
      <el-col :span="5" @click.native="pickImage(index)">
        <el-button class="block" type="primary" plain v-if="!section.image">
          添加图片
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <el-image
          v-if="section.image"
          :src="section.image"
          fit="contain"
          style="cursor:pointer;height:200px;"
          class="section-image"
        ></el-image>
        <input
          type="file"
          style="display: none"
          :ref="`image${index}`"
          accept="image/*"
          @change="handleUploadSectionImage(index,section.id,$event)"
        >
      </el-col>
    </el-row>

    <el-row class="mb-2">
      <el-col :span="24">
        <el-button class="block" type="success" plain @click="addSection()">
          <i class="el-icon-plus"></i>
          添加段落
        </el-button>
      </el-col>
    </el-row>
    <div class="text-center mb-2">
      <el-button type="primary" @click="submit()">提交</el-button>
    </div>
  </div>
</template>
<script>
import {
  getNewsDetails,
  uploadSectionImage,
  uploadHeadlineImage,
  addSection,
  createNews,
  deleteNews,
  updateContent,
  setCarousel
} from "@/api/news";
export default {
  name: "newsCreate",
  async created() {
    try {
      this.newsID = this.$route.query.newsID || "";
      if (this.newsID) {
        const data = (await getNewsDetails(this.newsID)).data;
        this.isUpdateStatus = true;
        this.headlineImage = data.images || this.$store.getters.noImg;
        this.title = data.title;
        this.desc = data.description;
        this.author = data.author;
        if (data.tb_journalism_contents.length >= 1) {
          this.sections = [];
          data.tb_journalism_contents.forEach(praph => {
            this.sections.push({
              id: praph.id,
              content: praph.content,
              image: praph.image
            });
          });
        }
      } else {
        const res = await createNews(this.$store.getters.communityID);
        this.newsID = res.data.id;
        this.isUpdateStatus = false;
        this.title = "";
        this.desc = "";
        this.sections = [];
      }
    } catch (error) {
      console.error(error);
    }
  },
  async beforeDestroy() {
    //如果是新建新闻并且没有提交，即放弃新建的话：
    if (!this.isUpdateStatus && !this.hasSubmit) {
      await deleteNews([this.newsID]);
    }
  },
  data() {
    return {
      headlineImage: this.$store.getters.noImg,
      title: "",
      desc: "",
      author: "",
      isUpdateStatus: false,
      hasSubmit: false,
      sections: [],
      newsID: "",
      carouselID: 0
    };
  },
  methods: {
    pickImage(id) {
      const name = `image${id}`;
      if (typeof this.$refs[name].click === "function") {
        this.$refs[name].click();
      } else {
        this.$refs[name][0].click();
      }
    },
    async addSection() {
      try {
        const res = await addSection(this.newsID);
        this.sections.push({
          id: res.data.id,
          content: "",
          image: ""
        });
      } catch (error) {
        console.error(error);
      }
    },
    async submit() {
      try {
        if (this.sections instanceof Array && this.sections.length >= 1) {
          await updateContent(
            {
              newsID: this.newsID,
              title: this.title,
              description: this.desc,
              author: this.author
            },
            this.sections
          );
          this.hasSubmit = true;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async setCarousel() {
      if (this.carouselID !== 0) {
        try {
          await setCarousel(this.newsID, this.carouselID);
        } catch (error) {
          console.error(error);
        }
      }
    },
    async handleUploadImage(e) {
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
          this.headlineImage = e.target.result;
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("newsID", this.newsID);
        const res = await uploadHeadlineImage(formData);
      } catch (error) {
        console.error(error);
      }
    },
    async handleUploadSectionImage(index, sectionID, e) {
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
          this.sections[index].image = e.target.result;
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("sectionID", sectionID);
        formData.append("newsID", this.newsID);
        const res = await uploadSectionImage(formData);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style scoped>
</style>
