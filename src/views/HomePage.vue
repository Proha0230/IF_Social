<template>
<Header></Header>
  <div class="profile_main">
    <div class="profile_main__mainPhoto_and_info">
      <AvatarUser></AvatarUser>
      <div class="profile_main__mainPhoto_and_info--info">
        <div class="info_fio">
          <h4>{{store.state.UserName}}</h4>
          <h4>{{store.state.UserLastName}}</h4>
        </div>
        <h5 @click="statusChanges(true)" v-if="!statusChange">{{store.state.status}}</h5>
        <div v-if="statusChange">
          <input type="text" v-model="statusUserValue">
          <button @click="changeStatusUser()" :disabled="statusUserValue.length < 5">Изменить статус</button>
          <button @click="statusChanges(false)">Отмена</button>
        </div>
      </div>
    </div>

    <div class="profile_main__profile_options_list">

      <div class="profile_main__profile_options_list--exit" @click="exitUser">
        <div class="exit__icon"></div>
        <p class="exit__name">Выйти из аккаунта</p>
      </div>

      <div class="profile_main__profile_options_list--photo">
        <div class="photo__icon"></div>
        <p class="photo__name">Мои фотографии</p>
      </div>

      <div class="profile_main__profile_options_list--audio">
        <div class="audio__icon"></div>
        <p class="audio__name">Моя музыка</p>
      </div>

      <div class="profile_main__profile_options_list--friends">
      <div class="friends__icon"></div>
      <p class="friends__name">Мои друзья</p>
      </div>

    </div>

    <div class="profile_main__notes">

      <div class="profile_main__notes--new_input" v-if="!newPostOpen">
        <div class="new_input__icon" @click="newPostChange(true)"></div>
        <p class="new_input__p" @click="newPostChange(true)">Новая Запись</p>
      </div>

      <div>
        <h4> {{newPostOpen ? 'Новая запись' : 'Мои записи'}}</h4>
      </div>

      <div class="profile_main__notes--input" v-if="newPostOpen">
        <input></input>
        <div class="input__button">
          <button @click="newPostChange(false)">Опубликовать</button>
          <button @click="newPostChange(false)">Отмена</button>
        </div>
      </div>

      <div class="profile_main__notes--list" v-for="item in store.state.postList" :key="item">
        <div class=list_item>
          <p>{{item.date}}</p>
          <p>{{ item.message}}</p>
          <div class="list_item__button">
            <div class="list_item__button--edit"></div>
            <div class="list_item__button--save"></div>
            <div class="list_item__button--delete"></div>
          </div>
        </div>

      </div>
    </div>

  </div>
<Footer></Footer>

</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AvatarUser from "@/components/AvatarUser.vue";
import {Ref, ref } from 'vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from "axios";
import router from "@/router";

export default {

setup() {
const store = useStore();
const newPostOpen:Ref<boolean> = ref(false);
const statusChange:Ref<boolean> = ref(false);
const statusUserValue:Ref<string> = ref('')
const newPostChange = (status:boolean):void => {
  newPostOpen.value = status
}

// Смена статуса пользователя
const changeStatusUser = async () => {
    store.state.status = statusUserValue.value
    const body = JSON.stringify({status: statusUserValue.value})
    await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${store.state.UserID}.json`, body)
    statusChanges(false);
}
const statusChanges = (status:boolean):void => {
  statusChange.value = status
}

//


// Создание даты для записи поста в списке постов пользователя
const datePost = ():string => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  return `${day}.${month < 10 ? '0' + month : month}.${year}`
}

// Выход пользователя из системы

const exitUser = () => {
  store.state.UserID = '';
  store.state.UserName = '';
  store.state.UserLastName = '';
  store.state.status = '';
  store.state.postList = [];
  localStorage.removeItem('UserID');
  localStorage.removeItem('UserEnter');
  router.push('/')

}

onMounted(()=> {
  const windowHeight = window.innerHeight - 100;
  const mainPage: HTMLElement | null = document.querySelector('.profile_main')
  if(mainPage) mainPage.style.height = `${windowHeight}px`
})

return{newPostOpen, newPostChange, datePost, store, statusChange, statusChanges, statusUserValue, changeStatusUser, exitUser}
},
components: {Header, Footer, AvatarUser}

}

</script>

<style scoped lang="scss">
@import "src/assets/scss/partials/mixins";

  .profile_main {
    @include mainPages();

    &__profile_options_list {
      @include optionProfile(55 * 4px);
      flex-flow: column;


        &--friends {
          @include optionProfile();
          border-top: solid white 1px;
          cursor: pointer;

          & .friends__icon {
            @include button_notes('../assets/friends_icon.ico');
          }

          & .friends__name {
            margin: 0;
          }
        }

        &--audio {
          @include optionProfile();
          border-top: solid white 1px;
          cursor: pointer;

            & .audio__icon {
              @include button_notes('../assets/music_icon.ico');
            }

            & .audio__name {
              margin: 0;
            }
        }

        &--photo {
          @include optionProfile();
          border-top: solid white 1px;
          cursor: pointer;

            & .photo__icon {
              @include button_notes('../assets/galery_icon.ico');
            }

            & .photo__name {
              margin: 0;
            }
        }

        &--exit {
          @include optionProfile();
          border-top: solid white 1px;
          cursor: pointer;

          & .exit__icon {
            @include button_notes('../assets/exit_icon.ico');
          }

          & .exit__name {
            margin: 0;
          }
        }
    }

    &__mainPhoto_and_info {

      display: flex;
      flex-flow: column;
      align-items: center;
      padding-bottom: 10px;
      margin-top: 10px;

      &--info {
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .info_fio {
          display: flex;
          margin: 10px 0;
        }

        & h4 {
          margin: 0 0.5vw;
        }

        & h5 {
          margin: 0;
          width: 350px;
          display: flex;
          justify-content: center;
        }
      }

    }

    &__notes {
      height: 100%;
      width: 100vw;
      max-width: 500px;
      flex-flow: column;
      display: flex;
      align-items: center;
      border-top: solid white 1px;

      &--input {
        height: 9vh;
        display: flex;
        align-items: center;
        flex-flow: column;

        & .input__button {
          display: flex;

          & button {
            cursor: pointer;
            margin: 1vh 1vh;
            width: 100px;
            height: 35px;
            border-radius: 20px;
            background-color: burlywood;
            color: white;
            border-color: burlywood;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        & input {
          width: 300px;
          border-radius: 10px;
          height: 6vh;
        }
      }

      &--new_input {
        @include optionProfile();
        cursor: pointer;

          & .new_input__icon{
            @include button_notes('../assets/new_post_icon.ico');
            height: 35px;
          }

          & .new_input__p {

          }
      }

      &--list {
        display: flex;
        flex-flow: column;
        text-align: center;
        align-items: center;
        padding-bottom: 7vh;

        & .list_item {
          width: 300px;

          & p {
            text-align: start;
          }
          &__button {
            display: flex;
            justify-content: end;

            &--edit {
              @include button_notes('../assets/edit_icon.ico');
            }

            &--save {
              @include button_notes('../assets/save_icon.ico');
              margin: 0 1.5vw;
            }

            &--delete {
              @include button_notes('../assets/delete_icon.ico');
            }
          }
        }
      }
    }

  }

</style>















