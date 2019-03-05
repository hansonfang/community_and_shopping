<template>
  <div class="detail">
    <!-- 头像区 -->
    <v-flex xs2>
      <div class="box-shadow avatar-wrapper">
        <div class="d-f f-col align-center" style="position:relative;">
          <div class="triangle" v-if="detail.isPoster"></div>
          <v-avatar color="grey lighten-4" class="mt-3" size="80">
            <img :src="detail.avatar" alt="avatar">
          </v-avatar>
          <h4 class="my-2">{{detail.name}}</h4>
          <v-btn flat color="info" v-if="!detail.hasFollow">
            <v-icon small>fa-plus</v-icon>&nbsp;
            关注此人
          </v-btn>

          <v-btn flat v-else>取消关注</v-btn>
        </div>
      </div>
    </v-flex>
    <!-- 信息区 -->
    <v-flex xs10 class="post-info">
      <div class="d-f box-shadow msg-wrapper f-col" style="position:relative;">
        <div class="pa-2 min-h">
          <p class="pa-4">{{detail.msg}}</p>
          <img src alt>

          <!-- 投票区 -->
          <v-container class="poll" v-if="detail.floor===1&&detail.poll">
            <h4 class="text-xs-center grey--text pt-0 mt-0 mb-3">{{`${detail.poll.multi?"多项选择":"单项选择"}`}}</h4>
            <v-layout
              no-wrap
              row
              class="poll-option"
              v-for="(option,index) in detail.poll.options"
              :key="index"
            >
              <v-flex xs4 class="desc">
                {{option.desc}}
                <span class="grey--text">({{option.count}})</span>
              </v-flex>
              <v-flex xs6>
                <div class="option-width" :style="{width:(option.count/detail.poll.sum)*100+'%'}"></div>
                &nbsp;{{Math.floor((option.count/detail.poll.sum)*100)+'%'}}
              </v-flex>
              <v-flex xs2>
                <!-- 单选时显示 -->
                <v-checkbox
                v-if="!detail.poll.multi"
                  v-model="checkbox"
                  :value="option.id"
                  :disabled="disableAttr(option.id)"
                ></v-checkbox>

                <!-- 多选时显示 -->
                <v-checkbox
                v-if="detail.poll.multi"
                  v-model="checkbox"
                  :value="option.id"
                ></v-checkbox>
              </v-flex>
            </v-layout>
            <div class="d-f justify-center pt-3">
              <v-btn color="info">投票</v-btn>
            </div>
          </v-container>
        </div>

        <div class="msg-footer ma-1">
          <div class="d-f grey--text" style="justify-content:flex-end;align-items:center;">
            <span style="display:inline-block;">{{detail.floor}}楼 {{detail.dateTime}}</span>
            <v-btn
              flat
              small
              color="info"
              style="line-height:unset;"
              @click="toggleReply=!toggleReply"
            >
              <span v-if="toggleReply">收起</span>
              回复{{replyCount}}
            </v-btn>
          </div>
        </div>
        <transition name="slide">
          <div v-if="toggleReply">
            <div class="replys">
              <div class="reply" v-for="(reply,index) in detail.replys" :key="index">
                <p class="reply-msg">
                  <a href="#">{{reply.name}}</a>回复
                  <a href="#">{{reply.to}}</a>
                  :{{reply.msg}}
                </p>
                <div class="reply-foot caption blue-grey--text text--lighten-1">
                  <span>{{reply.dateTime}}</span>
                  <v-btn small flat>回复</v-btn>
                </div>
              </div>
            </div>
            <div>
              <v-textarea class="mx-3" outline name label="回复小仙女:" value></v-textarea>
              <div class="text-xs-right">
                <v-btn color="info">确定</v-btn>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </v-flex>
  </div>
</template>
<script>
export default {
  name: "postdetail",

  data() {
    return {
      toggleReply: false,
      picked: "",
      checkbox: []
    };
  },
  props: {
    detail: {
      type: Object,
      default() {
        return {
          avatar: "",
          name: "",
          hasFollow: false,
          msg: "",
          isPoster: false,
          floor: 1,
          dateTime: "",
          poll: {},
          replys: []
        };
      }
    }
  },
  created() {
    if (this.detail.floor === 1 && this.detail.poll) {
      let optionsSum = 0;
      this.detail.poll.options.forEach(val => {
        optionsSum += val.count;
      });
      this.detail.poll.sum = optionsSum;
    }
  },
  mounted() {},
  computed: {
    replyCount() {
      return this.detail.replys ? `(${this.detail.replys.length})` : "";
    },
    disableAttr() {
      return function(id) {
        if (this.checkbox && this.checkbox[0] === id) {
          return false;
        } else if (this.checkbox.length!==0) {
          return true;
        } else return false;
      };
    }
  },
  methods: {}
};
</script>
<style scoped>
.avatar-wrapper {
  height: 100%;
}
.msg-wrapper {
  justify-content: space-between;
}
.msg-footer {
  /* padding-bottom:20px; */
}
.detail {
  display: flex;
  flex: 1 1 auto;
}
.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: linear;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: linear;
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
>>> .v-text-field__details {
  display: none;
}
.replys {
  width: 70%;
  margin-left: auto;
  margin-right: 15px;
  margin-bottom: 15px;
}
.reply {
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(100, 100, 100, 0.1);
  padding-bottom: 0;
}
.reply-foot {
  text-align: right;
}
.reply:not(:last-child) {
  border-bottom: 1px dotted gray;
}
.reply-foot > .theme--light.v-btn {
  color: #78909c !important;
  font-size: 12px;
}

/* 投票区 */

.poll-option > div {
  align-items: center;
  display: flex;
}
.poll-option > .desc {
  justify-content: flex-end;
  margin-right: 5px;
}
.poll-option {
  height: 30px;
  margin-bottom: 10px;
}
.poll-option .option-width {
  background: rgba(21, 168, 255, 0.6);
  width: 80%;
  height: 100%;
}
</style>
