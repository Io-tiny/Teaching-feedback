<!--  -->
<template>
  <div>
    <ahead-top></ahead-top>
    <div style="text-align: left; margin-left: 50px">
      教师名称：
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
      <el-table-column prop="name" label="教师名"></el-table-column>
      <el-table-column prop="class" label="执教班级"></el-table-column>
      <el-table-column prop="subject" label="执教学科"></el-table-column>
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
    <subject-form :Data="Data" :isvisiable="isVisiable" @close="close" @Data-save="saveData(Data)"></subject-form>
  </div>
</template>

<script>
import aheadTop from "@/components/administrator/aheadTop";
import subjectForm from "@/components/administrator/subjectForm";
export default {
  data() {
    return {
      Datas: [],
      Data: {},
      inputData: "",
      currentPage: "",
      pagesize: "",
      pageDatas: [],
      isVisiable: false,
      name: [],
      subject:[],
      class:[]
    };
  },

  components: {
    aheadTop,
    subjectForm
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
        .post("http://localhost:3000/api/administrator/getSubjectData", {
          sort: "teacher"
        })
        .then(function(response) {
          // console.log(response);
          self.Datas = response.data;
          // alert('获取成功')
        })
        .then(function(response) {
          //   console.log(self.Datas);
          self.Datas.forEach((data, index) => {
            self.name[index] = data.name;
            self.subject[index] = data.subject
            self.class[index] = data.class
          });
          //   console.log(self.name);
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
        .post("http://localhost:3000/api/administrator/delSubjectData", {
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
      this.Data = {
        id: row.id,
        name: row.name,
        class: row.class,
        subject: row.subject
      };
      this.isVisiable = true;
      // console.log(this.itemData)
    },
    saveData: function(Data) {
      self = this;
      if (this.Data.id) {
        this.$http
          .post("http://localhost:3000/api/administrator/updateSubjectData", {
            id: self.Data.id,
            name: self.Data.name,
            class: self.Data.class,
            subject: self.Data.subject
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
      if (this.name.indexOf(this.Data.name) == -1) {
        alert("您输入的教师名不存在，请先去教师模块添加教师");
      } else {
          self.Data.class = this.class[this.name.indexOf(this.Data.name)] + ',' + self.Data.class
          self.Data.subject = this.subject[this.name.indexOf(this.Data.name)] + ',' + self.Data.subject
        this.$http
          .post("http://localhost:3000/api/administrator/addSubjectData", {
            name: self.Data.name,
            class: self.Data.class,
            subject: self.Data.subject,
            sort: "teacher"
          })
          .then(function(response) {
            self.getData();
            self.isVisiable = false;
            alert("添加成功");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    searchData: function() {
      self = this;
      this.$http
        .post("http://localhost:3000/api/administrator/searchSubjectData", {
          name: "%" + self.inputData + "%",
          sort: "teacher"
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