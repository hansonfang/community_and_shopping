<template>
  <el-row :gutter="20" type="flex">
    <el-col :md="4" class="hidden-sm-and-down"></el-col>
    <el-col :xs="22" :md="16">
      <h3>社区公告</h3>
      <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
        <el-form-item label="公告标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="即时推送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>

        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="hidden-sm-and-down" :md="4"></el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        date: "",
        delivery: false,
        desc: "",
        from: 1
      }
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>
<style>
@import "element-ui/lib/theme-chalk/display.css";
</style>
