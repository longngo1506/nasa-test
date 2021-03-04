<template>
  <vs-dialog blur v-model="isShow">
    <template #header>
      <h4 class="not-margin"><b>Update</b></h4>
    </template>

    <div class="grid con-form">
      <vs-input v-model="input1" label="Title"> </vs-input>
      <vs-input v-model="input2" label="Description"> </vs-input>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block @click="confirmUpdate"> Update </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  name: "vs-form-dialog",
  props: ["active", "itemUpdate"],

  data: () => ({
    _title: "",
    _desc: "",
  }),

  computed: {
    input1: {
      get: function () {
        return this.itemUpdate && this.itemUpdate.title;
      },
      set: function (val) {
        this._title = val;
      },
    },

    input2: {
      get: function () {
        return this.itemUpdate && this.itemUpdate.description;
      },
      set: function (val) {
        this._desc = val;
      },
    },

    isShow: {
      get: function () {
        return this.active;
      },
      set: function (val) {
        this.$emit("toggle-dialog", val);
      },
    },
  },

  methods: {
    confirmUpdate() {
      this.$emit("confirm-update", {
        ...this.itemUpdate,
        title: this._title,
        description: this._desc,
      });

      this.resetData();
    },

    resetData() {
      this._title = "",
      this._ = ""
    }
  },
};
</script>

<style lang="scss">
.con-form {
  width: 100%;

  .vs-input-content {
    margin: 1rem 0;
    width: calc(100%);

    .vs-input {
      width: 100%;
    }
  }
}
</style>
