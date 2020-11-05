<!--  -->
<template>
  <div>
    <el-dialog title="评价" :visible.sync="isvisiable" :before-close="close">
      <el-form
        :model="appraise"
        :rules="rules"
        ref="appraise"
        label-width="100px"
        style="width: 500px"
      >
        <el-form-item label="教师姓名" prop="beappraiser">
          <el-input v-model="appraise.beappraiser"></el-input>
        </el-form-item>
        <el-form-item label="评价内容" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="appraise.content"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveappraise">保存</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "appraiseForm",
  data() {
    return {
      //   appraise: {},
      rules: {}
    };
  },
  props: ["appraise", "isvisiable"],

  methods: {
    close: function() {
      this.$emit("close");
    },
    saveappraise: function() {
      this.$emit("appraise-save");
    }
  }
};
</script>
<style scoped>
</style>