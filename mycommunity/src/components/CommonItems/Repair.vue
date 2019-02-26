<template>
  <div>
    <v-card>
      <v-img
        :src="image"
        aspect-ratio="1.8"
      ></v-img>

      <v-card-title primary-title>
        <div style="width:100%;height:270px">
          <h3 class="headline mb-0">{{title}}</h3>
          <!-- 物业 -->
          <v-list
            two-line
            subheader
          >
            <v-subheader>公告
              <v-spacer></v-spacer>
              <router-link to="/moreannouncement">更多公告</router-link>
            </v-subheader>

            <v-list-tile
              v-for="(announcement,i) in announcements"
              :key="i"
              @click="announcement.dialog_show=true"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ announcement.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ announcement.date }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn
                  icon
                  ripple
                >
                  <v-icon color="blue lighten-1">fas fa-info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="info"
          @click="repair_dialog=true"
        >立刻报修</v-btn>
      </v-card-actions>
    </v-card>

    <!-- 公告dialog -->
    <v-dialog
      v-for="(announcement,index) in announcements"
      :key="index"
      lazy
      hide-overlay
      v-model="announcement.dialog_show"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{announcement.title}}
          <v-spacer></v-spacer>
          <v-subheader>{{announcement.date}}</v-subheader>
        </v-card-title>

        <v-card-text>{{announcement.detail}}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            flat
            @click="announcement.dialog_show = false"
          >确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 服务dialog -->
    <v-dialog
      v-model="repair_dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">报修服务</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="地址"
                  required
                >{{address}}</v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="电话"
                  required
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
                    @input="$refs.menu.save(expectedDate);dateMenu=false"
                  >
                    
                  </v-date-picker>
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
                    prepend-icon="fa-clock"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timeMenu"
                    v-model="expectedTime"
                    full-width
                     format="24hr"
                    @click:minute="$refs.timeMenu.save(expectedTime)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  solo
                  name="repairText"
                  label="描述内容"
                  v-model="repairText"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            flat
            @click="repair_dialog=false"
          >关闭</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="repairSubmit()"
          >提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "repair",
  data() {
    return {
      repair_dialog: false,
      title: "物业服务",
      image: require("../../assets/images/wuye.jpg"),
      repairText: "",
      address: "",
      telephone: "",
      expectedDate: new Date().toISOString().substr(0, 10),
      expectedTime: null,
      dateMenu: false,
      timeMenu:false,
    };
  },
  props: {
    announcements: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    repairSubmit() {}
  }
};
</script>
<style scoped>
</style>
