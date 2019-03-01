<template>
  <div>
    <v-container class="main-post">
      <!-- 标题 -->
      <v-layout row>
        <v-flex xs12>
          <div class="v-card d-f align-center">
            <v-chip
              v-if="isBest"
              color="red"
              small
              dark
            >精品贴</v-chip>
            <h3 style="">{{title}}</h3>
            <v-spacer></v-spacer>
            <v-btn flat>只看楼主</v-btn>
            <v-btn flat>收藏</v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <!-- 头像区 -->
        <v-flex xs2>
          <div class="v-card avatar-wrapper min-h">
              <div class="d-f f-col align-center">
                   <v-avatar color="grey lighten-4" size="80">
              <img
                src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
                alt="avatar"
              >
              <h4>小仙女</h4>
            </v-avatar>
              </div>
           
          </div>
        </v-flex>
        <!-- 信息区 -->
        <v-flex xs10>
          <div class="v-card msg-wrapper min-h">info</div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>
<script>
export default {
  name: "postpage",
  data() {
    return {
      id: "",
      title: "马上要去美国出差了，飞机上可以带安眠药和抗抑郁药吗？",
      isBest: true
    };
  },
  created() {
    this.id = this.$route.params.id;
  }
};
</script>
<style scoped>
</style>
