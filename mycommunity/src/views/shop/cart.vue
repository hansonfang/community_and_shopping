<template>
  <v-container class="mt-5" fluid>
    <v-subheader>全部商品 {{cartItems.length}}</v-subheader>
    <v-layout row nowrap class="grey lighten-3 pl-2">
      <v-flex xs2>
        <v-checkbox v-model="selectAll" label="全选"></v-checkbox>
      </v-flex>
      <v-flex xs5 class="d-f align-center">商品</v-flex>
      <v-flex xs1 class="d-f align-center">版本</v-flex>
      <v-flex xs1 class="d-f align-center">单价</v-flex>
      <v-flex xs2 class="d-f align-center">数量</v-flex>
      <v-flex xs1 class="d-f align-center">小计</v-flex>
    </v-layout>
    <v-layout
      row
      nowrap
      v-for="(item,index) in cartItems"
      :key="index"
      class="pl-2 d-f align-center"
      style="min-height:150px"
    >
      <v-flex md2 class="d-f align-center">
        <v-checkbox v-model="item.check"></v-checkbox>
        <div class="pa-1 d-f justify-start" style="flex-grow:2">
          <v-img contain :src="item.image" height="120" width="120" style="flex:unset;"></v-img>
        </div>
      </v-flex>
      <v-flex md5 class="d-f align-center">{{item.subtitle}}</v-flex>
      <v-flex md1 class="d-f align-center">{{item.version}}</v-flex>
      <v-flex md1 class="d-f align-center">
        <span class="red--text">￥{{item.price}}</span>
      </v-flex>
      <v-flex md1 class="d-f align-center">{{item.count}}</v-flex>
      <v-flex md1 class="d-f align-center">
        <span class="red--text">￥{{item.totalPrice}}</span>
      </v-flex>
      <v-flex md1 class="d-f align-center">
        <v-btn @click="deleteGoods(item.skuId)">删除</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row nowrap class="mt-5">
      <v-flex md1>
        <span class="red--text headline">￥{{this.totalPrice}}</span>
      </v-flex>
      <v-flex xs1 md8></v-flex>
      <v-flex xs10 md2 class="text-xs-center">
        <v-btn color="orange" dark block @click="goToOrder()">去结算</v-btn>
        <v-dialog v-model="pickAddressDialog" max-width="550">
          <v-card>
            <v-card-title class="headline">选择地址</v-card-title>

            <v-card-text>
              <RecevierAddress @addressChange="handleAddressChange"/>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="darken-1" flat="flat" @click="pickAddressDialog = false">取消</v-btn>

              <v-btn color="green darken-1" flat="flat" @click="submitOrder">确定</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { getCartList, deleteGoods, orderMulti } from "~/shopping";
import RecevierAddress from "@/components/Shop/Address";

export default {
  name: "cart",
  components: {
    RecevierAddress
  },
  async created() {
    try {
      await this.updateCartList();
    } catch (error) {
      this.$log.error(error);
    }
  },
  data() {
    return {
      selectAll: false,
      cartItems: [],
      selectedItems: {
        //选定的商品，待进入订单提交页
      },
      pickAddressDialog: false,
      addressID: 0
    };
  },
  watch: {
    selectAll(newVal) {
      this.cartItems.forEach(item => {
        item.check = newVal;
      });
    }
  },
  methods: {
    goToOrder() {
      this.pickAddressDialog = true;
      this.selectedItems = this.cartItems.filter(item => item.check);
    },
    async submitOrder() {
      const goods = {};
      this.selectedItems.forEach(item => {
        goods[item.skuId] = item.count;
      });
      try {
        await orderMulti(goods, this.addressID);
        this.$snackbar({ text: "提交订单成功" });
      } catch (error) {
        this.$log.error(error.response);
      }
    },
    async deleteGoods(skuId) {
      try {
        await deleteGoods(skuId);
        this.$snackbar({ text: "删除成功" });
        await this.updateCartList();
      } catch (error) {
        this.$log.error(error.response);
      }
    },
    async updateCartList() {
      try {
        const data = (await getCartList()).data;
        this.cartItems = [];
        data.data.cartItems.forEach(item => {
          this.cartItems.push({
            image: item.subImage.split(",")[0],
            productId: item.productId,
            skuId: item.skuId,
            name: item.name,
            subtitle: item.subtitle,
            isChecked: 1,
            price: item.price,
            count: item.count,
            totalPrice: item.totalPrice,
            check: item.check
          });
        });
      } catch (error) {
        this.$log.error(error.response);
      }
    },
    async handleAddressChange(v) {
      this.addressID = v;
    }
  },
  computed: {
    totalPrice() {
      let s = 0;
      this.cartItems.forEach(item => {
        if (item.check) s += item.totalPrice;
      });
      return s;
    }
  }
};
</script>
