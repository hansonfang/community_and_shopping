<template>
  <div id="head">
    <v-toolbar color="grey lighten-3" height="28">
      <v-toolbar-title class="body-2">
        <v-icon size="20" color>fas fa-map-marker-alt</v-icon>&nbsp;&nbsp;中北路社区
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!username">
        <v-btn flat to="/login">登录</v-btn>
        <v-btn flat to="/register">注册</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark flat v-on="on" style="text-transform:unset;">{{username}}</v-btn>
          </template>
          <v-list>
            <v-list-tile to="/userinfo">
              <v-list-tile-title white>个人中心</v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click="logout()">
              <v-list-tile-title>
                <v-icon class="mr-1">fas fa-sign-out-alt</v-icon>退出
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {};
  },
  methods: {
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
  computed: {
    username() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.nickname;
      } else return "";
    }
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

.v-card__text {
  padding-bottom: 0;
}
.v-form > .container {
  padding-bottom: 0;
}
</style>
