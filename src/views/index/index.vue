<template>
  <div >
    <input type="text" v-model="hehe.www">
    <input type="text" v-model="hehe.eee">
    <input type="text" v-model="hehe.rrr">
    <button @click="pp">重置</button>
    <svg-icon icon-class="eye" />
  </div>
</template>

<script>

let aaa = {
  www:'',
  eee:'',
  rrr:'',
}
// let aaa = () => {
//   return {
//     www:'',
//     eee:'',
//     rrr:'',
//   }
// }

export default {
  name: 'App',
  data(){
      return {
        hehe:aaa
      }
  },
  methods:{
      pp(){
        // console.log(aaa());
        this.hehe = aaa;
        // this.hehe = aaa();
      }
  }
}
</script>


<style lang="scss">
.ppoo {
  font-size: 40px;
}
</style>
