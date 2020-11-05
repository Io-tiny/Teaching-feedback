<!--  -->
<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu background-color="#324057" text-color="#bfcbd9" text-ali :default-active="defaultActive" style="min-height: 100%; text-align: left" router>
          <el-menu-item index="ahome">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user-solid"></i>管理
            </template>
            <el-menu-item index="aclass">班级管理</el-menu-item>
            <el-menu-item index="ateacher">教师管理</el-menu-item>
            <el-menu-item index="astudent">学生管理</el-menu-item>
            <el-menu-item index="asubject">学科管理</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },


  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },


  methods: {}
};
</script>
<style lang='less'>
  @import '../../style/mixin';
</style>