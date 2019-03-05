<template>
  <div>
    <v-container class="main-post">
      <!-- 标题 -->
      <v-layout row>
        <v-flex xs12>
          <div class="v-card d-f align-center">
            <v-chip v-if="isBest" color="red" small dark>精品贴</v-chip>
            <h3 style>{{title}}</h3>
            <v-spacer></v-spacer>
            <v-btn flat>只看楼主</v-btn>
            <v-btn flat>收藏</v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row v-for="(detail,index) in details" :key="index">
        <post-detail :detail="detail"></post-detail>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import PostDetail from "@/components/Post/PostDetail";
export default {
  name: "postpage",
  components: { PostDetail },
  data() {
    return {
      id: "",
      title: "马上要去美国出差了，飞机上可以带安眠药和抗抑郁药吗？",
      isBest: true,
      msg:
        "秦翰才的《满宫残照记》里说，溥仪非常喜欢拍各种搞怪的照片。挂灯的那张，为什么我年前进去的时候没有看到阿",
      floor: 1,
      dateTime: "2019-02-27 16:01",
      toggleReplay: false,
      details: [
        {
          avatar: "https://vuetifyjs.com/apple-touch-icon-180x180.png",
          name: "小仙女",
          msg:
            "秦翰才的《满宫残照记》里说，溥仪非常喜欢拍各种搞怪的照片。挂灯的那张，为什么我年前进去的时候没有看到阿",
          isPoster: true,
          poll: {
            multi:false,
            options: [
              { id:"98743",desc: "故宫晚间应该开放", count: 300 },
              { id:"45863",desc: "故宫晚间不应该开放", count: 28 },
              { id:"21348",desc: "无所谓故宫晚间开不开放", count: 119 },
            ]
          },
          floor: 1,
          dateTime: "2019-02-27 16:01"
        },
        {
          avatar: "https://picsum.photos/180/180/?random",
          name: "秋天的吴彦祖",
          hasFollow: true,
          msg: "在故宫附近的煎饼果子非常好吃，下次还会再去的",
          floor: 2,
          dateTime: "2019-02-27 20:51",
          replys: [
            {
              name: "小太阳",
              dateTime: "2019-02-27 20:52",
              to: "秋天的吴彦祖",
              msg: "是门口的老大爷卖的吗"
            },
            {
              name: "阿凯",
              dateTime: "2019-02-27 20:55",
              to: "小太阳",
              msg: "对,那个大爷卖了好多年了"
            },
            {
              name: "秋天的吴彦祖",
              dateTime: "2019-02-27 21:10",
              to: "小太阳",
              msg: "是啊，是他卖的"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.id = this.$route.params.id;
  }
};
</script>
<style scoped>
.triangle {
  display: inline-block;
  position: absolute;
  right: -3px;
  top: 0;
  margin: 0 5px;
  vertical-align: middle;
  width: 60px;
  height: 60px;
  border-bottom: solid 30px #2196f3;
  border-right: solid 30px #2196f3;
  border-left: solid 30px transparent;
  border-top: solid 30px transparent;
  border-radius: 2px;
  transform: rotate(-90deg);
}
.triangle:after {
  content: "楼主";
  color: white;
  text-shadow: 1px 1px 2px white;
  display: inline-block;
  position: relative;
  top: -5px;
  line-height: 1.2;
  transform: rotate(45deg);
}
</style>
