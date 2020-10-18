<template>
  <section>
    <div>Schools</div>

    <p>Fetching posts... {{ $fetchState }}</p>

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
    console.log("fetching");
    if (process.client) {
      this.length = (await this.$content("Schools").fetch()).length;
      console.log("new length", this.length);
      this.schools = await this.$content("Schools")
        .skip(this.page * 2)
        .limit(2)
        .fetch();
    }
  },
  //   async asyncData({ $content }) {
  //     const schools = await $content("Schools")
  //       .skip(0)
  //       .limit(12)
  //       .fetch();
  //     return { schools };
  //   },
  data() {
    return {
      page: 0,
      schools: Array,
      length: 10
    };
  },
  methods: {
    nextPage() {
      if (this.page < this.length) {
        this.page++;
        this.$fetch();
      }
    },
    previusPage() {
      if (this.page > 1) {
        this.page--;
        this.$fetch();
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
