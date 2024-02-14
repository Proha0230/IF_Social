<template>
  <Header></Header>
  <div class="chat_list_main">
    <div class="chat_list_main__user_list">
      <h3 class="chat_list_main__name_category">Мои сообщения</h3>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

      <div class="chat_list_main__user_list--user">
        <div class="user__photo">
          <img src="../assets/MyPhoto.jpeg" alt="Фотография отсутствует">
        </div>
        <div class="user__info">
          <h5>Иван</h5>
          <h5>Иванович</h5>
        </div>
        <div class="user__button">
          <div class="user__button--delete"></div>
        </div>
      </div>

    </div>
  </div>
  <Footer></Footer>

</template>

<script lang="ts">

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {onMounted} from "vue";

export default {

  setup() {



    onMounted(()=> {
      const windowHeight = window.innerHeight - 100;
      const mainPage: HTMLElement | null = document.querySelector('.chat_list_main')
      if(mainPage) mainPage.style.height = `${windowHeight}px`
    })

    return{}
  },
  components: {Header, Footer}

}

</script>

<style scoped lang="scss">
@import "src/assets/scss/partials/mixins";

.chat_list_main {
  @include mainPages();

  &__name_category {
    margin: 10px 0 0 0;
  }

  &__user_list {
    //height: 100%;
    overflow: scroll;
    display: flex;
    flex-flow: column;
    align-items: center;


    &--user {
      display: flex;
      width: 80vw;
      max-width: 380px;
      height: 70px;
      border-radius: 20px;
      border: solid burlywood;
      margin: 10px 0;
      position: relative;
      align-items: center;
      padding: 10px;

      & .user__photo {
        height: 70px;
        width: 60px;

        & img {
          height: 70px;
          width: 60px;
          border-radius: 20px;
        }
      }

      & .user__info {
        position: absolute;
        margin-left: 60px;
        width: 25vw;
        max-width: 100px;
        text-align: center;

        & h5 {
          margin: 0;
        }

      }

      & .user__button {
        position: absolute;
        right: 5px;
        display: flex;

        &--delete {
          @include button_notes('../assets/delete_icon.ico');
        }

      }

    }
  }
}

</style>














