<template>
  <div>
    <v-img :src="newsIndexImage" max-height="500">
      <div class="word headline pt-3 px-3 pb-1">
        <p>【每日一句】"如果不能忠于自己的心，胜负又有什么价值呢?"</p>
        <div class="subheading pb-2 px-3 text-xs-right font-italic">————《塔希里亚故事集》</div>
      </div>
    </v-img>
    <v-tabs fixed-tabs>
      <v-tab to="/news/index">新闻动态</v-tab>
      <v-tab to="/news/propertyA">物业公告</v-tab>
      <v-tab to="/news/communityA">社区公告</v-tab>
    </v-tabs>
    <div class="route-wrapper">
<transition name="fade">
      <router-view></router-view>
    </transition>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "news",
  data() {
    return {
      newsIndexImage: "https://picsum.photos/1920/400?random"
    };
  }
};
</script>
<style scoped>
.v-responsive__content {
  position: relative;
}
.v-responsive__content .word {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
}
@media (max-width: 768px) {
  .v-responsive__content .word {
    display: none;
  }
}
.route-wrapper{
    position: relative;
}
.route-wrapper>div{
    position: absolute;
    top:0;
    width:100%;
}
</style>
