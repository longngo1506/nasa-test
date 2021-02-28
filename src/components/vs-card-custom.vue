<template>
  <vs-card @click="handleClickCard" type="1">
    <template #title>
      <h3>{{ title }}</h3>
    </template>
    <template #img>
      <img class="custom-image" :src="backgroundImage" alt="background" />
    </template>
    <template #text>
      <p>{{ description }}</p>
      <vs-button active shadow class="m-t-20">{{ createdDate }}</vs-button>
    </template>

    <template #interactions v-if="!deleted">
      <vs-button danger icon @click="() => handleUpdateItem({ liked: !liked })">
        <i :class="['bx bx-tada-hover', liked ? 'bxs-like' : 'bx-like']"></i>
      </vs-button>
      <vs-button
        shadow
        icon
        primary
        @click.stop="() => handleUpdateItem({ deleted: !deleted })"
      >
        <i
          :class="['bx bx-tada-hover', deleted ? 'bxs-trash' : 'bx-trash']"
        ></i>
      </vs-button>
    </template>

    <template #interactions v-else>
      <vs-button
        shadow
        icon
        @click.stop="() => handleUpdateItem({ deleted: false })"
      >
        <i class="bx bx-tada-hover bx-undo"></i>
        undo
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
  name: "vs-card-custome",

  props: ["cardItemData"],

  filters: {
    dateToText: () => {},
  },
  computed: {
    id: (vm) => vm.cardItemData["nasa_id"],
    backgroundImage: (vm) => vm.cardItemData.image,
    title: (vm) =>
      vm.cardItemData.title &&
      vm.cardItemData.title.substring(0, 100).concat("..."),
    description: (vm) =>
      vm.cardItemData.description &&
      vm.cardItemData.description.substring(0, 100).concat("..."),
    createdDate: (vm) => vm.cardItemData["date_created"],
    liked: (vm) => vm.cardItemData.liked,
    deleted: (vm) => vm.cardItemData.deleted,
  },

  methods: {
    handleClickCard() {
      if (this.deleted) return;

      this.$emit("trigger-dialog", this.cardItemData);
    },

    handleUpdateItem(updateField = {}) {
      this.$emit("update-like", {
        ...this.cardItemData,
        ...updateField,
      });
    },
  },
};
</script>

<style scoped>
.custom-image {
  height: 15rem;
}
.m-t-20 {
  margin-top: 2rem;
}
</style>