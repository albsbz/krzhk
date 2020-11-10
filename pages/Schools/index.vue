<template>
  <section>
    <div>Schools</div>

    page:{{ $store.state.schools.page + 1 }} l:{{
      Math.ceil(
        $store.getters["schools/schoolsLength"] / $store.state.schools.perPage
      )
    }}
    <button class="button is-light" @click="toggleFilter">
      Показать фильтр
    </button>
    onePage.schoolsLength: {{ $store.getters["schools/schoolsLength"] }}

    <div class="mainwrapper" :class="{ nosidebar: refreshWrapper }">
      <div class="cardwrapper">
        <ShortArticle
          v-for="school of schools"
          :key="school.slug"
          :school="school"
        />
      </div>

      <appSidebar class="sidebar" />
      <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click.prevent="previousPage">Назад</a>
        <a class="pagination-link">{{ $store.state.schools.page + 1 }}</a>
        <a class="pagination-next" @click.prevent="nextPage">Вперед</a>
      </nav>
    </div>
  </section>
</template>

<script>
import ShortArticle from "@/components/school/ShortArticle.vue";
import appSidebar from "@/components/Sidebar.vue";

export default {
  components: {
    ShortArticle,
    appSidebar
  },
  computed: {
    schools() {
      return this.$store.getters["schools/onePage"];
    },
    refreshWrapper() {
      const showWrapper = !this.displaySidebar;
      return showWrapper;
    },
    displaySidebar: {
      get() {
        return this.$store.state.schools.showFilter;
      }
    }
  },
  // async fetch() {
  //   console.log("fetch");
  //   await this.$store.dispatch("schools/fetchSchools");
  // },
  // fetchOnServer: false,
  // async asyncData(context) {
  //   // if (process.server) {
  //   await context.store.dispatch("schools/fetchSchools");
  //   // }
  //   // const schools = context.store.getters["schools/onePage"];
  //   // return { schools };
  // },

  methods: {
    nextPage() {
      if (
        this.$store.state.schools.page <
        Math.ceil(
          this.$store.getters["schools/schoolsLength"] /
            this.$store.state.schools.perPage
        ) -
          1
      ) {
        this.$store.commit("schools/nextPage");
        // this.schools = this.$store.getters["schools/onePage"];
        window.scrollTo(0, top);
      }
    },
    previousPage() {
      if (this.$store.state.schools.page > 0) {
        this.$store.commit("schools/previousPage");
        // this.schools = this.$store.getters["schools/onePage"];
        window.scrollTo(0, top);
      }
    },
    toggleFilter() {
      this.$store.commit("schools/toggleFilter");
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  display: block;
  max-width: 300px;
  grid-area: sidebar;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 5%;
  width: 100%;
  height: 300px;

  overflow: auto;
  /* background-color: aqua; */
}
.pagination {
  grid-area: pagination;
  display: block;
  align-self: center;
}

.mainwrapper {
  display: grid;
  grid-template-columns: auto 150px;
  grid-template-rows: auto 50px;
  grid-template-areas:
    "cardwrapper sidebar"
    "pagination sidebar";
  grid-gap: 10px;
}
.mainwrapper.nosidebar {
  grid-template-areas:
    "cardwrapper"
    "pagination";
  grid-template-columns: auto;
}

.cardwrapper {
  grid-area: cardwrapper;
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: 1fr;
}
</style>
<style lang="sass" scoped>
@import "~bulma/sass/utilities/functions"
@import "~bulma/sass/utilities/initial-variables"
@import "~bulma/sass/utilities/derived-variables"
@import "~bulma/sass/utilities/mixins"
+desktop
  .cardwrapper
    grid-template-columns: repeat(4, minmax(0, 1fr))
+tablet-only
  .cardwrapper
    grid-template-columns: repeat(2, minmax(0, 1fr))
+mobile
  .cardwrapper
    grid-template-columns: repeat(1, minmax(0, 1fr))
</style>
