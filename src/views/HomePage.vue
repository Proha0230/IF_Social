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

    <UserNotes></UserNotes>

  </div>
<Footer></Footer>

</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AvatarUser from "@/components/AvatarUser.vue";
import UserNotes from "@/components/UserNotes.vue";
import {Ref, ref } from 'vue'
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from "axios";
import router from "@/router";

export default {

setup() {
const store = useStore();
const statusChange:Ref<boolean> = ref(false);
const statusUserValue:Ref<string> = ref('');

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

return{store, statusChange, statusChanges, statusUserValue, changeStatusUser, exitUser}
},
components: {Header, Footer, AvatarUser, UserNotes}

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

  }

</style>















