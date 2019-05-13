<template>
  <div class="mx-4">

    <el-button
      @click="deleteSelected"
      type="danger"
      size="small"
      plain
    >删除所选项</el-button>
    <el-table
      ref="multipleTable"
      :data="communityData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="100"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="notice"
        label="标题"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="公告内容"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row
      :gutter="20"
      type="flex"
    >
      <el-col
        :md="4"
        class="hidden-sm-and-down"
      ></el-col>
      <el-col
        :xs="22"
        :md="16"
      >
        <div class="flex space-between align-center">
          <h3>物业公告</h3>

          <el-switch
            v-model="isNew"
            active-color="#13ce66"
            inactive-color="#1e77fd"
            active-text="创建"
            inactive-text="更新"
          >
          </el-switch>
        </div>

        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          @submit.native.prevent
        >
          <el-form-item label="公告标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="公告内容">
            <el-input
              type="textarea"
              :rows="6"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              v-if="isNew"
              @click="onSubmit"
              style="background-color:#13ce66;border-color:#13ce66;"
            >立即创建</el-button>
            <el-button
              type="primary"
              v-else
              @click="onUpdate"
              style="background-color:#1e77fd;border-color:#1e77fd;"
            >立即更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col
        class="hidden-sm-and-down"
        :md="4"
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import {
  submitProperty,
  updateProperty,
  getPropertyAnnouncements,
  deletePropertyAnnouncements
} from "@/api/announcements";
import { Message } from "element-ui";
export default {
  name: "propertyAnnounce",
  async created() {
    await this.fetchCommunityAnnouncements();
  },
  data() {
    return {
      form: {
        name: "",
        desc: "",
        from: 2
      },
      isNew: true,
      currentEdit: -1,
      communityData: [],
      multipleSelection: []
    };
  },
  methods: {
    async onSubmit() {
      if (!this.form.name && !this.form.desc) {
        Message({
          message: "请输入数据",
          type: "error",
          duration: 4000
        });
        return;
      }
      try {
        const res = await submitProperty(this.form);
        await this.fetchCommunityAnnouncements();
        this.form.name = "";
        this.form.desc = "";
      } catch (error) {
        console.log(error);
      }
    },
    async onUpdate() {
      if (this.currentEdit < 0) {
        Message({
          message: "请在表格中选择操作数据",
          type: "error",
          duration: 4000
        });
        return;
      }
      try {
        await updateProperty({
          id: this.currentEdit,
          notice: this.form.name,
          description: this.form.desc
        });
        this.form.name = "";
        this.form.desc = "";
        this.currentEdit = -1;
        await this.fetchCommunityAnnouncements();
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCommunityAnnouncements() {
      const data = (await getPropertyAnnouncements()).data;
      this.communityData = [];
      data.forEach(item => {
        this.communityData.push({
          date: new Date(item.showtime).toLocaleDateString(),
          notice: item.notice,
          description: item.description,
          id: item.id
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.form.name = row.notice;
      this.form.desc = row.description;
      this.currentEdit = row.id;
      this.isNew = false;
    },
    async handleDelete(index, row) {
      try {
        await deletePropertyAnnouncements(row.id);
        await this.fetchCommunityAnnouncements();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSelected() {
      const IDs = this.multipleSelection.map(sel => sel.id);
      try {
        await deletePropertyAnnouncements(IDs);
        await this.fetchCommunityAnnouncements();
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    isNew(val) {
      if (val) {
        this.form.name = "";
        this.form.desc = "";
        this.currentEdit = -1;
      }
    }
  }
};
</script>
<style>
@import "element-ui/lib/theme-chalk/display.css";
</style>
