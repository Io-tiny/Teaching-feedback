<template>
  <div>
    <thead-top></thead-top>
    <div class="appraise">
      <el-form
        ref="selfAppraise"
        :model="selfAppraise"
        label-width="90px"
        style="width: 50%; margin-top: 40px"
      >
        <el-form-item label="自我评价">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            v-model="selfAppraise.content"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="selfsave">保存修改</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="pageOtherAppraise" stripe style="width: 100%">
        <el-table-column prop="appraiser" label="评价人"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="createtime" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createtime | dateFormat}}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="otherAppraise.length"
      ></el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="showOther">评价其他教师</el-button>
      </div>
      <appraise-form
        :appraise="appraise"
        :isvisiable="isVisiable"
        @close="close"
        @appraise-save="saveAppraise"
      ></appraise-form>
    </div>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
import appraiseForm from "@/components/teacher/appraiseForm";
import moment from "moment";
export default {
  data() {
    return {
      selfAppraise: {
        content: "",
        appraiser: ""
      },
      otherAppraise: [],
      appraise: {},
      isVisiable: false,
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数
      pageOtherAppraise: []
    };
  },

  components: {
    theadTop,
    appraiseForm
  },

  created() {
    this.getAppraise();
    this.getOhter();
  },

  methods: {
    getAppraise: function() {
      self = this;
      this.selfAppraise.appraiser = localStorage.getItem("name");
      //   console.log(this.selfAppraise.appraise);
      this.$http
        .post("http://localhost:3000/api/appraise/getSelf", {
          appraiser: self.selfAppraise.appraiser,
          beappraiser: self.selfAppraise.appraiser
        })
        .then(function(response) {
          // console.log(response);
          const content = '';
          if (response.data[0] == null) {
            self.$http
              .post("http://localhost:3000/api/appraise/addSelf", {
                appraiser: self.selfAppraise.appraiser,
                beappraiser: self.selfAppraise.appraiser,
                content: '',
                createtime: self.selfAppraise.createtime
              })
              .then(function(response) {

              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            self.selfAppraise = response.data[0];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getOhter: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.selfAppraise.appraiser = localStorage.getItem("name");
      //   console.log(this.selfAppraise.appraise);
      this.$http
        .post("http://localhost:3000/api/appraise/getOther", {
          appraiser: self.selfAppraise.appraiser,
          beappraiser: self.selfAppraise.appraiser
        })
        .then(function(response) {
          //   console.log(response);
          self.otherAppraise = response.data;
        })
        .then(function(response) {
          self.pageOtherAppraise = self.otherAppraise.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selfsave: function() {
      this.selfAppraise.appraiser = localStorage.getItem("name");
      this.selfAppraise.createtime = moment(new Date().getTime()).format(
        "HH-MM-DD HH:mm:ss"
      );
      if (!this.selfAppraise.content) {
        this.$http
          .post("http://localhost:3000/api/appraise/addSelf", {
            appraiser: self.selfAppraise.appraiser,
            beappraiser: self.selfAppraise.appraiser,
            content: self.selfAppraise.content,
            createtime: self.selfAppraise.createtime
          })
          .then(function(response) {
            alert("保存成功");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$http
          .post("http://localhost:3000/api/appraise/updateSelf", {
            id: self.selfAppraise.id,
            appraiser: self.selfAppraise.appraiser,
            beappraiser: self.selfAppraise.appraiser,
            content: self.selfAppraise.content,
            createtime: self.selfAppraise.createtime
          })
          .then(function(response) {
            alert("保存成功");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    showOther: function() {
      this.isVisiable = true;
    },
    saveAppraise: function() {
      self = this;
      this.appraise.appraiser = localStorage.getItem("name");
      this.appraise.createtime = moment(new Date().getTime()).format(
        "HH-MM-DD HH:mm:ss"
      );
      this.$http
        .post("http://localhost:3000/api/appraise/addSelf", {
          appraiser: self.appraise.appraiser,
          beappraiser: self.appraise.beappraiser,
          content: self.appraise.content,
          createtime: self.appraise.createtime
        })
        .then(function(response) {
          alert("保存成功");
          self.isVisiable = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close: function() {
      this.isVisiable = false;
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageOtherAppraise = this.otherAppraise.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
      this.pageOtherAppraise = this.otherAppraise.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  }
};
</script>
<style scoped>
</style>