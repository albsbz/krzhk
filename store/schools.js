export const state = () => ({
  page:0,
  schools:[],
  perPage: 12,
  showFilter: false,
  filterTag:"Все",
  filterDistrict: "Все",
})

export const mutations = {

  setSchools (state, payload) {
    state.schools=payload
    },
    nextPage (state){
      state.page++
    },
    previousPage (state){
      state.page--
    },
    zeroPage (state){
      state.page=0
    },
    setFilterTag(state, payload) {
      state.filterTag=payload
    },
    setFilterDistrict(state, payload) {
      state.filterDistrict=payload
    },
    toggleFilter(state){
      state.showFilter=!state.showFilter
    }
}

export const actions= {
  
  async fetchSchools({commit}) {
    const schools = await this.$content("Schools")
    .fetch();
    commit('setSchools', schools)
  },
  async getSchoolBySlug ({commit}, {slug}) {
    const school = (await this.$content("Schools").where({ title: { $eq: slug } })
    .fetch())[0];
    return school
  }


}

export const getters={
  tags:(state)=> [...['Все'], ...new Set(state.schools.map(school=>school.tags).flat(1))],
  districts:(state)=>[...['Все'], ...new Set(state.schools.map(school=>school.district))],
  schoolsLength: (state, getters) => getters.filterAll.length,
  onePage:(state, getters)=>getters.filterAll.slice(state.page*state.perPage, state.page*state.perPage+state.perPage),
  filterAll:(state, getters)=>getters.filterDistrict.filter(x => getters.filterTag.includes(x)),
  filterDistrict: (state)=>state.filterDistrict!=="Все"?state.schools.filter(school=>school.district===state.filterDistrict):state.schools,
  filterTag: (state)=>state.filterTag!=="Все"?state.schools.filter(school=>school.tags?.includes(state.filterTag)):state.schools
  
}