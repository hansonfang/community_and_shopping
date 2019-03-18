<template>
     <div>
    <v-container fluid>
      <v-layout>
        <v-flex
          md2
          xs1
        ></v-flex>
        <v-flex
          md8
          xs10
        >
          <carousel
            autoplay
            centerMode
            loop
            navigationEnabled
            :perPage="1"
            navigationNextLabel="<i class='fas fa-chevron-right'></i>"
            navigationPrevLabel="<i class='fas fa-chevron-left'></i>"
          >
            <slide
              v-for="(image,index) in bannerImage"
              :key="index"
            >
              <router-link :to="`goods?goods_id=${image.target}&category=baby`">
                <v-img :src="image.src"></v-img>
              </router-link>

            </slide>
          </carousel>
        </v-flex>
        <v-flex
          md2
          xs1
        ></v-flex>

      </v-layout>
     
    </v-container>

    <GoodsList
      :goods="goods"
      fromView="baby"
    />
  </div>
</template>

<script>
import GoodsList from "@/components/Shop/GoodsList";

export default {
  name: "shopFood",
  components: {
    GoodsList,
  },
  data() {
    return {
      bannerImage: [
        {
          src: require("@/assets/images/shop/baby/banner1.webp"),
          target: "000001"
        },
        {
          src: require("@/assets/images/shop/baby/banner2.webp"),
          target: "000002"
        },
        {
          src: require("@/assets/images/shop/baby/banner3.webp"),
          target: "000003"
        }
      ],
      goods: [
        {
          image: "https://picsum.photos/500/600?random",
          title:
            "元盛 进口整切 牛排套餐 自营生鲜 牛肉生鲜 8连包（西冷*4 眼肉*4）",
          groupPrice: 9,
          singlePrice: 12,
          sales: 90,
          comments: 4,
          id: "000009"
        },
        {
          image: "https://picsum.photos/500/600?random",
          title:
            "四川春见耙耙柑 丑柑橘子 精选优级大果2kg装 单果约150-250g 新鲜",
          groupPrice: 9,
          singlePrice: 12,
          sales: 123,
          comments: 6,
          id: "000012"
        },
        {
          image: "https://picsum.photos/500/600?random",
          title: "烟台红富士苹果 12个 净重2.6kg以上 单果190-240g 一二级混装 ",
          groupPrice: 9,
          singlePrice: 12,
          sales: 3456,
          comments: 64,
          id: "000010"
        },
        {
          image: "https://picsum.photos/500/600?random",
          title: "恒都 澳洲羊排 1200g/袋 进口羊肉 烧烤食材 生鲜自营",
          groupPrice: 9,
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
<style>
.VueCarousel-navigation-prev {
  transform: scale(2) translateX(-100%) translateY(-80%) !important;
}
.VueCarousel-navigation-next {
  transform: scale(2) translateX(100%) translateY(-80%) !important;
}
</style>
