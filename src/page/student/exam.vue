<!--  -->
<template>
  <div>
    <shead-top></shead-top>
    <div style="text-align: left; margin-left: 50px">
      题目名称：
      <el-input
        placeholder="请输入名称"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputTestData"
      ></el-input>
      <el-button @click="searchtestData">查询</el-button>
    </div>

    <el-table :data="pageTestDatas" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="100px"></el-table-column>
      <el-table-column prop="name" label="试卷名"></el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column prop="createtime" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createtime | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="showtime" label="作答时间">
        <template slot-scope="scope">{{ scope.row.showtime | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showTestData(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>开始答题
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
      :total="testDatas.length"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
    <password :isvisiable="isVisiable" @close="close" @save="checkpassword"></password>
  </div>
</template>

<script>
import sheadTop from "@/components/student/sheadTop";
import password from "@/components/student/password";
import moment from "moment";
export default {
  data() {
    return {
      testDatas: [],
      testData: {},
      inputTestData: "",
      currentPage: "",
      pagesize: "",
      pageTestDatas: [],
      isVisiable: false
    };
  },

  components: {
    sheadTop,
    password
  },

  created() {
    this.getTestData();
  },

  methods: {
    getTestData: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.$http
        .post("http://localhost:3000/api/test/getData", {
          publish: "是"
        })
        .then(function(response) {
          // console.log(response);
          self.testDatas = response.data;
          // alert('获取成功')
        })
        .then(function(response) {
          self.pageTestDatas = self.testDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchtestData: function() {
      self = this;
      this.$http
        .post("http://localhost:3000/api/test/searchTestData", {
          name: "%" + self.inputTestData + "%"
        })
        .then(function(response) {
          // console.log(response);
          console.log(response);
          self.pageTestDatas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showTestData: function(index, row) {
      self = this;
      const time = new Date().getTime();
      const showtime = new Date(row.showtime).getTime();
      const lasttime = moment(row.showtime) + row.time * 60 * 1000;
      // console.log(time, showtime);
      if (time < showtime) {
        alert("还未到考试时间");
      } 
      else if(time > lasttime){
        alert("已经超过考试时间")
      }
      else {
        this.isVisiable = true;
        this.testData = row;
      }

      // console.log(localStorage.getItem('testid'));
    },
    checkpassword: function(password) {
      if (password == this.testData.password) {
        this.isVisiable = false;
        localStorage.setItem("testid", this.testData.id);
        localStorage.setItem("testname", this.testData.name);
        this.$router.push("finishtest");
      } else {
        alert("试卷密码错误，请重新输入");
      }
    },
    close: function() {
      this.isVisiable = false;
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageTestDatas = this.testDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageTestDatas = this.testDatas.slice(
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