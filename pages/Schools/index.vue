<template>
  <section>
    <div>Schools</div>

    page:{{ $store.state.schools.page + 1 }} l:{{
      Math.ceil(
        $store.getters["schools/schoolsLength"] / $store.state.schools.perPage
      )
    }}

    onePage.schoolsLength: {{ $store.getters["schools/schoolsLength"] }}
    <div class="mainwrapper">
      <div class="cardwrapper">
        <ShortArticle
          v-for="school of schools"
          :key="school.slug"
          :school="school"
        />
      </div>

      <aside class="sidebar box">
        <h6>Фильтр</h6>
        <div class="field">
          <label class="label">Тэги</label>
          <div class="control">
            <div class="select">
              <select v-model="selectedTag" @change="changeFilter">
                <option v-for="tag of tags" :key="tag" :value="tag">{{
                  tag
                }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Район</label>
          <div class="control">
            <div class="select">
              <select v-model="selectedDistrict" @change="changeFilter">
                <option
                  v-for="district of districts"
                  :key="district"
                  :value="district"
                >
                  {{ district }}</option
                >
              </select>
            </div>
          </div>
        </div>
      </aside>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click.prevent="previousPage"
          >Previous</a
        >
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
  // async fetch() {
  //   console.log("fetch");
  //   await this.$store.dispatch("schools/fetchSchools");
  // },
  // fetchOnServer: false,
  async asyncData(context) {
    // if (process.server) {
    await context.store.dispatch("schools/fetchSchools");
    // }
    // const schools = context.store.getters["schools/onePage"];
    // return { schools };
  },

  data() {
    return {
      tags: this.$store.getters["schools/tags"],
      districts: this.$store.getters["schools/districts"]
    };
  },
  computed: {
    selectedTag: {
      get() {
        return this.$store.state.schools.filterTag;
      },
      set(value) {
        this.$store.commit("schools/setFilterTag", value);
      }
    },

    selectedDistrict: {
      get() {
        return this.$store.state.schools.filterDistrict;
      },
      set(value) {
        this.$store.commit("schools/setFilterDistrict", value);
      }
    },
    schools() {
      return this.$store.getters["schools/onePage"];
    }
  },

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
        this.$store.dispatch("schools/nextPage");
        // this.schools = this.$store.getters["schools/onePage"];
        window.scrollTo(0, top);
      }
    },
    previousPage() {
      if (this.$store.state.schools.page > 0) {
        this.$store.dispatch("schools/previousPage");
        // this.schools = this.$store.getters["schools/onePage"];
        window.scrollTo(0, top);
      }
    },
    changeFilter() {
      this.$store.commit("schools/zeroPage");
    }
  }
};
</script>
<style scoped>
.sidebar {
  display: block;
  max-width: 300px;
  grid-area: sidebar;
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

.cardwrapper {
  grid-area: cardwrapper;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
</style>
