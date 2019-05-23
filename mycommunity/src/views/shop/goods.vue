<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex xs12 md6 order-xs2 order-md1 class="px-5">
          <v-carousel height="500">
            <v-carousel-item v-for="(item,i) in image" :key="i" :src="item.src"></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex xs12 md6 order-xs1 order-md2>
          <h3 class="my-2 headline font-weight-bold">{{title}}</h3>
          <v-layout row class="py-2">
            <v-flex xs12 md2 class="justify-center d-f align-center">
              <span>商品价格</span>
            </v-flex>
            <v-flex xs12 md10>
              <div class="price d-f">
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
              <v-btn-toggle v-model="text" @change="skuChange">
                <template v-for="item in itemGroup">
                  <v-btn flat :value="item.id" :key="item.id">{{item.text}}</v-btn>
                </template>
              </v-btn-toggle>
            </v-flex>
          </v-layout>
          <div v-if="assemble">
            <v-layout row class="py-2 pt-4" v-for="item in group" :key="item.id">
              <v-flex xs12 md2 class="justify-center d-f align-center">
                <span>正在拼团</span>
              </v-flex>
              <v-flex xs12 md8>
                <div class="group pa-1 mb-4">
                  <div class="d-f justify-between align-center">
                    <v-chip>
                      <v-avatar class="teal">
                        <img
                          src="https://picsum.photos/200/200?random"
                          alt="avatar"
                          width="120"
                          height="120"
                        >
                      </v-avatar>
                      {{item.nickname}}
                    </v-chip>

                    <span>{{item.deadline}}</span>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 md2>
                <v-btn color="error" block @click="pickAddGroupAddressDialog=true">加入团</v-btn>
                <v-dialog v-model="pickAddGroupAddressDialog" max-width="550">
                  <v-card>
                    <v-card-title class="headline">选择地址</v-card-title>

                    <v-card-text>
                      <RecevierAddress @addressChange="handleAddressChange"/>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="darken-1"
                        flat="flat"
                        @click="pickAddGroupAddressDialog = false"
                      >取消</v-btn>

                      <v-btn color="green darken-1" flat="flat" @click="joinGroup(item.id)">确定</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
          </div>

          <div class="button d-f row" style="position:relative;">
            <v-btn block color="red white--text mr-2" @click="pickAddressDialog=true">
              <span class="caption">￥</span>
              {{groupPrice}}&nbsp;创建拼购
            </v-btn>
            <v-dialog v-model="pickAddressDialog" max-width="550">
              <v-card>
                <v-card-title class="headline">选择地址</v-card-title>

                <v-card-text>
                  <RecevierAddress @addressChange="handleAddressChange"/>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="darken-1" flat="flat" @click="pickAddressDialog = false">取消</v-btn>

                  <v-btn color="green darken-1" flat="flat" @click="createGroup">确定</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn block :to="`/shopping/order?from=0&id=${goodsId}&skuid=${text}`">
              <span class="body-1">￥</span>
              {{singlePrice}}&nbsp;单价购买
            </v-btn>
            <v-btn color="red" fab dark small absolute bottom right @click="addCart">
              <v-icon>fas fa-cart-plus</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>

      <v-tabs fixed-tabs v-model="tab">
        <v-tab>商品详情</v-tab>
        <v-tab>评价</v-tab>
      </v-tabs>

      <v-layout v-if="tab===0" wrap>
        <v-flex xs12 v-for="(image,index) in goodsDetailImage" :key="index">
          <v-img :src="image" contain></v-img>
        </v-flex>
      </v-layout>
      <div v-else-if="tab===1" class="mx-auto" style="max-width:980px">
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
          <v-btn block @click="loadMoreComment()">
            <v-icon size="15">fas fa-angle-double-down</v-icon>&nbsp;加载更多
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import Count from "@/components/Tool/Count";
import RecevierAddress from "@/components/Shop/Address";

import {
  getGoodsDetail,
  getAssemble,
  addCart,
  createGroup,
  joinGroup
} from "~/shopping";
export default {
  name: "goods",
  components: {
    Count,
    RecevierAddress
  },
  async created() {
    this.goodsId = this.$route.query.goods_id;
    const res = await getGoodsDetail(this.goodsId);
    const data = res.data.data;
    const subImage = data.subImages.split(",");
    this.image.push({
      src: data.mainImage
    });
    subImage.forEach(image => {
      this.image.push({
        src: image
      });
    });
    this.title = data.name;
    this.goodsDetailImage = subImage;

    this.pickSku(data.product_skus[0]);
    data.comments.forEach(comment => {
      this.goodComments.push({
        avatar: "https://picsum.photos/200/200?random",
        name: comment.nickname,
        content: comment.content,
        date: new Date(comment.commentTime).toLocaleDateString()
      });
    });
    data.product_skus.forEach(skus => {
      this.itemGroup.push({
        id: skus.id,
        text: skus.name,
        singlePrice: skus.price,
        price: skus.price,
        stock: skus.stock,
        groupPrice: skus.groupPrice
      });
    });

    this.refreshAssemble();

    this.groupPersonName = "江爱英";
  },
  data() {
    return {
      image: [],
      title: "",
      groupNumber: "", //拼团的人数
      groupPrice: "", //拼团价格
      singlePrice: "", //单买价格
      goodsId: 0,
      text: "",
      assemble: false,
      goodsCount: 1,
      goodsLeft: 0,
      tab: 0,
      textComment: "",
      groupPersonName: "",
      goodsDetailImage: [
        "https://picsum.photos/1520/600/?random",
        "https://picsum.photos/1786/800/?random",
        "https://picsum.photos/1920/600/?random",
        "https://picsum.photos/1280/700/?random"
      ],
      itemGroup: [],
      goodComments: [],
      commentTab: 0,
      addressID: 0,
      pickAddressDialog: false,
      pickAddGroupAddressDialog: false,
      group: []
    };
  },
  computed: {
    query() {
      //商品id由查询参数传入
      return this.$route.query;
    },
    price() {
      return "9";
    }
  },
  methods: {
    loadMoreComment() {},
    pickSku(sku) {
      this.groupPrice = sku.groupPrice;
      this.singlePrice = sku.price;
      this.goodsLeft = sku.stock;
      this.text = sku.id;
    },
    skuChange(v) {
      const sku = this.itemGroup.filter(skus => skus.id === v);
      this.pickSku(sku[0]);
    },

    async addCart() {
      try {
        const res = await addCart({
          skuID: this.text,
          count: this.goodsCount
        });
        this.$log.debug(res);
        this.$snackbar({ text: "添加购物车成功" });
      } catch (error) {
        this.$log.error(error);
      }
    },
    async goToOrder() {
      try {
        const res = await addCart({
          skuID: this.text,
          count: this.goodsCount
        });
        this.$log.debug(res);
        this.$snackbar({ text: "添加购物车成功" });
      } catch (error) {
        this.$log.error(error);
      }
    },
    async joinGroup(id) {
      try {
        if (this.addressID !== 0) {
          await joinGroup(id, this.text, this.goodsCount, this.addressID);
          this.$snackbar({ text: "拼单成功!", color: "success" });
        } else this.$snackbar({ text: "请选择地址", color: "error" });
      } catch (error) {
        this.$log.error(error);
      }
    },
    async createGroup() {
      this.pickAddressDialog = true;
      try {
        const data = {
          productId: this.text,
          count: this.goodsCount,
          addressID: this.addressID
        };
        if (!data.productId || !data.count || !data.addressID) return;
        await createGroup(data);
        this.pickAddressDialog = false;
        this.$snackbar({ text: "拼单创建成功" });
        this.refreshAssemble();
      } catch (error) {
        this.$log.error(error.response);
      }
    },
    async refreshAssemble() {
      const data_assem = (await getAssemble(this.goodsId)).data;
      if (data_assem.data) {
        this.assemble = true;
        data_assem.data.forEach(item => {
          this.group.push({
            nickname: item.title.split(" ")[0],
            deadline: new Date(item.deadline).toLocaleString(),
            id: item.id,
            productId: item.productId
          });
        });
      }
      this.$log.debug("获取当前商品已有拼单", data_assem);
    },
    handleAddressChange(v) {
      this.addressID = v;
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
