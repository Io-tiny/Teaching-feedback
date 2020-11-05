<template>
  <div class="item">
    <div class="name">
      <a>{{index + 1}}.</a>
      {{item.name}}。 ({{item.gold}})分
    </div>
    <div class="section">
      <answer :sort="item.sort" :section="item.section" :index="index" @answer="getAnswer"></answer>
    </div>
    <div v-show="isvisiable">
      <div class="answer">{{item.answer}}</div>
      <div class="analysis">{{item.analysis}}</div>
      <div class="difficult">{{difficult[item.difficulty]}}</div>
      <div class="point">{{item.point}}</div>
    </div>
  </div>
</template>

<script>
import answer from "./answer";
export default {
  data() {
    return {
      //   item: {}
      itemAnswer: {},
      sum: 0,
      difficult: {
        1: "☆",
        2: "☆☆",
        3: "☆☆☆",
        4: "☆☆☆☆",
        5: "☆☆☆☆☆"
      },
      isvisiable: false
    };
  },
  props: ["item", "index"],
  components: {
    answer
  },
  // created(){
  //   console.log(this.item.answer);
  // },
  methods: {
    getAnswer: function(index, answer) {
      // console.log(answer);

      if (this.item.sort == "简答题") {
        this.$emit('answer', index ,answer)
      } else if (this.item.sort == "多选题") {
        // console.log(answer.sort().join(','));
        const ans = this.item.answer;
        // console.log(ans);
        if(answer.sort().join(',') === ans){
          this.sum = parseInt(this.item.gold)
        }else{
          this.sum = 0;
        }
        // console.log(this.sum)
        this.$emit('answer', index,answer.sort().join(','))
      } else {
        if (this.item.answer == answer) {
          this.sum = parseInt(this.item.gold);
        } else {
          this.sum = 0;
        }
        // console.log(this.sum);
        this.$emit('answer', index ,answer)
      }
    },
    
  }
};
</script>
<style scoped>
.item {
  width: 90%;
  height: 300px;
  border-bottom: 1px solid #ccc;
  padding: 30px;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 16px;
}
</style>