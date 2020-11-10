<template>
  <div>
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <NLink :to="'schools/' + school.title">
            <img
              :src="
                require(`~/assets/schoolsPictures/${getSchoolPicture(school)}`)
              "
              alt="Placeholder image"
              class="school-photo"
          /></NLink>
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                :src="require(`~/assets/genres/${genreLogo(school.tags[0])}`)"
                alt="Placeholder image"
                class="genre"
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
          {{ school.shortContent ? school.shortContent : "" }}

          <div>
            <a class="is-size-7" href="tel">{{
              school.phone[0] || "&nbsp;"
            }}</a>
          </div>

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
import { genres } from "./genreMapping";
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
    },
    genreLogo(tag) {
      return genres[tag] ? genres[tag] : genres.default;
    },
    getSchoolPicture(school) {
      if (school.photos) {
        return school.photos[0];
      } else {
        return "activities.jpg";
      }
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
.card {
  height: 100%;
}
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-shrink: 0;
  flex-grow: 1;
}
.card {
  display: flex;
  flex-direction: column;
}
.genre {
  object-fit: cover;
  height: 100%;
}
</style>
