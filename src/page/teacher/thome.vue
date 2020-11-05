<!--  -->
<template>
  <div>
    <thead-top></thead-top>
    <div class="mian">
      <div class="shortcut">
        <li class="item">
          <router-link to="tsetexam">
            <div class="text">
              <img src="../../assets/images/index/icon-exam.png" alt />
              <div class="info">
                <span>创建考试</span>
                <p>创建考试并选择发布时间或者手动发布</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="titem">
            <div class="text">
              <img src="../../assets/images/index/icon-question.png" alt />
              <div class="info">
                <span>添加题目</span>
                <p>手动添加题目，对试题库进行完善</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="tclass">
            <div class="text">
              <img src="../../assets/images/index/icon-user.png" alt />
              <div class="info">
                <span>班级管理</span>
                <p>对班级进行管理，需要先完善教师信息才能进行班级管理</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="tintroduction">
            <div class="text">
              <img src="../../assets/images/index/icon-process.png" alt />
              <div class="info">
                <span>学科管理</span>
                <p>对自己所教学科添加介绍，让学生能更快更方便的反馈已学知识</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="tfeedback">
            <div class="text">
              <img src="../../assets/images/index/icon-application.png" alt />
              <div class="info">
                <span>学生反馈</span>
                <p>对学生的反馈信息进行查看，方便修改教学进度以及教学方向</p>
              </div>
            </div>
          </router-link>
        </li>
        <li class="item">
          <router-link to="/appraise">
            <div class="text">
              <img src="../../assets/images/index/icon-certificate.png" alt />
              <div class="info">
                <span>同行互评</span>
                <p>“以评促教，以老带新”的原则，教师通过互相听课，了解他人授课情况及自身存在的不足和缺点</p>
              </div>
            </div>
          </router-link>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
export default {
  data() {
    return {};
  },

  components: {
    theadTop
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
