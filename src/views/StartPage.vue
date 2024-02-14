<template>
  <Header></Header>
  <div class="main_login">

    <div class="main_login__error" v-if="errorInfo">
      <h4>{{errorInfo}}</h4>
    </div>

    <div class="main_login__successNewAccount" v-if="successNewAccount">
      <h4>{{successNewAccount}}</h4>
    </div>

    <div class="main_login__form" v-if="!goReg">
      <h4 class="main_login__form--name">Вход в аккаунт</h4>
      <div class="main_login__form--login">
        <p>Логин</p>
        <input type="email" autocomplete="off" placeholder="Введите вашу почту" required v-model="loginValue"/>
      </div>
      <div class="main_login__form--password">
        <p>Пароль</p>
        <input type="password" autocomplete="off" placeholder="Введите пароль" required v-model="passwordValue"/>
      </div>
      <div class="main_login__form--button">
        <button class="button__enter" @click="EnterUserInSystem">Войти</button>
        <button class="button__reg" @click="goReg = !goReg">Регистрация</button>
      </div>
    </div>

    <div class="main_login__form" v-if="goReg">
      <h4 class="main_login__form--name">Регистрация аккаунта</h4>
      <div class="main_login__form--login">
        <p>Логин</p>
        <input type="email" autocomplete="off" placeholder="Введите вашу почту" required v-model="loginValue"/>
      </div>
      <div class="main_login__form--password">
        <p>Пароль</p>
        <input type="password" autocomplete="off" placeholder="Введите пароль" required v-model="passwordValue"/>
      </div>
      <div class="main_login__form--login">
        <p>Имя:</p>
        <input type="text" autocomplete="off" placeholder="Введите Имя" required v-model="nameValue"/>
      </div>
      <div class="main_login__form--password">
        <p>Фамилия:</p>
        <input type="text" autocomplete="off" placeholder="Введите Фамилию" required v-model="lastNameValue"/>
      </div>
      <div class="main_login__form--button Registration">
        <button class="button__reg" :disabled="buttonRegistration" @click="CreateNewUser">Регистрация</button>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import {onMounted} from "vue";
import axios from "axios";
import {Ref , ref} from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
export default {

    setup() {
      const goReg: Ref<boolean> = ref(false)
      const loginValue: Ref<string> = ref('');
      const passwordValue: Ref<string> = ref('');
      const nameValue: Ref<string> = ref('');
      const lastNameValue: Ref<string> = ref('');
      const errorInfo: Ref<string> = ref('');
      const successNewAccount: Ref<string> = ref('');
      const buttonRegistration: Ref<boolean> = ref(false);
      const router = useRouter();
      const store = useStore()

      const goTo = (value:string):void => {
        router.push(value)
      }

      // Получение данных о пользователе c эндпоинта
      const getDataUser = async (userID:string):Promise<void> => {
        const {data} = await axios.get(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${userID}.json`)
        store.state.UserName = data.name;
        store.state.UserLastName = data.lastName;
        store.state.status = data.status;
        store.state.postList = data.postList;
      }
      //

      // Отправка на эндпоинт данных о пользователе
      const postDataUser = async (userID:string, value:UserRegValue) => {
        await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${userID}.json`, value)
      }
      //


      // Для регистрации аккаунта
      type UserRegValue = {
        email: string,
        password: string,
        name: string,
        lastName: string,
        status: string,
        postList: Array<objPost>
        userID: string
      }

      type objPost = {
        date?: string,
        message?: string,
        idMessage?: number,
      }

      // Создание даты для автоматической записи о регистрации пользователя
      const datePost = ():string => {
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()
        return `${day}.${month < 10 ? '0' + month : month}.${year}`
      }

      const CreateNewUser = async () => {
        try {
          const url: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzLG1kgLWbUy72Xs1WDUKc1XaUUOzjl6M`
          const {data} = await axios.post(url, {
            email: loginValue.value,
            password: passwordValue.value,
            returnSecureToken: true
          })
          await postDataUser(data.localId, {
            email: loginValue.value,
            password: passwordValue.value,
            name: nameValue.value,
            lastName: lastNameValue.value,
            status: 'Расскажите как у вас дела?',
            postList: [{date: datePost(), message: `${nameValue.value} ${lastNameValue.value} Добро пожаловать в IF_Social !`, idMessage: 0}],
            userID: data.localId
          })
          buttonRegistration.value = true
          successNewAccount.value = 'Регистрация завершена!'
          setTimeout(()=> {
            successNewAccount.value = ''
            buttonRegistration.value = false
            goReg.value = false
          }, 3500)
        } catch (error: any) {
          console.log(error)
        }
      }
      //

      //Запись UserID в LocalStorage при входе -
      const RecordInLocalStorageUserID = (UserID:string, UserEnter:boolean) => {
        localStorage.setItem('UserID', UserID);
        localStorage.setItem('UserEnter', UserEnter.toString());
      }
      //

      // Для входа в аккаунт
      const EnterUserInSystem = async () => {
        try {
          const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzLG1kgLWbUy72Xs1WDUKc1XaUUOzjl6M`
          const {data} = await axios.post(url, {
            email: loginValue.value,
            password: passwordValue.value,
            returnSecureToken: true
          })
          // Запись айдишника пользователя в Vuex
          store.state.UserID = data.localId
          RecordInLocalStorageUserID(data.localId, true);
          // Получение данных о пользователе с эндпоинта
          await getDataUser(store.state.UserID)
          // Роут на страницу пользователя
          goTo('/home');
        }
        catch (error: any) {
          // Обработка ошибок запроса
          if(typeof error === 'object' && error && error.code === "ERR_BAD_REQUEST") {
            errorInfo.value = 'Неверный логин или пароль'
          }
          loginValue.value = ''
          passwordValue.value = ''
          setTimeout(()=> {
            errorInfo.value = ''
          }, 3500)
        }
      }
      //

      onMounted(()=> {
        const windowHeight = window.innerHeight - 100;
        const mainPage: HTMLElement | null = document.querySelector('.main_login')
        if(mainPage) mainPage.style.height = `${windowHeight}px`
      })


      return {loginValue, passwordValue, CreateNewUser, EnterUserInSystem, errorInfo, goReg, nameValue, lastNameValue, buttonRegistration, successNewAccount}
    },
  components: {Header}
}

</script>


<style scoped lang="scss">
@import "src/assets/scss/partials/mixins";

  .main_login {
    @include mainPages();
    justify-content: center;

    &__error {
      @include ErrorOrSuccessMessage();
    }
    &__successNewAccount {
      @include ErrorOrSuccessMessage(green);
    }

    &__form {
      padding: 10px 40px;
      border: solid burlywood 2px;
      border-radius: 20px;
      text-align: center;


      &--name {
        margin: 0;
        font-weight: 400;
      }

      &--login {
        @include startPageInput();
      }

      &--password {
        @include startPageInput();
      }

      &--button {
        display: flex;
        justify-content: space-between;
        width: 200px;
        margin-top: 15px;

        &.Registration {
          justify-content: center;
        }

        & .button__enter {
          @include buttonStartPage();
        }

        & .button__reg {
          @include buttonStartPage();
        }
      }

    }
  }


</style>














