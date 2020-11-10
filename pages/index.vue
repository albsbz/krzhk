<template>
  <div class="container mainwrapper" :class="{ nosidebar: !displaySidebar }">
    <h1 class="title is-large">Детские кружки в г. Запорожье</h1>
    <div class="mapwrapper">
      <!-- <div class="dumb"></div> -->
      <button class="button is-light filter-button" @click="toggleFilter">
        Показать фильтр
      </button>
      <GmapMap
        :center="{ lat: 47.840476, lng: 35.137578 }"
        :zoom="10"
        map-type-id="roadmap"
        class="box map"
        style="width: 500px; height: 300px"
      >
        <GmapInfoWindow :position="infoWindowPos" :opened="infoWinOpen">
          <article
            v-for="content in infoOptions.content"
            :key="content.title"
            class="message is-link"
          >
            <div class="message-header">
              <NLink :to="'schools/' + content.title">
                {{ content.title }}
              </NLink>
            </div>
            <div class="message-body">
              {{ content.address }}
            </div>
          </article>
        </GmapInfoWindow>
        <GmapCluster :max-zoom="15">
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
    <transition name="slide-fade">
      <appSidebar class="sidebar" />
    </transition>
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
    schoolsCoordinates() {
      const coord = {};
      this.schools.map(school => {
        coord[
          school.geometry?.location.lat + "-" + school.geometry?.location.lng
        ] = school.title;
      });
      return coord;
    },
    markers() {
      return (
        this.schools
          .filter(school => {
            if (school.geometry) {
              return school;
            }
          })

          // .map((school)=>{
          //   const currentCord=school.geometry.location.lat+school.geometry.location.lng
          //   if (currentCord in this.schoolsCordinates){

          //   }
          // })
          .map(school => {
            return {
              position: school.geometry.location,
              infoText: { title: school.title, address: school.address }
            };
          })
      );
    },
    displaySidebar: {
      get() {
        return this.$store.state.schools.showFilter;
      }
    }
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      const infoText = [];
      this.markers.forEach(oneMarker => {
        if (
          oneMarker.position.lat + "-" + oneMarker.position.lng ===
          marker.position.lat + "-" + marker.position.lng
        ) {
          infoText.push(oneMarker.infoText);
        }
      });
      this.infoOptions.content = infoText;
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      // if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    toggleFilter() {
      this.$store.commit("schools/toggleFilter");
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
    "mapwrapper sidebar"
    "pagination sidebar";
  grid-gap: 10px;
}
.mainwrapper.nosidebar {
  grid-template-areas:
    "title"
    "mapwrapper"
    "pagination";
  grid-template-columns: auto;
}

.mapwrapper {
  grid-area: mapwrapper;
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
.filter-button {
  margin: 5px auto;
  width: 150px;
  display: block;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
/* Don't use this in real life, it may hide unexpected elements */
/* ::v-deep .gm-ui-hover-effect {
  display: none!important;
} */
</style>
