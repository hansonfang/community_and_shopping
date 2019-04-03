<template>
  <div class="mt-3">
    <v-form ref="form" lazy-validation>
      <div class="text-xs-right">
        <v-btn color="orange" dark v-if="!modify" @click="modify=true" flat>
          <v-icon size="18" class="mr-1">fas fa-lock</v-icon>修改资料
        </v-btn>
        <v-btn color="orange" dark v-else @click="modify=false" flat>
          <v-icon size="18" class="mr-1">fas fa-lock-open</v-icon>放弃修改
        </v-btn>
      </div>
      <v-layout>
        <v-flex xs2 class="d-f justify-end mt-3 mr-3">
          <span>姓名:</span>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            required
            box
            single-line
            v-validate="'required|nickname'"
            data-vv-name="nickname"
            :error-messages="errors.collect('nickname')"
            :readonly="!modify"
            v-model="user.username"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 class="d-f justify-end mt-3 mr-3">
          <span>昵称:</span>
        </v-flex>
        <v-flex xs10>
          <v-text-field required box single-line :readonly="!modify" v-model="user.nickname"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 class="d-f justify-end mt-4 mr-3">
          <span>性别:</span>
        </v-flex>
        <v-flex xs10>
          <v-radio-group v-model="user.gender" row :readonly="!modify">
            <v-radio label="男" :value="1"></v-radio>
            <v-radio label="女" :value="0"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 class="d-f justify-end mt-4 mr-3">
          <span>邮箱:</span>
        </v-flex>
        <v-flex xs8>
          <v-text-field required box single-line :readonly="!modify" v-model="user.email"></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn flat color="primary">发送验证</v-btn>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs2 class="d-f justify-end mt-4 mr-3">
          <span>身份证号:</span>
        </v-flex>
        <v-flex xs10>
          <v-text-field required box single-line :readonly="!modify" v-model="user.idcard"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 class="d-f justify-end mt-4 mr-3">
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

      <v-btn color="success">提交</v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "info",
  created() {},
  data() {
    return {
      modify: false,
      community_choose_dialog: false,
      user: {
        username: "Hansonfang",
        nickname: "hanson",
        gender: 1,
        email: "1597700958@qq.com",
        idcard: "370123199703121111",
        community: {}
      },
      communitys: []
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

