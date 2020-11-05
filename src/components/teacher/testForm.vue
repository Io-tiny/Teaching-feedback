<!--  -->
<template>
  <div>
    <el-dialog title="添加试卷" :visible.sync="isvisiable" :before-close="close">
      <el-form
        :model="testData"
        :rules="rules"
        ref="testData"
        label-width="100px"
        style="width: 500px"
      >
        <el-form-item label="试卷名称" prop="name">
          <el-input v-model="testData.name"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="testData.creator"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createtime">
          <el-date-picker
            type="datetime"
            v-model="testData.createtime"
            style="width: 100%;"
            placeholder="如果不填默认为当前保存时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="展示时间" prop="showtime">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="testData.showtime"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="试卷密码" prop="password">
          <el-input v-model="testData.password"></el-input>
        </el-form-item>
        <el-form-item label="是否完成" prop="complete">
          <el-select v-model="testData.complete" placeholder="请选择是否完成">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveTestData">保存</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // testData: {
      //   name: "",
      //   creator: "",
      //   showtime: "",
      //   createtime: "",
      //   password: "",
      //   complete:""
      // },
      // title:'添加试题',
      // isvisiable: false,
      rules: {
        name: [{ required: true, message: "请输入试卷名称", trigger: "blur" }]
      }
    };
  },
  props: ["testData", "isvisiable"],

  methods: {
    close: function() {
      this.$emit("close");
    },
    saveTestData: function() {
      this.$emit("testData-save");
    }
  }
};
</script>
<style scoped>
</style>