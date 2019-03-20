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
                <div class="text-xs-center pt-3 subheading">头像上传</div>
              </v-flex>
              <v-flex xs12 md9>
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
            <v-layout row>
              <v-flex xs3>
                <div class="text-xs-center pt-3 subheading">选择社区</div>
              </v-flex>
              <v-flex xs9>
                <v-autocomplete
                  v-model="community"
                  :hint="!isEditing ? '点击图标查找' : '点击图标保存'"
                  :items="communityNames"
                  :readonly="!isEditing"
                  :label="`${isEditing ? '搜索' : ''}`"
                  persistent-hint
                  @click="fetchCommunityNames()"
                >
               
                </v-autocomplete>
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
      avatarUrl: "",
      avatarName: "",
      avatarFile: "",
      avatarRemoteUrl: "",
      communityNames: [],
      communityData:[],
      community:"",
      isEditing: false,
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
        _this.$axios
          .post("http://192.168.123.92:8585/chengfeng/user/registry", {
            nickname: this.signup_name,
            password: this.signup_confirm_password,
            phone: this.signup_phone,
            communityId: 1
          })
          .then(val => {
            _this.$log(val);
          });
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
          param.append("file", this.avatarFile, this.avatarFile.name); //通过append向form对象添加数据
          param.append("chunk", "0"); //添加form表单中其他数据
          // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }; //添加请求头
          _this.$axios
            .post(
              "http://47.95.244.237:9990/chengfeng/per/uploadimg",
              param,
              config
            )
            .then(response => {
              _this.$log(response.data);
            });
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    fetchCommunityNames() {
      this.isEditing=!this.isEditing;
      if (this.communityNames.length) {
        return;
      }
     
      this.$axios
        .get("http://192.168.123.92:8585/chengfeng/community/listall")
        .then(val => {
            this.communityNames=val.data.data.map(val=>val.name);
        }).catch(e=>{
          this.error(e)
        });
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
.v-autocomplete__content.v-menu__content .v-card{
  margin:unset!important;
}
</style>

