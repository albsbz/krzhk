<template>
  <aside v-if="displaySidebar" class="box">
    <div class="deleteWrapper">
      <a class="delete" @click="toggleFilter"></a>
    </div>
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
    <button class="button is-small" @click="clearAllFilters">
      Сбросить фильтр
    </button>
  </aside>
</template>
<script>
export default {
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
    displaySidebar: {
      get() {
        return this.$store.state.schools.showFilter;
      }
    }
  },
  methods: {
    changeFilter() {
      this.$store.commit("schools/zeroPage");
    },
    clearAllFilters() {
      this.$store.commit("schools/setFilterTag", "Все");
      this.$store.commit("schools/setFilterDistrict", "Все");
      this.changeFilter();
    },
    toggleFilter() {
      this.$store.commit("schools/toggleFilter");
    }
  }
};
</script>
<style scoped>
.deleteWrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
