<template>
  <div>
    <!-- <input type="radio" v-for="(item,index) in single" v-bind:key="index"/>
      {{item}}
    -->

    <el-radio-group v-model="answer" v-if="showsingle" @change="clickSingle()" style="width:100%; margin-top:20px">
      <el-radio label="A" >{{single[0]}}</el-radio>
      <el-radio label="B">{{single[1]}}</el-radio>
      <el-radio label="C">{{single[2]}}</el-radio>
      <el-radio label="D">{{single[3]}}</el-radio>
    </el-radio-group>
    <el-checkbox-group v-model="answers" v-if="showmultiple" @change="clickMultiple()"  style="width:100%; margin-top:20px">
      <el-checkbox label="A" name="type">{{multiple[0]}}</el-checkbox>
      <el-checkbox label="B" name="type">{{multiple[1]}}</el-checkbox>
      <el-checkbox label="C" name="type">{{multiple[2]}}</el-checkbox>
      <el-checkbox label="D" name="type">{{multiple[3]}}</el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-model="answer" @change="clickJudge()"  v-if="showjudge" style="width:100%; margin-top:20px">
      <el-radio label="对"></el-radio>
      <el-radio label="错"></el-radio>
    </el-radio-group>
    <el-input
      type="textarea"
      :rows="8"
      style="width:100%;margin-top:20px"
      placeholder="请输入答案"
      v-model="answer"
      v-if="showshort"
      @change="clickShort()"
    ></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: "",
      answers:[],
      showsingle: false,
      showmultiple: false,
      showjudge: false,
      showshort: false,
    };
  },

  props: ["section", "sort","index"],

  created() {
    // console.log(this.section, this.sort);
    if (this.sort == "单选题") {
      this.single = this.section.split(/,|，/);
      // console.log(this.single);
      this.showsingle = true;
    } else if (this.sort == "多选题") {
      this.multiple = this.section.split(/,|，/);
      // console.log(this.multiple)
      this.showmultiple = true;
    } else if (this.sort == "判断题") {
      this.showjudge = true;
    } else {
      this.showshort = true;
    }
  },
  methods: {
    clickSingle: function(){
      this.$emit('answer',this.index+1,this.answer)
    },
    clickMultiple: function(){
      this.$emit('answer',this.index+1,this.answers)
    },
    clickJudge: function(){
      this.$emit('answer',this.index+1,this.answer)
    },
    clickShort: function(){
      this.$emit('answer',this.index+1,this.answer)
      // console.log(111);
    },

  }
};
</script>
<style scoped>
.el-radio {
  width: 100%;
  height: 40px;
  margin: 5px;
}
.el-checkbox{
  width: 100%;
  height: 40px;
  margin: 5px
}
</style>