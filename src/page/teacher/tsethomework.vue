<!--  -->
<template>
  <div>
    <thead-top></thead-top>
    <el-row>
      <el-col :span="12">
        <div class="homework">
          <el-form
            :model="homework"
            :rules="rules"
            ref="homework"
            label-width="100px"
            style="width: 500px"
          >
            <el-form-item label="作业名称" prop="name">
              <el-input v-model="homework.name"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creator">
              <el-input v-model="homework.creator"></el-input>
            </el-form-item>
            <el-form-item label="单选题ID" prop="single">
              <el-input
                placeholder="中间用,隔开"
                @focus="selectItem('单选题')"
                v-model="homework.single"
              ></el-input>
              
            </el-form-item>
            <el-form-item label="多选题ID" prop="multiple">
              <el-input
                placeholder="中间用,隔开"
                @focus="selectItem('多选题')"
                v-model="homework.multiple"
              ></el-input>
              
            </el-form-item>
            <el-form-item label="判断题ID" prop="judge">
              <el-input
                placeholder="中间用,隔开"
                @focus="selectItem('判断题')"
                v-model="homework.judge"
              ></el-input>
              
            </el-form-item>
            <el-form-item label="简答题ID" prop="short">
              <el-input
                placeholder="中间用,隔开"
                @focus="selectItem('简答题')"
                v-model="homework.short"
              ></el-input>
            
            </el-form-item>
            <el-form-item label="作业时长" prop="time">
              <el-input placeholder="单位为天" v-model="homework.time"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveHomework">发布</el-button>
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
          :page-sizes="[5, 10, 20, 40]"
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
      homework: {
        single : '',
        multiple : '',
        judge : '',
        short : ''
      },
      rules: {},
      inputItemData: "",
      itemDatas: [],
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
      pageItemDatas:[]
    };
  },

  components: {
    theadTop
  },

  methods: {
    getRowKey (row) {
      return row.id
    },
    searchItemData: function() {
      self = this;
      this.pagesize = 5;
      this.currentPage = 1;
      this.$http
        .post("http://localhost:3000/api/item/searchHomeData", {
          name: "%" + self.inputItemData + "%"
        })
        .then(function(response) {
          // console.log(response);
          console.log(response);
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
    saveHomework: function() {
      self = this;
      const createtime = moment(new Date().getTime()).format('YY-MM-DD HH:mm:ss')
      this.$http
        .post("http://localhost:3000/api/homework/addHomework", {
          name: self.homework.name,
          creator: self.homework.creator,
          single: self.homework.single,
          multiple: self.homework.multiple,
          judge: self.homework.judge,
          short: self.homework.short,
          time: self.homework.time,
          createtime: createtime
        })
        .then(function(response) {
          //   console.log(response);
          alert("发布成功");
        })
        .catch(function(error) {
          console.log(error);
        });
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
      if (row.sort == "单选题") {
        var single = this.homework.single ? this.homework.single : "";
        // console.log(single);
        if (single.indexOf(row.id) == -1) {
          single += `${row.id}，`;
        } else {
          single = single.replace(`${row.id}，`, "");
        }
        // console.log(this.homework.single);
        this.homework.single = single;
      } else if (row.sort == "多选题") {
        var multiple = this.homework.multiple ? this.homework.multiple : "";
        if (multiple.indexOf(row.id) == -1) {
          multiple += `${row.id}，`;
          
        } else {
          multiple = multiple.replace(`${row.id}，`, "");
          
        }
        this.homework.multiple = multiple;
      } else if (row.sort == "判断题") {
        var judge = this.homework.judge ? this.homework.judge : '';
        // console.log(judge);
        if(judge.indexOf(row.id) == -1){
          judge += `${row.id}，`
        }else{
          judge = judge.replace(`${row.id}，`, '');
        }
        this.homework.judge = judge;
      } else if (row.sort == "简答题") {
        var short = this.homework.short ? this.homework.short : '';
        // console.log(short);
        if(short.indexOf(row.id) == -1){
          short += `${row.id}，`
        }else{
          short = short.replace(`${row.id}，`, '');
        }
        this.homework.short = short;
      }
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageItemDatas = this.itemDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageItemDatas = this.itemDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      /*console.log(this.currentPage) */
    }
  }
};
</script>
<style scoped>
.homework {
  margin-top: 20px;
}
</style>