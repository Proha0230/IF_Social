<template>
  <div class="profile_main__notes">

    <div class="profile_main__notes--new_input" v-if="!newPostOpen">
      <div class="new_input__icon" @click="newPostChange(true)"></div>
      <p class="new_input__p" @click="newPostChange(true)">Новая Запись</p>
    </div>

    <div>
      <h4> {{newPostOpen ? 'Новая запись' : 'Мои записи'}}</h4>
    </div>

    <div class="profile_main__notes--input" v-if="newPostOpen">
      <input type="text" v-model="newPostUser"></input>
      <div class="input__button">
        <button @click="addUserPost()" :disabled="newPostUser.length < 5">Опубликовать</button>
        <button @click="newPostChange(false)">Отмена</button>
      </div>
    </div>

    <div class="profile_main__notes--list" v-for="item in store.state.postList" :key="item">
      <div class=list_item>
        <p>{{item.date}}</p>
        <p>{{ item.message}}</p>
        <p style="display: none">{{item.idMessage}}</p>
        <div class="list_item__button">
          <div class="list_item__button--edit" @click="editPostUser(true, item as object)"></div>
          <div class="list_item__button--delete" @click="deletePostUser(item as object)"></div>
        </div>
        <div v-if="postEdit && neededPost && neededPost.idMessage === item.idMessage">
          <input v-model="editPostUserValue"/>
          <button @click="saveEditPostUser()" :disabled="editPostUserValue.length < 5">Изменить</button>
          <button @click="editPostUser(false)">Отмена</button>
        </div>
      </div>

    </div>
  </div>

</template>

<script lang="ts">

import axios from "axios";
import {useStore} from "vuex";
import {ref, Ref} from "vue";

export default {
  setup(){
    const store = useStore();
    const newPostOpen:Ref<boolean> = ref(false);
    const newPostUser:Ref<string> = ref('');
    const postList: Ref<Array<objPost>> = ref(store.state.postList)
    const postEdit: Ref<boolean> = ref(false);
    const editPostUserValue: Ref<string> = ref('');
    const neededPost:Ref<objPost | undefined> = ref(undefined)

    // Для отправки в бэк нового поста пользователя
    const newPostChange = (status:boolean):void => {
      newPostOpen.value = status
    }
    type objPost = {
      date?: string,
      message?: string,
      idMessage?: number,
    }
    const addUserPost = async () => {
      const obj:objPost = {
        date: datePost(),
        message: newPostUser.value,
        idMessage: store.state.postList ? store.state.postList.length : 0
      }

      store.commit('addUserPost', obj)

      const body = JSON.stringify({postList: store.state.postList})
      await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${store.state.UserID}.json`, body)
      newPostChange(false);
      newPostUser.value = '';
    }
    //

    // Редактирование поста
    const editPostUser = (value:boolean, post?:objPost) => {
      postList.value = store.state.postList
      postEdit.value = value;
      if(post) {
        neededPost.value = postList.value.find(item => item.idMessage === post.idMessage)
      }
      if(!value) neededPost.value = undefined
    }
    const saveEditPostUser = async () => {
        if(neededPost.value) {
          postList.value = postList.value.filter(item => item !== neededPost.value);

          const obj: objPost = {
            idMessage: neededPost.value.idMessage,
            date: `Отредактировано ${datePost()}`,
            message: editPostUserValue.value
          }

          postList.value.unshift(obj);
          store.state.postList = postList.value;
          const body = JSON.stringify({postList: postList.value});
          await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${store.state.UserID}.json`, body);
          postEdit.value = false;
        }
    }
    //

    // Удаление поста
    const deletePostUser = async (post: objPost) => {
      editPostUser(false, post);
      postList.value = postList.value.filter(item => item !== neededPost.value);
      store.state.postList = postList.value;
      const body = JSON.stringify({postList: postList.value});
      await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${store.state.UserID}.json`, body);
    }
    //


    // Создание даты для записи поста в списке постов пользователя
    const datePost = ():string => {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      return `${day}.${month < 10 ? '0' + month : month}.${year}`
    }
    //

    return{newPostOpen, newPostChange, newPostUser, addUserPost, store, saveEditPostUser, editPostUser, postEdit, editPostUserValue, neededPost, deletePostUser}
  }

}

</script>

<style scoped lang="scss">
@import "src/assets/scss/partials/mixins";

.profile_main__notes {
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

      & button:disabled {
        background-color: grey;
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
      width: 350px;
      background-color: burlywood;
      padding: 5px;
      border-radius: 10px;

      & p {
        text-align: start;
      }
      &__button {
        display: flex;
        justify-content: end;
        align-items: baseline;

        &--edit {
          @include button_notes('../assets/edit_icon.ico');
        }

        &--save {
          @include button_notes('../assets/save_icon.ico');
          margin: 0 10px;
        }

        &--delete {
          @include button_notes('../assets/delete_icon.ico');
        }
      }
    }
  }
}

</style>