import { createStore } from 'vuex'

type objPost = {
  date?: string,
  message?: string,
  idMessage?: number | null,
}
export default createStore({
  state: {
    UserID: '',
    UserName: '',
    UserLastName: '',
    status: '',
    // Здесь мы указываем тип переменной и ее значение, но по умолчанию оно не идет! Когда нет постов у пользователя
    // store.state.postList - будет undefined. Примитивные типы такие как number / string / boolean - указывать не надо
    // они выводятся автоматически
    postList: Array<objPost>({
      date: '',
      message: '',
      idMessage: null,
    }),
  },
  getters: {
  },
  mutations: {
    addUserPost(state, payload:objPost){
      if(!state.postList) {
        // Это для первого поста пользователя, т.к. state.postList undefined - мы ему присваиваем значение
        // Куда уже после первого поста - сможем пушить другие объекты с постами
        state.postList = new Array(payload)
      } else {
        state.postList.unshift(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  },

})
