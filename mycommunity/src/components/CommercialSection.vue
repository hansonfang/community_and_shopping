<template>
  <v-container class="commercial-section text-xs-center py-4">
    <h3 class="display-1 py-1">{{title}}</h3>
    <h2 class="headline py-1 text-uppercase">{{subtitle}}</h2>
    <p class="subheading width-80 py-1">{{detail}}</p>
    <v-img class="mt-3" :src="image" contain height="30vw"></v-img>
    <v-divider v-if="divider"></v-divider>
  </v-container>
</template>
<script>
export default {
  name: "commercialsection",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "智慧社区云平台"
    },
    subtitle: {
      type: String,
      default: "INTELLIGENT COMMUNITY CLOUD PLATFORM"
    },
    detail: {
      type: String,
      default:
        "依托智慧社区云平台，智慧应用体系、信息基础体系和运营保障体系，融合传统硬件厂商、中小平台服务商、地产、物业等多方需求，助力企业搭建稳定、安全、可靠的智慧社区平台，助力企业快速实现转型、升级。"
    },
    image: {
      type: String,
      default: require("../assets/images/index_idea.png")
    },
    divider:{
        type:Boolean,
        default:true,
    }
  }
};
</script>
<style scoped>
.commercial-section {
}
@media (min-width: 768px) {

  .width-80 {
    width: 80%;
    margin: auto 10%;
  }
}

.width-80 {
  color: #666;
  line-height: 32px;
}
.v-divider{
    margin-top: 2vw;
}
</style>
