<template>
  <div id="head">
    <v-toolbar color="blue lighten-1" height="28">
      <v-toolbar-title class="body-2">
        <v-icon size="20" color>fas fa-map-marker-alt</v-icon>&nbsp;&nbsp;中北路社区
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/login">登录</v-btn>
        <v-btn flat to="/register">注册</v-btn>
      </v-toolbar-items>
    </v-toolbar>

  </div>
</template>

<script>
export default {
  created() {
  }
 
};
</script>
<style scoped>
div.btn__content {
  padding: 0;
}

.v-btn {
  min-width: 0;
}
div.v-toolbar__title {
  cursor: pointer;
}
div.v-toolbar__title:hover {
  font-weight: 600;
}

.v-card__text{
  padding-bottom: 0;
}
.v-form>.container{
  padding-bottom: 0;
}
</style>
