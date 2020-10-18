<template>
  <div>
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
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
            <p class="title is-4">{{ school.title }}</p>
            <p class="subtitle is-6">{{ school.district }}</p>
          </div>
        </div>

        <div class="content">
          {{ school.shortContent }}<a href="tel">{{ school.phone }}</a
          >.
          <a v-for="tag of school.tags" :key="tag" :href="'@' + tag">
            #{{ tag }}</a
          >

          <br />
          <time>{{ school.classtime.start }} - {{ school.classtime.end }}</time>
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
  }
};
</script>
<style scoped></style>
