<template>
  <div class="dropdown is-active">
    <div class="dropdown-trigger">
      <div class="field">
        <div class="control is-expanded">
          <input
            v-model="searchQuery"
            type="search"
            autocomplete="off"
            placeholder="Найти..."
            class="input"
            @keyup.enter="goToSearchResult"
          />
        </div>
      </div>
    </div>

    <div
      v-if="searchResults.length"
      id="dropdown-menu"
      class="dropdown-menu"
      role="menu"
    >
      <div
        v-for="result of searchResultsToShow"
        :key="result.title"
        class="dropdown-content"
      >
        <NuxtLink class="dropdown-item" :to="'/schools/' + result.title">
          {{ result.title }}
        </NuxtLink>
        <hr class="dropdown-divider" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchResults: []
    };
  },
  computed: {
    searchResultsToShow() {
      return this.searchResults.slice(0, 5);
    },
    showResults() {
      return !this.searchQuery;
    },

    schools() {
      return this.$store.state.schools.schools;
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (this.showResults) {
        this.searchResults = [];
        return;
      }
      this.searchResults = await this.$content("Schools")
        .search(searchQuery)
        .fetch();
    },
    $route() {
      this.searchQuery = "";
    }
  },
  methods: {
    goToSearchResult() {
      if (this.showResults) {
        this.searchResults = [];
        return;
      }
      this.$store.commit("search/setSearchResults", this.searchResults);
      this.$router.push({
        path: "/search"
      });
    }
  }
};
</script>
<style scoped></style>
