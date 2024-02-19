<template>
  <div class="profile_main_photo">
    <img :src="imgDataServer ?? 'https://i.ibb.co/dMqXwmP/no-image.jpg'"
         alt="Фотография отсутствует"
         @click="ButtonImgEdit = !ButtonImgEdit"
         v-if="!ButtonImgEdit"
    >

    <div class="profile_main_photo__change_photo" v-if="ButtonImgEdit">
      <input type="file" @change="imgAdd" ref="fileInput"/>
      <button @click="openFileInput">Выбрать файл</button>
      <button @click="ButtonImgEdit = !ButtonImgEdit">Назад</button>
    </div>

  </div>

</template>

<script lang="ts">

import { ref as refStorage, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';
import {onMounted, ref, Ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";

export default {

  setup() {
    const store = useStore();
    const storage = getStorage();
    const storageRef = refStorage(storage, `/avatar/${localStorage.getItem('UserID')}`);
    const metadata:Ref<UploadMetadata> = ref(undefined);
    const ButtonImgEdit:Ref<boolean> = ref(false)
    const imgDataServer:Ref<string | null> = ref(null);
    const imgEdit:Ref<File | null> = ref(null);
    const fileInput: Ref<HTMLInputElement | null> = ref(null);

    type UploadMetadata = {
      name:string,
      size:string,
      contentType: string
    } | undefined

    // Отправка изображения аватара на сервер
    const imgPostToServe = async ()=>{
      try{
        if (imgEdit.value && imgEdit.value.type.includes('image')) {
          await uploadBytes(storageRef, imgEdit.value, metadata.value)
          imgEdit.value = null
          metadata.value = undefined
          ButtonImgEdit.value = false
          //
          await getImage()
        }
      } catch(e){
        ButtonImgEdit.value = false
      }
    }
    //

    // Получение изображения аватара с сервера
    const getImage = async () => {
      if (localStorage.getItem('UserID')) {
        try {
          imgDataServer.value = await getDownloadURL(storageRef)
          // Отправка ссылки на изображение с сервера на бэк
          const body = JSON.stringify({userPhoto: imgDataServer.value})
          await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${localStorage.getItem('UserID')}/.json`, body)
        } catch (e) {
          imgDataServer.value = 'https://i.ibb.co/dMqXwmP/no-image.jpg'
          // Отправка ссылки на изображение с сервера на бэк если у пользователя отсутствует изображение
          const body = JSON.stringify({userPhoto: 'https://i.ibb.co/dMqXwmP/no-image.jpg'})
          await axios.patch(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${localStorage.getItem('UserID')}/.json`, body)
        }
      }
    }
    //

    //Получение информации об изображении выбранном пользователем
    const imgAdd = async (event: Event)=> {
      // Тип event'a - Event
      const target = event.target as HTMLInputElement
      // Тип event.target инпута - HTMLInputElement
      if(target.files && target.files[0] && target.files[0].type.includes('image')) {
        // Этим мы проверяем содержится ли в строке значении поля type того объекта,
        // что мы выбрали в инпуте - подстроку 'image' - т.e. Что это точно изображение
        imgEdit.value = target.files[0]
          metadata.value = {
            name: `${imgEdit.value.name}`,
            size: `${imgEdit.value.size}`,
            contentType: `${imgEdit.value.type}`,
          }
        await imgPostToServe()
      } else {
        imgEdit.value = null
        ButtonImgEdit.value = false
        console.log('Неверный тип файла!')
      }
    }
    //

    const openFileInput = () => {
      if(fileInput.value) fileInput.value.click();
    }

    onMounted(()=> {
      getImage();
    })

    return{imgDataServer, ButtonImgEdit, imgAdd, imgPostToServe, openFileInput, fileInput}
  }
}

</script>

<style scoped lang="scss">

.profile_main_photo {

    width: 200px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 200px;
      height: 300px;
      border-radius: 50px;
    }

    &__change_photo {
      border: solid burlywood;
      padding: 10px;
      border-radius: 20px;
      text-align: center;

      & input{
        display: none;
      }

      & button {
        padding: 10px;
        background-color: burlywood;
        border-color: burlywood;
        border-radius: 20px;
        margin-top: 10px;
      }
    }
  }


</style>