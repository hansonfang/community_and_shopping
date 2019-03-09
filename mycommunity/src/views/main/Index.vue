<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs8 class="mb-2">
          <v-carousel cycle max="100%" hide-delimiters>
            <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex xs4 class="mb-2 d-f">
          <v-layout column>
            <v-flex style="width:100%;flex-grow:1;margin-top:4px;" class="pa-2 mb-2">
              <Announcement
                :announcements="propertyAnnounces"
                title="物业公告"
                moreLink="/announcements"
              />
            </v-flex>
            <v-divider></v-divider>
            <v-flex style="width:100%;flex-grow:1;margin-top:4px;" class="pa-2 mb-2">
              <Announcement
                :announcements="communityAnnounces"
                title="社区公告"
                moreLink="/announcements"
              />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-layout row>
          <v-flex xs12 sm6 md7 class="d-f f-col py-5 pr-5" style="flex-wrap:no-wrap;">
            <!-- 新闻列表 -->
            <div class="d-f f-row align-center justify-space-between">
              <h4 class="py-2 index-title">社区头条
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
                <v-flex xs8 class="content-container d-f pt-4 px-3 pb-2">
                  <h4>{{item.title}}</h4>
                  <p class="grey--text text--darken-1 mb-0">{{item.brief}}</p>
                  <footer class="d-f align-center content-footer mb-1">
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
                    <span class="grey--text text--lighten-1">
                      <v-icon
                        size="16"
                        class="mr-1"
                        color="grey lighten-1"
                      >far fa-comment-dots fa-flip-horizontal</v-icon>
                      <span>{{item.commentsCount}}</span>
                    </span>
                  </footer>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex d-flex xs12 sm6 md5 class="py-5">
            <v-layout column>
              <v-flex style="width:100%;flex-grow:1;margin-top:4px;" class>
                <h4 class="py-2 index-title">常用功能
                  <span>community services</span>
                </h4>
                <v-layout row no-wrap class="interactive-wrapper box-shadow">
                  <v-flex xs4>
                    <router-link to="/orderRepair">
                      <div class="interactive">
                        <v-icon size="50" color="info">fas fa-tools</v-icon>
                        <span>立刻报修</span>
                      </div>
                    </router-link>
                  </v-flex>
                  <v-flex xs4>
                    <router-link to="/orderWater">
                      <div class="interactive">
                        <v-icon size="50" color="info">fas fa-tint</v-icon>
                        <span>预约送水</span>
                      </div>
                    </router-link>
                  </v-flex>
                  <v-flex xs4>
                    <router-link to="/tellManager">
                      <div class="interactive">
                        <v-icon size="50" color="info">fas fa-user-tie</v-icon>
                        <span>找书记</span>
                      </div>
                    </router-link>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex style="width:100%;flex-grow:0;margin-top:4px;" class="pa-2 mt-4">
                <!-- 购物推荐 -->
                <div class="d-f f-row align-center justify-space-between">
             <h4 class="py-2 index-title">推荐购物
                  <span>Shopping recommendation</span>
                </h4>
            <router-link to="/shopping">拼购商城>>></router-link>
            </div>
                
                <v-layout row wrap class="box-shadow">
                  <v-flex md4 xs12 v-for="(item,index) in goods" :key="index">
                    <v-card class="ma-1">
                      <v-img :src="item.image" aspect-ratio="2.75" height="200"></v-img>

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

                          <div>
                            <v-btn color="red" round dark>立刻拼团</v-btn>
                          </div>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <v-footer class="d-f">
      <div></div>
      <div class="text-xs-center">使用MIT License开源，基于
        <a href="https://vuetifyjs.com/zh-Hans/">Vuetify</a>
        <br>Copyright © 2016-2019 Hanson
      </div>
      <div class="text-xs-right">Twitter</div>
    </v-footer>
  </div>
</template>
<script>
import Announcement from "@/components/CommonItems/Annoucements";
export default {
  name: "index",
  components: { Announcement },
  data() {
    return {
      items: [
        { src: "https://picsum.photos/500/1920?random" },
        { src: "https://picsum.photos/500/1920?random" },
        { src: "https://picsum.photos/500/1920?random" },
        { src: "https://picsum.photos/500/1920?random" }
      ],
      news: [
        {
          title: "汪洋：对外讲好中国故事，推动构建人类命运共同体",
          image: "https://picsum.photos/400/500?random",
          brief:
            "中共中央政治局常委、全国政协主席汪洋3日在全国政协常委会工作报告中提出，对外讲好中国故事，维护国家主权、安全和发展利益，推动构建人类命运共同体。",
          dateTime: "2019-03-04",
          author: "中国新闻网",
          authorAvatar: "https://picsum.photos/150/150?random",
          watchCount: 325,
          commentsCount: 34
        },
        {
          title: "伊拉克欲加入“一带一路”和亚投行与中国合作海陆运输",
          image: "https://picsum.photos/400/500?random",
          brief:
            "当地时间3月3日，伊拉克运输部召开会议，探讨加入中国主导的“一带一路”经济带相关事宜。运输部媒体办公室表示，将启动与中方的合作，并为此建立有效的规划机制。",
          dateTime: "2019-03-04",
          author: "央视网",
          authorAvatar: "https://picsum.photos/150/150?random",
          watchCount: 5697,
          commentsCount: 214
        },
        {
          title: "民航局：“一带一路”航线五年客运量超一亿",
          image: "https://picsum.photos/400/500?random",
          brief:
            "10月恰逢“一带一路”倡议提出五周年。12日，在中国民用航空局新闻发布会上，民航局发展计划司副巡视员张清介绍，“一带一路”航线五年客运量超一亿，五年来，共完成旅客运输量达到1.02亿人次。",
          dateTime: "2018-10-13",
          author: "高艺宁",
          authorAvatar: "https://picsum.photos/150/150?random",
          watchCount: 873,
          commentsCount: 53
        },
        {
          title: "15天1万公里，“卡车航班”从德国一路开往中国",
          image: "https://picsum.photos/400/500?random",
          brief:
            "当地时间2月28日，一辆满载精密仪器、航空航天材料以及电子产品的卡车已从德国多特蒙德出发，穿过波兰、白俄罗斯、俄罗斯、哈萨克斯坦等国，在我国新疆霍尔果斯口岸换车，行驶近1万公里，计划3月15日前抵达上海。",
          dateTime: "2019-03-01",
          author: "王力",
          authorAvatar: "https://picsum.photos/150/150?random",
          watchCount: 497,
          commentsCount: 12
        },
        {
          title: "15天1万公里，“卡车航班”从德国一路开往中国",
          image: "https://picsum.photos/400/500?random",
          brief:
            "当地时间2月28日，一辆满载精密仪器、航空航天材料以及电子产品的卡车已从德国多特蒙德出发，穿过波兰、白俄罗斯、俄罗斯、哈萨克斯坦等国，在我国新疆霍尔果斯口岸换车，行驶近1万公里，计划3月15日前抵达上海。",
          dateTime: "2019-03-01",
          author: "王力",
          authorAvatar: "https://picsum.photos/150/150?random",
          watchCount: 497,
          commentsCount: 12
        }
      ],
      repair_dialog: false,
      image: require("../../assets/images/wuye.jpg"),
      repairText: "",
      address: "",
      telephone: "",
      expectedDate: new Date().toISOString().substr(0, 10),
      expectedTime: null,
      dateMenu: false,
      timeMenu: false,
      propertyAnnounces: [
        {
          title: "2月份补缴水费通知",
          date: "2019/02/03",
          detail:
            "没法直视他的舞蹈，令人反胃。性感的顶胯动作可以为舞蹈增添魅力，可是性感不等于骚，他做出来的动作，不是让我脸红心跳，是反胃想吐，明白吗？",
          dialog_show: false
        },
        {
          title: "1月份补缴水费通知",
          date: "2019/01/03",
          detail:
            "这是淘宝造物节走红毯的蔡徐坤，视觉中国拍的图，都说能经过视觉中国检验的才是真帅哥，蔡徐坤显然脸塌下来了，这身材五五分，脸上油腻腻，他嘴巴本来就很厚，香肠嘴，又没气质，这图还没脖子？看起来好猥琐。",
          dialog_show: false
        },
        {
          title: "12月份补缴水费通知",
          date: "2018/12/03",
          detail:
            "基本上是不会同意的，但是就算心理建设时候可以做到以后和家人一刀两断因为够独立，但是请不要说或者做，因为我们是社会人，父母的感情真的不能断，是可以有能力而不能切断的感情，各个层次都是。",
          dialog_show: false
        }
      ],
      communityAnnounces: [
        {
          title: "东门社区党群服务中心3月份活动预告",
          date: "2019/03/05",
          detail:
            "社区居民可前来参与会议，特此公告。地址：解放路2003号金世界六楼东门社区工作站",
          dialog_show: false
        },
        {
          title: "“榜样就在身边”东门社区党员志愿服务活动",
          date: "2019/02/15",
          detail:
            "在东门社区党委的号召下，秉承着“向雷锋同志学习”的口号，东门社区党群服务中心于2019年3月5日下午开展了&l详细“榜样就在身边”东门社区党员志愿服务",
          dialog_show: false
        },
        {
          title: "东门社区关于召开2019年民生微实事第一次居民议事会议公告",
          date: "2019/02/06",
          detail:
            "北门居委会定于2019年2月28日（星期四）16:00在东门社区工作站会议室，组织召开社区第1次居民议事会议，对以下1个民生微实事项目进行集中审议",
          dialog_show: false
        }
      ],
      adItems: [
        { src: "https://picsum.photos/300/400?random" },
        { src: "https://picsum.photos/300/400?random" },
        { src: "https://picsum.photos/300/400?random" },
        { src: "https://picsum.photos/300/400?random" }
      ],
      goods: [
        {
          image: "https://picsum.photos/300/400?random",
          title: "海天生抽",
          groupPrice: 9,
          singlePrice: 12
        },
        {
          image: "https://picsum.photos/300/400?random",
          title: "海天蚝油",
          groupPrice: 8,
          singlePrice: 13
        },
        {
          image: "https://picsum.photos/300/400?random",
          title: "鲁花花生油",
          groupPrice: 56,
          singlePrice: 68
        },
        {
          image: "https://picsum.photos/300/400?random",
          title: "家家乐味精",
          groupPrice: 5,
          singlePrice: 8
        },
        {
          image: "https://picsum.photos/300/400?random",
          title: "团圆速冻水饺",
          groupPrice: 17,
          singlePrice: 21
        },
        {
          image: "https://picsum.photos/300/400?random",
          title: "湾仔码头速冻馄饨",
          groupPrice: 15,
          singlePrice: 23
        }
      ]
    };
  }
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
  font-family: "宋体", Microsoft YaHei;
  font-size: 20px;
}
.index-title > span {
  text-transform: capitalize;
  font-family: Georgia, "Times New Roman", Times, serif;
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
.interactive-wrapper .flex {
  padding: 20px 12px !important;
}
.interactive {
  border: 2px solid rgba(17, 140, 241, 0.651);
  border-radius: 8px;
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
.single-price {
  text-decoration: line-through;
  font-family: cursive;
}
.group {
  width: 100%;
  justify-content: space-between;
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
