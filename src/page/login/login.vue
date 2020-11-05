<!--  -->
<template>
  <div class="login">
    <div class="form_wrap">
      <div class="form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="logo">
            <img class="img-bg" src="../../assets/images/login_logo.png" alt />
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
          <el-form-item prop="sort">
            <el-select v-model="loginForm.sort" placeholder="customer">
              <el-option label="学生" value="student"></el-option>
              <el-option label="教师" value="teacher"></el-option>
              <el-option label="管理员" value="administrator"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" style="width:100%;" @click="login">Login</el-button>
          <router-link to="/register">
            <span class="btn-register">注册一个账号</span>
          </router-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

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
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      }
    };
  },

  methods: {
    login: function() {
      self = this;
      this.$http
        .post("http://localhost:3000/api/user/selectUser", {
          username: this.loginForm.username
        })
        .then(function(response) {
          if (!response.data.length) {
            alert("您的账户不存在，请先注册");
          } else {
            if (
              response.data[0].password != self.loginForm.password ||
              response.data[0].sort != self.loginForm.sort
            ) {
              alert("用戶名、密码或者用户类型错误，请重新输入");
            } else {
              // alert("登录成功");
              self.loginForm = response.data[0];
              localStorage.setItem("username", self.loginForm.username);
              localStorage.setItem("password", self.loginForm.password);
              localStorage.setItem("sort", self.loginForm.sort);
              localStorage.setItem("subject", self.loginForm.subject);
              localStorage.setItem("class", self.loginForm.class);
              localStorage.setItem("studentname", self.loginForm.name);
              if (self.loginForm.sort == "student") {
                self.$router.push("/home");
              } else if (self.loginForm.sort == "teacher") {
                if (!self.loginForm.subject) {
                  alert("首次登录请前往信息界面完善信息");
                }
                self.$router.push("/thome");
              } else if (self.loginForm.sort == "administrator") {
                self.$router.push("/ahome");
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    // login: function() {
    //   self = this;
    //   console.log(this.loginForm)
    //   this.$http
    //     .post("http://localhost:3000/api/user/add", {
    //       username: this.loginForm.username,
    //       password: this.loginForm.password,
    //       sort: this.loginForm.sort
    //     })
    //     .then(function(response) {})
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
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

.form_wrap {
  width: 460px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.4);
  min-height: 580px;
  overflow: hidden;
}
.form {
  width: 360px;
  height: 580px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  font-size: 12px;
  transform: translateY(-50%);
  overflow: hidden;
}
.logo {
  width: 800px;
  height: 200%;
  margin-bottom: 25px;
}
.img-bg {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
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
.btn-register {
  float: right;
  color: #1a8cfe;
  margin-top: 20px;
}
</style>