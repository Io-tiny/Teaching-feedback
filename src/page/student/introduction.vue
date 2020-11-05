<!--  -->
<template>
  <div>
    <shead-top></shead-top>
    <el-row>
      <el-col :span="8">
        <el-form
          ref="subjectData"
          :model="subject"
          label-width="90px"
          style="width: 50%; margin-top: 40px"
        >
          <el-form-item label="学科">
            <el-select v-model="subject.name" placeholder="请选择学科" width="100px">
              <el-option
                v-for="item in subjects"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指导教师">
            <el-select v-model="subject.teacher" placeholder="请选择教师" width="100px">
              <el-option
                v-for="item in teachers"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="getSubject">确认</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="16">
        <el-table :data="subjectDatas" stripe style="width: 100%">
          <el-table-column prop="point" label="知识点"></el-table-column>
          <el-table-column prop="chapter" label="章节"></el-table-column>
          <el-table-column prop="createtime" label="创建时间">
            <template slot-scope="scope">{{ scope.row.coursetime | dateFormat}}</template>
          </el-table-column>
          <el-table-column prop="detail" label="详细介绍"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="feedback(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>信息反馈
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes,prev, pager, next, jumper"
          :total="subjectDatas.length"
          prev-text="上一页"
          next-text="下一页"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sheadTop from "@/components/student/sheadTop";
import eventBus from "@/components/student/eventBus.js";
import moment from 'moment';
export default {
  data() {
    return {
      subjectData: {},
      subjectDatas: [],
      pageSubjectDatas: [],
      teacher: {},
      subject: {},
      currentPage: 0,
      pagesize: 0,
      subjects:[],
      teachers:[]
    };
  },

  components: {
    sheadTop
  },

  created() {
    const teacher = localStorage.getItem("teacher").split(/,|，/);
    const subject = localStorage.getItem("subject").split(/,|，/);
    this.teachers = teacher.map(teacher => ({
      value: teacher,
      label: teacher
    }));
    this.subjects = subject.map(subject => ({
      value: subject,
      label: subject
    }));
    // console.log(this.teacher, this.subject);
  },
  methods: {
    getSubject: function() {
      self = this;
      this.currentPage = 1;
      this.pagesize = 5;
      this.$http
        .post("http://localhost:3000/api/subject/getData", {
          name: this.subject.name,
          teacher: this.subject.teacher
        })
        .then(function(response) {
          // console.log(response);
          self.subjectDatas = response.data;
          // alert('获取成功')
        })
        .then(function(response) {
          self.pageSubjectDatas = self.subjectDatas.slice(
            (self.currentPage - 1) * self.pagesize,
            self.currentPage * self.pagesize
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    feedback: function(index, row) {
      row.coursetime = moment(row.coursetime).format('YYYY-MM-DD HH:mm:ss')
      console.log(row);
      eventBus.$emit('feedback', row)
      this.$router.push("feedback");
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
      this.pageSubjectDatas = this.subjectDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.pageSubjectDatas = this.subjectDatas.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      /*console.log(this.currentPage) */
    }
  }
}
</script>
<style scoped>
</style>