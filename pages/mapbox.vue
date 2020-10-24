<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "DepotsMap",
  data() {
    return {
      selectedMarker: null,
      markers: [],
      map: null
    };
  },
  computed: {
    depots() {
      //   return this.$store.state.depots;
      return [{ location: { lng: 35.139178, lat: 47.838828 } }];
    }
  },
  // https://vuejs.org/v2/api/#activated
  activated() {
    if (!this.map || !this.map.loaded()) return;
    this.toggleMarker();
    this.scrollToBottom();
  },
  deactivated() {
    this.markers.forEach(marker => {
      const popup = marker.getPopup();
      if (popup.isOpen()) {
        marker.togglePopup();
      }
    });
  },
  mounted() {
    const mapboxgl = require("mapbox-gl");
    const MapboxLanguage = require("@mapbox/mapbox-gl-language");
    const MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");
    // MapboxGeocoder({ language: "ru" });
    const language = new MapboxLanguage();

    this.map = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoiYmVzdC1zaG9wIiwiYSI6ImNrZ253dHVicDB6NnIycm8xeXE4dmg2cjIifQ.Cyv_Pyr1LTqgkfxuPQrqWQ",
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10",
      center: [35.139178, 47.838828],
      zoom: 15,
      pitch: 0,
      maxZoom: 17
    });
    this.map.addControl(language);
    this.map.addControl(
      new MapboxGeocoder({
        accessToken:
          "pk.eyJ1IjoiYmVzdC1zaG9wIiwiYSI6ImNrZ253dHVicDB6NnIycm8xeXE4dmg2cjIifQ.Cyv_Pyr1LTqgkfxuPQrqWQ",
        mapboxgl,
        countries: "UA",
        types: "district,place,locality,neighborhood,address",
        marker: { color: "#ac9128" }
      })
    );
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.markers = this.depots.map(depot => {
      const LngLat = [depot.location.lng, depot.location.lat];

      const popup = `<h3 class="font-bold">test</h3>`;

      const element = document.createElement("div");
      element.className = "marker";
      element.style.backgroundImage = "url('/Pin.svg')";
      element.style.width = "70px";
      element.style.height = "70px";
      element.addEventListener("click", e => {
        // flyTo sometimes fails to trigger the close event on the popup
        if (this.selectedMarker) {
          this.selectedMarker.classList.remove("hidden");
        }
        this.selectedMarker = e.target;
        this.selectedMarker.classList.add("hidden");
        this.map.flyTo({ center: LngLat, speed: 0.5 });
      });
      const popupElement = new mapboxgl.Popup({
        offset: 0,
        anchor: "bottom"
      }).setHTML(popup);
      popupElement.on("close", () => {
        if (this.selectedMarker) {
          this.selectedMarker.classList.remove("hidden");
        }
      });
      const marker = new mapboxgl.Marker({ element, offset: [0, -20] })
        .setLngLat(LngLat)
        .setPopup(popupElement)
        .addTo(this.map);
      marker.street = depot.street;
      return marker;
    });
    this.toggleMarker();
    this.scrollToBottom();
  },
  methods: {
    toggleMarker() {
      const street = this.$route.query.street;
      if (!street) return;
      const marker = this.markers.find(marker => marker.street === street);
      if (!marker) return;
      this.map.jumpTo({
        center: marker.getLngLat()
      });
      marker.togglePopup();
    },
    scrollToBottom() {
      if (!window) return;
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="postcss">
.mapboxgl-popup {
  will-change: auto;
  min-width: 200px;
  max-width: 300px;
}
.mapboxgl-popup-content {
  font-family: europa, sans-serif;
  @apply text-white bg-black rounded-none pt-16 px-6 pb-12 leading-snug text-lg;
}
.mapboxgl-popup-close-button {
  @apply text-3xl mt-2 mr-4;
}
.mapboxgl-popup-tip {
  border: 2rem solid transparent;
}
.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
  border-bottom-color: black;
}
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
  border-top-color: black;
}
.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
  border-right-color: black;
}
.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
  border-left-color: black;
}
#map {
  min-height: 75vh;
}
@screen md {
  #map {
    min-height: 85vh;
  }
}
.marker {
  cursor: pointer;
}
</style>
