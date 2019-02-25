<template>
  <div>
    <v-carousel
      cycle
      max="100%"
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <CommercialSection
      v-for="(item,index) in commercialSectionItems"
      :key="index"
      :title="item.title"
      :subtitle="item.subtitle"
      :detail="item.detail"
      :image="item.image"
      :divider="index!==commercialSectionItems.length-1"
    />

  </div>
</template>
<script>
import CommercialSection from "../../components/CommercialSection";
export default {
  name: "index",
  components: {
    CommercialSection
  },
  data() {
    return {
      items: [
        { src: "https://picsum.photos/500/1920?random" },
        { src: "https://picsum.photos/500/1920?random" },
        { src: "https://picsum.photos/500/1920?random" },
        { src: "https://picsum.photos/500/1920?random" }
      ],
      commercialSectionItems: [
        {
          title: "智慧社区云平台",
          subtitle: "INTELLIGENT COMMUNITY CLOUD PLATFORM",
          detail:
            "依托智慧社区云平台，智慧应用体系、信息基础体系和运营保障体系，融合传统硬件厂商、中小平台服务商、地产、物业等多方需求，助力企业搭建稳定、安全、可靠的智慧社区平台，助力企业快速实现转型、升级。",
          image: require("../../assets/images/index_idea.png")
        },
        {
          title: "智慧社区整体理念",
          subtitle: "WHOLE IDEA OF INTELLIGENT COMMUNITY",
          detail:
            "智慧社区是指充分利用物联网、云计算、移动互联网等新一代信息技术的集成应用，为社区居民提供一个安全、舒适、便利、和谐的现代化、智慧化生活环境，为运营商提供平台+产品+运营的一整套解决方案，为合作伙伴和客户提供便民、增值、和谐、平安、健康、智能的智慧社区综合平台，从而形成基于信息化、智能化社会管理与服务的一种新的管理形态的社区。",
          image: require("../../assets/images/QQ截图20190225142722.png")
        },
        {
          title: "广告服务",
          subtitle: "advertising service",
          detail:
            "利用社区优势，最大化发挥广告效力。目前我爱我家社区网站提供首页banner图或者内置商城的方式推广您的广告，详情请联系网站管理员",
          image: require("../../assets/images/ad.png")
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>
