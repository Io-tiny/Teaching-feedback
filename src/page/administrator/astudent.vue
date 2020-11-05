<!--  -->
<template>
  <div>
    <ahead-top></ahead-top>
    <div style="text-align: left; margin-left: 50px">
      学生名称：
      <el-input
        placeholder="请输入名称"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputData"
      ></el-input>
      <el-button @click="searchData">查询</el-button>
      <el-button @click="selectAll">查询全部</el-button>
      <el-button @click="showAdd">添加</el-button>
    </div>

    <el-table :data="pageDatas" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sno" label="学号"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="subject" label="所学学科"></el-table-column>
      <el-table-column prop="teacher" label="指导教师"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showData(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>修改
          </el-button>
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
    <student-form :Data="Data" :isvisiable="isVisiable" @close="close" @Data-save="saveData(Data)"></student-form>
  </div>
</template>

<script>
import aheadTop from "@/components/administrator/aheadTop";
import studentForm from "@/components/administrator/studentForm";
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
    studentForm
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
        .post("http://localhost:3000/api/administrator/getStudentData", {
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
        .post("http://localhost:3000/api/administrator/delStudentData", {
          id: row.id
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
    showData: function(index, row) {
      console.log(row);
      this.Data = {
        id: row.id,
        name: row.name,
        sno: row.sno,
        class: row.class,
        username: row.username,
        password: row.password,
        subject: row.subject,
        teacher: row.teacher
      };
      this.isVisiable = true;
      // console.log(this.itemData)
    },
    saveData: function(Data) {
      self = this;
      if (!this.Data.username) {
        this.Data.username = this.Data.sno;
        //   console.log(this.Data.sno);
      }
      if (this.Data.id) {
        this.$http
          .post("http://localhost:3000/api/administrator/updateStudentData", {
            id: self.Data.id,
            name: self.Data.name,
            sno: self.Data.sno,
            class: self.Data.class,
            username: self.Data.username,
            password: self.Data.password,
            subject: self.Data.subject,
            teacher: self.Data.teacher
          })
          .then(function(response) {
            // self.classData = response.data;
            // console.log(response);
            self.getData();
            self.isVisiable = false;
            // alert("保存成功");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.addData();
      }
    },
    showAdd: function() {
      this.Data = {};
      this.isVisiable = true;
    },
    addData: function() {
      // this.isVisiable = true;
      self = this;
      if (!this.Data.username) {
        this.Data.username = this.Data.sno;
        //   console.log(this.Data.sno);
      }
      this.$http
        .post("http://localhost:3000/api/administrator/addStudentData", {
          name: self.Data.name,
          sno: self.Data.sno,
          class: self.Data.class,
          username: self.Data.username,
          password: self.Data.password,
          subject: self.Data.subject,
          teacher: self.Data.teacher,
          sort: "student"
        })
        .then(function(response) {
          self.getData();
          self.isVisiable = false;
          alert("添加成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchData: function() {
      self = this;
      this.$http
        .post("http://localhost:3000/api/administrator/searchStudentData", {
          name: "%" + self.inputData + "%",
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
    close: function() {
      this.isVisiable = false;
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