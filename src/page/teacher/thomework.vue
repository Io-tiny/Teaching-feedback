<!--  -->
<template>
  <div>
    <thead-top></thead-top>
    <div style="text-align: left; margin-left: 50px">
      作业名称：
      <el-input
        placeholder="请输入名称"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputData"
      ></el-input>
      <el-button @click="searchData">查询</el-button>
    </div>

    <el-table :data="pageAnswerDatas" stripe style="width: 100%">
      <el-table-column prop="testname" label="试卷名"></el-table-column>
      <el-table-column prop="studentname" label="学生名"></el-table-column>
      <el-table-column prop="createtime" label="提交时间">
        <template slot-scope="scope">{{ scope.row.createtime | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="totalgold" label="总分"></el-table-column>
      <el-table-column prop="sum" label="得分"></el-table-column>
      <el-table-column prop="answer" label="答案"></el-table-column>
      <el-table-column prop="finish" label="是否完成批改"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="finishData(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>开始批卷
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes,prev, pager, next, jumper"
      :total="answerDatas.length"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
    <answer-form :answerDatas="newanswer" :isvisiable="isVisiable" @close="close" @save="save"></answer-form>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
import answerForm from "@/components/teacher/answerForm";
import moment from "moment";
export default {
  data() {
    return {
      answerData: {},
      answerDatas: [],
      inputData: "",
      newanswer: {},
      isVisiable: false,
      currentPage: "",
      pagesize: "",
      pageAnswerDatas:[],
    };
  },

  components: {
    theadTop,
    answerForm
  },
  created() {
    this.getAnaserData();
    // console.log(this.answerDatas)
  },
  methods: {
    getAnaserData: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.$http
        .post("http://localhost:3000/api/answer/getAnswerData", {})
        .then(function(response) {
          self.answerData = response.data[0];
          self.answerDatas = response.data;
          // console.log(self.answerDatas);
        })
        .then(function(response) {
          self.pageAnswerDatas = self.answerDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchData: function() {
      self = this;
      this.$http
        .post("http://localhost:3000/api/answer/searchAnswerData", {
          testname : "%" + this.inputData + "%"
        })
        .then(function(response) {
          self.answerDatas = response.data;
          console.log(response);
          // self.isVisiable = false;
        })
        .then(function(response) {
          self.pageAnswerDatas = self.answerDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    finishData: function(index, row) {
      self = this;
      // console.log(this.answerData);
      this.answerData = row;
      this.newanswer = row.answer.split(/;|；/);
      // console.log(this.newanswer);
      this.isVisiable = true;
    },
    save: function(gold, finish) {
      this.answerData.sum = parseInt(this.answerData.sum) + parseInt(gold);
      this.answerData.finish = finish;
      self = this;
      this.$http
        .post("http://localhost:3000/api/answer/updateAnswerData", {
          id: self.answerData.id,
          testname: self.answerData.testname,
          studentname: self.answerData.studentname,
          createtime: moment(self.answerData.createtime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          totalgold: self.answerData.totalgold,
          sum: self.answerData.sum,
          answer: self.answerData.answer,
          finish: self.answerData.finish
        })
        .then(function(response) {
          // alert("保存成功");
          self.isVisiable = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close: function() {
      this.isVisiable = false;
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageAnswerDatas = this.answerDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageAnswerDatas = this.answerDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      /*console.log(this.currentPage) */
    }
  }
  
};
</script>
<style scoped>
</style>

