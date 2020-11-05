<!--  -->
<template>
  <div>
    <shead-top></shead-top>
    <div class="mian">
      <div class="shortcut">
        <li class="item">
          <router-link to="exam">
            <div class="text">
              <img src="../../assets/images/index/icon-exam.png" alt />
              <div class="info">
                <span>在线考试</span>
                <p>查看教师发布的试题，并在指定时间完成答题</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="selecthomework">
            <div class="text">
              <img src="../../assets/images/index/icon-question.png" alt />
              <div class="info">
                <span>完成作业</span>
                <p>在指定时间内完成每日作业</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="sinfo">
            <div class="text">
              <img src="../../assets/images/index/icon-user.png" alt />
              <div class="info">
                <span>信息管理</span>
                <p>对自己的信息进行啊完善修改，便于老师的查看和管理</p>
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
                <p>对自己所学学科进行深入了解，拓展自己的知识，并在不懂的地方及时给老师反馈信息</p>
              </div>
            </div>
          </router-link>
        </li>
      
      </div>
    </div>
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
