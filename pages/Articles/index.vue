<template>
  <section>
    <!-- Loop through the parent array -->
    <div>
      <section class="container cards-container">
        <div id="sectioncontainer" class="columns is-centered is-multiline">
          <div v-for="topic of topics" :key="topic" class="column is-narrow">
            <article class="message is-info">
              <div class="message-header">
                <!-- Make a header using the `name` property from the current season in the loop -->
                <p>» {{ topic }}</p>
              </div>
              <div class="message-body">
                <div class="board-item">
                  <!-- Loop through the `items` array from the current season to show each item -->
                  <div
                    v-for="article of filterArticle(topic)"
                    :key="article.slug"
                    class="board-item-content"
                  >
                    <span>
                      <NuxtLink
                        :to="`/articles/${article.slug}`"
                        @click.prevent="openPage(article.slug)"
                        >{{ article.name }}</NuxtLink
                      ></span
                    >
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
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
  data() {
    return {
      topics: this.$store.getters["articles/topics"]
    };
  },
  computed: {
    articles() {
      return this.$store.state.articles.articles;
    }
  },
  methods: {
    openPage(slug) {
      this.$router.push("/articles/slug");
    },
    filterArticle(topic) {
      return this.$store.state.articles.articles.filter(article =>
        article.topic.includes(topic)
      );
    }
  }
};
</script>
