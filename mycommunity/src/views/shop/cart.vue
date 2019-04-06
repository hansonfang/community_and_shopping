<template>
  <v-container
    class="mt-5"
    fluid
  >

    <v-subheader>
      全部商品 {{cartItems.length}}
    </v-subheader>
    <v-layout
      row
      nowrap
      class="grey lighten-3 pl-2"
    >
      <v-flex xs2>
        <v-checkbox
          v-model="selectAll"
          label="全选"
        ></v-checkbox>
      </v-flex>
      <v-flex
        xs5
        class="d-f align-center"
      >商品</v-flex>
      <v-flex
        xs1
        class="d-f align-center"
      >版本</v-flex>
      <v-flex
        xs1
        class="d-f align-center"
      >单价</v-flex>
      <v-flex
        xs2
        class="d-f align-center"
      >数量</v-flex>
      <v-flex
        xs1
        class="d-f align-center"
      >小计</v-flex>
    </v-layout>
    <v-layout
      row
      nowrap
      v-for="(item,index) in cartItems"
      :key="index"
      class="pl-2 d-f align-center"
      style="min-height:150px"
    >
      <v-flex
        md2
        class="d-f align-center"
      >
        <v-checkbox v-model="item.check"></v-checkbox>
        <div class="pa-1 d-f justify-start" style="flex-grow:2">
          <v-img
            contain
            :src="item.image"
            height="120"
            width="120"
            style="flex:unset;"
          ></v-img>
        </div>
      </v-flex>
      <v-flex
        md5
        class="d-f align-center"
      >{{item.subtitle}}</v-flex>
      <v-flex
        md1
        class="d-f align-center"
      >{{item.version}}</v-flex>
      <v-flex
        md1
        class="d-f align-center"
      ><span class="red--text">￥{{item.price}}</span></v-flex>
      <v-flex
        md2
        class="d-f align-center"
      >{{item.count}}</v-flex>
      <v-flex
        md1
        class="d-f align-center"
      >
      <span class="red--text">￥{{item.totalPrice}}</span></v-flex>

    </v-layout>
      <v-layout
      row
      nowrap
      class="mt-5"
    >
      <v-flex
        xs1
        md9
      ></v-flex>
      <v-flex
        xs10
        md2
        class="text-xs-center"
      >
        <v-btn color="orange" dark block @click="goToOrder()">
          去结算
        </v-btn>
      </v-flex>
      <v-flex
        xs1
        md1
      ></v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "cart",
  data() {
    return {
      selectAll: false,
      cartItems: [
        {
          image: "https://picsum.photos/150/150?random",
          productId: 1,
          skuId: 123,
          name: "长虹 55D2P 太空灰",
          subtitle:
            "55英寸32核人工智能4K超高清HDR全金属轻薄语音平板LED液晶电视机（浅金色）",
          isChecked: 1,
          price: 5111,
          count: 1000,
          totalPrice: 5111000,
          check: false
        },
        {
          image: "https://picsum.photos/150/150?random",
          productId: 2,
          skuId: 543,
          name: "长虹 55D2P 太空灰",
          subtitle:
            "55英寸32核人工智能4K超高清HDR全金属轻薄语音平板LED液晶电视机（浅金色）",
          isChecked: 1,
          price: 5111,
          count: 1000,
          totalPrice: 5111000,
          check: false
        },
        {
          image: "https://picsum.photos/150/150?random",
          productId: 3,
          skuId: 482,
          name: "长虹 55D2P 太空灰",
          subtitle:
            "55英寸32核人工智能4K超高清HDR全金属轻薄语音平板LED液晶电视机（浅金色）",
          isChecked: 1,
          price: 5111,
          count: 1000,
          totalPrice: 5111000,
          check: false
        }
      ],
      selectedItems:{
          //选定的商品，待进入订单提交页
      }
    };
  },
  watch: {
    selectAll(newVal) {
      this.cartItems.forEach(item => {
        item.check = newVal;
      });
    }
  },
  methods:{
      goToOrder(){
          this.selectedItems=this.cartItems.filter(item=>item.check)
      }
  }
};
</script>
