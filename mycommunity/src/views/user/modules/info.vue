<template>
  <div class="mt-3">
    <v-form
      ref="form"
      lazy-validation
    >
      <div class="text-xs-right">
        <v-btn
          color="orange"
          dark
          v-if="!modify"
          @click="modify=true;userTemp=JSON.stringify(user)"
          flat
        >
          <v-icon
            size="18"
            class="mr-1"
          >fas fa-lock</v-icon>修改资料
        </v-btn>
        <v-btn
          color="orange"
          dark
          v-else
          @click="modify=false;user=JSON.parse(userTemp)"
          flat
        >
          <v-icon
            size="18"
            class="mr-1"
          >fas fa-lock-open</v-icon>放弃修改
        </v-btn>
      </div>
      <v-layout>
        <v-flex
          xs2
          class="d-f justify-end mt-3 mr-3"
        >
          <span>昵称:</span>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            required
            box
            single-line
            readonly
            :value="user.nickname"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs2
          class="d-f justify-end mt-3 mr-3"
        >
          <span>姓名:</span>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            v-validate="'specialChar'"
            data-vv-name="username"
            :error-messages="errors.collect('username')"
            box
            single-line
            :readonly="!modify"
            v-model="user.username"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs2
          class="d-f justify-end mt-3 mr-3"
        >
          <span>个性签名:</span>
        </v-flex>
        <v-flex xs10>
          <v-textarea
            v-validate="'max:200'"
            data-vv-name="motto"
            :error-messages="errors.collect('motto')"
            box
            :readonly="!modify"
            v-model="user.motto"
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs2
          class="d-f justify-end mt-4 mr-3"
        >
          <span>性别:</span>
        </v-flex>
        <v-flex xs10>
          <v-radio-group
            v-model="user.gender"
            row
            :readonly="!modify"
          >
            <v-radio
              label="男"
              value="male"
            ></v-radio>
            <v-radio
              label="女"
              value="female"
            ></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-layout nowrap>
        <v-flex
          xs2
          class="d-f justify-end mt-4 mr-3"
        >
          <span>邮箱:</span>
        </v-flex>
        <v-flex
          xs8
          v-if="modify"
        >
          <v-text-field
            v-validate="'email|required'"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            box
            single-line
            :readonly="!modify"
            v-model="user.email"
          ></v-text-field>
        </v-flex>
        <v-flex
          xs10
          v-if="!modify"
        >
          <v-text-field
            v-validate="'email|required'"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            box
            single-line
            :readonly="!modify"
            v-model="user.email"
          ></v-text-field>
        </v-flex>
        <v-flex
          xs2
          v-if="modify"
        >
          <v-btn
            flat
            color="primary"
          >发送验证</v-btn>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex
          xs2
          class="d-f justify-end mt-4 mr-3"
        >
          <span>身份证号:</span>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            required
            v-validate="'idcard'"
            data-vv-name="idcard"
            :error-messages="errors.collect('idcard')"
            box
            single-line
            :readonly="!modify"
            v-model="user.idcard"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          xs2
          class="d-f justify-end mt-4 mr-3"
        >
          <span>社区:</span>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            label="选择社区"
            color="primary"
            :value="user.community.name"
            type="input"
            :disabled="!modify"
            @click="fetchCommunitys()"
          ></v-text-field>
          <!-- 选择社区dialog -->
          <v-dialog
            v-model="community_choose_dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar
                dark
                color="primary"
              >
                <v-btn
                  icon
                  dark
                  @click="community_choose_dialog = false"
                >
                  <v-icon>fas fa-times</v-icon>
                </v-btn>
                <v-toolbar-title>选择社区</v-toolbar-title>
              </v-toolbar>
              <v-list
                subheader
                v-if="this.communitys.length"
                class="pa-5"
              >
                <v-subheader>社区信息</v-subheader>
                <v-list-tile
                  avatar
                  v-for="(item,index) in this.communitys"
                  :key="index"
                  class="my-2"
                  @click="saveCommunity(item)"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      <v-layout
                        row
                        wrap
                      >
                        <v-flex xs2>
                          <span>书记:{{item.admin}}</span>
                        </v-flex>
                        <v-flex xs10>
                          <div class="d-f row">
                            <span>地址:</span>
                            <address>{{item.address}}</address>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-btn
          color="success"
          @click="submit"
          v-if="modify"
        >提交</v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
import { updateUser } from "~/user.js";
export default {
  name: "info",
  created() {
    this.$store
      .dispatch("getCommunityList")
      .then(res => {
        res.data.data.forEach(community => {
          if (community.id === Number(localUser.communityId)) {
            this.user.community = community;
          }
        });
      })
      .catch(e => {
        this.$log.error(e);
      });
    const localUser = JSON.parse(localStorage.getItem("user_info"));
    this.user.nickname = localUser.nickname;
    this.user.username = localUser.username;
    this.user.gender = localUser.gender;
    this.user.idcard = localUser.idcard;
    this.user.motto = localUser.motto;
    this.user.email = localUser.email;
    this.user.phone = localUser.phone;
    this.user.signUp = this.functions.formatTime(localUser.signUp).toDay;
  },
  data() {
    return {
      modify: false,
      community_choose_dialog: false,
      user: {
        nickname: "",
        username: "",
        motto:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident debitis dolores nihil reprehenderit expedita deserunt veritatis? Labore, exercitationem error perferendis, nulla dolore asperiores officia odit perspiciatis, amet dolorem sit accusamus.",
        gender: "",
        email: "",
        idcard: "",
        community: {}
      },
      communitys: [],
      userTemp: ""
    };
  },
  methods: {
    fetchCommunitys() {
      if (!this.modify) return;
      this.community_choose_dialog = true;
      if (this.$store.getters.communityList.length >= 1) {
        this.communitys = this.$store.getters.communityList;
      } else {
        this.$store
          .dispatch("getCommunityList")
          .then(res => {
            this.communitys = res.data.data;
          })
          .catch(e => {
            this.$log.error("获取社区失败", e);
          });
      }
    },
    saveCommunity(item) {
      this.user.community = item;
      this.community_choose_dialog = false;
    },
    submit() {
      for (let key in this.user) {
        if (
          this.user[key] === undefined ||
          this.user[key] === "" ||
          this.user[key] === null
        ) {
          this.bus.$emit("hint",{
            text:"请填完整表单",
            color:"error",
            timeout:"2000"
          })
          return;
        }
      }
      this.$validator.validateAll().then(v => {
        if (v) {
          updateUser({
            username: this.user.username,
            idcard: this.user.idcard,
            gender: this.user.gender,
            motto: this.user.motto,
            email: this.user.email,
            communityId: String(this.user.community.id)
          })
            .then(res => {
              this.$log.debug(res);
              this.bus.$emit("hint", {
                text: "修改成功，请重新登录",
                color: "success",
                timeout: 2000
              });
              setTimeout(() => {
                this.$store.dispatch("FedLogout");
                this.$router.push({name:"login"});
              }, 2000);
            })
            .catch(e => {
              this.bus.$emit("hint", {
                text: e.response,
                color: "error",
                timeout: 2000
              });
            });
        } else {
          this.bus.$emit("hint", {
            text: "请修改表单错误",
            color: "error",
            timeout: 2000
          });
        }
      });
    }
  },
  computed: {}
};
</script>
<style scoped>
>>> .v-input__prepend-outer {
  min-width: 80px;
  justify-content: flex-end;
}
</style>

