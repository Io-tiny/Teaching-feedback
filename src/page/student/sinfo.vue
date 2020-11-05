<!--  -->
<template>
  <div>
    <shead-top></shead-top>
    <div class="info">
      <el-form ref="info" :model="info" :rules="loginRules" label-width="90px" style="width: 50%; margin-top: 40px">
        <el-form-item label="用户名" prop="username"> 
          <el-input v-model="info.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="info.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="info.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="sno">
          <el-input v-model="info.sno"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="info.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱号" prop="email">
          <el-input v-model="info.email"></el-input>
        </el-form-item>
        <el-form-item label="所在班级">
          <el-input v-model="info.class"></el-input>
        </el-form-item>
        <el-form-item label="所学学科">
          <el-input v-model="info.subject" placeholder="如果有多个请用','隔开"></el-input>
        </el-form-item>
        <el-form-item label="指导教师">
          <el-input v-model="info.teacher" placeholder="如果有多个请用','隔开"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="save">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sheadTop from "@/components/student/sheadTop";

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      info: {
        id: "",
        username: "",
        password: "",
        name: "",
        sno: "",
        email: "",
        phone: "",
        class: "",
        subject: ""
      },
      loginRules: {
        username:[
          {required: true, trigger:'blur', message:'请输入用户名'}
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
            validator: validatePassword
          }
        ],
        name:[
          {required: true, trigger:'blur', message:'请输入姓名'}
        ],
        sno:[
          {required: true, trigger:'blur', message:'请输入学号'}
        ],
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
        email: [
          { required: true, trigger: "blur", message: "请输入邮箱" },
          {
            validator: function(rule, value, callback) {
              if (
                /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
                  value
                ) == false
              ) {
                callback(new Error("邮箱格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },

  components: {
    sheadTop
  },
  created() {
    this.getinfo();
  },
  methods: {
    getinfo: function() {
      this.info.username = localStorage.getItem("username");
      this.info.sort = localStorage.getItem("sort");
      self = this;
      this.$http
        .post("http://localhost:3000/api/user/selectInfo", {
          username: self.info.username,
          sort: self.info.sort
        })
        .then(function(response) {
          self.info = response.data[0];
          localStorage.setItem("subject", self.info.subject);
          localStorage.setItem("teacher",self.info.teacher);
          localStorage.setItem("studentname",self.info.name);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    save: function() {
      this.$http
        .post("http://localhost:3000/api/user/updateInfo", {
          id: self.info.id,
          username: self.info.username,
          password: self.info.password,
          name: self.info.name,
          sno:self.info.sno,
          phone: self.info.phone,
          email: self.info.email,
          class: self.info.class,
          subject: self.info.subject,
          teacher: self.info.teacher
        })
        .then(function(response) {
          // self.info = response.data[0];
          self.getinfo();
          alert("保存成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.info {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>