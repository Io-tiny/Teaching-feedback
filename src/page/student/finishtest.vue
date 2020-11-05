<!--  -->
<template>
  <div class="finish">
    <shead-top></shead-top>
    <div class="main">
      <div v-for="(item,index) in itemDatas" v-bind:key="index">
        <item :item="itemDatas[index]" :index="index" @answer="getAnswer"></item>
      </div>
    </div>
    <div class="left">
      <div class="time">
        <span>考试剩余时间</span>
        <div id="remaintime"></div>
      </div>
    </div>
    <div class="left_button">
      <el-button type="primary" @click="submit" round style="width:100%">提交</el-button>
    </div>
    <!-- <div class="right"></div> -->
  </div>
</template>

<script>
import sheadTop from "@/components/student/sheadTop";
import item from "@/components/student/item";
import moment from "moment";
export default {
  data() {
    return {
      testData: {},
      itemData: {
        single: "",
        multiple: "",
        judge: "",
        short: ""
      },
      answer: {},
      answers: [],
      itemAnswer: [],
      itemGold: [],
      itemDatas: [],
      itemPoint: [],
      itemTest: [],
      sum: 0,
      totalgold: 0,
      testname: "",
      studentname: "",
      feedback: {},
      feedbackData: [],
      time: 7200
    };
  },

  components: {
    sheadTop,
    item
  },

  activated:async function() {
    this.clear();
    await this.getTestData();
    this.getFeedback();
    this.countDown();
  },
  methods: {
    clear: function() {
      this.testData = {};
      (this.itemData = {
        single: "",
        multiple: "",
        judge: "",
        short: ""
      }),
        (this.answer = {}),
        (this.answers = []),
        (this.itemAnswer = []),
        (this.itemGold = []),
        (this.itemDatas = []),
        (this.sum = 0),
        (this.totalgold = 0),
        (this.workname = ""),
        (this.studentname = "");
    },
    getTestData: function() {
      self = this;
      this.testData.id = localStorage.getItem("testid");
      return this.$http
        .post("http://localhost:3000/api/test/selectTestData", {
          id: this.testData.id
        })
        .then(async function(response) {
          self.testData = response.data[0];
          // console.log(self.testData);
          self.time = self.testData.time * 60;
          let { singleid, multipleid, judgeid, shortid } = self.testData;
          if (self.testData.single != null) {
            singleid = self.testData.single.split(/,|，/);
          } else {
            singleid = [];
          }
          if (self.testData.multiple != null) {
            multipleid = self.testData.multiple.split(/,|，/);
          } else {
            multipleid = [];
          }
          if (self.testData.judge != null) {
            judgeid = self.testData.judge.split(/,|，/);
          } else {
            judgeid = [];
          }
          if (self.testData.short != null) {
            shortid = self.testData.short.split(/,|，/);
          } else {
            shortid = [];
          }
          // console.log(singleid,multipleid,judgeid,shortid);
          const singlelist = await Promise.all(
            singleid.filter(id => !!id).map(id => self.getItemData(id))
          );
          const multiplelist = await Promise.all(
            multipleid.filter(id => !!id).map(id => self.getItemData(id))
          );
          const judgelist = await Promise.all(
            judgeid.filter(id => !!id).map(id => self.getItemData(id))
          );
          const shortlist = await Promise.all(
            shortid.filter(id => !!id).map(id => self.getItemData(id))
          );
          // console.log(singlelist,multiplelist,judgelist,shortlist);
          self.itemDatas.push(
            ...singlelist,
            ...multiplelist,
            ...judgelist,
            ...shortlist
          );
          // console.log(self.itemDatas);
          self.itemDatas.forEach(function(element, index) {
            self.itemAnswer[index] = element.answer;
            self.itemGold[index] = element.gold;
            self.itemPoint[index] = element.point;
            self.testData.name;
            self.itemTest[index] = element.point + self.testData.name;
          });
          // console.log(self.itemAnswer);
          //   console.log(self.testData.id);
          //   console.log(self.testData);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getItemData: async function(id) {
      self = this;
      return this.$http
        .post("http://localhost:3000/api/item/seleteItemData", {
          id: id
        })
        .then(function(response) {
          // console.log(response);
          return response.data[0];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getFeedback: function() {
      self = this;
      return this.$http
        .post("http://localhost:3000/api/feedback/selectfeedbackData", {})
        .then(function(response) {
          self.feedback = response.data;
          self.feedback.forEach((data, index) => {
            self.feedbackData[index] = data.point + data.test;
          });
          // console.log(self.feedbackData);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAnswer: function(index, answer) {
      // console.log(index, answer)
      this.answer[index - 1] = answer;
      // console.log(this.answer);
    },
    submit: async function() {
      self = this;
      for (let key in this.answer) {
        // console.log(key+':'+ this.answer[key])
        this.answers[key] = this.answer[key];
      }
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i] == this.itemAnswer[i]) {
          this.sum += parseInt(this.itemGold[i]);
        } else {
          // console.log(this.feedbackData);
          // console.log(this.itemTest[i]);
          if (this.feedbackData.indexOf(this.itemTest[i]) != -1) {
            await this.$http
              .post("http://localhost:3000/api/feedback/updatefeedbackData", {
                point: this.itemPoint[i],
                test: this.testData.name
              })
              .then(async function(response) {
                await self.getFeedback();
                // return response
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            await this.$http
              .post("http://localhost:3000/api/feedback/addfeedbackData", {
                point: this.itemPoint[i],
                pointsum: 1,
                test: this.testData.name
              })
              .then(async function(response) {
                // console.log(response);
                await self.getFeedback();
                // return response
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      }
      // this.answers.forEach((data, index) => {
      //   if (data == this.itemAnswer[index]) {
      //     this.sum += parseInt(this.itemGold[index]);
      //   } else {
      //     if (this.feedbackData.indexOf(this.itemTest[index]) != -1) {
      //       this.$http
      //         .post("http://localhost:3000/api/feedback/updatefeedbackData", {
      //           point: this.itemPoint[index],
      //           test: this.testData.name
      //         })
      //         .then(function(response) {
      //         })
      //         .catch(function(error) {
      //           console.log(error);
      //         });
      //     } else {
      //       this.$http
      //         .post("http://localhost:3000/api/feedback/addfeedbackData", {
      //           point: this.itemPoint[index],
      //           pointsum: 1,
      //           test: this.testData.name
      //         })
      //         .then(function(response) {
      //           // console.log(response);
      //         })
      //         .catch(function(error) {
      //           console.log(error);
      //         });
      //     }
      //   }
      // });
      this.itemGold.forEach((data, index) => {
        this.totalgold += parseInt(data);
      });
      // console.log(this.totalgold);
      const createtime = moment(new Date().getTime()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      // console.log(createtime);
      this.studentname = localStorage.getItem("studentname");
      this.testname = localStorage.getItem("testname");
      const answerS = [];
      this.answers.forEach((data, index) => {
        answerS[index] = index + "." + data;
      });
      const ans = answerS.join(";");
      console.log(ans);
      this.$http
        .post("http://localhost:3000/api/answer/addAnswerData", {
          testname: self.testname,
          studentname: self.studentname,
          answer: ans,
          createtime: createtime,
          totalgold: self.totalgold,
          sum: self.sum,
          finish: "否"
        })
        .then(function(response) {
          alert("提交成功");
          self.$router.push("/home");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    countDown: function() {
      // console.log(this.testData.showtime);
      // console.log(this.testData.time);
      const lasttime =
        moment(this.testData.showtime) + this.testData.time * 60 * 1000;
      let nowtime = new Date().getTime();
      this.time = (lasttime - nowtime) / 1000;
      // console.log(this.time);
      // console.log('111');
      let hours = parseInt(this.time / 60 / 60);
      let minutes = parseInt((this.time / 60) % 60);
      let secound = parseInt(this.time % 60);
      if (this.time <= 0) {
        alert("考试结束");
        this.submit();
      } else {
        remaintime.innerHTML = hours + ":" + minutes + ":" + secound;
      }
      if (this.time >= 0) {
        setTimeout(this.countDown, 1000);
      }
    }
  }
};
</script>
<style scoped>
.finish {
  width: 100%;
  background-color: #eee;
  position: relative;
}
.main {
  width: 70%;
  /* height: 2000px; */
  /* border: 1px solid #000; */
  background-color: #fff;
  margin-top: 40px;
  margin-left: 20px;
}
.left {
  width: 250px;
  position: fixed;
  top: 100px;
  right: 100px;
  /* border: 1px solid #000; */
  background-color: #fff;
}
.left_button {
  width: 250px;
  position: fixed;
  bottom: 30px;
  right: 100px;
}
.right {
  width: 100px;
  height: 600px;
  position: fixed;
  top: 100px;
  right: 90px;
  /* border: 1px solid #000; */
  background-color: #fff;
}
.time {
  width: 100%;
  height: 100px;
  text-align: center;
  font-size: 16px;
  /* font-weight: bolder; */
  /* color: crimson; */
  border-bottom: 1px solid #ccc;
}
#remaintime {
  color: red;
  font-size: 24px;
  margin-top: 10px;
}
</style>