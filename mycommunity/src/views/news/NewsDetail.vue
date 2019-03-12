<template>
  <div>
    <div class="banner py-4">
      <v-container>
        <v-layout>
          <h2 class="headline blue--text text--darken-2">学校举行女教职工建功立业先优表彰大会暨庆“三八”趣味运动会</h2>
        </v-layout>
      </v-container>
    </div>
    <v-container class="content">
      <v-layout>
        <h5 class="body-1 grey--text detail">
          <span class="date">
            <v-icon size="16">fas fa-calendar-day</v-icon>&nbsp;2019年03月08日
          </span>
          <span>
            <v-icon size="16">fas fa-user</v-icon>&nbsp;作者:校工会
          </span>
          <span>
            <v-icon size="16">far fa-eye</v-icon>&nbsp;点击数:1290
          </span>
        </h5>
      </v-layout>
      <v-layout column class="content-wrapper">
        <v-flex v-for="(item,index) in paragraphs" :key="index">
          <p v-if="item.p" class="paragraph py-2 pt-2">{{item.p}}</p>
          <v-img v-else-if="item.image" :src="item.image" max-width="900" max-height="500" contain>
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey"></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
        </v-flex>
      </v-layout>
    </v-container>
    <Footer/>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
export default {
  name: "news-detail",
  components: {
    Footer
  },
  data() {
    return {
      paragraphs: [
        {
          p:
            "现在电脑加密已经有很多的方法了，简单的就是在电脑上设置密码，可以总觉得不安全，买个指纹开机吧，又有点小贵。那么有没有其它方法可以保护我们的电脑，今天韩博士小编介绍一种使用u盘作为钥匙的启动方法，让电脑在插入自己的u盘才能够正常启动，让你的电脑更加的安全。但这个方法对于大神们来说是形同虚设的，没办法，家里的锁还有专门开锁的呢。防君子不防小人吧。",
          image: ""
        },
        { p: "", image: "https://picsum.photos/1000/500?random" },
        {
          p:
            "1.首先要确定自己的U盘盘符是什么。你可以先把U盘插在上面，看一眼，小编的是H盘。这里我希望大家千万不要搞错了盘符，以免开不了机了。",
          image: ""
        },
        {
          p:
            "2.下面我们在u盘里面创建一个文件，文件的名字和后缀名可以任意输入你喜欢的，小编在里面设置了shuizhuyu.888",
          image: ""
        },
        { p: "", image: "https://picsum.photos/900/600?random" },
        {
          p:
            "4.最后一步，.我们点击“开始-运行”接着输入'gpedit.msc“打开组策略，并依次打开：'本地计算机 策略计算机配置Windows设置脚本(启动/关机)”，然后在右边的框中选择项，我们把刚才建立的批处理文件添加到启动脚本列表当中，然后保存确定就可以了。",
          image: ""
        },
        { p: "", image: "https://picsum.photos/900/500?random" },
        {
          p:
            "这里说明一下，如果你的U盘丢了，记得当初放到U盘里的那个文件就可以，随时写好放在新的U盘里都可以再次进入，如果不需要这个功能只要在上图那个图中删除我们之前添加的文件即可",
          image: ""
        }
      ]
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
