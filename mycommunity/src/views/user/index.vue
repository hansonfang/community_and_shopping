<template>
  <v-container>
    <v-layout row nowrap class="info-wrapper py-5">
      <v-flex xs4 class="justify-end d-f">
        <div style="position:relative;">
          <v-avatar size="160" color="grey lighten-2">
            <img src="https://picsum.photos/180/180?random" alt>
          </v-avatar>
          <v-icon class="avatar-indacater" size="30">fas fa-pen</v-icon>
        </div>
      </v-flex>
      <v-flex xs8 class="justify-space-between d-f f-col ml-5">
        <h3 class="display-1">Hansonfang</h3>
        <p class="title grey--text lighten-2 my-3">男 | 中北路社区</p>
        <div v-if="!modifyMotto" style="position:relative;">
          <v-btn flat @click="modifyMotto=true" style="position:absolute;right:-30px;top:-30px;">
            <v-icon color="orange">fas fa-edit</v-icon>
          </v-btn>
          <p class="subheading grey--text lighten-2">{{user.motto}}</p>
        </div>
        <div v-else style="position:relative;">
          <v-btn flat @click="modifyMotto=false" style="position:absolute;right:-30px;top:-30px;">
            <v-icon color="primary">fas fa-check</v-icon>
          </v-btn>
          <v-textarea v-model="user.motto"></v-textarea>
        </div>
      </v-flex>
    </v-layout>
    <div class="content-wrapper">
      <v-tabs fixed-tabs centered>
        <v-tab to="activities">
          <v-icon size="18" class="mr-2">fas fa-shoe-prints</v-icon>动态
        </v-tab>
        <v-tab to="info">
          <v-icon size="18" class="mr-2">fas fa-user-cog</v-icon>个人资料
        </v-tab>
      </v-tabs>

      <router-view></router-view>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "userIndex",
  data() {
    return {
      modifyMotto: false,
      user: {
        motto:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta veritatis modi quae officiis praesentium? Accusantium nihil placeat beatae magni inventore numquam ipsam illo ex odit voluptate. Fugiat soluta at error?"
      }
    };
  }
};
</script>
<style scoped>
.v-tabs__item--active .fa-shoe-prints {
  color: #1e88e5;
}
.v-tabs__item--active .fa-clipboard-list {
  color: #00b92e;
}
.v-tabs__item--active .fa-user-cog {
  color: #e5781e;
}
.content-wrapper {
  max-width: 800px;
  margin: 20px auto;
}
.avatar-indacater {
  color: black;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  opacity: 0.6;
  background: rgba(255, 255, 255, 0.521);
}
.avatar-indacater:hover {
  cursor: pointer;
  opacity: 1;
}
</style>
