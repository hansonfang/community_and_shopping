<template>
  <div>
    <div class="bg-decoration">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 md8 class="mb-2">
            <v-carousel cycle max="100%" hide-delimiters>
              <v-carousel-item
                v-for="(item,i) in carousals"
                :key="i"
                :src="item.imageUrl"
                style="position:relative;"
              >
                <router-link
                  :to="`/news/${item.journalismId}`"
                  style="position:absolute;width:100%;height:100%"
                ></router-link>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-flex xs12 md4 class="mb-2 d-f">
            <v-layout column>
              <v-flex style="width:100%;flex-grow:1;margin-top:4px;" class="pa-2 mb-2">
                <Announcement
                  :announcements="propertyAnnounces"
                  title="物业公告"
                  moreLink="/news/propertyA"
                />
              </v-flex>
              <v-divider></v-divider>
              <v-flex style="width:100%;flex-grow:1;margin-top:4px;" class="pa-2 mb-2">
                <Announcement
                  :announcements="communityNoticeVos"
                  title="社区公告"
                  moreLink="/news/communityA"
                />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md7 class="d-f f-col py-5 px-2" style="flex-wrap:no-wrap;">
          <!-- 新闻列表 -->
          <div class="d-f f-row align-center justify-space-between">
            <h4 class="py-2 index-title">
              社区头条
              <span>community headlines</span>
            </h4>
            <router-link to="/news">更多新闻>>></router-link>
          </div>

          <div
            class="box-shadow news"
            v-for="(item,index) in news"
            :key="index"
            style="flex-grow:1"
          >
            <v-layout row>
              <v-flex xs4 class="v-sheet">
                <v-img :src="item.image" aspect-ratio="1" max-height="190" max-width="300"></v-img>
              </v-flex>
              <v-flex xs8 class="sel-none content-container d-f pt-4 px-3 pb-2">
                <router-link :to="'news/'+item.id" style="flex:1 1 auto;">
                  <h4>{{item.title}}</h4>
                  <p class="grey--text text--darken-1 mb-0 mt-2">{{item.brief}}</p>
                </router-link>
                <footer class="d-f align-center content-footer mb-1" style="flex:0 0 auto;">
                  <v-avatar size="40" color="grey lighten-4" class="mr-3">
                    <img :src="item.authorAvatar" alt="avatar">
                  </v-avatar>
                  <span class="grey--text text--darken-1 mr-3">{{item.author}}</span>
                  <span class="grey--text text--lighten-1">{{item.dateTime}}</span>
                  <v-spacer></v-spacer>
                  <span class="mr-2 grey--text text--lighten-1">
                    <v-icon size="16" class="mr-1" color="grey lighten-1">far fa-eye</v-icon>
                    <span>{{item.watchCount}}</span>
                  </span>
                </footer>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs12 md5 class="py-5 d-f f-col px-2">
          <v-layout column>
            <v-flex style="width:100%;margin-top:4px;" class>
              <h4 class="py-2 index-title">
                常用功能
                <span>community services</span>
              </h4>
              <v-layout row no-wrap class="interactive-wrapper">
                <v-flex xs4>
                  <router-link to="/orderRepair">
                    <div class="interactive">
                      <v-icon size="30" color="info">fas fa-tools</v-icon>
                      <span>立刻报修</span>
                    </div>
                  </router-link>
                </v-flex>
                <v-flex xs4>
                  <router-link to="/orderWater">
                    <div class="interactive">
                      <v-icon size="30" color="info">fas fa-tint</v-icon>
                      <span>预约送水</span>
                    </div>
                  </router-link>
                </v-flex>
                <v-flex xs4>
                  <router-link to="/tellManager">
                    <div class="interactive">
                      <v-icon size="30" color="info">fas fa-user-tie</v-icon>
                      <span>找书记</span>
                    </div>
                  </router-link>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex style="width:100%;margin-top:4px;" class="pa-2 mt-4">
              <!-- 购物推荐 -->
              <div class="d-f f-row align-center justify-space-between">
                <h4 class="py-2 index-title">
                  推荐购物
                  <span>Shopping recommendation</span>
                </h4>
                <router-link to="/shopping">拼购商城>>></router-link>
              </div>

              <v-layout row wrap>
                <v-flex md4 xs6 v-for="(item,index) in goods" :key="index">
                  <v-card class="ma-1">
                    <router-link :to="{name:'goods',query:{goods_id:item.id}}">
                      <v-img :src="item.image" aspect-ratio="2.75" height="150"></v-img>
                    </router-link>
                    <v-card-title primary-title class="py-2 text-truncate" style="overflow:hidden;">
                      <div>
                        <h3 class="headline mb-0 subheading">{{item.title}}</h3>
                      </div>
                    </v-card-title>

                    <v-card-actions>
                      <div class="d-f pt-2 group">
                        <div>
                          <div class="red--text">
                            <span class="body-2">￥</span>
                            <span class="title">{{item.groupPrice}}</span>
                          </div>
                          <div class="font-weight-thin single-price grey--text">
                            <span class="caption">￥</span>
                            <span class="body-2">{{item.singlePrice}}</span>
                          </div>
                        </div>
                        <!-- 
                        <div>
                          <v-btn
                            color="red"
                            round
                            dark
                          >立刻拼团</v-btn>
                        </div>-->
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer height="80" class="d-f justify-center footer">
      <div></div>
      <div class="text-xs-center">
        使用MIT License开源，基于
        <a href="https://vuetifyjs.com/zh-Hans/">Vuetify</a>
        <br>Copyright © 2016-2019 Hanson
      </div>
      <div class="text-xs-right pr-3">
        <a href="https://github.com/hansonfang/community_and_shopping">
          &nbsp;
          <v-icon>fab fa-github</v-icon>项目地址
        </a>
      </div>
    </v-footer>
  </div>
</template>
<script>
import Announcement from "@/components/CommonItems/Annoucements";
import { getIndex } from "@/api/information";
export default {
  name: "index",
  components: { Announcement },
  async created() {
    const _this = this;
    getIndex()
      .then(res => {
        const data = res.data.data;
        //轮播图
        _this.carousals = data.carousals;

        //社区3条
        _this.communityNoticeVos = data.communityNoticeVos.map(item => {
          return {
            title: item.notice,
            detail: item.description,
            date: _this.functions.formatTime(item.showtime).toDay,
            dialog_show: false
          };
        });

        //新闻5条
        for (let index in data.journalisms) {
          if (
            !data.journalisms[index].description &&
            !data.journalisms[index].images
          ) {
            continue;
          }
          const news = data.journalisms[index];
          this.news.push({
            title: news.title,
            image: news.images,
            brief: news.description,
            dateTime: new Date(news.publishTime).toLocaleDateString(),
            author: news.author,
            authorAvatar:
              news.authorAvatar || "https://picsum.photos/180/180?image=113",
            watchCount: news.starNums,
            id: news.id
          });
        }

        data.products.forEach((goods, index) => {
          this.goods.push({
            image: goods.mainImage,
            title: goods.name,
            id: goods.id,
            groupPrice: Math.floor(((index + 1) * 88 - 67 * (index + 1)) * 2),
            singlePrice: Math.floor(((index + 1) * 88 - 64 * (index + 1)) * 2)
          });
        });
      })
      .catch(e => {
        this.$log.error(e || e.response);
      });
  },
  data() {
    return {
      carousals: [],
      news: [],
      propertyAnnounces: [
        {
          title: "2月份补缴水费通知",
          date: "2019/02/03",
          detail: "请各位业主按时缴纳物业费以及卫生费，逾期不交者停水停电。",
          dialog_show: false
        },
        {
          title: "1月份补缴水费通知",
          date: "2019/01/03",
          detail: "受大风天气影响，明天全区停电半天",
          dialog_show: false
        },
        {
          title: "12月份补缴水费通知",
          date: "2018/12/03",
          detail: "请各位业主按时缴纳物业费以及卫生费，逾期不交者停水停电",
          dialog_show: false
        }
      ],
      communityNoticeVos: [],
      goods: []
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.container {
  margin: 0 auto;
}

.news {
  /* height: 190px; */
  overflow: hidden;
}
.index-title {
  font-family: Tahoma, Arial, Helvetica, "Microsoft YaHei New",
    "Microsoft Yahei", "微软雅黑", 宋体, SimSun, STXihei, "华文细黑", sans-serif;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
}
.index-title > span {
  text-transform: capitalize;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: rgba(0, 0, 0, 0.4);
}
.news:not(:last-child) {
  margin-bottom: 10px;
}
.content-container {
  flex-direction: column;
  justify-content: space-between;
}
.content-container > p {
}
.content-footer {
  border-top: 1px solid rgba(192, 191, 191, 0.534);
  padding-top: 10px;
}
.bg-decoration {
}
.interactive-wrapper .flex {
  padding: 20px 12px !important;
}
.interactive {
  border: 1px solid rgba(111, 111, 111, 0.651);
  border-radius: 2px;
  width: 100%;
  height: 150px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
}
.interactive:hover {
  box-shadow: 0 14px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.interactive span {
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.8);
}
.single-price {
  text-decoration: line-through;
  font-family: cursive;
}
.group {
  width: 100%;
  justify-content: space-between;
}

.footer div {
  flex: 1;
}
</style>
