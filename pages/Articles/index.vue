<template>
  <section>
    <p>Articles</p>
    <p></p>
    <ul>
      <li v-for="article of articles" :key="article.id">
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
export default {
  //   data() {
  //     return {
  //       articles: [
  //         {
  //           id: 1,
  //           slug: "articleone"
  //         },
  //         {
  //           id: 2,
  //           slug: "articletwo"
  //         }
  //       ]
  //     };
  //   },
  async asyncData({ $axios, error }) {
    try {
      const coms = await $axios.$get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const articles = coms.map(com => {
        return { ...com, slug: com.name.split(" ").join("") };
      });
      return { articles };
    } catch (err) {
      error(err);
    }
  },
  methods() {
    return {
      openPage(slug) {
        this.$router.push("/articles/slug");
      }
    };
  }
};
</script>
