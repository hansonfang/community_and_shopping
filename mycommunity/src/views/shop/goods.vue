<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex xs12 md6 order-xs2 order-md1 class="px-5">
          <v-carousel height="500">
            <v-carousel-item v-for="(item,i) in image" :key="i" :src="item.src"></v-carousel-item>
          </v-carousel>
          <div class="text-xs-center mt-2">
            <v-btn color="red" outline round v-if="!hasFollow">加关注+</v-btn>
            <v-btn disabled outline round v-else>已关注</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 md6 order-xs1 order-md2>
          <h3 class="my-2 headline font-weight-bold">{{title}}</h3>
          <v-layout row class="py-2">
            <v-flex xs12 md2 class="justify-center d-f align-center">
              <span>商品价格</span>
            </v-flex>
            <v-flex xs12 md10>
              <div class="price d-f">
                <v-chip small outline color="red body-2">{{groupNumber}}人拼</v-chip>
                <span class="group-price red--text text--darken-1 headline">￥{{groupPrice}}</span>
                &nbsp;
                <span
                  class="single-price grey--text text--lighten-1"
                >￥{{singlePrice}}</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row class="py-2">
            <v-flex xs12 md2 class="justify-center d-f align-center">
              <span>选择数量</span>
            </v-flex>
            <v-flex xs12 md10>
              <div class="my-2 d-f align-baseline count">
                <Count v-model="goodsCount" :max="goodsLeft"/>
                <p class="grey--text text--lighten-1">
                  剩余库存
                  <span>{{goodsLeft-goodsCount}}</span>
                </p>
                <div></div>
                <div></div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout row class="py-2">
            <v-flex xs12 md2 class="justify-center d-f align-center">
              <span>选择分类</span>
            </v-flex>
            <v-flex xs12 md10>
              <v-btn-toggle v-model="text">
                <v-btn flat value="left">Left</v-btn>
                <v-btn flat value="center">Center</v-btn>
                <v-btn flat value="right">Right</v-btn>
                <v-btn flat value="justify">Justify</v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>
          <v-layout row class="py-2 pt-4">
            <v-flex xs12 md2 class="justify-center d-f align-center">
              <span>正在拼团</span>
            </v-flex>
            <v-flex xs12 md10>
              <div class="group pa-1 mb-4">
                <div class="grey--text pa-1">
                  <p class="mb-0 text-xs-left">剩余时间23:32:18</p>
                </div>
                <div>
                  <div class="text-xs-left">
                    <v-chip>
                      <v-avatar class="teal">
                        <img
                          src="https://picsum.photos/200/200?random"
                          alt="avatar"
                          width="120"
                          height="120"
                        >
                      </v-avatar>Jason Smith
                    </v-chip>
                    <v-chip>
                      <v-avatar class="teal">A</v-avatar>ANZ Bank
                    </v-chip>
                  </div>
                </div>
              </div>
            </v-flex>
          </v-layout>

          <div class="button d-f row">
            <v-btn block color="red white--text mr-2" to="order?type=2">
              <span class="caption">￥</span>132&nbsp;立刻拼购
            </v-btn>
            <v-btn block to="order?type=1">
              <span class="body-1">￥</span>198&nbsp;单价购买
            </v-btn>
          </div>
        </v-flex>
      </v-layout>

      <v-tabs fixed-tabs v-model="tab">
        <v-tab>商品详情</v-tab>
        <v-tab>评价({{commentCount}})</v-tab>
      </v-tabs>

      <v-layout v-if="tab===0" wrap>
        <v-flex xs12 v-for="(image,index) in goodsDetailImage" :key="index">
          <v-img :src="image"></v-img>
        </v-flex>
      </v-layout>
      <div v-else-if="tab===1" class="mx-auto" style="max-width:980px">
        <v-layout nowrap class="px-4 pt-4">
          <v-flex xs1 md2></v-flex>
          <v-flex xs2 md2 class="d-f f-col">
            <span class="percent-tip">好评度</span>
            <div class="red--text percent-num">
              <span>98</span>
              <span class="headline">%</span>
            </div>
          </v-flex>
          <v-flex xs8 class="d-f align-bottom">
            <v-tabs v-model="commentTab">
              <v-tab>好评({{comment.goodCommentCount}})</v-tab>
              <v-tab>中评({{comment.mediumCommentCount}})</v-tab>
              <v-tab>差评({{comment.badCommentCount}})</v-tab>
            </v-tabs>
          </v-flex>
        </v-layout>

        <div>
          <v-layout
            row
            class="d-f box-shadow my-3 pa-3"
            style="min-height:100px;"
            v-for="(item,index) in goodComments"
            :key="index"
          >
            <v-flex xs1>
              <v-avatar color="grey lighten-4" size="60">
                <img :src="item.avatar" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex xs11 class="d-f f-col">
              <div class="d-f row mb-2">
                <span class="font-weight-bold">{{item.name}}</span>
                <v-spacer></v-spacer>
                <span class="grey--text">{{item.date}}</span>
              </div>
              <p>{{item.content}}</p>
            </v-flex>
          </v-layout>
          <v-btn block @click="loadMoreComment('good')">
            <v-icon size="15">fas fa-angle-double-down</v-icon>&nbsp;加载更多
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import Count from "@/components/Tool/Count";

export default {
  name: "goods",
  components: {
    Count
  },
  created() {
    this.tab = parseInt(this.$route.query.tab);
  },
  data() {
    return {
      image: [
        { src: "https://picsum.photos/500/600/?random" },
        { src: "https://picsum.photos/500/600/?random" },
        { src: "https://picsum.photos/500/600/?random" }
      ],
      title: "元盛 进口整切 牛排套餐 自营生鲜 牛肉生鲜 8连包（西冷*4 眼肉*4）",
      hasFollow: false, //是否已经关注商品
      groupNumber: 2, //拼团的人数
      groupPrice: 112, //拼团价格
      singlePrice: 132, //单买价格

      text: "left",
      goodsCount: 1,
      goodsLeft: 24,
      tab: 0,
      goodsDetailImage: [
        "https://picsum.photos/1520/600/?random",
        "https://picsum.photos/1786/800/?random",
        "https://picsum.photos/1920/600/?random",
        "https://picsum.photos/1280/700/?random"
      ],
      commentCount: 231,
      comment: {
        goodCommentCount: 213,
        mediumCommentCount: 23,
        badCommentCount: 2
      },
      goodComments: [
        {
          avatar: "https://picsum.photos/200/200?random",
          name: "Jason Smith",
          content:
            "下午买的，今天中午就到了，物流不用说，超级快，这是京东的最大特点，优点！锅的质量感觉很不错，摸起来手感也很好，希望晚上第一次用它做饭，能给我好印象，做出更好吃的饭！毕竟大品牌，值得信赖！苏泊尔球釜智能电饭煲，外观大气漂亮，按键操作简单，4升容量足够家庭日常使用，球釜锅体厚度适中，好用不粘，容易清洗，烧出的米饭香，好吃。",
          date: "2018-08-21"
        },
        {
          avatar: "https://picsum.photos/200/200?random",
          name: "jd_156140rvz",
          content: "非常好用的手机不错是正品的手机 很好",
          date: "2018-08-22"
        },
        {
          avatar: "https://picsum.photos/200/200?random",
          name: "宏刚闫",
          content: "刚拿到手电池不知道撑几天，拍照挺清晰的 用几天再来评价",
          date: "2018-08-22"
        }
      ],
      commentTab: 0
    };
  },
  computed: {
    query() {
      //商品id由查询参数传入
      return this.$route.query;
    }
  },
  methods: {
    loadMoreComment(comment) {
      switch (comment) {
        case "good": {
          // fetch more good comment
          this.log("good");
          break;
        }
        case "medium": {
          // fetch more medium comment
          this.log("medium");
          break;
        }
        case "bad": {
          // fetch more bad comment
          this.log("bad");
          break;
        }
      }
    }
  }
};
</script>
<style scoped>
.price {
  align-items: flex-end;
}
.single-price {
  text-decoration: line-through;
}
.count > div {
  flex: 1;
}
div.group {
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
}
.percent-tip {
  font-size: 12px;
  color: #666;
  font-weight: 400;
}
.percent-num {
  line-height: 110%;
  font-size: 45px;
  font-family: arial;
}
</style>
