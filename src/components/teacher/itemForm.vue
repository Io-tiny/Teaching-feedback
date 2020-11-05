<!--  -->
<template>
  <div>
    <el-dialog title="添加试题" :visible.sync="isvisiable" :before-close="close">
      <el-form :model="itemData" :rules="rules" ref="item" label-width="100px" style="width: 500px">
        <el-form-item label="试题名称" prop="name">
          <el-input v-model="itemData.name"></el-input>
        </el-form-item>
        <el-form-item label="选项" prop="section">
          <el-input placeholder="选项请使用，分隔开" v-model="itemData.section"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input v-model="itemData.answer"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="sort">
          <el-select v-model="itemData.sort" placeholder="请选择类别">
            <el-option label="单选题" value="单选题"></el-option>
            <el-option label="多选题" value="多选题"></el-option>
            <el-option label="简答题" value="简答题"></el-option>
            <el-option label="判断题" value="判断题"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="解析" prop="analysis">
          <el-input v-model="itemData.analysis"></el-input>
        </el-form-item>
        <el-form-item label="知识点" prop="point">
          <el-input v-model="itemData.point"></el-input>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="itemData.difficulty" placeholder="请选择类别">
            <el-option label="☆" value="1"></el-option>
            <el-option label="☆☆" value="2" ></el-option>
            <el-option label="☆☆☆" value= "3" ></el-option>
            <el-option label="☆☆☆☆" value= "4"></el-option>
            <el-option label="☆☆☆☆☆" value= "5" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分值" prop="gold">
          <el-input v-model="itemData.gold"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveItemData">保存</el-button>
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
  props:['itemData','isvisiable'],

  methods: {
      close: function(){
          this.$emit('close')
      },
      saveItemData: function(){
        this.$emit("itemData-save")
      }
  }
};
</script>
<style scoped>
</style>