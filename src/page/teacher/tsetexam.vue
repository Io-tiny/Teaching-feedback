<!--  -->
<template>
  <div>
    <thead-top></thead-top>
    <div style="text-align: left; margin-left: 50px">
      试题名称：
      <el-input
        placeholder="请输入名称"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputTestData"
      ></el-input>
      <el-button @click="searchTestData">查询</el-button>
      <el-button @click="showAdd">组卷</el-button>
    </div>

    <el-table :data="pageTestDatas" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="100px"></el-table-column>
      <el-table-column prop="name" label="试卷名"></el-table-column>
      <el-table-column prop="creator" label="创建者"></el-table-column>
      <el-table-column prop="createtime" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createtime | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="showtime" label="展示时间">
        <template slot-scope="scope">{{ scope.row.showtime | dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="password" label="试卷密码"></el-table-column>
      <el-table-column prop="complete" label="是否完成"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showTestData(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>修改
          </el-button>
          <el-button type="text" size="small" @click="delTestData(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>删除
          </el-button>
          <br />
          <el-button type="text" size="small" @click="finish(scope.$index, scope.row)">
            <i class="el-icon-view"></i>完善
          </el-button>
          <el-button type="text" size="small" @click="publish(scope.$index, scope.row)">
            <i class="el-icon-share"></i>发布
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
    <test-form
      :isvisiable="isVisiable"
      :testData="testData"
      @close="close"
      @testData-save="saveTestData(testData)"
      @testData-add="addTestData(testData)"
    ></test-form>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
import testForm from "@/components/teacher/testForm";
import moment from "moment";
export default {
  data() {
    return {
      testData: {},
      testDatas: [],
      inputTestData: "",
      isVisiable: false,
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数
      pageTestDatas: []
    };
  },

  components: {
    theadTop,
    testForm
  },

  created() {
    this.getTestData();
  },
  activated: function() {
    this.getTestData();
  },

  methods: {
    getTestData: function() {
      self = this;
      this.pagesize = 5;
      this.currentPage = 1;
      this.$http
        .post("http://localhost:3000/api/test/getTestData", {})
        .then(function(response) {
          // console.log(response);
          // console.log('111');
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
    delTestData: function(index, row) {
      self = this;
      this.$http
        .post("http://localhost:3000/api/test/delTestData", {
          id: row.id
        })
        .then(function(response) {
          self.getTestData();
          // self.isVisiable = false;
          alert("删除成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showTestData: function(index, row) {
      console.log(row);
      this.testData = {
        name: row.name,
        creator: row.creator,
        createtime: moment(row.createtime),
        showtime: moment(row.showtime),
        password: row.password,
        complete: row.complete,
        id: row.id,
        single: row.single,
        multiple: row.multiple,
        judge: row.judge,
        short: row.short,
        teacher: row.teacher,
        time: row.time,
        publish: row.publish
      };
      this.isVisiable = true;
    },
    saveTestData: function(testData) {
      self = this;
      if (self.testData.createtime == "") {
        self.testData.createtime = new Date().getTime();
      }
      if (this.testData.id) {
        this.$http
          .post("http://localhost:3000/api/test/updateTestData", {
            id: self.testData.id,
            name: self.testData.name,
            creator: self.testData.creator,
            createtime: moment(self.testData.createtime).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            showtime: moment(self.testData.showtime).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            password: self.testData.password,
            complete: self.testData.complete,
            single: self.testData.single,
            multiple: self.testData.multiple,
            judge: self.testData.judge,
            short: self.testData.short,
            time: self.testData.time,
            teacher: self.testData.teacher,
            publish: self.testData.publish
          })
          .then(function(response) {
            // self.classData = response.data;
            // console.log(response);
            self.getTestData();
            self.isVisiable = false;
            alert("保存成功");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.addTestData();
      }
    },
    showAdd: function() {
      this.isVisiable = true;
      this.testData = {};
    },
    addTestData: function() {
      self = this;
      if (self.testData.createtime == "") {
        self.testData.createtime = new Date().getTime();
      }
      this.$http
        .post("http://localhost:3000/api/test/addTestData", {
          name: self.testData.name,
          creator: self.testData.creator,
          createtime: moment(self.testData.createtime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          showtime: moment(self.testData.showtime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          password: self.testData.password,
          complete: self.testData.complete
        })
        .then(function(response) {
          self.getTestData();
          self.isVisiable = false;
          alert("添加成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchTestData: function() {
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
    publish: function(index, row) {
      self = this;
      this.$http
        .post("http://localhost:3000/api/test/updatePublishData", {
          publish: "是",
          id: row.id
        })
        .then(function(response) {
          // console.log(response);
          // console.log(response);
          // self.pageTestDatas = response.data;
          self.getTestData();
          alert("发布成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    finish: function(index, row) {
      this.testData.id = row.id;
      self = this;
      localStorage.setItem("id", this.testData.id);
      // console.log(this.testData.id);
      self.$router.push("/tfinish");
    },
    close: function() {
      this.isVisiable = false;
    },
    //每页下拉显示数据
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