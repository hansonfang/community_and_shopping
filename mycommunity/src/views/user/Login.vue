<template>
  <div>
    <v-alert v-model="alert" :type="alertType">{{alertMsg}}</v-alert>
    <v-card>
      <v-card-title class="justify-center pb-0">
        <span class="headline">登录</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="loginForm">
          <v-container grid-list-md>
            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">用户昵称</div>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  label="昵称"
                  color="primary"
                  v-model="username"
                  type="input"
                  :rules="[rules.required,rules.counter]"
                  validate-on-blur
                  counter
                  maxlength="20"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- <v-layout row>
              <v-flex xs3>
                <v-spacer></v-spacer>
                <v-switch v-model="emailSwitch" :label="switchLable"></v-switch>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  ref="username"
                  label="用户名"
                  :placeholder="switchLable"
                  color="success"
                  v-model="username"
                  :rules="usernameValidate"
                  validate-on-blur
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>-->
            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">密码</div>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="密码"
                  placeholder="密码包含字母加数字"
                  color="primary"
                  v-model="password"
                  type="password"
                  :rules="[rules.password]"
                  validate-on-blur
                  clearable
                  counter
                  maxlength="20"
                ></v-text-field>
              </v-flex>
              <v-flex xs3 class="justify-center">
                <v-btn flat color="info" @click="resetpwd_dialog=true">忘记密码</v-btn>
              </v-flex>
            </v-layout>
            <v-layout row v-show="hasCaptcha">
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">验证码</div>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="验证码"
                  color="blue"
                  v-model="login_captcha"
                  type="input"
                  counter
                  maxlength="4"
                ></v-text-field>
              </v-flex>
              <v-flex xs3 class="text-xs-center pt-3 captcha">
                <img
                  ref="login_captchaImage"
                  alt
                  title="点击更换"
                  @click="getCaptcha('login_captchaImage')"
                >
              </v-flex>
            </v-layout>
            <v-layout justify-center>
              <v-checkbox v-model="autoLoginCheckbox" label="自动登录" style="max-width: 100px"></v-checkbox>
            </v-layout>
          </v-container>
        </v-form>
        <small></small>
      </v-card-text>
      <v-card-actions class="loginBtnWrapper">
        <v-btn color="blue lighten-1" @click="loginSubmit()">登录</v-btn>
      </v-card-actions>
    </v-card>

    <!-- 重置密码 -->
    <!-- 重置密码Dialog -->
    <v-dialog v-model="resetpwd_dialog" persistent max-width="600px">
      <v-card class="reset-card">
        <v-card-title class="justify-center pb-0">
          <span class="headline">重置密码</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="resetpwdForm">
            <v-container grid-list-md>
              <v-layout row>
                <v-flex xs12 md3>
                  <div class="text-xs-center pt-3 subheading">姓名</div>
                </v-flex>
                <v-flex xs12 md9>
                  <v-text-field
                    ref
                    label="姓名"
                    placeholder="汉字"
                    color="success"
                    v-model="signup_name"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <!-- 手机号TextField,包含验证码按钮 -->
              <v-layout row>
                <v-flex xs12 md3>
                  <div class="text-xs-center pt-3 subheading">手机号</div>
                </v-flex>
                <v-flex xs12 md9>
                  <v-text-field
                    ref
                    label="手机号"
                    placeholder="以1开头的数字"
                    color="success"
                    v-model="resetpwd_phone"
                    :rules="[rules.phone]"
                    validate-on-blur
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12 md3>
                  <div class="text-xs-center pt-3 subheading">邮箱</div>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    ref="resetpwdEmail"
                    label="输入绑定的邮箱"
                    color="success"
                    v-model="resetpwd_email"
                    :rules="[rules.email]"
                    validate-on-blur
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn color="info">发送验证码</v-btn>
                </v-flex>
              </v-layout>

              <v-layout row></v-layout>
            </v-container>
          </v-form>
          <small></small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="resetpwd_dialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click="resetpwdSubmit()">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "login",

  data() {
    return {
      emailSwitch: true,
      username: "",
      password: "",
      autoLoginCheckbox: false,
      hasCaptcha: true,
      login_captcha: "",
      resetpwd_dialog: false,
      resetpwd_phone: "",
      resetpwd_email: "",
      signup_name: "hanson",
      alert: false,
      alertType: "error",
      alertMsg: "",
      rules: {
        required: value => !!value || "必须输入",
        counter: value =>
          (value.length <= 20 && value.length >= 5) ||
          "最大20个字符,最少5个字符",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "邮箱不合法";
        },
        phone: value => /^1[34578]\d{9}$/.test(value) || "手机号不合法",
        password: value =>
          /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/.test(value) ||
          "密码不合法,只能包含大小写字母和数字"
      }
    };
  },
  mounted() {
    if (this.$route.params.nickname) {
      this.username = this.$route.params.nickname;
      this.password = this.$route.params.password;
    }
    if (this.$route.query.needAuth) {
      this.alert = true;
      this.alertType = "error";
      this.alertMsg = "访问此页面需要登录";
      if (this.$route.query.message) {
        this.alertMsg = decodeURI(this.$route.query.message) + ",请重新登录";
      }
    }
  },
  computed: {
    switchLable() {
      return this.emailSwitch ? "邮箱" : "手机号";
    },
    usernameValidate() {
      return this.emailSwitch ? [this.rules.email] : [this.rules.phone];
    }
  },
  watch: {
    emailSwitch(n) {
      this.$refs.username.rules[0] = n ? this.rules.email : this.rules.phone;
      this.$refs.username.validate();
      // console.log(this.$refs.username);
    }
  },
  methods: {
    loginSubmit() {
      if (this.validateAll(this.$refs.loginForm)) {
        this.$store
          .dispatch("Login", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            this.$log.debug(res);
            this.bus.$emit("hint", {
              color: "success",
              text: "登录成功 正在跳转首页..."
            });
            //获取用户信息
            this.$store
              .dispatch("GetInfo")
              .then(res => {
                this.$log.debug("获取用户信息成功", res.data.data.base_info);
              })
              .catch(e => {
                this.$log.error("获取用户信息失败", e.response);
              });
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 2000);
          })
          .catch(e => {
            this.$log.error(e.response);
            this.bus.$emit("hint", {
              color: "error",
              text: "登录失败:" + e.response.data.message,
              timeout: 3000
            });
          });
      }
    },
    validateAll(ref) {
      return ref.validate();
    },
    resetpwdSubmit() {
      this.resetpwd_dialog = false;
      //post提交
    }
  }
};
</script>
<style scoped>
.v-input--switch {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
>>> .v-input__control {
  width: auto;
}
.page {
  left: 0;
  right: 0;
}
.captcha img {
  height: 40px;
  width: 80px;
}
.v-card {
  max-width: 800px;
  margin: 8vh auto 2vh;
}
>>> .reset-card {
  margin: 0;
}
.loginBtnWrapper {
  justify-content: center;
}
.justify-center {
  display: flex;
  align-items: center;
}
</style>


