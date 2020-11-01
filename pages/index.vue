<template>
  <div class="container">
    <h1 class="title is-large">Детские кружки в г. Запорожье</h1>
    <!-- <div class="dumb"></div> -->
    <GmapMap
      :center="{ lat: 47.840476, lng: 35.137578 }"
      :zoom="10"
      map-type-id="roadmap"
      class="box map"
      style="width: 500px; height: 300px"
    >
      <GmapInfoWindow :position="infoWindowPos" :opened="infoWinOpen">
        <article class="message is-link">
          <div class="message-header">
            <NLink :to="'schools/' + infoOptions.content"
              ><p>{{ infoOptions.content }}</p></NLink
            >
            <button
              class="delete"
              aria-label="delete"
              @click="infoWinOpen = false"
            ></button>
          </div>
          <div class="message-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
            porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
            gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
            Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales,
            arcu et sollicitudin porttitor, tortor urna tempor ligula, id
            porttitor mi magna a neque. Donec dui urna, vehicula et sem eget,
            facilisis sodales sem.
          </div>
        </article>
      </GmapInfoWindow>
      <GmapCluster>
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="toggleInfoWindow(m, index)"
        />
      </GmapCluster>
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import GmapCluster from "vue2-google-maps/dist/components/cluster";

export default {
  components: {
    GmapCluster
  },
  data() {
    return {
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
      // this.infoOptions.content = marker.infoText;
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

<style scoped>
.gm-style-iw-d {
  overflow: hidden !important;
}
.dumb {
  width: 500px;
  height: 300px;
  background-color: aqua;
}
.title,
.map {
  margin: 0 auto;
  display: block;
  text-align: center;
}
</style>
