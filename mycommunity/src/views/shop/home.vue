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
              <router-link :to="`goods?goods_id=${image.target}&category=home`">
                <v-img :src="image.src"></v-img>
              </router-link>
            </slide>
          </carousel>
        </v-flex>
        <v-flex md2 xs1></v-flex>
      </v-layout>
    </v-container>

    <GoodsList :goods="goods" fromView="home" @changePage="handleChangePage"/>
  </div>
</template>
<script>
import GoodsList from "@/components/Shop/GoodsList";
import { getGoodsList, getCarousels } from "~/shopping";

export default {
  name: "shopFood",
  components: {
    GoodsList
  },
  async created() {
    try {
      await this.fetchGoodsList(1);
      const res = await getCarousels(3);
      const images = res.data.data;
      images.forEach(image => {
        this.bannerImage.push({
          src: image.url
        });
      });
    } catch (error) {
      this.$log.error(error);
    }
  },
  data() {
    return {
      bannerImage: [],
      goods: [],
      nextIcon: ""
    };
  },
  methods: {
    async fetchGoodsList(page) {
      const res = await getGoodsList(3, page);
      const data = res.data.data;
      this.goods = [];
      data.forEach(item => {
        const skuOne = item.product_skus[0];
        this.goods.push({
          image: item.mainImage,
          title: item.name,
          groupPrice: skuOne.groupPrice,
          singlePrice: skuOne.price,
          sales: skuOne.sales,
          comments: item.evaluationNums || 0,
          id: item.id
        });
      });
    },
    async handleChangePage(v) {
      try {
        await this.fetchGoodsList(v);
      } catch (error) {
        this.$log.error(error);
      }
    }
  }
};
</script>
<style>
.VueCarousel {
}
.VueCarousel-navigation-prev {
  transform: scale(2) translateX(-100%) translateY(-80%) !important;
}
.VueCarousel-navigation-next {
  transform: scale(2) translateX(100%) translateY(-80%) !important;
}
</style>
