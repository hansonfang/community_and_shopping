<template>
  <div class="service-box">
    <v-card-title class="justify-between">
      <span class="f-1"></span>
      <span class="headline f-1">报修服务</span>
      <v-btn flat to="recordRepair" color="blue">报修记录</v-btn>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field label="地址" required v-model="address">{{address}}</v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              label="电话"
              required
              v-model="telephone"
              v-validate="'phone'"
              data-vv-name="phone"
              :error-messages="errors.collect('phone')"
            >{{telephone}}</v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-menu
              ref="menu"
              v-model="dateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="expectedDate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="100px"
            >
              <v-text-field
                slot="activator"
                v-model="expectedDate"
                label="期望上门日期"
                prepend-icon="fa-calendar-week"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="expectedDate"
                no-title
                scrollable
                locale="zh-cn"
                @input="$refs.menu.save(expectedDate);dateMenu=false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <!-- 时间 -->
          <v-flex xs6>
            <v-menu
              ref="timeMenu"
              v-model="timeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="expectedTime"
              lazy
              transition="scale-transition"
              offset-y
              full-width
            >
              <v-text-field
                slot="activator"
                v-model="expectedTime"
                label="期望上门时间"
                :placeholder="timenow"
                prepend-icon="fa-clock"
                readonly
              ></v-text-field>
              <v-time-picker
                v-if="timeMenu"
                v-model="expectedTime"
                full-width
                @click:minute="$refs.timeMenu.save(expectedTime)"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              solo
              name="detail"
              label="描述内容"
              v-model="detail"
              v-validate="'max:200'"
              data-vv-name="detail"
              :error-messages="errors.collect('detail')"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="blue darken-1" flat @click="repairSubmit()">提交</v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import { repair } from "~/services.js";
export default {
  name: "orderRepair",
  created() {
    const user = JSON.parse(localStorage.getItem("user_info"));
    this.address = user.community.address;
    this.telephone = user.phone;
    this.timenow = new Date().toTimeString().substr(0, 5);
  },
  data() {
    return {
      detail: "",
      address: "",
      telephone: "",
      expectedDate: new Date().toISOString().substr(0, 10),
      expectedTime: "",
      timenow: "",
      dateMenu: false,
      timeMenu: false
    };
  },
  methods: {
    repairSubmit() {
      let date = this.expectedDate;
      let time = "";
      if (this.expectedTime) {
        time = this.expectedTime;
      } else time = this.timenow;
      date = date.replace(/-/g, "/");
      const timestamp = new Date(date + " " + time + ":00").getTime();

      this.$validator
        .validateAll()
        .then(v => {
          if (
            this.address === "" ||
            this.telephone === "" ||
            this.expectedDate === "" ||
            time === "" ||
            this.detail === "" ||
            !v
          ) {
            return new Promise((resolve, reject) => {
              reject();
            });
          } else {
            return new Promise(resolve => {
              resolve();
            });
          }
        })
        .then(() => {
          repair({
            telephone: this.telephone,
            address: this.address,
            detail: this.detail,
            timestamp
          })
            .then(() => {
              this.$snackbar({
                text: "报修信息提交成功,即将跳转报修历史"
              }).then(() => {
                this.$router.push({ name: "recordRepair" });
              });
            })
            .catch(e => {
              this.$log.error(e.response);
            });
        })
        .catch(() => {
          this.$snackbar({
            text: "请把信息填写完整规范",
            color: "warning"
          }).then(() => {
            this.$log.debug("snackbar close!");
          });
        });
    }
  }
};
</script>

