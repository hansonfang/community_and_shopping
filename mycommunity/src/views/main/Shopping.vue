<template>
  <div>
    <v-tabs
      v-model="active"
      color="grey lighten-2"
      slider-color="blue"
      fixed-tabs
    >
      <v-tab
        v-for="item in items"
        :key="item.name"
        ripple
        :to="`/shopping/${item.name}`"
      >{{item.title}}</v-tab>

      <!--  -->
    </v-tabs>

    <v-badge v-if="$route.name!=='cart'" style="position:fixed;bottom:20px;right:20px;">
      <template v-slot:badge v-if="cartCount!==0">
        <span>{{cartCount}}</span>
      </template>
      <v-btn
        fab
        dark
        color="red"
         to="cart"
      >
        <v-icon dark style="display:inline-flex;">fas fa-shopping-cart</v-icon>
      </v-btn>
    </v-badge>

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "shopping",
  data() {
    return {
      active: 0,
      items: [
        { title: "食品生鲜", name: "food" },
        { title: "居家好物", name: "home" },
        { title: "母婴馆", name: "baby" },
        { title: "到家服务", name: "service" }
      ],
      cartCount:0
    };
  }
};
</script>
<style scoped>
>>> .v-tabs__container--fixed-tabs .v-tabs__div:last-child {
  margin-right: auto !important;
}
>>> .v-tabs__container--fixed-tabs > .v-tabs__div:last-child {
  margin-right: auto;
}
>>> .v-badge__badge {
  top: 0px;
  left: 0px;
}
</style>
