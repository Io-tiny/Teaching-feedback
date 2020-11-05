<!--  -->
<template>
  <div class="feedback">
    <thead-top></thead-top>
    <div>
      <span>学生信息反馈结果</span>
    </div>
    <div class="sfeedback">
      <el-table :data="pageSfeedbacks" label="学生信息反馈结果" stripe style="width: 100%">
        <el-table-column prop="point" label="知识点"></el-table-column>
        <el-table-column prop="chapter" label="章节"></el-table-column>
        <el-table-column prop="detail" label="详细介绍"></el-table-column>
        <el-table-column prop="difficult" label="听懂情况">
          <template slot-scope="scope">{{ difficult[parseInt(scope.row.avg)] }}</template>
        </el-table-column>
        <el-table-column prop="difficult" label="听懂情况">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showInfo(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>详细信息
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
        :total="sfeedbacks.length"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
      <el-table :data="pageInfo" stripe style="width: 100%; margin-top: 50px" :isvisiable="isVisiable">
        <el-table-column prop="name" label="学科"></el-table-column>
        <el-table-column prop="point" label="知识点"></el-table-column>
        <el-table-column prop="chapter" label="章节"></el-table-column>
        <el-table-column prop="detail" label="详细介绍"></el-table-column>
        <el-table-column prop="difficult" label="听懂情况">
          <template slot-scope="scope">{{ difficult[parseInt(scope.row.difficult)] }}</template>
        </el-table-column>
        <el-table-column prop="difficults" label="课题难度反馈">
          <template slot-scope="scope">{{ difficults[parseInt(scope.row.difficults)] }}</template>
        </el-table-column>
        <el-table-column prop="info" label="学生反馈信息"></el-table-column>
        <el-table-column prop="studentname" label="学生姓名"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleInfoSizeChange"
        @current-change="handleInfoCurrentChange"
        :current-page="infocurrentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="infopagesize"
        layout="total, sizes,prev, pager, next, jumper"
        :total="infos.length"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
export default {
  data() {
    return {
      sfeedback: {},
      sfeedbacks: [],
      pageSfeedbacks: [],
      infos: [],
      pageInfo: [],
      currentPage: "", //默认显示页面为1
      pagesize: "", //    每页的数据条数
      infocurrentPage: "", 
      infopagesize: "",
      inputData: "",
      difficults: {
        1: "☆",
        2: "☆☆",
        3: "☆☆☆",
        4: "☆☆☆☆",
        5: "☆☆☆☆☆"
      },
      difficult: {
        1: "完全听懂",
        2: "基本都听懂",
        3: "一半都不懂",
        4: "基本都不懂",
        5: "完全不懂"
      },
      isVisiable: 'false'
    };
  },
  created() {
    this.getStuFeedback();
  },
  components: {
    theadTop
  },
  methods: {
    getStuFeedback: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.infocurrentPage = 1;
      this.infopagesize = 5;
      const name = localStorage.getItem("name");
      this.$http
        .post("http://localhost:3000/api/feedback/getStudentData", {
          name: name
        })
        .then(function(response) {
          // console.log(response);
          self.sfeedbacks = response.data;
          // console.log(self.feedbackData);
        })
        .then(function(response) {
          self.pageSfeedbacks = self.sfeedbacks.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showInfo: function(index, row){
      self = this;
      const name = localStorage.getItem("name");
      this.$http
        .post("http://localhost:3000/api/feedback/getInfo", {
          name: name,
          chapter: row.chapter
        })
        .then(function(response) {
          // console.log(response);
          self.infos = response.data;
          // console.log(self.feedbackData);
        })
        .then(function(response) {
          self.pageInfo = self.infos.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageSfeedbacks = this.sfeedbacks.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageSfeedbacks = this.sfeedbacks.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      /*console.log(this.currentPage) */
    },
    handleInfoSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageInfo = this.infos.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleInfoCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageInfo = this.infos.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      /*console.log(this.currentPage) */
    }
  }
};
</script>
<style scoped>
.feedback {
  /* background-color: #2c343c */
  text-align: center;
}
span {
  color: #2c343c;
  font-size: 20px;
  font-weight: bolder;
}
</style>