<template>
  <div>
    <v-toolbar flat color="white">
      <v-layout row fill-height justify-center>
        <v-flex xs12 md2 class="d-f align-center">
          <v-icon size="30px" color="blue darken-1">fa-home</v-icon>&nbsp;
          <span class="headline text-truncate">中北路社区</span>
        </v-flex>
        <v-flex xs12 md8>
          <v-toolbar-items style="height:100%">
            <v-btn
              flat
              class="nav"
              v-for="(item,index) in items"
              :key="index"
              :to="item.to"
            >{{item.text}}</v-btn>
          </v-toolbar-items>
        </v-flex>
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
        { to: "/post", text: "社区热论" },
        { to: "/news", text: "社区头条" },
        { to: "/shopping", text: "拼购商城" }
      ]
    };
  }
};
</script>
<style scoped>
@media screen and (max-width: 800px) {
  .v-btn {
    width: 100px;
  }
}
@media screen and (max-width: 1280px) {
  .v-btn {
    width: 140px;
  }
}
@media screen and (min-width: 1280px) {
  .v-btn {
    width: 200px;
  }
}

.v-btn--active {
  background-color: #57b2fdc7;
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
