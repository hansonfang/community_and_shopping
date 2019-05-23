<template>
  <div>
    <v-container class="main-post">
      <!-- 标题 -->
      <v-layout row>
        <v-flex xs12>
          <div class="v-card d-f align-center">
            <h3 style class="pl-5">{{title}}</h3>
            <v-spacer></v-spacer>
            <!-- <v-btn flat>只看楼主</v-btn>
            <v-btn flat>收藏</v-btn> -->
          </div>
        </v-flex>
      </v-layout>
      <v-layout row v-for="(detail,index) in details" :key="index">
        <post-detail :detail="detail"></post-detail>
      </v-layout>
      <v-layout row class="mt-5 reply-wrapper">
        <v-textarea
          v-model="replyText"
          v-validate="'max:300'"
          data-vv-name="reply"
          :error-messages="errors.collect('reply')"
          :maxlength="300"
          outline
          height="250"
          no-resize
        ></v-textarea>
      </v-layout>
      <div class="d-f justify-between">
        <div class="emoji-wrapper">
          <!-- <v-icon small>far fa-smile</v-icon>
          <span @click="toggleEmoji=!toggleEmoji" style="cursor:pointer;">表情</span>
          <VEmojiPicker :pack="pack" @select="selectEmoji" v-if="toggleEmoji"/>-->
        </div>
        <v-btn color="info" @click="reply">回复</v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import PostDetail from "@/components/Post/PostDetail";
import { getPostDetail, replyPost, getPollDetail } from "~/post";
export default {
  name: "postpage",
  components: { PostDetail },
  created() {
    this.id = this.$route.params.id;
    this.poll = this.$route.query.type === "poll";
    if (!this.poll) {
      getPostDetail(this.id)
        .then(res => {
          const data = res.data.data;
          this.$log.debug(res.data);
          this.title = data.post_news.title;
          let floor = 1;
          this.details.push({
            avatar: "https://picsum.photos/180/180/?image=113",
            name: "hanson",
            msg: data.post_news.description,
            isPoster: true,
            floor: floor++,
            dateTime: ""
          });
          data.post_replys.forEach(item => {
            this.$log.debug(item);
            this.details.push({
              avatar: `https://picsum.photos/180/180/?image=113`,
              name: "hanson",
              msg: item.content,
              floor: floor++,
              dateTime: this.functions.formatTime(item.replyTime).dayTime
            });
          });
        })
        .catch(e => {
          this.$snackbar({
            text: "获取帖子详情错误",
            color: "error",
            duraion: 5000
          });
          this.$log.error(e);
        });
    } else {
      getPollDetail(this.id)
        .then(res => {
          const data = res.data.data;
          this.title = data.title;
          this.details.push({
            avatar: "https://picsum.photos/150/150?random",
            name: "hanson" + data.user_id,
            msg: data.description,
            isPoster: true,
            floor: 1,
            dateTime: this.functions.formatTime(
              new Date(data.validityTime).getTime()
            ).dayTime,
            poll: {}
          });
          const poll = this.details[0]["poll"];
          poll.multi = data.choice === 2;
          poll.options = [];
          data["tb_vote_options"].forEach(option => {
            poll.options.push({
              id: option.id,
              desc: option.content,
              count: option.voteNums
            });
            // console.log(option);
          });
        })
        .catch(e => {
          this.$log.error(e);
        });
    }
  },
  data() {
    return {
      id: "",
      title: "",
      replyText: "",
      details: [],
      temp: {
        avatar: "",
        name: "",
        msg: "",
        isPoster: true,
        poll: {
          multi: false,
          options: [{ id: "98743", desc: "故宫晚间应该开放", count: 300 }]
        },
        floor: 1,
        dateTime: "2019-02-27 16:01"
      }
    };
  },
  methods: {
    reply() {
      const data = {
        replyText: this.replyText,
        postId: this.id
      };
      replyPost(data)
        .then(() => {
          this.$snackbar({
            text: "回帖成功",
            duraion: 1000
          }).then(() => {
            this.$router.go(0);
          });
        })
        .catch(e => {
          this.$snackbar({ text: "发生错误", color: "error" });
          this.$log.error(e.response);
        });
    }
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
.emoji-wrapper {
  position: relative;
}
#EmojiPicker {
  position: absolute;
  top: -400px;
}
</style>
