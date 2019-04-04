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
                <v-text-field
                  label="地址"
                  required
                  :value="address"
                >{{address}}</v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="电话"
                  required
                  :value="telephone"
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
            @click="repairSubmit()"
          >提交</v-btn>
        </v-card-actions>
</div>
</template>
<script>
export default {
    name:"orderRepair",
    data(){
        return {
             repairText: "",
      address: "取默认用户注册时的地址",
      telephone: "取默认用户注册时的电话",
      expectedDate: new Date().toISOString().substr(0, 10),
      expectedTime: null,
      dateMenu: false,
      timeMenu:false,
        }
    },
  methods: {
    repairSubmit() {}
  }
}
</script>

