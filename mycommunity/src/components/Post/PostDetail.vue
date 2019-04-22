<template>
  <div class="detail mb-3">
    <!-- 头像区 -->
    <v-layout class="box-shadow">
      <v-flex xs2>
        <div class="d-f f-col align-center" style="position:relative;">
          <div class="triangle" v-if="detail.isPoster"></div>
          <v-avatar color="grey lighten-4" class="mt-3" size="80">
            <img :src="detail.avatar" alt="avatar">
          </v-avatar>
          <h4 class="my-2">{{detail.name}}</h4>
        </div>
      </v-flex>
      <!-- 信息区 -->
      <v-flex xs10 class="post-info d-f">
        <div class="d-f msg-wrapper f-col" style="position:relative;">
          <p class="pa-4">{{detail.msg}}</p>
          <img src alt>

          <!-- 投票区 -->
          <v-container class="poll" v-if="detail.floor===1&&detail.poll">
            <h4
              class="text-xs-center grey--text pt-0 mt-0 mb-3"
            >{{`${detail.poll.multi?"多项选择":"单项选择"}`}}</h4>
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
                <v-checkbox v-if="detail.poll.multi" v-model="checkbox" :value="option.id"></v-checkbox>
              </v-flex>
            </v-layout>
            <div class="d-f justify-center pt-3">
              <v-btn color="info">投票</v-btn>
            </div>
          </v-container>
        </div>

        <div class="msg-footer ma-1 pt-5">
          <div class="d-f grey--text" style="justify-content:flex-end;align-items:center;">
            <span style="display:inline-block;">{{detail.floor}}楼 {{detail.dateTime}}</span>
          </div>
        </div>
      </v-flex>
    </v-layout>
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
  computed: {
    disableAttr() {
      return function(id) {
        if (this.checkbox && this.checkbox[0] === id) {
          return false;
        } else if (this.checkbox.length !== 0) {
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
.post-info {
  flex-direction: column;
  justify-content: space-between;
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
