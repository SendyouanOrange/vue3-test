<template>
  <div class="home-container">
    <div class="home__center">
      <center-container />
    </div>
    <div class="home__left">
      <left-container />
    </div>
    <div class="home__right">
      <right-container />
    </div>
  </div>
</template>

<script>
import leftContainer from './components/left.vue'
import rightContainer from './components/right.vue'
import centerContainer from './components/center.vue'
export default {
  name: 'home',
  components: { leftContainer, rightContainer, centerContainer }
}
</script>

<style lang="less" scoped>
@left-width: 350px;
@right-width: 250px;
.home-container {
  width: 100vw;
  padding: 0 @right-width 0 @left-width;
  overflow: auto;
  box-sizing: border-box;
}
.home__center {
  float: left;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  overflow: auto;
  background-image: url('../../assets/back-4.jpg');
  background-repeat: repeat-y;
  background-size: 100% cover;
  background-position: center;
}
.home__left {
  float: left;
  width: @left-width;
  height: 100vh;
  background: #efefef;
  margin-left: -100%;
  position: relative;
  left: -@left-width;
}
.home__right {
  float: left;
  width: @right-width;
  height: 100vh;
  background: #efefef;
  margin-left: -@right-width;
  position: relative;
  right: -@right-width;
}
</style>