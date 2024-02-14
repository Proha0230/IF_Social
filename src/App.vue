<template>
  <router-view/>
</template>

<script lang="ts">
import {onBeforeMount} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {Ref, ref} from "vue";
import axios from "axios";

export default {

setup(){
const store = useStore();
const router = useRouter();
const UserID:Ref<string | null> = ref(null);
const UserEnter:Ref<string | null> = ref(null);

const getDataUserInLocalStorage = () => {
  UserID.value = localStorage.getItem('UserID')
  UserEnter.value = localStorage.getItem('UserEnter')
}
const getDataUser = async ():Promise<void> => {
  const {data} = await axios.get(`https://ifsocial0230-default-rtdb.firebaseio.com/users/${UserID.value}.json`)
  store.state.UserID = UserID.value
  store.state.UserName = data.name;
  store.state.UserLastName = data.lastName;
  store.state.status = data.status;
  store.state.postList = data.postList;
}

onBeforeMount(()=> {
  getDataUserInLocalStorage();
  if(UserID.value && UserEnter.value) {
    getDataUser();
    router.push('/home');
  }
})

  }
}


</script>

<style lang="scss">
@import  url("https://fonts.googleapis.com/css?family=Roboto");


html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Roboto Light', sans-serif;
  background-color: aliceblue;
}



</style>
