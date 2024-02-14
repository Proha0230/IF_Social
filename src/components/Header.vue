<template>
<div class="header_main">
  <div class="header_main__logo">
    <h1 class="header_main__logo--text">IF_Social</h1>
  </div>
</div>

</template>

<script lang="ts">

export default {

  setup() {

  }
}

</script>

<style scoped lang="scss">

.header_main {
  display: flex;
  justify-content: center;
  background-color: aliceblue;
  height: 50px;
  max-height: 100px;
  align-items: center;

  &__logo {
    position: fixed;
    //max-height: 100px;
    background-color: aliceblue;

    &--text {
      color: burlywood;
      border-bottom: solid burlywood 1px;
      width: 100vw;
      margin: 0;
      max-width: 500px;
      text-align: center;
      //padding: 5px;
    }
  }
}

</style>