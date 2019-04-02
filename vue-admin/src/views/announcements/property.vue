<template>
  <div>
    <el-row :gutter="20" type="flex">
      <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="20" type="flex">
      <el-col :md="4" class="hidden-sm-and-down"></el-col>
      <el-col :xs="22" :md="16">
        <h3>物业公告</h3>
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
  </div>
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
        from: 2
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("Submit", this.form)
        .then(res => {
          this.$message({
            message: "创建成功!",
            type: "success"
          });
        })
        .catch(e => {
          window.console.log(e);
        });
    }
  }
};
</script>
<style>
@import "element-ui/lib/theme-chalk/display.css";
</style>
