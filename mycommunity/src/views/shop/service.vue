<template>
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex md2 xs1></v-flex>
        <v-flex md8 xs10>
          <carousel
            autoplay
            centerMode
            loop
            navigationEnabled
            :perPage="1"
            navigationNextLabel="<i class='fas fa-chevron-right'></i>"
            navigationPrevLabel="<i class='fas fa-chevron-left'></i>"
          >
            <slide v-for="(image,index) in bannerImage" :key="index">
              <router-link :to="`goods?goods_id=${image.target}&category=service`">
                <v-img :src="image.src"></v-img>
              </router-link>
            </slide>
          </carousel>
        </v-flex>
        <v-flex md2 xs1></v-flex>
      </v-layout>
    </v-container>

    <GoodsList :goods="goods" fromView="service" :service="true"/>
  </div>
</template>
<script>
import GoodsList from "@/components/Shop/GoodsList";

export default {
  name: "shopFood",
  components: {
    GoodsList
  },
  data() {
    return {
      bannerImage: [
        {
          src: require("@/assets/images/shop/service/banner1.jpg"),
          target: "000001"
        },
        {
          src: require("@/assets/images/shop/service/banner2.jpg"),
          target: "000002"
        }
      ],
      goods: []
    };
  }
};
</script>
<style>
.VueCarousel-navigation-prev {
  transform: scale(2) translateX(-100%) translateY(-80%) !important;
}
.VueCarousel-navigation-next {
  transform: scale(2) translateX(100%) translateY(-80%) !important;
}
</style>
