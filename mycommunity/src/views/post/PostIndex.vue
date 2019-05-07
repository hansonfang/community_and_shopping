<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <PostList :postItems="postItems"/>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-3">
      <v-flex xs12 class="text-xs-center">
        <v-pagination
          v-model="pagination"
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
import PostList from "@/components/Post/PostList";
import { getPostList } from "~/post";
export default {
  name: "postindex",
  components: { PostList },
  created() {
    this.loadContent({ pageNum: this.$route.query.pageNum || 1 });
    this.pagination = Number(this.$route.query.pageNum) || 1;
    this.$watch(
      "pagination",
      () => {
        this.$router.push({ query: { pageNum: this.pagination } });
        this.loadContent({ pageNum: this.pagination });
      },
      { deep: true }
    );
  },
  data() {
    return {
      pagination: 1,
      postItems: []
    };
  },
  methods: {
    loadContent(params) {
      getPostList(params)
        .then(res => {
          this.postItems = [];
          if (!res.data.data) return;
          res.data.data.forEach(item => {
            this.postItems.push({
              title: item.title,
              content: item.description,
              replyNumber: item.comments,
              id: String(item.id),
              isBest: false,
              isPoll: false
            });
          });
        })
        .catch(e => {
          this.$log.error(e.response || e);
        });
    }
  }
};
</script>
<style scoped>
</style>
