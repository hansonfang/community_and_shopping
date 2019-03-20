<template>
  <div>
    <v-tabs v-model="active" color="grey lighten-2" slider-color="blue" fixed-tabs>
      <v-tab v-for="item in items" :key="item.name" ripple :to="`/shopping/${item.name}`">{{item.title}}</v-tab>
    
    </v-tabs>

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "shopping",
  data() {
    return {
      active: 0,
      items: [{title:"食品生鲜",name:"food"},{title:"居家好物",name:"home"},{title:"母婴馆",name:"baby"},{title:"到家服务",name:"service"}],

    };
  }
};
</script>
