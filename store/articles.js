export const state = () => ({
  articles: []
})

export const mutations = {
  
  setArticles (state, payload) {
  state.articles=payload
  }
}
export const actions= {
  async fetchArticles ({commit}) {

    try {
        const coms = await this.$axios.$get(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const articles = coms.map(com => {
          return { ...com, slug: com.name.split(" ").join("") };
        });
        commit('setArticles', articles)
    } 
    catch (err) {
      throw new Error (err);
    }
  }
}