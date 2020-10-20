export const state = () => ({
  page:0,
  schools:[],
  perPage: 12
})

export const mutations = {

  setSchools (state, payload) {
    state.schools=payload
    },
    nextPage (state){
      console.log("nextPage")
      state.page++},
    previousPage (state){
      console.log("previousPage")
      state.page--}
}

export const actions= {
  
  async fetchSchools({commit}) {
    const schools = await this.$content("Schools")
    .fetch();
    commit('setSchools', schools)
  },
  nextPage({commit}){
    commit('nextPage')
  },
  previousPage({commit}){
    commit('previousPage')
  }
}

export const getters={

  schoolsLength: state => {
      return state.schools.length;
    },
  onePage:state=>{

    return state.schools.slice(state.page*state.perPage, state.page*state.perPage+state.perPage)
  }

}