<template>
  <div>
    <ahead-top></ahead-top>
    <div style="text-align: left; margin-left: 50px">
      班级名称：
      <el-input
        placeholder="请输入名称"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputData"
      ></el-input>
      <el-button @click="searchData">查询</el-button>
      <el-button @click="selectAll">查询全部</el-button>
    </div>

    <el-table :data="pageDatas" stripe style="width: 100%">
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column prop="count(class)" label="人数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delData(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>删除
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
      :total="Datas.length"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
  </div>
</template>

<script>
import aheadTop from "@/components/administrator/aheadTop";
export default {
  data() {
    return {
      Datas: [],
      Data: {},
      inputData: "",
      currentPage: "",
      pagesize: "",
      pageDatas: [],
      isVisiable: false
    };
  },

  components: {
    aheadTop,
  },

  created() {
    this.getData();
  },

  methods: {
    selectAll: function() {
      this.getData();
    },
    getData: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.$http
        .post("http://localhost:3000/api/administrator/getClassData", {
          sort: "student"
        })
        .then(function(response) {
          // console.log(response);
          self.Datas = response.data;
          // alert('获取成功')
        })
        .then(function(response) {
          self.pageDatas = self.Datas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delData: function(index, row) {
      self = this;
      this.$http
        .post("http://localhost:3000/api/administrator/delClassData", {
          class: row.class
        })
        .then(function(response) {
          self.getData();
          // self.isVisiable = false;
          alert("删除成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchData: function() {
      self = this;
      this.$http
        .post("http://localhost:3000/api/administrator/searchClassData", {
          class: "%" + self.inputData + "%",
          sort: "student"
        })
        .then(function(response) {
          // console.log(response);
          //   console.log(response);
          self.pageDatas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageDatas = this.Datas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageDatas = this.Datas.slice(
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