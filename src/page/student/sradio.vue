<!--  -->
<template>
  <div>
    <shead-top></shead-top>
    <el-container>
      <el-head>
        <a href="https://solutions.agora.io/education/web/#/">
          <el-button round class="btn">点击开始直播</el-button>
        </a>
      </el-head>
      <el-foot>
        <span style="font:12px Extra Small">直播系统介紹：本直播系统调用的是声网云课堂所提供的API</span>
      </el-foot>
    </el-container>
  </div>
</template>

<script>
import sheadTop from "@/components/student/sheadTop";
export default {
  data() {
    return {};
  },

  components: {
    sheadTop
  },

};
</script>
<style scoped>
.btn {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>