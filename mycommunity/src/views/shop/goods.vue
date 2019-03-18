<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex
          xs12
          md6
          order-xs2
          order-md1
          class="px-5"
        >
          <v-carousel height="500">
            <v-carousel-item
              v-for="(item,i) in image"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
          <div class="text-xs-center mt-2">
            <v-btn
              color="red"
              outline
              round
            >加关注+</v-btn>
          </div>
        </v-flex>
        <v-flex
          xs12
          md6
          order-xs1
          order-md2
        >
          <h3 class="mt-1 mb-3 headline font-weight-bold">元盛 进口整切 牛排套餐 自营生鲜 牛肉生鲜 8连包（西冷*4 眼肉*4）</h3>
          <div class="price d-f">
            <v-chip
              small
              outline
              color="red body-2"
            >2人拼</v-chip>
            <span class="group-price red--text text--darken-1 headline">￥132</span>
            &nbsp;
            <span class="single-price grey--text text--lighten-1">￥198</span>
          </div>
          <div class="my-4 px-5 text-xs-center">
              <v-text-field
            label="Regular"
            type="number"
            v-model="count"
            class="mx-5"
            :counter="26"
            hint="还剩下7件"
          ></v-text-field>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>

export default {
  name: "goods",
  components:{
  },
  data() {
    return {
      image: [
        { src: "https://picsum.photos/500/600/?random" },
        { src: "https://picsum.photos/500/600/?random" },
        { src: "https://picsum.photos/500/600/?random" }
      ],
      count:1,
    };
  },
  computed: {
    query() {
      //商品id由查询参数传入
      return this.$route.query;
    }
  }
};
</script>
<style>
.price {
  align-items: flex-end;
}
.single-price {
  text-decoration: line-through;
}
</style>
