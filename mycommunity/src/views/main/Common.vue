<template>
  <v-container fluid class="px-5 pt-5">
    <v-layout row wrap>
      <v-flex xs12 md6 lg4 class="px-3 py-3">
        <repair :announcements="announcements"></repair>
      </v-flex>
      <v-flex xs12 md6 lg4 class="px-3 py-3">
        <sendWater :brands="brands"></sendWater>
      </v-flex>
      <v-flex xs12 md6 lg4 class="px-3 py-3">
        <tellManager :secretaryItems="secretary_items"></tellManager>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import repair from "@/components/CommonItems/Repair";
import sendWater from "@/components/CommonItems/SendWater";
import tellManager from "@/components/CommonItems/TellManager";

export default {
  name: "common",
  components: {
    repair,
    sendWater,
    tellManager
  },
  data() {
    return {
      announcements: [
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
      brands: [
        { brand: "农夫山泉", price: 24 },
        { brand: "百脉泉", price: 16 },
        { brand: "娃哈哈", price: 20 },
        { brand: "雀巢纯水", price: 22 }
      ],
      secretary_items: [
        { title: "反映社区问题" },
        { title: "了解群众诉求" },
        { title: "信息化管理居民需求" },
        { title: "分享意见建议" }
      ]
    };
  },
  created() {
    //   ajax获取公告内容
  },
  methods: {}
};
</script>
<style scoped>
>>>.v-subheader {
  height: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
