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
              <v-flex xs12 md3>
                <div class="text-xs-center pt-3 subheading">姓名</div>
              </v-flex>
              <v-flex xs12 md9>
                <v-text-field ref label="姓名" placeholder="汉字" color="success" v-model="signup_name"></v-text-field>
              </v-flex>
            </v-layout>
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
                  v-model="signup_phone"
                  :rules="[rules.phone]"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 md3>
                <div class="text-xs-center pt-3 subheading">邮箱(可选)</div>
              </v-flex>
              <v-flex xs12 md9>
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
                <div class="text-xs-center pt-3 subheading">密码</div>
              </v-flex>
              <v-flex xs9>
                <v-text-field
                  label="密码"
                  placeholder="密码包含字母加数字,小于20个字符"
                  color="primary"
                  v-model="signup_password"
                  type="password"
                  :rules="[rules.password]"
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
          </v-container>
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
      rules: {
        required: value => !!value || "必须输入",
        counter: value => value.length <= 20 || "最大20个字符",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "邮箱不合法";
        },
        phone: value => /^1[34578]\d{9}$/.test(value) || "手机号不合法",
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
      const email = this.$refs.signupEmail;
      let valid = false;

      //若存在邮箱值，则全部校验。不存在邮箱值，则省略邮箱值的校验
      if (email.value) {
        valid = this.validateAll(form);
      } else {
        valid = !form.inputs.filter(field => {
          return field.label !== "邮箱" && !field.valid;
        }).length;
      }
      if (valid) {
        //post

        this.signup_dialog = false;
      }
    },
    validateAll(ref) {
      return ref.validate();
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
</style>

