<template>
  <div>
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <NLink :to="'schools/' + school.title">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
          /></NLink>
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title school-title">{{ school.title }}</p>
            <a class="subtitle is-6 district" @click.prevent="setDistrict"
              ><span class="tag is-normal">{{
                school.district ? school.district : "-"
              }}</span></a
            >
          </div>
        </div>

        <div class="content">
          {{ school.shortContent ? school.shortContent : ""
          }}<a href="tel">{{ school.phone ? school.phone : "" }}</a
          >.
          <a
            v-for="tag of school.tags"
            :key="tag"
            class="tag is-success is-light"
            @click.prevent="setTag(tag)"
          >
            #{{ tag }}</a
          >

          <br />
          <time v-if="school.classtime"
            >{{ school.classtime["start"] }} - {{ school.classtime.end }}</time
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["school"],
  computed: {
    shortContent() {
      return this.$props.school.shortContent
        ? this.$props.school.shortContent
        : this.$props.school.shortContent;
    }
  },
  methods: {
    setTag(tag) {
      this.$store.commit("schools/setFilterTag", tag);
    },
    setDistrict() {
      this.$store.commit("schools/setFilterDistrict", this.school.district);
    }
  }
};
</script>
<style scoped>
.district {
  display: block;
}
.school-title {
  font-size: 12px;
}
</style>
