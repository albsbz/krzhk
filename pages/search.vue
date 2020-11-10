<template>
  <section>
    <h2>Вот что мы нашли по вашему запросу:</h2>
  </section>
</template>

<script>
// import { mapState } from "vuex";

// export default {
//   async fetch({ store, error }) {
//     try {
//       if (store.state.articles.articles.length === 0) {
//         await store.dispatch("articles/fetchArticles");
//       }
//     } catch (er) {
//       error(er);
//     }
//   },
//   data() {
//     return {
//       topics: this.$store.getters["articles/topics"]
//     };
//   },
//   computed: {
//     articles() {
//       return this.$store.state.articles.articles;
//     }
//   },
//   methods: {
//     openPage(slug) {
//       this.$router.push("/articles/slug");
//     },
//     filterArticle(topic) {
//       return this.$store.state.articles.articles.filter(article =>
//         article.topic.includes(topic)
//       );
//     }
//   }
// };
</script>
