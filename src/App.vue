<template>
  <div id="app">
    <div class="grid" ref="target" id="target">
      <vs-row>
        <vs-col type="flex" justify="center" align="center" w="12">
          <vs-input
            class="search-input"
            warn
            v-model="searchText"
            label-placeholder="Text something to seacrh..."
            icon-after
            @click-icon="handleSearchData"
          >
            <template #icon>
              <i class="bx bx-search"></i>
            </template>
            >
          </vs-input>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col justify="center" w="12" class="m-t-20">
          <vs-navbar center-collapsed v-model="activeTab">
            <vs-navbar-item
              v-for="tab in $options.listtab"
              :active="activeTab == tab"
              :key="tab"
              :id="tab"
            >
              {{ tab }}
            </vs-navbar-item>
            <template #right>
              <vs-sort-group></vs-sort-group>
            </template>
          </vs-navbar>
        </vs-col>
      </vs-row>

      <vs-sort-group></vs-sort-group>

      <div class="square p-t-50">
        <vs-row
          v-if="listDataShow && listDataShow[0]"
          type="flex"
          justify="flex-start"
          align="center"
        >
          <vs-col
            v-for="(item, idx) in listDataShow.slice(
              (currentPage - 1) * 6,
              currentPage * 6
            )"
            :key="idx"
            lg="4"
            md="6"
            sm="12"
            type="flex"
            justify="center"
            class="p-10"
          >
            <vs-card-custom
              :cardItemData="item"
              @update-like="handleUpdateItem"
              @trigger-dialog="handleTriggerDialog"
            />
          </vs-col>
        </vs-row>

        <vs-row v-if="listDataShow">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
            <vs-pagination
              v-model="currentPage"
              :length="numberPage"
              v-if="listDataShow[0]"
            />
            <p v-else>Empty list</p>
          </vs-col>
        </vs-row>
      </div>
    </div>
    <vs-form-dialog
      :active="showDialog"
      @confirm-update="handleUpdateItem"
      @toggle-dialog="showDialog = !showDialog"
      :itemUpdate="selectedItem"
    ></vs-form-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import VsCardCustom from "./components/vs-card-custom";
import VsFormDialog from "./components/vs-form-dialog";
import VsSortGroup from "./components/vs-sort-group";

export default {
  listtab: ["All", "Liked", "Remove"],
  name: "App",
  components: {
    VsCardCustom,
    VsFormDialog,
    VsSortGroup,
  },

  data: (vm) => ({
    searchText: "",
    currentPage: 1,
    activeTab: vm.$options.listtab[0],
    showDialog: false,
    selectedItem: null,
  }),

  computed: {
    ...mapState(["listData", "isLoading"]),
    ...mapGetters(["linkedList", "removedList", "remainedList"]),
    listDataShow: (vm) => {
      switch (vm.activeTab) {
        case vm.$options.listtab[1]:
          return vm.linkedList;
        case vm.$options.listtab[2]:
          return vm.removedList;
        default:
          return vm.remainedList;
      }
    },
    numberPage: (vm) => ~~(vm.listDataShow.length / 6) || 1,
  },

  watch: {
    activeTab: function () {
      this.currentPage = 1;

      this.setLoadingContent();
    },

    currentPage: function () {
      this.setLoadingContent();
    },
  },

  methods: {
    ...mapActions(["searchData", "syncDataToStore", "updateListData"]),

    async handleSearchData() {
      if (!this.searchText) return;
      const loading = this.$vs.loading({
        type: "circles",
        color: "dark",
        text: "Searching...",
      });

      await this.searchData({
        q: this.searchText,
        // page: 1,
      });

      loading.close();
    },

    handleUpdateItem(item) {
      this.setLoadingContent();
      this.updateListData(item);

      if (this.showDialog) {
        this.showDialog = false;
      }
    },

    setLoadingContent() {
      const loading = this.$vs.loading({
        color: "dark",
      });

      setTimeout(() => loading.close(), 800);
    },

    handleTriggerDialog(item) {
      this.showDialog = !this.showDialog;
      this.selectedItem = { ...item };
    },
  },

  mounted() {
    this.syncDataToStore();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.search-input {
  /* width: 50rem; */
}
.m-t-20 {
  margin-top: 2rem;
}

.p-10 {
  padding: 1rem;
}

.p-t-50 {
  padding-top: 5rem;
}
</style>
