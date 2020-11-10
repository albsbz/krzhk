<template>
  <section>
    <div class="container box">
      <h3 class="title is-3">{{ school.title }}</h3>
      <span class="tag is-info is-normal district">{{ school.district }}</span>
      <div class="tags">
        <span
          v-for="tag of school.tags"
          :key="tag"
          class="tag is-success is-light is-small"
        >
          #{{ tag }}</span
        >
      </div>
      <div class="content"><nuxt-content :document="school" /></div>
      <div class="carousel-wrapper">
        <no-ssr placeholder="Loading...">
          <carousel :data="carouseldata"></carousel>
        </no-ssr>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const slug = params.slug;

    const school = await store.dispatch("schools/getSchoolBySlug", { slug });

    return { slug, school };
  },
  data() {
    return {
      carouseldata: [
        {
          id: 1,
          message: "First message",
          content(createElement, content) {
            return createElement("img", {
              attrs: {
                src: require("~/assets/lesson-1.jpg")
              }
            });
          }
        },
        {
          id: 2,
          message: "Any message",
          content(createElement, content) {
            return createElement("img", {
              attrs: {
                src: require("~/assets/lesson-2.png")
              }
            });
          }
        }
      ]
    };
  }
};
</script>
<style lang="sass" scoped>
.carousel
  max-width: 600px
  height:361px
  margin: 0 auto
.carousel-wrapper
  height: 400px
.district
  margin: 0 0 10px
</style>
