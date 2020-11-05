<!--  -->
<template>
  <div>
    <thead-top></thead-top>
    <div style="text-align: left; margin-left: 50px">
      题目名称：
      <el-input
        placeholder="请输入名称"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputItemData"
      ></el-input>
      <el-button @click="searchItemData">查询</el-button>
      <el-button @click="showAdd">添加</el-button>
    </div>

    <el-table :data="pageItemDatas" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="100px"></el-table-column>
      <el-table-column prop="name" label="题名"></el-table-column>
      <el-table-column prop="section" label="选项"></el-table-column>
      <el-table-column prop="answer" label="答案"></el-table-column>
      <el-table-column prop="sort" label="类别"></el-table-column>
      <el-table-column prop="analysis" label="解析"></el-table-column>
      <el-table-column prop="point" label="知识点"></el-table-column>
      <el-table-column prop="difficulty" label="难度">
        <template slot-scope="scope">{{ difficult[scope.row.difficulty] }}</template>
      </el-table-column>
      <el-table-column prop="gold" label="分值"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showItemData(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>修改
          </el-button>
          <el-button type="text" size="small" @click="delItemData(scope.$index, scope.row)">
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
      :total="itemDatas.length"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
    <item-form
      :itemData="itemData"
      :isvisiable="isVisiable"
      @close="close"
      @itemData-save="saveItemData(itemData)"
      @itemData-add="addItemData(itemData)"
    ></item-form>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
import itemForm from "@/components/teacher/itemForm";
export default {
  data() {
    return {
      itemData: {},
      itemDatas: [],
      difficult: {
        1: "☆",
        2: "☆☆",
        3: "☆☆☆",
        4: "☆☆☆☆",
        5: "☆☆☆☆☆"
      },
      isVisiable: false,
      inputItemData: "",
      currentPage: "", //默认显示页面为1
      pagesize: "", //    每页的数据条数
      pageItemDatas: []
    };
  },

  components: {
    theadTop,
    itemForm
  },

  created() {
    this.getItemData();
  },

  methods: {
    getItemData: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.$http
        .post("http://localhost:3000/api/item/getItemData", {})
        .then(function(response) {
          // console.log(response);
          self.itemDatas = response.data;
          // alert('获取成功')
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
    showItemData: function(index, row) {
      this.itemData = {
        name: row.name,
        section: row.section,
        answer: row.answer,
        sort: row.sort,
        analysis: row.analysis,
        difficulty: `${row.difficulty}`,
        gold: row.gold,
        point: row.point,
        id: row.id
      };
      this.isVisiable = true;
      // console.log(this.itemData)
    },
    saveItemData: function(itemData) {
      self = this;
      if (this.itemData.id) {
        this.$http
          .post("http://localhost:3000/api/item/updateItemData", {
            id: self.itemData.id,
            name: self.itemData.name,
            section: self.itemData.section,
            answer: self.itemData.answer,
            sort: self.itemData.sort,
            analysis: self.itemData.analysis,
            difficulty: self.itemData.difficulty,
            gold: self.itemData.gold,
            point: self.itemData.point
          })
          .then(function(response) {
            // self.classData = response.data;
            // console.log(response);
            self.getItemData();
            self.isVisiable = false;
            alert("保存成功");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.addItemData();
      }
    },
    delItemData: function(index, row) {
      self = this;
      this.$http
        .post("http://localhost:3000/api/item/delItemData", {
          id: row.id
        })
        .then(function(response) {
          self.getItemData();
          // self.isVisiable = false;
          alert("删除成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showAdd: function() {
      this.itemData = {};
      this.isVisiable = true;
    },
    addItemData: function() {
      // this.isVisiable = true;
      self = this;
      this.$http
        .post("http://localhost:3000/api/item/addItemData", {
          name: self.itemData.name,
          section: self.itemData.section,
          answer: self.itemData.answer,
          sort: self.itemData.sort,
          analysis: self.itemData.analysis,
          difficulty: self.itemData.difficulty,
          point: self.itemData.point,
          gold: self.itemData.gold
        })
        .then(function(response) {
          self.getItemData();
          self.isVisiable = false;
          alert("添加成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchItemData: function() {
      self = this;
      this.$http
        .post("http://localhost:3000/api/item/searchItemData", {
          name: "%" + self.inputItemData + "%"
        })
        .then(function(response) {
          // console.log(response);
          console.log(response);
          self.pageItemDatas = response.data;
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
      this.pageItemDatas = this.itemDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
      this.pageItemDatas = this.itemDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  }
};
</script>
<style scoped>
</style>