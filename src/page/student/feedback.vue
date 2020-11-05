<!--  -->
<template>
  <div>
    <shead-top></shead-top>
    <el-form
      ref="feedback"
      :model="feedback"
      label-width="90px"
      style="width: 50%; margin-top: 40px; text-align: left"
    >
      <el-form-item label="课程">
        <el-input v-model="feedback.name"></el-input>
      </el-form-item>
      <el-form-item label="指导教师">
        <el-input v-model="feedback.teacher"></el-input>
      </el-form-item>
      <el-form-item label="知识点">
        <el-input v-model="feedback.point"></el-input>
      </el-form-item>
      <el-form-item label="章节">
        <el-input v-model="feedback.chapter"></el-input>
      </el-form-item>
      <el-form-item label="课程时间">
        <el-input v-model="feedback.coursetime"></el-input>
      </el-form-item>
      <el-form-item label="详细介绍">
        <el-input v-model="feedback.detail"></el-input>
      </el-form-item>
      <el-form-item label="课程难度">
        <el-select v-model="feedback.difficults">
          <el-option
            v-for="item in difficults"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程情况">
        <el-select v-model="feedback.difficult" placeholder="请选择">
          <el-option
            v-for="item in difficult"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="反馈信息">
        <el-input v-model="feedback.info" type="textarea" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="save">提交反馈</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sheadTop from "@/components/student/sheadTop";
import eventBus from "@/components/student/eventBus.js";
export default {
  data() {
    return {
      feedback: {},
      difficults: [
        {
          value: "1",
          label: "☆"
        },
        {
          value: "2",
          label: "☆☆"
        },
        {
          value: "3",
          label: "☆☆☆"
        },
        {
          value: "4",
          label: "☆☆☆☆"
        },
        {
          value: "5",
          label: "☆☆☆☆☆"
        }
      ],
      difficult: [
        {
          value: "1",
          label: "完全听懂"
        },
        {
          value: "2",
          label: "基本都听懂"
        },
        {
          value: "3",
          label: "一半都不懂"
        },
        {
          value: "4",
          label: "基本都不懂"
        },
        {
          value: "5",
          label: "完全不懂"
        }
      ]
    };
  },

  components: {
    sheadTop
  },

  computed: {},
  activated() {
    eventBus.$on("feedback", data => {
      this.feedback = data;
    });
  },
  methods: {
    save: function() {
      const name = localStorage.getItem('studentname');
      self = this;
      console.log(this.feedback.difficults)
      this.$http
        .post("http://localhost:3000/api/feedback/addStudentData", {
          name: self.feedback.name,
          teacher:self.feedback.teacher,
          point: self.feedback.point,
          chapter: self.feedback.chapter,
          detail: self.feedback.detail,
          difficult: self.feedback.difficult,
          difficults: self.feedback.difficults,
          info: self.feedback.info,
          studentname: name
        })
        .then(function(response) {
          // console.log(response);
          alert('提交成功')
          // console.log(self.feedbackData);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
</style>