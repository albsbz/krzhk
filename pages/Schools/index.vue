<template>
  <section>
    {{ $fetchState }}
    <div>Schools</div>
    page:{{ page }} l:{{
      Math.round($store.state.schools.schoolsLength / perPage)
    }}
    <div class="mainwrapper">
      <div class="cardwrapper">
        <ShortArticle
          v-for="school of schools"
          :key="school.slug"
          :school="school"
        />
      </div>

      <aside class="sidebar">right-menu</aside>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click.prevent="previusPage">Previous</a>
        <a class="pagination-next" @click.prevent="nextPage">Next page</a>
      </nav>
    </div>
  </section>
</template>

<script>
import ShortArticle from "@/components/school/ShortArticle.vue";

export default {
  components: {
    ShortArticle
  },
  async fetch() {
    this.schools = await this.$content("Schools")
      .skip(this.page * this.perPage)
      .limit(this.perPage)
      .fetch();
  },
  async asyncData(context) {
    // asyncData(context) {
    if (process.server) {
      const disp = await context.store.dispatch("schools/fetchSchoolsLength");
      console.log("server");
      return { disp };
    } else {
      console.log("client");
    }
  },

  data() {
    return {
      page: 0,
      schools: Array,
      perPage: 12
      // pagelength: 10
    };
  },
  methods: {
    nextPage() {
      if (
        this.page <
        Math.round(this.$store.state.schools.schoolsLength / this.perPage) - 1
      ) {
        this.page++;
        this.$fetch();
        window.scrollTo(0, top);
      }
    },
    previusPage() {
      if (this.page > 0) {
        this.page--;
        this.$fetch();
        window.scrollTo(0, top);
      }
    }
  }
};
</script>
<style scoped>
.sidebar {
  display: block;
  max-width: 200px;
  grid-area: sidebar;
  background-color: aqua;
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

.cardwrapper {
  grid-area: cardwrapper;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
}
</style>
