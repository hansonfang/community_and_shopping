<template>
  <v-app>
    <Head/>
    <Nav/>
    <transition :name="transitionName">
      <router-view :key="key" class="page"></router-view>
    </transition>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import Head from "./components/Head.vue";
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  components: {
    Nav,
    Head
  },
  watch: {
    $route(to, from) {

      const toName = to.name;
      const fromName = from.name;

      if (fromName === "common" && toName === "moreannouncement") {
        this.transitionName = "slide-left";
      } else if (fromName === "moreannouncement" && toName === "common") {
        this.transitionName = "slide-right";
      } else this.transitionName = "fade";
    }
  },
  computed: {
    key() {
      return this.$route.meta.key;
    }
  }
};
</script>
<style>
a {
  text-decoration: none;
}
.page{
  position: absolute;
  top:93px;
  bottom:0;
    width: 100%;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.slide-left-leave-active,
.slide-left-enter-active {
  transition: 1s;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-leave-to{
  transform: translate(-100%, 0);
}
/* Slide Right */
.slide-right-leave-active,
.slide-right-enter-active {
  transition: 1s;
}
.slide-right-enter {
  transform: translate(-100%, 0);
}
.slide-right-leave-to{
  transform: translate(100%, 0);
}

.v-dialog .v-card__title {
  justify-content: center;
  padding-bottom: 0;
}
</style>
