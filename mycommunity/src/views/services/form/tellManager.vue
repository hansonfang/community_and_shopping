<template>
  <div class="service-box">
    <v-card flat>
      <v-card-title class="justify-center">
        <span class="f-1"></span>
        <span class="headline f-1">找书记</span>
        <v-btn
          flat
          color="blue"
          to="recordManager"
        >找书记记录</v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout>
            <v-flex
              xs12
              md6
            >
              <v-text-field
                label="电话"
                required
                v-model="telephone"
              >{{telephone}}</v-text-field>
            </v-flex>
            <v-flex
              xs12
              md6
            >
              <v-text-field
                label="邮箱"
                v-model="email"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-flex xs12>
            <v-textarea
              label="输入内容"
              :value="textForManager"
              hint="告诉书记的话"
            ></v-textarea>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="tellManagerSubmit()"
        >提交</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "tellManager",
  data() {
    return {
      secretary_dialog: false,
      textForManager: "",
      telephone: "",
      email: ""
    };
  }
};
</script>
