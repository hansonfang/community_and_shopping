<template>
     <!-- 物业公告 -->
            <div style="width:100%;" class="">
              <!-- 物业 -->
              <v-list >
                <v-subheader>{{title}}
                  <v-spacer></v-spacer>
                  <router-link v-if="moreLink" :to="moreLink">更多{{title}}</router-link>
                </v-subheader>

                <v-list-tile
                  v-for="(announcement,i) in announcements"
                  :key="i"
                  @click="announcement.dialog_show=true"
                >
                  <v-list-tile-content>
                    <v-list-tile-title class="text-truncate">{{ announcement.title }}</v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    {{announcement.date}}
                  </v-list-tile-action>
                </v-list-tile>
              </v-list> 
              
              <v-dialog
              v-for="(announcement,index) in announcements"
              :key="index"
              lazy
              hide-overlay
              v-model="announcement.dialog_show"
              width="500"
            >
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  {{announcement.title}}
                  <v-spacer></v-spacer>
                  <v-subheader>{{announcement.date}}</v-subheader>
                </v-card-title>

                <v-card-text>{{announcement.detail}}</v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="info" flat @click="announcement.dialog_show = false">确定</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </div>
</template>
<script>
export default {
    name:"annoucements",
    props:{
        title:{
            type:String
        },
        moreLink:{
            type:String
        },
        announcements:{
            type:Array
        }
    }
}
</script>
<style scoped>
.v-list__tile__action{
  min-width: unset;
}
</style>
