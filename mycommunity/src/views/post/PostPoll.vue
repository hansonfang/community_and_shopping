<template>
  <v-container class="max-width">
    <v-layout row>
      <h2 class="sel-none">
        <v-icon color="green lighten-1" large>fa-poll-h</v-icon>发表投票贴
      </h2>
    </v-layout>
    <v-layout>
      <v-flex xs2></v-flex>
      <v-flex xs8 class="title-poll">
        <h3 class="text-xs-right">你还能输入{{left}}个字</h3>
        <v-text-field label="投票贴标题" type="input" :maxlength="titleMax" v-model="title"></v-text-field>
      </v-flex>
      <v-flex xs2 class="d-flex toggle-detail">
        <v-btn color="green" @click="displayDetail=!displayDetail" flat>添加描述</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-3" v-if="displayDetail">
      <v-textarea
        v-model="text"
        :maxlength="textMax"
        solo
        height="200"
        no-resize
        :hint="`你还能输入${textLeft}个字`"
      ></v-textarea>
    </v-layout>

    <!-- 投票选项 -->
    <v-layout row>
      <h3 class="sel-none">
        <v-icon color="green lighten-1">fa-list-ul</v-icon>投票选项
      </h3>
    </v-layout>
    <v-layout row v-for="item in options" :key="item.index">
      <v-flex xs2 class="d-flex align-center justify-end subheading pr-4">{{item.index}}</v-flex>
      <v-flex xs10>
        <v-text-field
          v-model="item.text"
          :maxlength="optionMaxLen"
          :counter="optionMaxLen"
          box
          height="41px"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs2></v-flex>
      <v-flex xs10 class>
        <v-btn flat class="ma-0" color="green" @click="addOptions">添加选项</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs2></v-flex>
      <v-flex md5 xs12 class="justify-end align-center">
        <span class="pr-3 subheading">选项设置:</span>
        <v-radio-group v-model="singleOrMulti" row class="in-block">
          <v-radio label="单选" value="single"></v-radio>
          <v-radio label="多选" value="multi"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex md5 xs12 class="d-flex justify-end align-center">
        <span class="pr-3 subheading">投票有效期:</span>
        <v-select
          :items="expirationSelections"
          label="选择有效期"
          item-text="time"
          item-value="value"
          v-model="expirationSelection"
          style="width:100px"
          class
        ></v-select>
        <a @click="isCustomDate=true" v-if="!isCustomDate" class="green--text">自定义截止日期</a>
        <v-menu
          v-model="datePickerMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          v-if="isCustomDate"
          class="ml-4"
        >
          <v-text-field
            slot="activator"
            v-model="customDate"
            prepend-icon="fa-calendar-alt"
            readonly
          ></v-text-field>
          <v-date-picker v-model="customDate" locale="zh-cn" @input="datePickerMenu = false"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>

    <div class="body-2 grey--text">你的投票截止到 {{deadline}}</div>
    <v-layout row justify-center>
      <v-btn color="info" @click="submit">发表</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import { createPoll } from "~/post";
export default {
  name: "postpoll",
  data() {
    return {
      title: "",
      text: "",
      titleMax: 40,
      textMax: 2000,
      displayDetail: false,
      options: [
        { text: "", index: 1 },
        { text: "", index: 2 },
        { text: "", index: 3 }
      ],
      optionMaxLen: 25,
      singleOrMulti: "single",
      expirationSelections: [
        { time: "一天", value: "day" },
        { time: "一周", value: "week" },
        { time: "一个月", value: "month" }
      ],
      expirationSelection: "",
      datePickerMenu: false,
      customDate: "",
      isCustomDate: false
    };
  },
  computed: {
    left() {
      const l = this.titleMax - this.title.length;
      return l >= 0 ? l : 0;
    },
    textLeft() {
      const l = this.textMax - this.text.length;
      return l >= 0 ? l : 0;
    },
    deadline() {
      if (this.customDate) {
        return this.customDate;
      } else {
        let date = new Date();
        switch (this.expirationSelection) {
          case "day":
            date.setDate(date.getDate() + 1);
            break;
          case "week":
            date.setDate(date.getDate() + 7);
            break;
          case "month":
            date.setMonth(date.getMonth() + 1);
            break;
        }
        const tm = date.getMonth() + 1;
        const month = tm <= 9 ? "0" + tm : "" + tm;
        const day =
          date.getDate() <= 9 ? "0" + date.getDate() : "" + date.getDate();
        return `${date.getFullYear()}-${month}-${day}`;
      }
    }
  },
  methods: {
    addOptions() {
      const lastIndex = this.options.length;
      this.options.push({ text: "", index: lastIndex + 1 });
      this.options.push({ text: "", index: lastIndex + 2 });
    },
    submit() {
      const options = [];
      this.options.forEach(option => {
        options.push({ content: option.text });
      });
      const data = {
        title: this.title,
        description: this.text,
        validityTime: new Date(this.deadline.split("-").join("/")).getTime(),
        choice: this.singleOrMulti === "single" ? 1 : 2,
        optionList: options
      };
      this.$log.debug(data);
      createPoll(data)
        .then(() => {
          this.$snackbar({ text: "发送成功，正在转向帖子页面。。" }).then(
            () => {
              this.$router.push({ name: "postPollList" });
            }
          );
        })
        .catch(e => {
          this.$snackbar({ text: "发送失败", color: "error", duration: 5000 });
          this.$log.error(e);
        });
    }
  }
};
</script>
<style scoped>
.toggle-detail {
  align-items: center;
}
>>> .v-text-field--box > .v-input__control > .v-input__slot,
.v-text-field--full-width > .v-input__control > .v-input__slot,
.v-text-field--outline > .v-input__control > .v-input__slot {
  min-height: unset;
}
.option-setting {
  justify-content: space-between;
}
.in-block {
  display: inline-block !important;
}
</style>
