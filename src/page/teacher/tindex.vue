<!--  -->
<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu class="el-menu--vertical-demo" background-color="#324057" text-color="#bfcbd9" text-ali :default-active="defaultActive" style="min-height: 100%; text-align: left;" router>
          <el-menu-item index="thome">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user-solid"></i>信息模块
            </template>
            <el-menu-item index="tinfo">教师信息</el-menu-item>
            <el-menu-item index="tclass">班级管理</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-tickets"></i>学科管理
            </template>
            <el-menu-item index="tintroduction">学科介绍</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-edit"></i>考试模块
            </template>
            <el-menu-item index="titem">编辑试题库</el-menu-item>
            <el-menu-item index="tsetexam">编写试卷</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-star-on"></i>作业模块
            </template>
            <el-menu-item index="tsethomework">作业布置</el-menu-item>
            <el-menu-item index="thomeitem">管理作业库</el-menu-item>
            <el-menu-item index="thomework">作业批改</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-question"></i>反馈模块
            </template>
            <el-menu-item index="tfeedback">查看考试反馈</el-menu-item>
            <el-menu-item index="studentfeedback">查看学生反馈</el-menu-item>
            <el-menu-item index="appraise">评价</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-camera"></i>直播模块
            </template>
            <el-menu-item index="tradio">直播系统</el-menu-item>
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