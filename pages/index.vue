<template>
  <div class="container mainwrapper">
    <h1 class="title is-large">Детские кружки в г. Запорожье</h1>
    <div class="mapwrapper">
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
              <NLink :to="'schools/' + infoOptions.content.title">
                {{ infoOptions.content.title }}
              </NLink>
            </div>
            <div class="message-body">
              {{ infoOptions.content.address }}
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
    <appSidebar class="sidebar" />
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import appSidebar from "@/components/Sidebar.vue";

export default {
  components: {
    GmapCluster,
    appSidebar
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
      return this.$store.getters["schools/filterAll"];
    },
    markers() {
      return this.schools.map(school => {
        return {
          position: school.geometry.location,
          infoText: { title: school.title, address: school.address }
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
.sidebar {
  display: block;
  max-width: 300px;
  grid-area: sidebar;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 5%;
  width: 100%;
  height: 300px;

  overflow: auto;
  /* background-color: aqua; */
}
.mainwrapper {
  display: grid;
  grid-template-columns: auto 150px;
  grid-template-rows: auto 50px;
  grid-template-areas:
    "title title"
    "cardwrapper sidebar"
    "pagination sidebar";
  grid-gap: 10px;
}

.mapwrapper {
  grid-area: cardwrapper;
  display: grid;
  grid-gap: 10px;
}
.title {
  text-align: center;
  grid-area: title;
  display: grid;
  grid-gap: 10px;
}
.dumb,
.map {
  justify-self: center;
}

/* Don't use this in real life, it may hide unexpected elements */
/* ::v-deep .gm-ui-hover-effect {
  display: none!important;
} */
</style>
