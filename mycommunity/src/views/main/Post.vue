<template>
  <div>
    <v-tabs
      centered
      icons-and-text
    >

      <v-tab
        v-for="(item,index) in drawerItem"
        :key="index"
        :to="item.to"
      >
        {{item.title}}
        <v-icon :color="item.color">{{item.icon}}</v-icon>
      </v-tab>
      <!-- 发帖或投票菜单 -->
      <v-tab key="3">
        <v-menu
          bottom
          class="v-tabs__div"
        >
          <a
            slot="activator"
            class="v-tabs__item"
          > 
            <span>发帖</span>
            <v-icon color="green darken-1">fa-edit</v-icon>
          </a>
          <v-list class="grey lighten-3">
            <v-list-tile @click="navTo('normal')">
              普通帖
            </v-list-tile>
            <v-list-tile @click="navTo('poll')">
              投票贴
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-tab>

    </v-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "post",
  data() {
    return {
      drawerItem: [
        {
          title: "看帖",
          icon: "fa-book-reader",
          to: "/post/index",
          color: "blue darken-1"
        },
        {
          title: "社区好贴",
          icon: "fa-fire-alt",
          to: "/post/best",
          color: "deep-orange"
        }
      ]
    };
  },
  methods: {
    navTo(target) {
      if (target === "poll") this.$router.push("poll");
      else this.$router.push("write");
    }
  }
};
</script>
<style scoped>
.v-navigation-drawer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.v-navigation-drawer .v-list {
  width: 100%;
}
.v-navigation-drawer > .v-list:not(.v-list--dense) .v-list__tile {
  height: 4vw;
}
.v-list__tile__title {
  text-align: right;
}
.v-menu.v-tabs__div {
  justify-content: center;
}
.v-tabs__item:not(.v-tabs__item--active){
  opacity: 1;
}
>>> .v-text-field.v-text-field--solo .v-text-field__slot {
  align-items: unset !important;
}
>>> .v-input__slot {
  align-items: unset !important;
}

>>>.v-menu__activator{
  width:100%;
  height:100%;
}
</style>
