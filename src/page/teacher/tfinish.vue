<!--  -->
<template>
  <div>
    <thead-top></thead-top>
    <el-row>
      <el-col :span="12">
        <div class="finish">
          <el-form
            :model="testData"
            :rules="rules"
            ref="testData"
            label-width="100px"
            style="width: 500px"
          >
            <el-form-item label="试卷名称" prop="name">
              <el-input :disabled="true" v-model="testData.name"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creator">
              <el-input :disabled="true" v-model="testData.creator"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createtime">
              <el-date-picker
                :disabled="true"
                type="datetime"
                placeholder="选择日期"
                v-model="testData.createtime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="展示时间" prop="showtime">
              <el-date-picker
                :disabled="true"
                type="datetime"
                placeholder="选择日期"
                v-model="testData.showtime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="试卷密码" prop="password">
              <el-input :disabled="true" v-model="testData.password"></el-input>
            </el-form-item>
            <el-form-item label="单选题ID" prop="single">
              <el-input
                style="width:75%"
                placeholder="中间用,隔开"
                @focus="selectItem('单选题')"
                v-model="testData.single"
              ></el-input>
              <el-input style="width: 20%;" v-model="gold.single" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="多选题ID" prop="multiple">
              <el-input
                style="width:75%"
                placeholder="中间用,隔开"
                @focus="selectItem('多选题')"
                v-model="testData.multiple"
              ></el-input>
              <el-input style="width: 20%;" v-model="gold.multiple" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="判断题ID" prop="judge">
              <el-input
                style="width:75%"
                placeholder="中间用,隔开"
                @focus="selectItem('判断题')"
                v-model="testData.judge"
              ></el-input>
              <el-input style="width: 20%;" v-model="gold.judge" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="简答题ID" prop="short">
              <el-input
                style="width:75%"
                placeholder="中间用,隔开"
                @focus="selectItem('简答题')"
                v-model="testData.short"
              ></el-input>
              <el-input style="width: 20%;" v-model="gold.short" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="考试时长" prop="time">
              <el-input placeholder="单位为分" v-model="testData.time"></el-input>
            </el-form-item>
            <el-form-item label="指导教师" prop="teacher">
              <el-input v-model="testData.teacher"></el-input>
            </el-form-item>
            <el-form-item label="是否完成" prop="complete">
              <el-select v-model="testData.complete" placeholder="请选择是否完成">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否发布" prop="publish">
              <el-select v-model="testData.publish" placeholder="请选择是否发布">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveTestData">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入题名"
          prefix-icon="el-icon-search"
          style="width: 90%; margin:20px"
          v-model="inputItemData"
          @blur="searchItemData"
        ></el-input>
        <el-table :data="pageItemDatas" :row-key="getRowKey" stripe style="width: 100%" @select="showData">
          <el-table-column prop="id" label="编号" width="200px"></el-table-column>
          <el-table-column prop="name" label="题名" width="200px"></el-table-column>
          <el-table-column prop="sort" label="类别" width="200px"></el-table-column>
          <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes,prev, pager, next, jumper"
          :total="itemDatas.length"
          prev-text="上一页"
          next-text="下一页"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
import moment from "moment";
export default {
  data() {
    return {
      testData: {},
      rules: {},
      inputItemData: "",
      itemDatas: [],
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
      pageItemDatas: [],
      gold:{
        single:0,
        multiple:0,
        judge:0,
        short:0
      }
    };
  },

  components: {
    theadTop
  },

  created() {
    this.getTestData();
    // console.log(this.testData);
  },
  activated: function() {
    this.getTestData();
  },
  methods: {
    getRowKey (row) {
      return row.id
    },
    getTestData: function() {
      self = this;
      this.pagesize = 5;
      this.currentPage = 1;
      this.testData.id = localStorage.getItem("id");
      // console.log(this.testData.id);
      this.$http
        .post("http://localhost:3000/api/test/selectTestData", {
          id: this.testData.id
        })
        .then(function(response) {
          // console.log(response);
          self.testData = response.data[0];
          //   console.log(self.testData);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchItemData: function() {
      self = this;
      this.pagesize = 5;
      this.currentPage = 1;
      this.$http
        .post("http://localhost:3000/api/item/searchItemData", {
          name: "%" + self.inputItemData + "%"
        })
        .then(function(response) {
          // console.log(response);
          // console.log(response);
          self.itemDatas = response.data;
        })
        .then(function(response) {
          self.pageItemDatas = self.itemDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveTestData: function() {
      self = this;
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
          //   console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$router.push("/tsetexam");
    },
    selectItem: function(select) {
      self = this;
      if (select == "单选题") {
        this.$http
          .post("http://localhost:3000/api/item/selectSort", {
            sort: "单选题"
          })
          .then(function(response) {
            // console.log(response);
            self.itemDatas = response.data;
          })
          .then(function(response) {
            self.pageItemDatas = self.itemDatas.slice(
              (self.currentPage - 1) * self.pagesize,
              self.currentPage * self.pagesize
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (select == "多选题") {
        this.$http
          .post("http://localhost:3000/api/item/selectSort", {
            sort: "多选题"
          })
          .then(function(response) {
            self.itemDatas = response.data;
          })
          .then(function(response) {
            self.pageItemDatas = self.itemDatas.slice(
              (self.currentPage - 1) * self.pagesize,
              self.currentPage * self.pagesize
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (select == "判断题") {
        this.$http
          .post("http://localhost:3000/api/item/selectSort", {
            sort: "判断题"
          })
          .then(function(response) {
            self.itemDatas = response.data;
          })
          .then(function(response) {
            self.pageItemDatas = self.itemDatas.slice(
              (self.currentPage - 1) * self.pagesize,
              self.currentPage * self.pagesize
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (select == "简答题") {
        this.$http
          .post("http://localhost:3000/api/item/selectSort", {
            sort: "简答题"
          })
          .then(function(response) {
            self.itemDatas = response.data;
          })
          .then(function(response) {
            self.pageItemDatas = self.itemDatas.slice(
              (self.currentPage - 1) * self.pagesize,
              self.currentPage * self.pagesize
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    showData: function(selection, row) {
      // console.log(row);
      var totalgold = this.gold;
      if (row.sort == "单选题") {
        var single = this.testData.single ? this.testData.single : "";
        // console.log(single);
        if (single.indexOf(row.id) == -1) {
          single += `${row.id}，`;
          totalgold.single += parseInt(row.gold)
        } else {
          single = single.replace(`${row.id}，`, "");
          totalgold.single -= row.gold
        }
        this.testData.single = single;
      } else if (row.sort == "多选题") {
        var multiple = this.testData.multiple ? this.testData.multiple : "";
        if (multiple.indexOf(row.id) == -1) {
          multiple += `${row.id}，`;
          totalgold.multiple += parseInt(row.gold)
        } else {
          multiple = multiple.replace(`${row.id}，`, "");
          totalgold.multiple -= parseInt(row.gold)
        }
        this.testData.multiple = multiple;
      } else if (row.sort == "判断题") {
        var judge = this.testData.judge ? this.testData.judge : '';
        // console.log(judge);
        if(judge.indexOf(row.id) == -1){
          judge += `${row.id}，`
          totalgold.judge += parseInt(row.gold)
        }else{
          judge = judge.replace(`${row.id}，`, '');
          totalgold.judge -= parseInt(row.gold)
        }
        this.testData.judge = judge;
      } else if (row.sort == "简答题") {
        var short = this.testData.short ? this.testData.short : '';
        // console.log(short);
        if(short.indexOf(row.id) == -1){
          short += `${row.id}，`
          totalgold.short += parseInt(row.gold)
        }else{
          short = short.replace(`${row.id}，`, '');
          totalgold.short -= parseInt(row.gold)
        }
        this.testData.short = short;
      }
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      self.pageItemDatas = self.itemDatas.slice(
        (self.currentPage - 1) * self.pagesize,
        self.currentPage * self.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
      self.pageItemDatas = self.itemDatas.slice(
        (self.currentPage - 1) * self.pagesize,
        self.currentPage * self.pagesize
      );
    }
  }
};
</script>
<style scoped>
.finish {
  margin-top: 20px;
}
</style>