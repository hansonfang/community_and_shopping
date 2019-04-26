<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-list
          two-line
          subheader
        >
          <div
            v-for="(item,index) in postItems"
            :key="item.id"
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
                  <router-link
                    :to="`${item.id}?type=poll`"
                    style="color:#2d64b3"
                  >{{ item.title }}</router-link>
                </v-list-tile-title>
                <v-list-tile-sub-title class="caption">{{ item.content }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <span class="grey--text body-2">{{item.dateOrTime}}</span>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index<postItems.length-1"
              inset
            ></v-divider>
          </div>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout
      row
      class="mt-3"
    >
      <v-flex
        xs12
        class="text-xs-center"
      >
        <v-pagination
          v-model="page"
          :length="7"
          circle
          next-icon="fa-chevron-right"
          prev-icon="fa-chevron-left"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import { getPollList } from "~/post";
export default {
  name: "postbest",
  created() {
    getPollList()
      .then(res => {
        res.data.data.forEach(poll => {
          this.postItems.push({
            title: poll.title,
            content: poll.description,
            replyNumber: poll.voteTotal,
            id: String(poll.id),
            poster: poll.user_id,
            dateOrTime: this.functions.formatTime(
              new Date(poll.validityTime).getTime()
            ).dayTime
          });
        });
      })
      .catch(e => this.$log.error(e));
  },
  data() {
    return {
      page: 1,
      postItems: []
    };
  }
};
</script>
<style scoped>
.v-list__tile__action--stack {
  align-items: flex-start;
  justify-content: space-around;
}
.v-list__tile__action {
  min-width: 110px;
}
>>> .reply-number {
  position: absolute;
  font-size: 1rem;
  bottom: 12px;
}
</style>
