<template>
  <div>
    <v-container>
      <v-layout row class="my-3 pb-3" v-for="(announce,index) in announces" :key="index">
        <v-flex xs2>
          <h4 class="announce-date text-xs-right grey--text">{{announce.date}}</h4>
        </v-flex>
        <v-flex xs10 class>
          <v-layout column>
            <v-flex class="announce-title-wrapper">
              <h3 class="announce-title">{{announce.title}}</h3>
            </v-flex>
            <v-flex>
              <p class="announce-detail font-weight-light">{{announce.detail}}</p>
            </v-flex>
            <v-flex class="py-2"></v-flex>
            <v-divider></v-divider>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { getAnnouncement } from "~/information";
export default {
  name: "propertyA",
  data() {
    return {
      announces: []
    };
  },
  created() {
    try {
      this.changeAnnounceList(this.$route.name);
    } catch (error) {
      this.$log.error(error);
    }
  },
  watch: {
    $route(to) {
      this.changeAnnounceList(to.name);
    }
  },
  methods: {
    async changeAnnounceList(name) {
      if (name === "property") {
        const res = await getAnnouncement("proper");
        const data = res.data;
        this.$log.debug(data);
        this.announces = [
          {
            date: "2018/08/23",
            title: "8月份交水电费通知",
            detail:
              "每个类只能继承一个类。在这个类中，你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它只是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度的"
          },
          {
            date: "2018/09/22",
            title: "9月份交水电费通知",
            detail:
              "每个类只能继承一个类。在这个类中，你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它只是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度的"
          },
          {
            date: "2018/10/23",
            title: "10月份交水电费通知",
            detail:
              "每个类只能继承一个类。在这个类中，你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它只是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度的"
          },
          {
            date: "2018/11/12",
            title: "开始供暖通知",
            detail:
              "每个类只能继承一个类。在这个类中，你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它只是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度的"
          }
        ];
      } else if (name === "community") {
        const res = await getAnnouncement("community");
        const data = res.data;
        this.$log.debug(data);
        this.announces = [
          {
            date: "2019/01/20",
            title: "社区集结50岁以上居民进行广场舞大赛的通知",
            detail:
              "每个类只能继承一个类。在这个类中，你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它只是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度的"
          },
          {
            date: "2019/01/23",
            title: "关于广场舞大赛举办地点和时间的通知",
            detail:
              "每个类只能继承一个类。在这个类中，你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它只是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度的"
          },
          {
            date: "2019/02/10",
            title: "春节包水饺大赛的通知",
            detail:
              "每个类只能继承一个类。在这个类中，你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它只是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度的"
          },
          {
            date: "2019/02/25",
            title: "元宵节社区狂欢日",
            detail:
              "每个类只能继承一个类。在这个类中，你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它只是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度的"
          }
        ];
      }
    }
  }
};
</script>
<style>
.announce-date {
  font-family: Roboto Mono;
  font-size: 14px;
  color: #5f6368;
  margin-right: 30px;
}
.announce-title-wrapper {
  flex-shrink: 0;
}
.announce-title {
  font-family: Google Sans;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #424242;
  margin-bottom: 24px;
  margin-top: -8px;
}
.announce-detail {
}
</style>
