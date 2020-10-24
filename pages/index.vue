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
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="false"
        :draggable="false"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        {
          position: { lat: 47.841168, lng: 35.122701 }
        }
      ]
    };
  }
};
</script>

<style></style>
