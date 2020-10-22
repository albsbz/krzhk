<template>
  <section>
    <p>Articles</p>
    <p></p>
    <ul>
      <li v-for="article of articles" :key="article.path">
        <NuxtLink
          :to="`/articles/${article.slug}`"
          @click.prevent="openPage(article.slug)"
          >{{ article.slug }}</NuxtLink
        >
      </li>
    </ul>
  </section>
</template>

<script>
// import { mapState } from "vuex";

export default {
  async fetch({ store, error }) {
    try {
      if (store.state.articles.articles.length === 0) {
        await store.dispatch("articles/fetchArticles");
      }
    } catch (er) {
      error(er);
    }
  },
  computed: {
    articles() {
      return this.$store.state.articles.articles;
    }
  },
  methods: {
    openPage(slug) {
      this.$router.push("/articles/slug");
    }
  }
};
</script>
