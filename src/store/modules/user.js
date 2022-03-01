//用户

export default {
  namespaced:true,
  state() {
    return{
      //用户信息
      profile:{
        id:'',
        avatar:'',
        nickname:'',
        account:'',
        phone:'',
        token:''
      }
    }
  },
  mutations:{
    setUser( state , payload) {
      state.profile = payload
    }
  }

}