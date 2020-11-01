export const state = () => ({
  articles: [
    {name:'article1_name', slug:'article1_slug',  topic: "genre1"},
    {name:'article2_name', slug:'article2_slug', topic: "genre2"},
    {name:'article3_name', slug:'article3_slug', topic: "genre3"},
    {name:'article4_name', slug:'article4_slug',  topic: "genre1"},
    {name:'article5_name', slug:'article5_slug', topic: "genre2"},
  ]
})

export const mutations = {
  
  setArticles (state, payload) {
  state.articles=payload
  }
}
export const actions= {

}

export const getters={
  topics:(state)=> [...new Set(state.articles.map(article=>article.topic).flat(1))],  

}