<template>
  <Header></Header>
  <div class="search_main">
    <h3 class="search_main__name_category">Поиск пользователей</h3>
    <div class="search_main__input_search">
      <input />
      <button class="search_main__input_search--button">Поиск</button>
    </div>
    <div class="search_main__user_list" v-for="item in usersList" :key="item">

      <div class="search_main__user_list--user">
        <div class="user__photo">
          <img :src="item.userPhoto ?? 'https://i.ibb.co/dMqXwmP/no-image.jpg'" alt="Нет фотографии">
        </div>
        <div class="user__info">
          <h5>{{ item.name }}</h5>
          <h5>{{ item.lastName }}</h5>
        </div>
        <div class="user__button">
          <div class="user__button--add"></div>
          <div class="user__button--chat"></div>
        </div>
      </div>

    </div>
  </div>
  <Footer></Footer>

</template>

<script lang="ts">

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {onMounted, Ref, ref} from "vue";
import axios from "axios";

export default {

  setup() {
    type UserRegValue = {
      email: string,
      password: string,
      name: string,
      lastName: string,
      status: string,
      postList: Array<objPost>
      userID: string
      userPhoto?: string | null;
    }

    type objPost = {
      date?: string,
      message?: string,
      idMessage?: number,
    }

    const usersList:Ref<Array<UserRegValue> | null> = ref(null);

    // Получение данных о списке пользователей c эндпоинта
    const getDataUsersList = async ():Promise<void> => {
      const {data} = await axios.get(`https://ifsocial0230-default-rtdb.firebaseio.com/users/.json`)
      usersList.value = data
    }

    onMounted(async ()=> {
      const windowHeight = window.innerHeight - 100;
      const mainPage: HTMLElement | null = document.querySelector('.search_main')
      if(mainPage) mainPage.style.height = `${windowHeight}px`
      await getDataUsersList();
    })

    return{usersList}

  },
  components: {Header, Footer}

}

</script>

<style scoped lang="scss">
@import "src/assets/scss/partials/mixins";

.search_main {
  @include mainPages();

    &__name_category {
      margin: 10px 0;
      text-align: center;
    }

    &__input_search {
      display: flex;
      justify-content: center;
      height: 40px;
      margin-bottom: 10px;

        &--button {
          display: flex;
          align-items: center;
          border-radius: 20px;
          background-color: burlywood;
          color: white;
          border-color: burlywood;
          width: 65px;
          justify-content: center;
        }

        & input {
          width: 67vw;
          max-width: 300px;
          margin-right: 10px;
          border-radius: 10px;
          background-color: aliceblue;
        }
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


                &--add {
                  @include button_notes('../assets/user_add_icon.ico');
                }

                &--chat {
                  @include button_notes('../assets/dialog_icon.ico');
                  margin: 0 2vw;
                }

            }

         }
    }
}

</style>














