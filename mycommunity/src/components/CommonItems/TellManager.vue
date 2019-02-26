<template>
  <div>
    <v-card>
      <v-img :src="image" aspect-ratio="1.8"></v-img>

      <v-card-title primary-title>
        <div style="width:100%;height:270px">
          <h3 class="headline mb-0">{{title}}</h3>

          <!-- 找书记 -->
          <v-list subheader>
            <v-subheader style="padding-bottom:10px;">服务优势</v-subheader>
            <v-list-tile v-for="item in secretaryItems" :key="item.title" @click.prevent>
              <v-list-tile-content style="cursor:text;">
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="secretary_dialog=true">书记信箱</v-btn>
      </v-card-actions>
    </v-card>

    <!-- 书记dialog -->
    <v-dialog v-model="secretary_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">书记</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout>
              <v-flex xs12 md6>
                <v-text-field
                  label="电话"
                  required
                  v-model="telephone"
                >{{telephone}}</v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="邮箱" v-model="email"></v-text-field>
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
          <v-btn color="blue darken-1" flat @click="secretary_dialog=false">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click="tellManagerSubmit()">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "tellManager",
  data() {
    return {
      title: "找书记",
      image: require("../../assets/images/shuji.jpg"),
      secretary_dialog: false,
      textForManager:"",
      telephone:"",
      email:""
    };
  },
  props: {
    secretaryItems: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
