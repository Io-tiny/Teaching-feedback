<!--  -->
<template>
  <div>
    <shead-top></shead-top>
    <div style="text-align: left; margin-left: 50px">
      作业名称：
      <el-input
        placeholder="请输入名称"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputWorkData"
      ></el-input>
      <el-button @click="searchWorkData">查询</el-button>
    </div>

    <el-table :data="pageWorkDatas" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="100px"></el-table-column>
      <el-table-column prop="name" label="作业名"></el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column prop="createtime" label="发布时间">
        <template slot-scope="scope">{{ scope.row.createtime | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="time" label="作答时间(天)"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showWorkData(scope.$index, scope.row)">
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
      :total="workDatas.length"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
  </div>
</template>

<script>
import sheadTop from "@/components/student/sheadTop";
export default {
  data() {
    return {
      workDatas: [],
      workData: {},
      inputWorkData: "",
      currentPage: "",
      pagesize: "",
      pageWorkDatas: []
    };
  },

  components: {
    sheadTop
  },

  created() {
    this.getWorkData();
  },

  methods: {
    getWorkData: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.$http
        .post("http://localhost:3000/api/homework/getWorkData", {})
        .then(function(response) {
          // console.log(response);
          self.workDatas = response.data;
          // alert('获取成功')
        })
        .then(function(response) {
          self.pageWorkDatas = self.workDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showWorkData: function(index, row) {
      self = this;
      const nowdate = new Date().getTime();
      const createtime = new Date(row.createtime).getTime();
      const time = row.time * 24 * 60 * 60 * 1000;
      if (nowdate > createtime + time) {
        alert("答题时间已过");
      } else {
        localStorage.setItem("workid", row.id);
        localStorage.setItem("workname", row.name);
        this.$router.push("finishhomework");
      }
      // console.log(localStorage.getItem('testid'));
    },
    searchWorkData: function() {
      this.$http
        .post("http://localhost:3000/api/homework/searchWorkData", {
          name: "%" + self.inputWorkData + "%"
        })
        .then(function(response) {
          // console.log(response);
          console.log(response);
          self.pageWorkDatas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageWorkDatas = this.workDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageWorkDatas = this.workDatas.slice(
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