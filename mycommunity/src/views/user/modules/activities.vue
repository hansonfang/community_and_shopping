<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="(item,i) in orders" :key="i">
        <template v-slot:header>
          <v-layout row nowrap>
            <v-flex md3>订单号:{{item.orderNo}}</v-flex>
            <v-flex md6>下单时间:{{new Date(item.paymentTime).toLocaleString()}}</v-flex>
            <v-flex md3>
              总金额: ￥
              <span class="red--text">{{item.payment}}</span>
            </v-flex>
          </v-layout>
        </template>
        <v-card>
          <v-card-text>
            <v-layout row nowrap v-for="(goods) in item.orderItems" :key="goods.productId">
              <v-flex md3>
                <v-img :src="goods.productImage" aspect-ratio="1" height="200" contain>
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </v-flex>
              <v-flex md9 class="d-f f-col pl-4">
                <h4>{{goods.productName}}</h4>
                <v-textarea v-model="commentModel" solo></v-textarea>
                <v-btn color="info" @click="submitComment(goods.productId)">发表</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
import { getOrderList, submitComment } from "~/shopping";
export default {
  name: "activities",
  async created() {
    try {
      const res = await getOrderList();
      this.orders = res.data.data;
    } catch (error) {
      this.$log.error(error);
    }
  },
  data() {
    return {
      orders: [],
      commentModel: ""
    };
  },
  methods: {
    async submitComment(productId) {
      try {
        await submitComment({ content: this.commentModel, skuId: productId });
        this.$snackbar({ text: "发表评论成功" });
        this.commentModel = "";
      } catch (error) {
        this.$log.error(error);
      }
    }
  }
};
</script>
