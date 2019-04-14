<template>
  <div>
  <div id="head" style="position:relative;z-index:99" @mouseleave="list=false">
    <v-toolbar
      color="grey lighten-3"
      height="28"
      
    >
      <v-toolbar-title class="body-2">
        <v-icon
          size="20"
          color
        >fas fa-map-marker-alt</v-icon>&nbsp;&nbsp;中北路社区
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if="username.length===0">
        <v-btn
          flat
          to="/login"
        >登录</v-btn>
        <v-btn
          flat
          to="/register"
        >注册</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else style="position:relative;">
        <v-btn
          color="primary"
          dark
          flat
          @click="list=!list"
          style="text-transform:unset;"
        >{{username}}</v-btn>
        <v-list v-if="list" style="position:absolute;margin-top:27px;right:0;z-index:99">
          <v-list-tile to="/userinfo" @click="list=false">
            <v-list-tile-title white>个人中心</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="logout();list=false">
            <v-list-tile-title>
              <v-icon class="mr-1">fas fa-sign-out-alt</v-icon>退出
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar-items>
    </v-toolbar>
  </div>

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
  created(){
    this.list=false;
  },
  data() {
    return {
      list: false,
      items: [
        { to: "/", text: "首页" },
        { to: "/post", text: "社区热论" },
        { to: "/news", text: "社区头条" },
        { to: "/shopping", text: "拼购商城" }
      ]
    };
  },
  methods:{
    logout() {
      this.$store
        .dispatch("LogOut")
        .then(res => {
          if (res.data.status === 200) {
            this.bus.$emit("hint", {
              color: "success",
              text: res.data.message,
              timeout: 2000
            });
          }
          this.$router.push("/");
        })
        .catch(e => {
          this.$log.error(e.response);
        });
    }
  },
  computed:{
    username() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.nickname;
      } else return "";
    }
  }
};
</script>
<style scoped>
/* .theme--light.v-toolbar{
  background-color: 
} */
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
