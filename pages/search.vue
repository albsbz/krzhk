<template>
  <section>
    <h2>Вот что мы нашли по вашему запросу:</h2>
    <div class="search-results">
      <article
        v-for="school of searchResults"
        :key="school.slug"
        class="message is-small"
        :school="school"
      >
        <div class="message-header">
          <NLink :to="'schools/' + school.title"> {{ school.title }}</NLink>
        </div>
        <div class="message-body">
          {{ school.title }}
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    searchResults() {
      return this.$store.state.search.searchResults;
    }
  }
};
</script>
<style scoped>
.search-results {
  display: flex;
  flex-direction: column;
}

.article {
}
</style>
