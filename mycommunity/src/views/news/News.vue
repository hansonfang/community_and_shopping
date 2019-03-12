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
export default {
  name: "newsIndex",
  data() {
    return {
      news: [
        {
          title: "山东师范大学援疆支教团顺利完成实习岗前培训",
          date: "07",
          year: "2019.2",
          id: "00001",
          detail:
            "    3月3日上午，2019年山东师范大学实习岗前培训班开班仪式在新疆维吾尔自治区喀什市岳普湖县一中会议室召开。教育工委书记和新就职的8"
        },
        {
          title: "山东师大附中入选山东省首批“人工智能教育试点校”",
          date: "02",
          year: "2019.2",
          id: "00002",
          detail:
            "近日，山东省教育厅公布《山东省首批人工智能教育试点市、县和试点校名单》，山东师大附中成功入选山东省首批试点校。"
        },
        {
          title: "山东师大附小召开山东省教育学会科技教育专项课题开题论证会",
          date: "29",
          year: "2019.1",
          id: "00003",
          detail:
            "3月6日上午，山东师大附小山东省教育学会科技教育专项课题开题论证会在南楼一层会议室召开。山东省教科院教育评估所副所长杨璐、"
        },
        {
          title: "山东师大附小举办“庆三八女神魅力蝶变主题分享会”",
          date: "22",
          year: "2019.01",
          id: "00004",
          detail:
            "3月6日下午，在三八节来临之际，山东师大附小妇委会联合家委会举办了“庆三八女神魅力蝶变主题分享会”"
        }
      ],
      hotNews: [
        {
          date: "08/26",
          year: "2018",
          detail:
            "近年来，大家应该感受到，愿意从教的人不多，可是，每年考教师资格证的人数却不少。真的是教师职业现在的吸引力增强了吗？",
          image: "https://picsum.photos/100/100?random",
          id:"00007"
        },
        {
          date: "05/21",
          year: "2018",
          detail:
            "近年来，大家应该感受到，愿意从教的人不多，可是，每年考教师资格证的人数却不少。真的是教师职业现在的吸引力增强了吗？",
          image: "https://picsum.photos/100/100?random",
          id:"00008"
        },
        {
          date: "03/18",
          year: "2018",
          detail:
            "近年来，大家应该感受到，愿意从教的人不多，可是，每年考教师资格证的人数却不少。真的是教师职业现在的吸引力增强了吗？",
          image: "https://picsum.photos/100/100?random",
          id:"00009"
        }
      ],
      page: 1
    };
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
