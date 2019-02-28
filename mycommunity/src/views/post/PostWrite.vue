<template>
  <v-container class="max-width">
    <v-layout row>
      <h2 class="sel-none">
        <v-icon
          color="orange lighten-1"
          large
        >far fa-edit</v-icon>
        发表新帖
      </h2>
    </v-layout>
    <v-layout column>
      <h3 class="text-xs-right">你还能输入{{left}}个字</h3>
      <v-text-field
        label="帖子标题"
        type="input"
        :maxlength="titleMax"
        v-model="title"
      ></v-text-field>
    </v-layout>
    <v-layout
      row
      d-flex
    >
      <v-flex
        xs1
        align-center
        class="emoji-wrapper"
      >
        <v-icon small>far fa-smile</v-icon>
        <span
          @click="toggleEmoji=!toggleEmoji"
          style="cursor:pointer;"
        >表情</span>
        <VEmojiPicker
          :pack="pack"
          @select="selectEmoji"
          v-if="toggleEmoji"
        />
      </v-flex>
      <v-flex
        xs1
        align-center
      >
        <v-icon small>far fa-image</v-icon>
        <span
          @click="$refs.uploadImg.click()"
          style="cursor:pointer;"
          class="pl-1"
        >图片</span>
        <input
          accept="image/*"
          name="img"
          ref="uploadImg"
          type="file"
          v-show="false"
          @change="onImagePicked"
        >
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex
        md3
        xs6
        v-for="(img,index) in images"
        :key="index"
      >
        <v-img :src="img.src"></v-img>
      </v-flex>
    </v-layout>
    <v-layout
      row
      class="mt-3"
    >
      <v-textarea
        v-model="text"
        :maxlength="textMax"
        solo
        height=250
        no-resize
        :hint="`你还能输入${textLeft}个字`"
      ></v-textarea>
    </v-layout>
    <v-layout
      row
      justify-center
    >
      <v-btn color="info">发表</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import VEmojiPicker from "v-emoji-picker";
import packData from "v-emoji-picker/data/emojis.json";

export default {
  name: "postwrite",
  components: {
    VEmojiPicker
  },
  data() {
    return {
      title: "",
      text: "",
      titleMax: 30,
      textMax: 2000,
      pack: packData,
      toggleEmoji: false,
      images: [],
    };
  },
  computed: {
    left() {
      const l = this.titleMax - this.title.length;
      return l >= 0 ? l : 0;
    },
    textLeft() {
      const l = this.textMax - this.text.length;
      return l >= 0 ? l : 0;
    }
  },
  methods: {
    selectEmoji(emoji) {
      this.text += emoji.emoji;
      this.toggleEmoji = false;
    },
    onImagePicked(e) {
      const files = e.target.files;
      const _this=this;
      if (files[0] !== undefined) {
        if (files[0].name.lastIndexOf(".") <= 0) {
          return;
        }
        this.$log(files);
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          _this.images.push({ src: fr.result, file: files[0] });
          //   this.images[0].src = fr.result;
          //   this.images[0].file = files[0]; // this is an image file that can be sent to server...
          /* 上传图片 */
          const param= new FormData();
          param.append("file", files[0], files[0].name); //通过append向form对象添加数据
          // this.$axios.post()
        });
      }
    }
  },
  created(){
  }
};
</script>
<style scoped>
.max-width {
  max-width: 800px;
}

.emoji-wrapper {
  position: relative;
}
#EmojiPicker {
  position: absolute;
  left: -22vw;
  top: -5vw;
  z-index: 99;
}

</style>
