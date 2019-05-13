<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
      <div class="menu-wrapper">
        <a href="#">
          <li
            role="menuitem"
            tabindex="-1"
            class="el-menu-item submenu-title-noDropdown"
            style="padding-left: 20px; color: rgb(191, 203, 217); background-color: rgb(48, 65, 86);"
          ><span>社区ID:{{communityID}}</span></li>
        </a>
      </div>
    </el-menu>

  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  created() {},
  computed: {
    ...mapGetters(["sidebar", "communityID"]),
    routes() {
      return this.$router.options.routes;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
