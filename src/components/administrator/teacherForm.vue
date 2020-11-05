<!--  -->
<template>
  <div>
    <el-dialog title="教师管理" :visible.sync="isvisiable" :before-close="close">
      <el-form :model="Data" :rules="rules" ref="item" label-width="100px" style="width: 500px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="Data.name"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="Data.class"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="Data.username" placeholder="不输入默认为姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="Data.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveData">保存</el-button>
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
      // itemData: {
      //   name: "",
      //   section: "",
      //   answer: "",
      //   sort: "",
      //   analysis: "",
      //   difficulty:"",
      //   gold:"",
      // },
      // isvisiable: false,
      rules: {
        
      }
    };
  },
  props:['Data','isvisiable'],

  methods: {
      close: function(){
          this.$emit('close')
      },
      saveData: function(){
        this.$emit("Data-save")
      }
  }
};
</script>
<style scoped>
</style>