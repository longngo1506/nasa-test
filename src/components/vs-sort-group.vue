<template>
  <vs-button-group>
    <vs-button color="dark" shadow icon @click="handleSortAz">
      <i :class="isSortAZ ? 'bx bx-sort-a-z' : 'bx bx-sort-z-a'"></i>
    </vs-button>
    <vs-button color="dark" shadow icon @click="handleSortNewest">
      <i class="bx bx-sort"></i>
      {{ isNewest ? "newset" : "oldest" }}
    </vs-button>
  </vs-button-group>
</template>

<script>
export default {
  name: "vs-sort-group",
  data: () => ({
    isSortAZ: false,
    isNewest: false,
  }),

  methods: {
    handleSortAz() {
      this.isSortAZ = !this.isSortAZ;
    },

    handleSortNewest() {
      this.isNewest = !this.isNewest;
      console.log(this.isNewest);
    },
  },
};
</script>

<style>
</style>