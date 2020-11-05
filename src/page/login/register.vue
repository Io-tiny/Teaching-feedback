<!--  -->
<template>
  <div class="login">
    <div class="form-wrap">
      <div class="form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title">
            <h3>反馈系统注册</h3>
          </div>
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForm.password"
              type="password"
              placeholder="Password"
              tabindex="2"
              autocomplete="on"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              ref="phone"
              v-model="loginForm.phone"
              type="text"
              placeholder="Phone"
              tabindex="3"
              autocomplete="on"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              ref="email"
              v-model="loginForm.email"
              type="email"
              placeholder="Email"
              tabindex="4"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item prop="sort">
            <el-select v-model="loginForm.sort" placeholder="customer">
              <el-option label="学生" value="student"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" style="width:100%;margin-bottom:30px" @click="enroll">Register</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",

  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        sort: "",
        name: "",
        email: "",
        phone: "",
        class: "",
        subject: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
            validator: validatePassword
          }
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

  methods: {
    enroll: function() {
      self = this;
      //   console.log(this.loginForm)
      this.$http
        .post("http://localhost:3000/api/user/selectUser", {
          username: this.loginForm.username
        })
        .then(function(response) {
          console.log(response);
          if (!response.data.length) {
            self.$http
              .post("http://localhost:3000/api/user/addUser", {
                username: self.loginForm.username,
                password: self.loginForm.password,
                phone: self.loginForm.phone,
                email: self.loginForm.email,
                sort: self.loginForm.sort
              })
              .then(function(response) {
                alert("登录成功，首次登录请完善信息");
                localStorage.setItem("username", self.loginForm.username);
                localStorage.setItem("password", self.loginForm.password);
                localStorage.setItem("sort", self.loginForm.sort);
                if (self.loginForm.sort == "student") {
                  self.$router.push("/sinfo");
                } else if (self.loginForm.sort == "teacher") {
                  self.$router.push("/tinfo");
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            alert("该用户名已存在,请重新输入");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  min-height: 753.6px;
  position: relative;
  overflow: hidden;
  /* background-color: #15aabe; */
  background-size: cover;
  background-position: center;
  background-image: url("../../assets/images/login.jpg");
}
.title {
  text-align: center;
  padding-bottom: 10px;
  font-size: 20px;
  color: #15aabe;
}
.form-wrap{
  width: 460px;
  height: 580px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  min-height: 580px;
  margin-left: -230px;
  margin-top: -290px;
}
.form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  height: 200px;
  margin-top: -200px;
  margin-left: -200px;
}
.el-select {
  width: 100%;
}
.el-input {
  display: inline-block;
  height: 47px;
  width: 100%;
}
.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
.el-button {
  margin-left: 0px;
}
</style>