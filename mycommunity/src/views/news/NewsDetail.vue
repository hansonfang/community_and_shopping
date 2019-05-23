<template>
  <div>
    <div class="banner py-4">
      <v-container>
        <v-layout>
          <h2 class="headline blue--text text--darken-2">{{title}}</h2>
        </v-layout>
      </v-container>
    </div>
    <v-container class="content">
      <v-layout>
        <h5 class="body-1 grey--text detail">
          <span class="date">
            <v-icon size="16">fas fa-calendar-day</v-icon>
            &nbsp;{{date}}
          </span>
          <span>
            <v-icon size="16">fas fa-user</v-icon>
            &nbsp;作者:{{author}}
          </span>
        </h5>
      </v-layout>
      <v-layout column class="content-wrapper">
        <v-flex v-for="(item,index) in paragraphs" :key="index">
          <p v-if="item.p" class="paragraph py-2 pt-2">{{item.p}}</p>
          <v-img v-if="item.image" :src="item.image" max-width="900" max-height="500" contain>
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey"></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { getNewsDetail } from "~/news";
export default {
  name: "news-detail",
  async created() {
    const id = Number(this.$route.params.id);
    const { data } = (await getNewsDetail(id)).data;
    this.title = data.title;
    this.date = new Date(data.publishTime).toLocaleString();
    this.author = data.author;
    data.contents.forEach(p => {
      this.paragraphs.push({
        p: p.content,
        image: p.imageUrl
      });
    });
  },
  data() {
    return {
      title: "",
      date: "",
      author: "",
      paragraphs: []
    };
  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  background-color: #eee;
}
.container {
  max-width: 900px;
}
.detail span {
  margin-right: 20px;
}
.content-wrapper {
  padding: 30px 0;
  margin-bottom: 100px;
}
.v-footer {
  min-height: 3vw;
  justify-content: center;
}
.v-footer > div {
  width: 100%;
  flex: 1 1 auto;
}
</style>
