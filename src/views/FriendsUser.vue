<template>
  <Header></Header>
  <div class="friends_main">
    <h4 v-if="inviteInFriendsUserList">Заявки в друзья</h4>
    <div class="friends_main__invite_in_friends" v-for="item in inviteInFriendsUserList" :key="item">
      <div class="friends_main__user_list--user">
        <div class="user__photo">
          <img :src="item.userPhoto ?? 'https://i.ibb.co/dMqXwmP/no-image.jpg'" alt="Нет фотографии">
        </div>
        <div class="user__info">
          <h5>{{ item.name }}</h5>
          <h5>{{ item.lastName }}</h5>
        </div>
        <div class="user__button">
          <div class="user__button--add" @click="addUserInFriendsListFriend(item.userID)"></div>
        </div>
      </div>
    </div>

    <h3 class="friends_main__name_category">Мои друзья</h3>
    <div class="friends_main__user_list" v-for="item in friendsListUser" :key="item">

      <div class="friends_main__user_list--user">
        <div class="user__photo">
          <img :src="item.userPhoto ?? 'https://i.ibb.co/dMqXwmP/no-image.jpg'" alt="Нет фотографии">
        </div>
        <div class="user__info">
          <h5>{{ item.name }}</h5>
          <h5>{{ item.lastName }}</h5>
        </div>
        <div class="user__button">
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
import {useStore} from "vuex";

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
      friends: friends;
    }

    type objPost = {
      date?: string,
      message?: string,
      idMessage?: number,
    }

    type friendInList = {
      userID: string,
      message: Array<string>
    }

    type friends = {
      inviteFriends: Array<string>,
      friendList: Array<friendInList>
    }

    const store = useStore()
    const inviteInFriendsUserList: Ref<Array<UserRegValue> | null> = ref(null)
    const friendsListUser:Ref<Array<UserRegValue> | null> = ref(null)
    const friendsUser: Ref<friends | null> = ref(null)
    const allUserData: Ref<Array<UserRegValue> | null> = ref(null)

    // Получение данных о заявках в друзья и списке самих друзей
    const getDataUsersList = async ():Promise<void> => {
      const {data} = await axios.get(`https://ifsocial0230-default-rtdb.firebaseio.com/users/.json`)
      allUserData.value = Object.values(data)
      friendsUser.value = allUserData.value.filter(item => item.userID === store.state.UserID)[0].friends

      // список заявок на добавление в друзья к пользователю
      const inviteInFriendsUserID: friends['inviteFriends'] = friendsUser.value.inviteFriends.filter(item => item !== '')
      inviteInFriendsUserList.value = allUserData.value.filter(item => inviteInFriendsUserID.includes(item.userID))
      if(!inviteInFriendsUserList.value?.length) inviteInFriendsUserList.value = null;

      // список друзей пользователя
      const friendsUserUserIDAndMessage: Array<friendInList> = friendsUser.value.friendList.filter(item => item.userID !== '')
      const friendsUserListUserID: Array<friendInList['userID']> = []
      friendsUserUserIDAndMessage.forEach(item => friendsUserListUserID.push(item.userID))

      // Получаем готовый список друзей пользователя найденного по userID списка друзей - среди всех пользователей приложения
      friendsListUser.value = allUserData.value.filter(item => friendsUserListUserID.includes(item.userID))
      if(!friendsListUser.value?.length) friendsListUser.value = null;
    }

    // Добавление пользователя в друзья
    const addUserInFriendsListFriend = async (userID:string) => {
      const {data} = await axios.get(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${userID}/friends.json`)
      const friendsFriendsList: friends = data

      // Добавление пользователя в список друзей пользователя добавившего в друзья
      if(friendsFriendsList) {
        friendsFriendsList.friendList.push({
          userID: store.state.UserID,
          message: ['']
        })
        const body = JSON.stringify({friends: friendsFriendsList})
        await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${userID}.json`, body)
      }

      // Добавление пользователя отправившего заявку в друзья в список друзей пользователя
      if(friendsUser.value) {
        friendsUser.value.friendList.push({
          userID: userID,
          message: ['']
        })
        friendsUser.value.inviteFriends = friendsUser.value.inviteFriends.filter(item => !item.includes(userID))
        const body = JSON.stringify({friends: friendsUser.value})
        await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${store.state.UserID}.json`, body)

        if(inviteInFriendsUserList.value) inviteInFriendsUserList.value = inviteInFriendsUserList.value.filter(item => item.userID !== userID)
      }
    }



    onMounted(async ()=> {
      const windowHeight = window.innerHeight - 100;
      const mainPage: HTMLElement | null = document.querySelector('.friends_main')
      if(mainPage) mainPage.style.height = `${windowHeight}px`
      await getDataUsersList();
    })

    return{inviteInFriendsUserList, addUserInFriendsListFriend, friendsListUser}

  },
  components: {Header, Footer}

}

</script>

<style scoped lang="scss">
@import "src/assets/scss/partials/mixins";

.friends_main {
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
        }

      }

    }
  }
}

</style>














