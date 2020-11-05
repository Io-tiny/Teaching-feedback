<!--  -->
<template>
  <div class="feedback">
    <thead-top></thead-top>
    <div style="text-align: left; margin-left: 50px">
      请输入要选择的考试名称：
      <el-input
        placeholder="点击空白处即可搜索"
        prefix-icon="el-icon-search"
        style="width: 30%; margin:20px"
        v-model="inputData"
        @blur="searchData"
      ></el-input>
    </div>
    <div id="main" style="width:100%; height:600px;"></div>
  </div>
</template>

<script>
import theadTop from "@/components/teacher/theadTop";
export default {
  data() {
    return {
      feedback: [],
      feedbackData: [],
      sfeedback: {},
      sfeedbacks: [],
      inputData:'',
      difficults: {
        1: "☆",
        2: "☆☆",
        3: "☆☆☆",
        4: "☆☆☆☆",
        5: "☆☆☆☆☆"
      },
      difficult: {
        1: "完全听懂",
        2: "基本都听懂",
        3: "一半都不懂",
        4: "基本都不懂",
        5: "完全不懂"
      },
      option: {
        backgroundColor: "#45515a", //背景颜色
        //标题
        title: {
          text: "考试信息反馈结果",
          subtext: "错误率",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
            fontStyle: "italic" //标题字体
          }
        },
        //弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: "item", //以具体项目触发弹窗
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例，选择要显示的项目
        //工具箱
        toolbox: {
          show: true, //显示工具箱
          feature: {
            dataView: { show: true }, //以文字形式显示数据
            restore: { show: true }, //还原
            //dataZoom:{show:true}, //区域缩放
            saveAsImage: { show: true } //保存图片
            //magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          }
        },
        /*//视觉映射组件，将数据映射到视觉元素上
            visualMap: {
              show: false,
              min: 1,
              max: 2,
              dimension: 0, //选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位
              // seriesIndex: 4, //选取数据集合中的哪个数组，如{一班}，{二班}，默认选取data中的所有数据集
              inRange: {
                //选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
                color:['red'],
                colorLightness: [0,1],
                colorSaturation:[0,1]
              }
            },*/
        //数据
        series: [
          {
            name: "错误知识点",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [].sort(function(a, b) {
              return a.value - b.value;
            }),

            roseType: "radius", //角度和半径展现百分比，'area'只用半径展现
            label: {
              //饼图图形的文本标签
              normal: {
                //下同，normal指在普通情况下样式，而非高亮时样式
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                }
              }
            },
            labelLine: {
              //引导线样式
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0.5, //0-1，越大越平滑弯曲
                length: 10, //从块到文字的第一段长
                length2: 20 //拐弯到文字的段长
              }
            },

            itemStyle: {
              //图例样式
              normal: {
                //color: '#97413c',
                shadowBlur: 50, //阴影模糊程度
                shadowColor: "rgba(0, 0, 0, 0.5)" //阴影颜色，一般黑
              }
            },
            animationType: "scale", //初始动画效果，scale是缩放，expansion是展开
            animationEasing: "elasticOut", //初始动画缓动效果
            animationDelay: function(idx) {
              //数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200;
            }
          }
        ],
        color: ["#CD0000", "#FF4040", "#EE0000", "#EE2C2C", "#F08080", "#CD3333"]
      }
    };
  },
  created() {
    this.getFeedback();
  },
  mounted() {
    this.drawChart();
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal);
          } else {
            this.myChart.setOption(oldVal);
          }
        } else {
          this.drawChart();
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  components: {
    theadTop
  },
  methods: {
    drawChart: function() {
      var myChart = this.echarts.init(document.getElementById("main"));
      // console.log(this.option.series[0].data);
      myChart.setOption(this.option, true);
    },
    searchData: function(){
      this.getFeedback();
    },
    getFeedback: function() {
      self = this;
      self.feedbackData = []
      this.$http
        .post("http://localhost:3000/api/feedback/getData", {
          test: this.inputData
        })
        .then(function(response) {
          self.feedback = response.data;
          self.feedback.forEach((data, index) => {
            self.feedbackData.push({
              value: parseInt(data.pointsum),
              name: data.point
            });
          });
          
          self.option.series[0].data = [];
          // console.log(self.option.series[0].data);
          self.option.series[0].data = self.feedbackData;
          // console.log(self.option.series[0].data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>
<style scoped>
.feedback {
  /* background-color: #2c343c */
  text-align: center;
}
span {
  color: #2c343c;
  font-size: 20px;
  font-weight: bolder;
}
</style>