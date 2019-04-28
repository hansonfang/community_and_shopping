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
// import { getNewsList } from "~/news";
export default {
  name: "newsIndex",
  async created(){
try {
  // const {data}=await getNewsList({});
  // data.data.forEach(news => {
  //   const d=news.publishTime.substr(0,news.publishTime.indexOf("T"));
  //   const d_a=d.split("-");
  //   const year=`${d_a[0]}-${d_a[1]}`;
  //   const date=d_a[2];
  //   this.news.push({
  //     title:news.title,
  //     detail:news.description,
  //     year,
  //     date,
  //     id:news.id
  //   })
  // });
} catch (error) {
  this.$log.error(error)
}
  },
  data() {
    return {
      news: [
        {
          title: "2019中国（山东）在线教育及教育培训博览会",
          date: "07",
          year: "2019.2",
          id: "00001",
          detail:
            " 2019中国（山东）在线教育及教育培训博览会将于5月31-6月2日在济南国际会展中心盛大召开。历经多年发展，累计1000余家品牌展商及各类在线教育产品，"
        },
        {
          title: "2019中国（济南）孕婴童产业博览会",
          date: "02",
          year: "2019.2",
          id: "00002",
          detail:
            "目前，中国正经历着第四次生育高峰，而母婴产品的市场也在蓬勃发展，2019年中国婴童行业的发展同样是机遇与挑战并存。中国孕婴童行业经过20年的发展"
        },
        {
          title: "《天举三字语》是四书五经中的精华，是中华文化的结晶",
          date: "29",
          year: "2019.1",
          id: "00003",
          detail:
            "刘联众先生的新三字经，是四书五经中的精华，是中华五千年历史文化提炼的结晶，是当代社会的先进文化的教课书。贪官看了会脸红耳赤，公务员读了"
        },
        {
          title: "济南师范路小学家委会活动——学习雷锋，助人为乐",
          date: "22",
          year: "2019.01",
          id: "00004",
          detail:
            "  每年的三月份是一个万物复苏，春暖花开的日子，同时三月份又让我们不禁想起我们的英雄雷锋（学雷锋活动日，所以2019年三月2014级二班"
        },
        {
          title: "最是一年春好处 户外活动正当时",
          date: "21",
          year: "2019.01",
          id: "00005",
          detail:
            " 等闲识得东风面，万紫千红总是春。阳春三月是万物开始生长发芽的季节，春天更是孩子们自由生长的季节，最是一年春好处，带孩子们在户外游戏，尽情感受春天"
        },
        {
          title: "最是一年春好处——第二实验小学幼儿园师幼共成长 .",
          date: "21",
          year: "2019.01",
          id: "00006",
          detail:
            " 春天是万物复苏的季节，在这充满生机勃勃的日子里，济南市莱芜二实小幼儿园的老师和孩子们一起探寻着春的脚步，在丰富多样的活动中，表达着对春天的热爱。"
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
