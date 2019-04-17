<template>
  <div>
    <v-card>
      <v-card-title class="justify-center pb-0">
        <span class="headline">注册</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="signupForm">
          <v-container grid-list-md>
            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">头像上传</div>
              </v-flex>
              <v-flex xs9>
                <img :src="avatarUrl" height="150" v-if="avatarUrl">
                <v-text-field
                  label="选择图片"
                  @click="pickFile"
                  v-model="avatarName"
                  prepend-icon="fa-upload"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">昵称</div>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  ref
                  label="姓名"
                  color="success"
                  v-model="signup_name"
                  :rules="[rules.required,rules.counter]"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">手机号</div>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  ref
                  label="手机号"
                  placeholder="以1开头的数字"
                  color="success"
                  v-model="signup_phone"
                  :rules="[rules.phone]"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">密码</div>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  label="密码"
                  placeholder="密码包含字母加数字,小于20个字符"
                  color="primary"
                  v-model="signup_password"
                  type="password"
                  :rules="[rules.password,()=>signup_password.length<=20&&signup_password.length>=5 || '密码长度在5-20之间']"
                  validate-on-blur
                  clearable
                  counter
                  maxlength="20"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">确认密码</div>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  label="密码"
                  placeholder="密码包含字母加数字,小于20个字符"
                  color="primary"
                  v-model="signup_confirm_password"
                  type="password"
                  :rules="[rules.confirmPassword]"
                  validate-on-blur
                  clearable
                  counter
                  maxlength="20"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">选择社区</div>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  label="选择社区"
                  color="primary"
                  :value="community"
                  type="input"
                  :rules="[() => !!community || '必填项']"
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
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="community_choose_dialog = false">
                        <v-icon>fas fa-times</v-icon>
                      </v-btn>
                      <v-toolbar-title>选择社区</v-toolbar-title>
                    </v-toolbar>
                    <v-list subheader v-if="this.communitys.length" class="pa-5">
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
                            <v-layout row wrap>
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

            <!-- 可选信息 -->
            <v-layout>
              <v-flex xs12 class="d-f row align-center">
                <v-btn block @click="more=true;" v-if="!more" flat color="blue">
                  <v-icon size="20">fas fa-angle-double-down</v-icon>&nbsp;更多信息
                </v-btn>
                <v-btn block @click="more=false;" v-if="more" flat color="blue">
                  <v-icon size="20">fas fa-angle-double-up</v-icon>&nbsp;收起更多
                </v-btn>
                <v-icon color="green" class="ml-2" @click="more_dialog=true">far fa-question-circle</v-icon>
                <v-dialog v-model="more_dialog" persistent max-width="290">
                  <v-card style="margin:unset;">
                    <v-card-title class="headline">关于更多信息</v-card-title>
                    <v-card-text>填写以下信息以方便浏览并在社区热论模块发帖,点击收起更多只填基本信息</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat @click="more_dialog = false">好的</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-form v-if="more" ref="signupMoreForm">
          <v-layout row>
            <v-flex xs3>
              <div class="text-xs-center pt-3 subheading">邮箱(可选)</div>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                ref="signupEmail"
                label="邮箱"
                color="success"
                v-model="signup_email"
                :rules="[rules.email]"
                validate-on-blur
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <div class="text-xs-center pt-3 subheading">真实姓名</div>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                label="姓名"
                color="success"
                v-model="username"
                :rules="[rules.username]"
                validate-on-blur
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <div class="text-xs-center pt-3 subheading">性别</div>
            </v-flex>
            <v-flex xs9>
              <v-radio-group v-model="gender" row>
                <v-radio label="男" value="male"></v-radio>
                <v-radio label="女" value="female"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3>
              <div class="text-xs-center pt-3 subheading">身份证号码</div>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                label="身份证"
                color="success"
                v-model="id_card"
                :rules="[rules.idCard]"
                validate-on-blur
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- <v-layout row>
                <v-flex xs12 md3>
                  <div class="text-xs-center pt-3 subheading">出生日期</div>
                </v-flex>
                <v-flex xs12 md9>
                  <v-text-field
                    label="出生日期"
                    color="success"
                    v-model="signup_email"
                    :rules="[rules.email]"
                    validate-on-blur
                  ></v-text-field>
                </v-flex>
          </v-layout>-->
          <v-layout row>
            <v-flex xs3>
              <div class="text-xs-center pt-3 subheading">个人签名</div>
            </v-flex>
            <v-flex xs9>
              <v-textarea
                name="motto"
                label="记得体现你的个人特点"
                value
                v-model="motto"
                v-validate="'max:200'"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-form>
        <small></small>
      </v-card-text>
      <v-card-actions class="btnWrapper">
        <v-btn color="blue lighten-1" @click="signupSubmit()">提交</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
let _this = null;
import { mapGetters } from "vuex";
import { register } from "~/user.js";
export default {
  name: "register",
  created() {
    _this = this;
  },
  data() {
    return {
      signup_name: "hanson",
      signup_phone: "15065410987",
      signup_email: "",
      signup_password: "123a",
      signup_confirm_password: "123a",
      avatarUrl: "",
      avatarName: "",
      avatarFile: "",
      avatarRemoteUrl: "",
      community: "",
      communityId: 0,
      community_choose_dialog: false,
      more: false,
      more_dialog: false,
      username: "",
      gender: "",
      id_card: "",
      motto: "",
      snackbar: "",
      snackbarColor: "",
      snackbarText: "",
      rules: {
        required: value => !!value || "必须输入",
        counter: value => value.length <= 20 || "最大20个字符",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "邮箱不合法";
        },
        phone: value => /^1[34578]\d{9}$/.test(value) || "手机号不合法",
        username: value => /^[\u4e00-\u9fa5]+$/.test(value) || "姓名输入不合法",
        idCard: value =>
          /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) ||
          "身份证输入不合法",
        password: value =>
          /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/.test(value) ||
          "密码不合法,只能包含大小写字母和数字",
        confirmPassword: function(value) {
          return _this.signup_password === value || "两次密码不一致";
        }
      }
    };
  },
  methods: {
    signupSubmit() {
      const form = this.$refs.signupForm;
      const moreForm = this.$refs.signupMoreForm;
      let valid = false;

      //若用户填写更多，则全部校验。不填写更多，则省略以下值的校验
      if (this.more) {
        valid = this.validateAll(form) && this.validateAll(moreForm);
      } else {
        valid = this.validateAll(form);
      }
      if (valid) {
        //post
        register({
          nickname: this.signup_name,
          password: this.signup_confirm_password,
          phone: this.signup_phone,
          communityId: this.communityId,
          username: this.username,
          avatar: this.avatarRemoteUrl,
          gender: this.gender,
          idcard: this.id_card,
          motto: this.motto
        })
          // this.$axios
          //   .post(this.baseUrl + "/user/registry", {
          //     nickname: this.signup_name,
          //     password: this.signup_confirm_password,
          //     phone: this.signup_phone,
          //     communityId: this.communityId,
          //     username: this.username,
          //     avatar: this.avatarRemoteUrl,
          //     gender: this.gender,
          //     idcard: this.id_card,
          //     motto: this.motto
          //   })
          .then(() => {
            this.$log.debug("Register Post Success!");
            this.$snackbar({
              text: "注册成功 正在跳转登录界面...",
              timeout: 1000
            }).then(() => {
              this.$router.push({
                name: "login",
                params: {
                  nickname: _this.signup_name,
                  password: _this.signup_confirm_password
                }
              });
            });
          })
          .catch(e => {
            this.log(e.response.data);
            if (e.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              this.$snackbar({
                text: "注册失败:" + e.response.data.data.error,
                color: "error",
                timeout: 3000
              });
            } else {
              // Something happened in setting up the request that triggered an Error
              this.$log.error("Error", e.message);
            }
          });
        this.$log.debug("Register Post!");
      }
    },
    validateAll(ref) {
      return ref.validate();
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.avatarName = files[0].name;
        if (this.avatarName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.avatarUrl = fr.result;
          this.avatarFile = files[0]; // this is an image file that can be sent to server...
          /* 上传图片 */
          let param = new FormData(); //创建form对象
          param.append("files", this.avatarFile, this.avatarFile.name); //通过append向form对象添加数据
          // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          this.$store
            .dispatch("UploadAvatar", param)
            .then(res => {
              this.avatarRemoteUrl = res.data.data;

              this.$snackbar({
                text: `图片${this.avatarFile.name}上传成功`,
                timeout: 1500
              });
            })
            .catch(e => {
              this.$log.error(e.response);
              this.$snackbar({
                text: `头像上传失败,错误请见控制台`,
                color: "error"
              });
            });
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    fetchCommunitys() {
      this.community_choose_dialog = true;
      if (this.$store.getters.communityList.length >= 1) {
        //若有缓存则不请求
        this.$log.debug("已缓存");
      } else {
        //若没有缓存则请求
        this.$store
          .dispatch("getCommunityList")
          .then(val => {
            this.communitys = val.data.data;
          })
          .catch(e => {
            this.error(e);
          });
      }
    },
    saveCommunity(item) {
      this.community = item.name;
      this.communityId = item.id;
      this.community_choose_dialog = false;
    }
  },
  computed: {
    ...mapGetters(["communityList"]),
    communitys: {
      get() {
        return this.communityList;
      },
      set() {}
    }
  }
};
</script>
<style scoped>
.v-card {
  max-width: 800px;
  margin: 8vh auto 0;
}
.page {
  left: 0;
  right: 0;
}
.btnWrapper {
  justify-content: center;
}
.v-autocomplete__content.v-menu__content .v-card {
  margin: unset !important;
}
</style>

