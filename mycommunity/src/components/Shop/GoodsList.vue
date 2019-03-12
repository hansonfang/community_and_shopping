<template>
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex xs1 lg2></v-flex>
        <v-flex xs10 lg8 class="banner-container">
          <span class="left"></span>
          <v-carousel hide-delimiters height="400">
            <v-carousel-item v-for="(item,i) in bannerImage" :key="i" :src="item.src">
              <router-link :to="`/${item.target}`"></router-link>
            </v-carousel-item>
          </v-carousel>
          <span class="right"></span>
        </v-flex>
        <v-flex xs1 lg2></v-flex>
      </v-layout>
    </v-container>

    <v-container fluid>
      <v-layout>
        <v-flex xs1 lg2></v-flex>
        <v-flex xs10 lg8>
          <!-- 排序导航按钮 -->
          <v-layout>
            <v-flex>
              <v-btn-toggle v-model="icon" active-class="active-btn" mandatory>
                <v-btn flat value="sales">
                  <span>销量</span>
                  <v-icon>fas fa-sort-down</v-icon>
                </v-btn>
                <v-btn flat value="pop">
                  <span>好评率</span>
                  <v-icon>fas fa-sort-down</v-icon>
                </v-btn>
                <v-btn flat value="price" @click="togglePrice()">
                  <span>价格</span>
                  <v-icon>{{`fas fa-sort-${priceSort}`}}</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>

          <!-- 商品列表 -->
          <v-layout row wrap class="goods-list">
            <v-flex xs12 sm6 md4 lg3 v-for="(item,index) in goods" :key="index">
              <v-hover>
                <v-card slot-scope="{ hover }" class="mx-auto good-card" color="grey lighten-4">
                  <v-img :aspect-ratio="5/6" :src="item.image" contain min-height="200"></v-img>
                  <v-card-text class="pt-4" style="position: relative;">
                    <v-btn absolute color="red lighten-1" class="white--text" fab right top>
                      <v-icon>fas fa-shopping-cart</v-icon>
                    </v-btn>
                    <h3 class="body-1 font-weight-light black--text mb-1 goods-title">{{item.title}}</h3>
                    <h4 class="group-price red--text headline">
                      <span class="subheading">￥</span>
                      {{item.groupPrice}}
                    </h4>
                    <div class="d-f grey--text justify-space-between">
                      <span>
                        <span class="indigo--text darken-3 font-weight-bold">{{item.comments}}</span>条评价
                      </span>
                      <span>
                        <span class="indigo--text darken-3 font-weight-bold">{{item.sales}}</span>件已售出
                      </span>
                    </div>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out mask darken-2 v-card--reveal display-3 white--text"
                        style
                      >
                        <v-btn color="red" round dark class="font-weight-bold" v-if="!service">
                          立刻拼购
                          <span class="body-2">￥</span>
                          {{item.groupPrice}}
                        </v-btn>
                        <v-btn round>
                          单价购买
                          <span class="body-2">￥</span>
                          {{item.singlePrice}}
                        </v-btn>
                      </div>
                    </v-expand-transition>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs1 lg2></v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "goodslist",
  data() {
    return {
      icon: "sales",
      priceSort: "down", //价格: "down"从高到低, "up"从低到高
      page: 1
    };
  },
  props: {
    bannerImage: {
      type: Array,
      default() {
        () => [];
      }
    },
    goods: {
      type: Array,
      default() {
        () => [];
      }
    },
    fromView: {
      type: String,
      default: ""
    },
    service: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    togglePrice() {
      this.priceSort = this.priceSort === "up" ? "down" : "up";
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
>>> .v-item-group .v-btn {
  color: black;
  opacity: 0.8;
}
>>> .v-item-group .v-btn--active {
  background: rgba(16, 137, 250, 0.9);
  color: white;
}
.goods-list .flex {
  padding: 10px;
}
.v-card.good-card {
}
.v-card .mask {
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(4, 92, 255, 0.4);
  display: flex;
  align-items: center;
}
.goods-title {
  overflow: hidden;
  height: 3.1rem;
}
.v-card .group-price {
}
</style>
