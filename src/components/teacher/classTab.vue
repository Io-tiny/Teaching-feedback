<!--  -->
<template>
  <div>
    <el-table :data="classDatas" stripe style="width: 100%">
      <el-table-column prop="sno" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="操作">
        <el-button type="text" size="small" @click="showClassData(classData)">
          <i class="el-icon-edit"></i>修改
        </el-button>
        <el-button type="text" size="small">
          <i class="el-icon-delete"></i>删除
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "classTab",
  data() {
    return {};
  },
  props: ["classDatas"],

  methods: {
    //   classDataDel: function(classData){
    //       this.$emit('del', classData)
    //   },
    showClassData: function(classData) {
      this.$emit("show-edit", classData);
    }
  }
};
</script>
<style scoped>
</style>