<!--  -->
<template>
  <div>
    <el-dialog title="密码" :visible.sync="isvisiable" :before-close="close">
      <el-form>
        <el-form-item label="请输入试卷密码" style="margin-top:20px">
          <el-input v-model="password" :min="0" style="width:60%"></el-input>
          <el-button type="primary" style="margin-left:20px" @click="save">确定</el-button>
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
      password: ""
    };
  },
  props: ["isvisiable"],

  methods: {
    close: function() {
      this.$emit("close");
    },
    save: function() {
      this.$emit("save", this.password);
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