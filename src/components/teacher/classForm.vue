<!--  -->
<template>
  <div>
    <el-dialog title="班级信息" :visible.sync="isvisiable" :before-close="close">
      <el-form
        :model="classData"
        :rules="rules"
        ref="classData"
        label-width="100px"
        style="width: 500px"
      >
        <el-form-item label="学号" prop="sno">
          <el-input v-model="classData.sno"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="classData.name"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="classData.class"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="classData.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveClassData">保存</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "classForm",
  data() {
    return {
      // classData: {
      //   sno: "",
      //   name: "",
      //   class: "",
      //   phone: ""
      // },
      // isvisiable: false,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, trigger: "blur", message: "请输入手机号码" },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
      }
    };
  },
  props: ["classData","isvisiable"],

  methods: {
    close: function() {
      this.$emit("close");
    },
    saveClassData: function() {
      this.$emit("classData-save");
    }
  }
};
</script>
<style scoped>
</style>