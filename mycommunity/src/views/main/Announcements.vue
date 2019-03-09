<template>
  <div>
    <div class="text-xs-center loading" v-show="loading">
      <v-progress-circular :size="120" :width="10" color="grey darken-1" indeterminate>加载中</v-progress-circular>
    </div>
    <v-flex class="pa-4">
      <v-btn large to="/" style="z-index:10;">
        <v-icon color="info" small>fas fa-chevron-left</v-icon>返回
      </v-btn>
    </v-flex>

    <v-container>
      <v-expansion-panel expand>
    <v-expansion-panel-content
      v-for="(item,i) in announcements"
      :key="i"
    >
      <div slot="header">{{item.title}}
         <v-subheader class="light-blue--text text--lighten-1">{{item.date}}</v-subheader>
      </div>
      <v-card>
        <v-card-text>
            {{item.detail}}
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

      <!-- 分页组件 -->
      <div class="text-xs-center pagination">
        <v-pagination v-model="page" :length="maxPage" total-visible="7"></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "moreannouncement",
  data() {
    return {
      loading: true,
      page:1,
      maxPage:15,
      announcements: [
        {
          title: "2月份补缴水费通知",
          date: "2019/02/03",
          detail:
            "没法直视他的舞蹈，令人反胃。性感的顶胯动作可以为舞蹈增添魅力，可是性感不等于骚，他做出来的动作，不是让我脸红心跳，是反胃想吐，明白吗？",
        },
        {
          title: "1月份补缴水费通知",
          date: "2019/01/03",
          detail:
            "这是淘宝造物节走红毯的蔡徐坤，视觉中国拍的图，都说能经过视觉中国检验的才是真帅哥，蔡徐坤显然脸塌下来了，这身材五五分，脸上油腻腻，他嘴巴本来就很厚，香肠嘴，又没气质，这图还没脖子？看起来好猥琐。",
        },
        {
          title: "12月份补缴水费通知",
          date: "2018/12/03",
          detail:
            "基本上是不会同意的，但是就算心理建设时候可以做到以后和家人一刀两断因为够独立，但是请不要说或者做，因为我们是社会人，父母的感情真的不能断，是可以有能力而不能切断的感情，各个层次都是。",
        },
        {
          title: "2月份补缴水费通知",
          date: "2019/02/03",
          detail:
            "没法直视他的舞蹈，令人反胃。性感的顶胯动作可以为舞蹈增添魅力，可是性感不等于骚，他做出来的动作，不是让我脸红心跳，是反胃想吐，明白吗？",
        },
        {
          title: "1月份补缴水费通知",
          date: "2019/01/03",
          detail:
            "这是淘宝造物节走红毯的蔡徐坤，视觉中国拍的图，都说能经过视觉中国检验的才是真帅哥，蔡徐坤显然脸塌下来了，这身材五五分，脸上油腻腻，他嘴巴本来就很厚，香肠嘴，又没气质，这图还没脖子？看起来好猥琐。",
        },
        {
          title: "12月份补缴水费通知",
          date: "2018/12/03",
          detail:
            "基本上是不会同意的，但是就算心理建设时候可以做到以后和家人一刀两断因为够独立，但是请不要说或者做，因为我们是社会人，父母的感情真的不能断，是可以有能力而不能切断的感情，各个层次都是。",
        }
      ],
    };
  },
  mounted() {
    const _this = this;
    setTimeout(function() {
      _this.loading = false;
    }, 2000);
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
  overflow: hidden;
}
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  background: rgba(255,255,255, 0.9);
  padding-top:20vh;
  width: 100%;
  height: 100%;
  z-index: 9;
}

.pagination{
    position: fixed;
    left:0;
    right:0;
    bottom:6vh;
}
.v-expansion-panel{
    margin-bottom:14vh;
}
</style>
