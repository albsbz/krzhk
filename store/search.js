export const state = () => ({
  searchResults:[]
})

export const mutations = {
  setSearchResults (state, payload) {
    state.searchResults=payload
  }
}

