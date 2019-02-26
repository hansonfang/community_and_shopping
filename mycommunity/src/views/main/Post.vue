<template>
  <div>
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-tile
          two-line
          v-for="item in drawerItem"
          :key="item.title"
          @click=""
        >

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
          to: "/index",
          color: "blue darken-1"
        },
        {
          title: "社区好贴",
          icon: "fa-fire-alt",
          to: "/best",
          color: "deep-orange"
        },
        {
          title: "发帖",
          icon: "fa-edit",
          to: "/write",
          color: "green darken-1"
        }
      ]
    };
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
</style>
