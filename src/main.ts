import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBzLG1kgLWbUy72Xs1WDUKc1XaUUOzjl6M",
    authDomain: "ifsocial0230.firebaseapp.com",
    databaseURL: "https://ifsocial0230-default-rtdb.firebaseio.com",
    projectId: "ifsocial0230",
    storageBucket: "ifsocial0230.appspot.com",
    messagingSenderId: "297010774696",
    appId: "1:297010774696:web:b2b05603b46040edfb789d"
};


const app = initializeApp(firebaseConfig);
const storage:any = getStorage(app);

createApp(App).use(store).use(router).use(storage).mount('#app')
