<template>
  <div>
    <!-- 食品生鲜 -->
    <v-container fluid>
      <v-layout>
        <v-flex xs1 lg2></v-flex>
        <v-flex xs10 lg8 class="banner-container">
          <span class="left"></span>
          <v-carousel hide-delimiters height="400">
            <v-carousel-item v-for="(item,i) in bannerImage" :key="i" :src="item.src">
              <router-link :to="`goods?goods_id=${item.target}&category=food`"></router-link>
            </v-carousel-item>
          </v-carousel>
          <span class="right"></span>
        </v-flex>
        <v-flex xs1 lg2></v-flex>
      </v-layout>
    </v-container>

    <GoodsList :goods="goods" fromView="food" @changePage="handleChangePage"/>
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
      const res = await getCarousels(2);
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
      goods: []
    };
  },
  methods: {
    async fetchGoodsList(page) {
      const res = await getGoodsList(2, page);
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
<style scoped>
.banner-container {
  position: relative;
}
.banner-container .left {
  position: absolute;
  left: -150px;
  bottom: 0;
  height: 200px;
  width: 200px;
  display: inline-block;
  background: url("../../assets/images/shop/food/right_bg.png") no-repeat left
    bottom;
  background-size: 150%;
  z-index: -10;
}
.banner-container .right {
  position: absolute;
  right: -150px;
  bottom: 0;
  height: 220px;
  width: 200px;
  display: inline-block;
  background: url("../../assets/images/shop/food/left_bg2.png") no-repeat right
    bottom;
  background-size: 90%;
  transform: rotateY(180deg);
  z-index: -10;
}

>>> .v-responsive__content {
  display: flex;
}
>>> .v-responsive__content a {
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 960px) {
  .v-window.v-carousel {
    height: 300px !important;
  }
  >>> .v-window-item .v-image {
    height: 300px !important;
  }
}
@media screen and (min-width: 960px) {
  .v-window.v-carousel {
    height: 400px !important;
  }
  >>> .v-window-item .v-image {
    height: 400px !important;
  }
}
</style>
