<template>
  <div class="footer_main">
    <div class="footer_main__list">
      <div class="list__route--lents">

      </div>
      <div class="list__route--chats" @click="goTo('/chat')">

      </div>
      <div class="list__route--search" @click="goTo('/search')">

      </div>
      <div class="list__route--my_profile" @click="goTo('/home')">

      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { useRouter } from 'vue-router'
export default {

  setup() {
    const router = useRouter()
    const goTo = (value:string):void => {
      router.push(value)
    }

    return{goTo}

  }
}
</script>


<style scoped lang="scss">

@import "src/assets/scss/partials/mixins";

.footer_main {
  background: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;

  &__list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    width: 100vw;
    max-width: 500px;
    background-color: burlywood;

    .list__route {

      &--lents {
        @include footer_route('../assets/news_icon.ico')
      }

      &--chats {
        @include footer_route('../assets/chat_icon.ico')
      }

      &--search {
        @include footer_route('../assets/search_icon.png')
      }

      &--my_profile {
        @include footer_route('../assets/profile_icon.ico')
      }


    }
  }
}

</style>





















