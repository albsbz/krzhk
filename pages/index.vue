<template>
  <div>
    index page
    <GmapMap
      :center="{ lat: 47.840476, lng: 35.137578 }"
      :zoom="10"
      map-type-id="roadmap"
      class="box"
      style="width: 500px; height: 300px"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">${marker.name}</p>
              </div>
            </div>
            <div class="content">
              ${marker.description}
              <br />
              <time datetime="2016-1-1">${marker.date_build}</time>
            </div>
          </div>
        </div>
      </GmapInfoWindow>
      <!-- <GmapCluster> -->
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m, index)"
      />
      <!-- </GmapCluster> -->
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
// import GmapCluster from "vue2-google-maps/dist/components/cluster";

export default {
  components: {
    // GmapCluster
  },
  data() {
    return {
      // placeId: "ChIJWfhiyzJn3EARuPWsMqOq3WQ",
      geocoder: null,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: "",
        // optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  computed: {
    google: gmapApi,
    schools() {
      return this.$store.state.schools.schools;
    },
    markers() {
      return this.schools.map(school => {
        return {
          position: school.geometry.location,
          infoText: school.title
        };
      });
    }
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;

      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      // if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  }
};
</script>

<style></style>
