<template>
    <v-list
          two-line
          subheader
        >
          <div
            v-for="(item,index) in postItems"
            :key="item.title"
          >
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon
                  color="grey lighten-2"
                  large
                >fas fa-comment-alt fa-flip-horizontal</v-icon>
                <span class="reply-number">{{item.replyNumber}}</span>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  <!-- 精品贴及投票贴标志 -->
                  <v-icon v-if="item.isBest" color="red" class="mx-1" size="18" title="精品贴">fa-fire-alt</v-icon>
                  <v-icon v-if="item.isPoll" color="green" class="mx-1" size="18" title="投票贴">fa-poll</v-icon>
                  <router-link
                    :to="item.id"
                    style="color:#2d64b3"
                  >{{ item.title }}</router-link>
                </v-list-tile-title>
                <v-list-tile-sub-title class="caption">{{ item.content }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action class="grey--text body-1">
                <span>
                  <v-icon small>far fa-user</v-icon>
                  {{item.poster}}
                </span>
                <span>
                  <v-icon small>far fa-clock</v-icon>
                  {{item.dateOrTime}}
                </span>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
              v-if="index<postItems.length-1"
              inset
            ></v-divider>
          </div>

        </v-list>
</template>
<script>
export default {
    name:"postlist",
    props:{
        postItems:{
            type:Array
        }
    }
}
</script>
<style scoped>
.v-list__tile__action--stack {
  align-items: flex-start;
  justify-content: space-around;
}
.v-list__tile__action {
  min-width: 110px;
}
>>>.reply-number {
  position: absolute;
  font-size: 1rem;
  bottom: 12px;
}
</style>
