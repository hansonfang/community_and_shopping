<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <PostList :postItems="bestPostItems" />
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
import PostList from "@/components/PostList"
export default {
  name: "postbest",
  components:{PostList},
  data() {
    return {
        page:1,
      bestPostItems: [
        {
          title: "对于一个天天想长头发的人来说，我公布一个特大好消息！许多人以",
          content:
            "对于一个天天想长头发的人来说，我公布一个特大好消息！许多人以为一旦大量掉头",
          replyNumber: 21,
          id: "000001",
          poster: "edrfgthj狮子",
          dateOrTime: "11:41",
          isBest: true,
          isPoll: true
        },
        {
          title: "马上要去美国出差了，飞机上可以带安眠药和抗抑郁药吗？",
          content: "马上要去美国出差了，飞机上可以带安眠药和抗抑郁药吗",
          replyNumber: 88,
          id: "000002",
          poster: "襄阳吴奇隆",
          dateOrTime: "10:21",
          isBest: true
        }
      ]
    };
  }
};
</script>
