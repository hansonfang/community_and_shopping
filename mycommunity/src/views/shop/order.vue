<template>
  <v-container>
    <RecevierAddress @addressChange="handleChange"/>
    <div v-if="Number(from)===1">
      <v-subheader>确认拼购信息</v-subheader>
      <v-divider></v-divider>

      <v-layout row class="py-2 pt-4">
        <v-flex xs12>
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
    </div>

    <v-subheader>确认订单信息</v-subheader>
    <v-divider></v-divider>
    <v-layout v-for="(item,index) in goods" :key="index" style="max-height:100px;" class="mt-3">
      <v-flex xs2>
        <v-img :src="item.image" max-height="80" contain></v-img>
      </v-flex>
      <v-flex xs5 class="d-f align-center">
        <h4>{{item.title}}</h4>
      </v-flex>
      <v-flex xs1 class="d-f align-center">
        <h4>{{sku.name}}</h4>
      </v-flex>
      <v-flex xs1 class="align-center d-f">
        <div class="red--text">
          <span class="caption">￥</span>
          <span class="body-1">{{item.groupPrice}}</span>
        </div>
      </v-flex>
      <v-flex xs2>
        <count v-model="item.goodsCount"/>
      </v-flex>
      <v-flex xs1 class="align-center d-f">￥{{item.singlePrice}}</v-flex>
    </v-layout>
    <div class="text-xs-right mt-5">
      <span class="red--text">总价￥</span>
      <span class="red--text headline">{{total}}</span>
    </div>
    <div class="text-xs-center pt-5">
      <v-btn color="primary" @click="submitOrder">提交订单</v-btn>
    </div>
  </v-container>
</template>
<script>
import Count from "@/components/Tool/Count";
import RecevierAddress from "@/components/Shop/Address";
import { getGoodsDetail, singleSubmit } from "~/shopping";
export default {
  name: "shopOrder",
  components: {
    Count,
    RecevierAddress
  },
  async created() {
    this.from = this.$route.query.from;
    this.goodsId = this.$route.query.id;
    this.skuid = this.$route.query.skuid;
    if (!this.skuid || this.skuid === "undefined") {
      this.$snackbar({
        text: "请返回选择商品品类！",
        color: "error",
        duration: 3000
      }).then(() => {
        this.$router.go(-1);
      });
    }

    const res = await getGoodsDetail(this.goodsId);
    const data = res.data.data;
    const s = data.product_skus.filter(
      sku => Number(sku.id) === Number(this.skuid)
    );
    this.sku = s[0];
    this.goods[0] = {
      image: data.mainImage,
      title: data.name,
      singlePrice: this.sku.price,
      groupPrice: this.sku.groupPrice,
      goodsId: this.sku.id,
      goodsCount: 1,
      goodsLeft: this.sku.stock
    };
  },
  data() {
    return {
      from: 0, //0单买    1拼购     2购物车
      goodsId: 0,

      receiverCode: 3,

      sku: {},
      skuid: 0,

      goods: []
    };
  },
  methods: {
    async submitOrder() {
      try {
        if (Number(this.from) === 0) {
          const data = {
            skuID: this.skuid,
            count: this.goods[0].goodsCount,
            addressID: this.receiverCode
          };
          if (isNaN(data.skuID) || !data.count || !data.addressID) {
            this.$snackbar({ text: "请完善订单信息", color: "error" });
          } else {
            const res = await singleSubmit(data);
            this.$log.debug(res.data);
            this.$snackbar({ text: "下单成功！" });
          }
        }
      } catch (error) {
        this.$log.error(error);
      }
    },
    handleChange(v) {
      this.receiverCode = v;
    }
  },
  computed: {
    total() {
      if (Number(this.from) === 0) {
        return this.sku.price;
      } else return 0;
    }
  }
};
</script>
<style>
.receiver > span {
  margin-left: 20px;
}
.accent--text .v-label {
  color: black !important;
  border: 2px solid #fb8320;
  /* box-shadow: 2px 2px 4px #f05a00; */
  border-radius: 3px;
  padding: 8px;
  position: relative;
}
</style>
