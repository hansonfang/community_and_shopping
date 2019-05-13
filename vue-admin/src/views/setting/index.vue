<template>
  <div class="flex justify-center">
    <el-select
      v-model="value"
      placeholder="请选择操作社区"
      @change="handleChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { getCommunityList } from "@/api/login";
export default {
  name: "setting",
  async created() {
    try {
      const data = (await getCommunityList()).data;
      this.options = [];
      data.forEach(item => {
        this.options.push({
          address: item.address,
          label: item.name,
          value: item.id
        });
      });
    } catch (error) {
      console.log(error.response);
    }
  },
  data() {
    return {
      options: [],
      value: ""
    };
  },
  methods: {
    handleChange() {
      this.$store.commit("SET_COMMUNITY", this.value);
    }
  }
};
</script>
