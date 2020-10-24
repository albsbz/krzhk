<template>
  <section>
    <div class="container">
      <h1>{{ school }}</h1>
      <h3 class="title is-3">{{ school.title }}</h3>
      <div class="content"><nuxt-content :document="school" /></div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    // debugger;
    // debugger;
    const school = await store.dispatch("schools/getSchoolBySlug", { slug });
    // const school = await store.state.schools.schools.filter(
    //   el => el.title === slug
    // )[0];
    return { slug, school };
    // return { slug };
  }
};
</script>
