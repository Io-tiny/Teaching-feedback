<!--  -->
<template>
  <div>
    <el-dialog title="添加课程介绍" :visible.sync="isvisiable" :before-close="close">
      <el-form :model="subjectData" :rules="rules" ref="subjectData" label-width="100px" style="width: 500px">
        <el-form-item label="学科" prop="name">
          <el-input v-model="subjectData.name"></el-input>
        </el-form-item>
        <el-form-item label="教师名" prop="teacher">
          <el-input v-model="subjectData.teacher"
          :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="知识点" prop="point">
          <el-input v-model="subjectData.point"></el-input>
        </el-form-item>
        <el-form-item label="章节" prop="chapter">
          <el-input placeholder="请勿输入相同的章节" v-model="subjectData.chapter"></el-input>
        </el-form-item>
        <el-form-item label="详细信息" prop="detail">
          <el-input 
          type="textarea" 
          :autosize="{ minRows: 3}"
          v-model="subjectData.detail"></el-input>
        </el-form-item>
        <el-form-item label="上课时间" prop="coursetime">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="subjectData.coursetime"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSubjectData">保存</el-button>
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
      rules: {
      }
    };
  },
  props:["subjectData",'isvisiable'],
  methods: {
      close: function(){
          this.$emit('close')
      },
      saveSubjectData: function(){
        this.$emit('subjectData-save')
      }
  }
};
</script>
<style scoped>

</style>