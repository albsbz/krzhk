export const state = () => ({
  schoolsLength: 10,
  schools:Object
})

export const mutations = {
  setSchoolLength (state, payload) {
  state.schoolsLength=payload
  }
  setSchools (state, payload) {
    state.schools=payload
    }
}

export const actions= {
  async fetchSchoolsLength ({commit}) {
    const length=(
      await this.$content("Schools").fetch()
    ).length;
    commit('setSchoolLength', length)
  },
  async fetchSchools({commit}) {
    const length=(
      await this.$content("Schools").fetch()
    ).length;
    commit('setSchoolLength', length)
  }
}