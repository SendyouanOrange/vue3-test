<template>
  <div class="left-container">
    <img class="left__head-img" src="../../../assets/header.jpeg" alt="">
    <p class="left__name">{{content.userName}}</p>
    <p class="left__text">{{content.userText}}</p>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    const content = reactive({
      userName: '李成',
      userText: '这是一段优美的描述'
    })
    return {
      content
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/index';
.left-container {
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.left__head-img {
  height: 100px;
  width: 100px;
  border-radius: 100%;
}
.left__name {
  .font-bold;
  font-size: @ucan-font-size-large;
}
</style>