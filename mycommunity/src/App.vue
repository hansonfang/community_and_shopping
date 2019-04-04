<template>
  <v-app class="app">
    <Head/>
    <Nav/>
    <transition :name="transitionName">
      <router-view :key="key" class="page"></router-view>
    </transition>
    <Snackbar/>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import Head from "./components/Head.vue";
import Snackbar from "@/components/Snackbar"
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  components: {
    Nav,
    Head,
    Snackbar
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
  left:0;
  right:0;
    width: 100%;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
}
.theme--light.application{
  background: none;
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

.theme--light.v-pagination .v-pagination__navigation .v-icon{
    font-size: 1.3rem!important;
}
.sel-none{
  user-select: none!important;
}
.d-f{
  display: flex!important;
}
.min-h{
    min-height:150px!important;
}
.f-col{
  flex-direction: column;
}
.f-row{
  flex-direction: row;
}
.align-bottom{
  align-items: flex-end;
}
.justify-right{
  justify-content: right;
}
.justify-between{
  justify-content: space-between;
}
.f-1{
  flex:1;
}
.box-shadow{
  box-shadow:0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  
}
.application--wrap{
  /* overflow: hidden; */

}
li{
  list-style-type: none;
}
.paragraph{
  text-indent: 2rem;
  line-height: 1.9rem;
  font-size: 1.2rem;
}
.service-box{
  max-width: 860px;
  padding-top:80px;
}
</style>
