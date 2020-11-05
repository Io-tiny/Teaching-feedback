<!--  -->
<template>
  <div>
    <thead-top></thead-top>
    
      <el-form
        ref="classData"
        :model="classData"
        label-width="90px"
        style="width: 100%; margin-top: 40px; margin-left:38px"
      >
        <el-form-item label="请选择要管理的班级:" label-width="150px">
          <el-select v-model="classData.class" placeholder="请选择班级" width="100px" style="width: 30%; margin-left:20px">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button @click="selectClassData" style="margin-left: 20px">搜索</el-button>
        </el-form-item>
      </el-form>
    <div style="text-align: left; margin-left: 50px">
      请输入学号或者姓名：
      <el-input
        placeholder="点击空白处即可搜索"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputClassData"
        @blur="searchClassData"
      ></el-input>
    </div>
    <el-table :data="pageClassDatas" stripe style="width: 100%">
      <el-table-column prop="sno" label="学号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sno }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="tiny" size="small" @click="showClassData(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>修改
          </el-button>
          <el-button type="danger" size="small" @click="delClassData(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes,prev, pager, next, jumper"
      :total="pageClassDatas.length"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
    <class-form
      :classData="classData"
      :isvisiable="isVisiable"
      @close="close"
      @classData-save="saveClassData(classData)"
    ></class-form>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
import classForm from "@/components/teacher/classForm";
// import classTab from "@/components/teacher/classTab";
export default {
  data() {
    return {
      classData: {
        id: "",
        sno: "",
        name: "",
        class: "",
        phone: "",
        subject: ""
      },
      inputClassData: "",
      classDatas: [],
      isVisiable: false,
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数,
      pageClassDatas: [],
      classes:[],
    };
  },

  components: {
    theadTop,
    classForm
  },

  created() {
    this.getClassData();
    const classes = localStorage.getItem("class").split(/,|，/);
    this.classes = classes.map(classes => ({
      value: classes,
      label: classes
    }));
    // console.log(this.classes);
  },
  methods: {
    getClassData: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      // this.classData.subject = localStorage.getItem("subject");
      this.classData.sort = localStorage.getItem("sort");
      this.$http
        .post("http://localhost:3000/api/user/getClassData", {
          class: self.classData.class,
          sort: "student"
        })
        .then(function(response) {
          console.log(response); 
          self.classDatas = response.data;
          // alert('获取成功')
        })
        .then(function(response) {
          self.pageClassDatas = self.classDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showClassData: function(index, row) {
      // console.log(row.id)
      this.classData = {
        id: row.id,
        sno: row.sno,
        name: row.name,
        class: row.class,
        phone: row.phone
      };
      // console.log(this.classData)
      this.isVisiable = true;
    },
    saveClassData: function(classData) {
      self = this;
      this.$http
        .post("http://localhost:3000/api/user/updateClassData", {
          id: self.classData.id,
          sno: self.classData.sno,
          name: self.classData.name,
          class: self.classData.class,
          phone: self.classData.phone
        })
        .then(function(response) {
          // self.classData = response.data;
          // console.log(response);s
          self.getClassData();
          self.isVisiable = false;
          // alert("保存成功");
          // this.getClassData();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close: function() {
      this.isVisiable = false;
    },
    delClassData: function(index, row) {
      self = this;
      // this.classData = {
      //   id: row.id,
      // }
      this.$http
        .post("http://localhost:3000/api/user/delClassData", {
          id: row.id
        })
        .then(function(response) {
          // self.classData = response.data;
          // console.log(response);s
          self.getClassData();
          // self.isVisiable = false;
          alert("删除成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchClassData: function() {
      // var v = e.target.value;
      this.classData.subject = localStorage.getItem("subject");
      // this.classData.sort = localStorage.getItem("sort");
      self = this;
      if (self.inputClassData) {
        this.$http
          .post("http://localhost:3000/api/user/searchClassData", {
            sno: "%" + self.inputClassData + "%",
            name: "%" + self.inputClassData +"%",
            class: self.classData.class,
            sort: "student"
          })
          .then(function(response) {
            // self.classData = response.data;
            // console.log(response);
            console.log(response);
            self.pageClassDatas = response.data;
            // self.getClassData();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.getClassData();
      }
    },
    selectClassData: function(){
      this.$http
        .post("http://localhost:3000/api/user/selectClassData", {
          class: self.classData.class,
          sort: "student"
        })
        .then(function(response) {
          // self.classData = response.data;
          // console.log(response);
          console.log(response);
          self.pageClassDatas = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageClassDatas = this.classDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
      this.pageClassDatas = this.classDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  }
};
</script>
<style scoped>
</style>