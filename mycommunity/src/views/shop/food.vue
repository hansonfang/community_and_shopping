<template>
  <div>
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

      <GoodsList :goods="goods" fromView="food"/>
  </div>
</template>
<script>
import GoodsList from "@/components/Shop/GoodsList";

export default {
  name: "shopFood",
  components:{
      GoodsList
  },
  data() {
    return {
      bannerImage: [
        {
          src: require("@/assets/images/shop/food/banner1.webp"),
          target: "000001"
        },
        {
          src: require("@/assets/images/shop/food/banner2.webp"),
          target: "000002"
        },
        {
          src: require("@/assets/images/shop/food/banner3.webp"),
          target: "000003"
        }
      ],
      goods: [
        {
          image: "https://img11.360buyimg.com/n7/jfs/t1/28298/39/602/324413/5c0b662bE82592146/588fe63de4eb7d7f.jpg",
          title:
            "元盛 进口整切 牛排套餐 自营生鲜 牛肉生鲜 8连包（西冷*4 眼肉*4）",
          groupPrice: 80,
          singlePrice: 12,
          sales: 90,
          comments: 4,
          id: "000009"
        },
        {
          image: "https://img10.360buyimg.com/n7/jfs/t14992/271/2228757619/212296/d2eeafab/5a7916a2N73162aa2.jpg",
          title:
            "四川春见耙耙柑 丑柑橘子 精选优级大果2kg装 单果约150-250g 新鲜",
          groupPrice: 35,
          singlePrice: 12,
          sales: 123,
          comments: 6,
          id: "000012"
        },
        {
          image: "https://img11.360buyimg.com/n7/jfs/t22957/350/2331533887/547797/e0c3ca7d/5b7cb524N1908eeb6.jpg",
          title: "烟台红富士苹果 12个 净重2.6kg以上 单果190-240g 一二级混装 ",
          groupPrice: 24,
          singlePrice: 12,
          sales: 3456,
          comments: 64,
          id: "000010"
        },
        {
          image: "https://img12.360buyimg.com/n7/jfs/t1/3640/33/118/197897/5b8f7f1bE3daefc2f/b50df7a982ac6ee7.jpg",
          title: "恒都 澳洲羊排 1200g/袋 进口羊肉 烧烤食材 生鲜自营",
          groupPrice: 120,
          singlePrice: 12,
          sales: 154,
          comments: 98,
          id: "000011"
        },
        {
          image: "https://picsum.photos/500/600?random",
          title:
            "福建六鳌红薯 蜜薯 地瓜 2.5kg 红蜜薯 单果重约150g-500g 新鲜蔬菜",
          groupPrice: 9,
          singlePrice: 12,
          sales: 8745,
          comments: 375,
          id: "0000013"
        },
        {
          image: "https://picsum.photos/500/600?random",
          title:
            "京觅·海外直采 泰国活冻黑虎虾（特大号） 850g 17-26只/盒 原装进口",
          groupPrice: 9,
          singlePrice: 12,
          sales: 87643,
          comments: 876,
          id: "0000014"
        },
        {
          image: "https://picsum.photos/500/600?random",
          title:
            "云南高山蜜柑 沃柑 精选优级果2kg装 单果约120-170g 新鲜自营柑橘",
          groupPrice: 9,
          singlePrice: 12,
          sales: 485,
          comments: 37,
          id: "0000015"
        }
      ],

    };
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
