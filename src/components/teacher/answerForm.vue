<!--  -->
<template>
  <div>
    <el-dialog title="答题卡" :visible.sync="isvisiable" :before-close="close">
      <div v-for="(item,index) in answerDatas" v-bind:key="index">
        <div class="item" :disabled="true">{{item}}</div>
      </div>
      <el-form>
        <el-form-item label="请输入简答题分数" style="margin-top:20px">
          <el-input-number v-model="gold" style="width:80%"></el-input-number>
        </el-form-item>
        <el-form-item label="是否完成">
          <el-select v-model="finish" placeholder="请选择类别">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "answerForm",
  data() {
    return {
      gold: 0,
      finish: ""
    };
  },
  props: ["answerDatas", "isvisiable"],

  methods: {
    close: function() {
      this.$emit("close");
    },
    save: function() {
      this.$emit("save", this.gold, this.finish);
    }
  }
};
</script>
<style scoped>
.item {
  width: 90%;
  height: 30px;
  border-bottom: 1px solid #ccc;
  padding: 30px;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 16px;
}
</style>