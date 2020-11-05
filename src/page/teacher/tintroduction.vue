<!--  -->
<template>
  <div>
    <thead-top></thead-top>
    <div style="text-align: left; margin-left: 50px">
      查询：
      <el-input
        placeholder="请输入章节或者知识点进行查询"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputSubjectData"
      ></el-input>
      <el-button @click="searchSubjectData">查询</el-button>
      <el-button @click="showAdd">添加课程介绍</el-button>
    </div>
    <el-table :data="pageSubjectDatas" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="100px"></el-table-column>
      <el-table-column prop="name" label="学科"></el-table-column>
      <el-table-column prop="teacher" label="教师"></el-table-column>
      <el-table-column prop="chapter" label="章节"></el-table-column>
      <el-table-column prop="point" label="知识点"></el-table-column>
      <el-table-column prop="coursetime" label="上课时间">
        <template slot-scope="scope">{{ scope.row.coursetime | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="detail" label="详细介绍"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showSubjectData(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>修改
          </el-button>
          <el-button type="text" size="small" @click="delSubjectData(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>删除
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
      :total="subjectDatas.length"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
    <subject-form
      :isvisiable="isVisiable"
      :subjectData="subjectData"
      @close="close"
      @subjectData-save="saveSubjectData(subjectData)"
    ></subject-form>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
import subjectForm from "@/components/teacher/subjectForm";
import moment from "moment";
export default {
  data() {
    return {
      subjectData: {},
      subjectDatas: [],
      isVisiable: false,
      currentPage: "",
      pagesize: "",
      pageSubjectDatas: [],
      inputSubjectData: ""
    };
  },

  components: {
    theadTop,
    subjectForm
  },
  created() {
    this.getSubjectData();
  },

  methods: {
    getSubjectData: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.teacher = localStorage.getItem("name");
      this.$http
        .post("http://localhost:3000/api/subject/getSubjectData", {
          teacher: this.teacher
        })
        .then(function(response) {
          // console.log(response);
          self.subjectDatas = response.data;
          // alert('获取成功')
        })
        .then(function(response) {
          self.pageSubjectDatas = self.subjectDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delSubjectData: function(index, row) {
      self = this;
      this.$http
        .post("http://localhost:3000/api/subject/delSubjectData", {
          id: row.id
        })
        .then(function(response) {
          self.getSubjectData();
          // self.isVisiable = false;
          alert("删除成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showSubjectData: function(index, row) {
      const teacher = localStorage.getItem("name");
      // console.log(teacher)
      (this.subjectData = {
        id: row.id,
        name: row.name,
        teacher: teacher,
        point: row.point,
        chapter: row.chapter,
        coursetime: moment(row.coursetime),
        detail: row.detail
      }),
        (this.isVisiable = true);
    },
    saveSubjectData: function(subjectData) {
      self = this;
      if (this.subjectData.id) {
        this.$http
          .post("http://localhost:3000/api/subject/updateSubjectData", {
            id: self.subjectData.id,
            name: self.subjectData.name,
            teacher: self.subjectData.teacher,
            point: self.subjectData.point,
            chapter: self.subjectData.chapter,
            coursetime: moment(self.subjectData.coursetime).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            detail: self.subjectData.detail
          })
          .then(function(response) {
            // self.classData = response.data;
            // console.log(response);
            self.getSubjectData();
            self.isVisiable = false;
            alert("保存成功");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.addSubjectData();
        console.log(111);
      }
    },
    addSubjectData: function() {
      console.log(222);
      this.$http
        .post("http://localhost:3000/api/subject/addSubjectData", {
          name: self.subjectData.name,
          teacher: self.subjectData.teacher,
          point: self.subjectData.point,
          chapter: self.subjectData.chapter,
          coursetime: moment(self.subjectData.coursetime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          detail: self.subjectData.detail
        })
        .then(function(response) {
          self.getSubjectData();
          self.isVisiable = false;
          alert("添加成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showAdd: function() {
      this.isVisiable = true;
      const teacher = localStorage.getItem("name");
      this.subjectData = {
        teacher: teacher
      };
    },
    searchSubjectData: function() {
      self = this;
      this.$http
        .post("http://localhost:3000/api/subject/searchSubjectData", {
          chapter: "%" + self.inputSubjectData + "%",
          point: "%" + self.inputSubjectData + "%"
        })
        .then(function(response) {
          // console.log(response);
          console.log(response);
          self.subjectDatas = response.data;
        })
        .then(function(response) {
          self.pageSubjectDatas = self.subjectDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
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
      this.pageSubjectDatas = this.subjectDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageSubjectDatas = this.subjectDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      /*console.log(this.currentPage) */
    }
  }
};
</script>
<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 30px !important;
  font-size: 16px !important;
  font-family: "Microsoft YaHei" !important;
}

.bg-dark {
  background-color: #dcdfe6;
}
</style>