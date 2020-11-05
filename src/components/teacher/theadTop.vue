<!--  -->
<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/thome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align='start'>
      <img src="@/assets/images/default.jpg" class="avator" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="thome">首页</el-dropdown-item>
        <el-dropdown-item command="">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    handleCommand(command){
      this.$router.push("/" + command)
    }
  }
};
</script>
<style lang='less'>
@import "../../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>