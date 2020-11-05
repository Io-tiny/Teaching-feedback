<!--  -->
<template>
  <div>
    <ahead-top></ahead-top>
    <div class="mian">
      <div class="shortcut">
        <li class="item">
          <router-link to="aclass">
            <div class="text">
              <img src="../../assets/images/index/icon-exam.png" alt />
              <div class="info">
                <span>班级管理</span>
                <p>对所有的班级进行集中管理</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="selecthomework">
            <div class="text">
              <img src="../../assets/images/index/icon-question.png" alt />
              <div class="info">
                <span>教师管理</span>
                <p>对所有教师进行集中管理</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="sinfo">
            <div class="text">
              <img src="../../assets/images/index/icon-user.png" alt />
              <div class="info">
                <span>学生管理</span>
                <p>对所有学生进行集中管理</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="introduction">
            <div class="text">
              <img src="../../assets/images/index/icon-process.png" alt />
              <div class="info">
                <span>学科管理</span>
                <p>对所有教师所教学科进行集中管理</p>
              </div>
            </div>
          </router-link>
        </li>
      
      </div>
    </div>
  </div>
</template>

<script>
import aheadTop from "@/components/administrator/aheadTop";
export default {
  data() {
    return {};
  },

  components: {
    aheadTop
  }
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  list-style: none;
  text-decoration: none;
}
.shortcut {
  width: 80%;
  height: 100%;
  margin-top: 50px;
  margin-left: 50px;
}
.item {
  width: 450px;
  height: 160px;
  background: #fff;
  border: 1px, solid, #f1f3f8;
  border-radius: 2px;
  /* font-size: 0; */
  float: left;
  margin-left: 21px;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0 2px 20px rgba(39, 39, 74, 0.05);
}
.item .text {
  float: left;
  width: 100%;
  height: 100%;
  padding: 30px;
}
img {
  width: 50px;
  margin-top: 25px;
  float: left;
}
.info {
  width: 200px;
  /* display: inline-block; */
  vertical-align: middle;
  margin-left: 20px;
  float: left;
}
span {
  font-size: 16px;
  color: #27274a;
  line-height: 40px;
}
p {
  font-size: 12px;
  color: #9090a4;
  margin-top: 6px;
  line-height: 30px;
}
</style>
