<template>
  <div>
    <v-container>
      <v-layout row class="news-wrapper">
        <v-flex md8 xs12 class="normal-news">
          <ul>
            <li v-for="(item,index) in news" :key="index">
              <div class="timebox">
                <span class="date">{{item.date}}</span>
                <span class="year">{{item.year}}</span>
              </div>
              <router-link :to="item.id">
                <h4 class="text-truncate">{{item.title}}</h4>
                <p class="text-truncate">{{item.detail}}</p>
              </router-link>
            </li>
          </ul>
          <div class="text-xs-center">
            <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
          </div>
        </v-flex>
        <v-flex md4 xs12 class="hot-news">
          <div class="hot ml-3">
            <h3 class="my-3 ml-4">热点新闻</h3>
            <ul>
              <li class v-for="(item,index) in hotNews" :key="index">
                <router-link :to="item.id">
                  <v-img :src="item.image" contain height="70" width="70"></v-img>

                  <div class="msg">
                    <div class="time">{{item.date}} | {{item.year}}</div>
                    <div class="word mt-1">{{item.detail}}</div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { getNewsList, getHotNews } from "~/news";
export default {
  name: "newsIndex",
  async created() {
    try {
      this.refreshNewsList();
      const res = await getHotNews();
      const hotNews = res.data.data;
      hotNews.forEach(news => {
        const d = news.publishTime.substr(0, news.publishTime.indexOf("T"));
        const d_a = d.split("-");
        const year = `${d_a[0]}-${d_a[1]}`;
        const date = d_a[2];
        this.hotNews.push({
          date,
          year,
          detail: news.description,
          image: news.images,
          id: news.id
        });
      });
    } catch (error) {
      this.$log.error(error);
    }
  },
  data() {
    return {
      news: [],
      hotNews: [],
      page: 1
    };
  },
  methods: {
    async refreshNewsList() {
      try {
        const { data } = await getNewsList({});
        this.news = [];
        data.data.forEach(news => {
          const d = news.publishTime.substr(0, news.publishTime.indexOf("T"));
          const d_a = d.split("-");
          const year = `${d_a[0]}-${d_a[1]}`;
          const date = d_a[2];
          this.news.push({
            title: news.title,
            detail: news.description,
            year,
            date,
            id: news.id
          });
        });
      } catch (error) {
        this.$log.error(error);
      }
    }
  }
};
</script>
<style scoped>
a {
  color: unset !important;
}
.normal-news > ul > li {
  border-top: 1px solid #ccc;
  padding: 25px 0px;
  overflow: hidden;
  position: relative;
  padding-left: 100px;
}
.normal-news > ul > li .timebox {
  position: absolute;
  left: 0;
  top: 25px;
  width: 70px;
  height: 70px;
  border: 1px solid #979797;
  text-align: center;
}
.normal-news > ul > li .timebox .date {
  color: #999;
  font-weight: 600;
  font-size: 20px;
  display: block;
  margin: 10px 0px 0px 0px;
}
.normal-news > ul > li .timebox .year {
  font-size: 12px;
  color: #999;
}
.normal-news > ul > li h4 {
  margin: 10px 0px 15px;
  line-height: 28px;
  font-size: 18px;
}
.normal-news > ul > li p {
  display: inline-block;
  width: 100%;
  color: #999;
  font-size: 16px;
  line-height: 30px;
}
.hot ul li {
  position: relative;
  padding-left: 95px;
  margin-top: 30px;
}
.hot ul li .v-image {
  position: absolute;
  left: 0;
  overflow: hidden;
}
.hot ul li .msg .time {
  font-size: 12px;
  font-weight: 100;
  color: #999;
  line-height: 22px;
}
.hot ul li .msg .word {
  height: 45px;
  font-size: 14px;
  font-weight: 100;
  color: #333;
  line-height: 24px;
  overflow: hidden;
  margin-top: 3px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
