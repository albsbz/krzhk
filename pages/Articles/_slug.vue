<template>
  <div>
    <section class="hero is-info is-medium is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">{{ article.name }}</h1>
        </div>
      </div>
    </section>
    <div class="container">
      <section class="articles">
        <div class="column is-8 is-offset-2">
          <!-- START ARTICLE -->
          <div class="card article">
            <div class="card-content">
              <div class="content article-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Accumsan lacus vel facilisis volutpat est velit egestas.
                  Sapien eget mi proin sed. Sit amet mattis vulputate enim. In
                  eu mi bibendum neque egestas congue quisque egestas diam. Enim
                  nec dui nunc mattis enim ut tellus. Ut morbi tincidunt augue
                  interdum velit euismod in. At in tellus integer feugiat
                  scelerisque varius morbi enim nunc. Vitae suscipit tellus
                  mauris a diam. Arcu non sodales neque sodales ut etiam sit
                  amet.
                </p>
              </div>
            </div>
          </div>
          <!-- END ARTICLE -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    article() {
      return this.$store.state.articles.articles.filter(
        article => article.slug === this.$route.params.slug
      )[0];
    }
  }
};
</script>
