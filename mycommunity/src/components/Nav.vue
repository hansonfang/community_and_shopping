<template>
  <div>
    <v-toolbar color="grey lighten-2">
      <v-layout row fill-height justify-center>
        <v-flex xs2>
          <v-icon size="2vw" color="blue darken-1">fa-home</v-icon>
          <span class="logo">我爱我家</span>
          </v-flex>
        <v-toolbar-items>
          <v-btn
            flat
            class="nav"
            v-for="(item,index) in items"
            :key="index"
            :to="item.to"
          >{{item.text}}</v-btn>
        </v-toolbar-items>
      </v-layout>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      items: [
        { to: "/", text: "首页" },
        { to: "/common", text: "常用功能" },
        { to: "/post", text: "社区贴吧" },
        { to: "/shopping", text: "拼购商城" }
      ]
    };
  }
};
</script>
<style scoped>
@import "../assets/font/font.css"; 
@media screen and (max-width: 800px) {
  .v-btn {
    width: 100px;
  }
}
@media screen and (max-width: 1280px) {
  .v-btn {
    width:140px;
  }
}
@media screen and (min-width: 1280px) {
  .v-btn {
    width:200px;
  }
}
.logo{
  font-family: "简雁翎";
  font-size: 2.5rem;
  align-self: center;
}
.logo:after{
  display: block;
  content:"家人在哪儿,家就在哪儿";
  font-family:"微软雅黑";
  font-size: 1rem;
  font-style: italic;
  color:grey;
  position: absolute;
  bottom:0.1rem;
}
.v-btn--active {
  background-color: #fafafa;
  font-weight: 700;
}
.nav {
  font-size: 1.3rem;
}
.v-btn--active:before,
.v-btn:hover:before,
.v-btn:focus:before {
  background: transparent;
}
</style>
